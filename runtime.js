/*!
 * Bioferia — mini motor de plantillas (sin dependencias)
 *
 * Interpreta la plantilla de <template id="bf-template"> con esta sintaxis:
 *   {{ ruta.al.valor }}                 → texto o atributo
 *   <sc-if value="{{ cond }}">…</sc-if> → bloque condicional
 *   <sc-for list="{{ lista }}" as="x">  → repetición (con {{ $index }})
 *   onClick="{{ fn }}"                  → eventos (click, pointer*, mouseenter/leave…)
 *   ref="{{ fn }}"                      → recibe el elemento real del DOM
 *
 * El componente (js/app.js) extiende DCLogic: tiene state, setState(),
 * renderVals() y los ciclos de vida componentDidMount / componentDidUpdate /
 * componentWillUnmount. En cada cambio de estado se arma un árbol virtual y se
 * actualiza el DOM existente sólo donde cambió (los canvas, el objeto 3D y
 * los estilos que la lógica modifica a mano se conservan).
 */
(function () {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';
  var EVENTS = {
    onclick: 'click', onpointerdown: 'pointerdown', onpointermove: 'pointermove',
    onpointerup: 'pointerup', onpointerleave: 'pointerleave', onpointercancel: 'pointercancel',
    onmouseenter: 'mouseenter', onmouseleave: 'mouseleave', onsubmit: 'submit',
    onchange: 'change', oninput: 'input', onkeydown: 'keydown', onfocus: 'focus', onblur: 'blur'
  };
  var HOLE = /\{\{\s*([^}]+?)\s*\}\}/g;
  var WHOLE = /^\s*\{\{\s*([^}]+?)\s*\}\}\s*$/;

  function lookup(path, scope) {
    path = path.trim();
    if (path === 'true') { return true; }
    if (path === 'false') { return false; }
    if (path === 'null') { return null; }
    if (/^-?\d+(\.\d+)?$/.test(path)) { return parseFloat(path); }
    var parts = path.split('.'), v = scope;
    for (var i = 0; i < parts.length; i++) {
      if (v === null || v === undefined) { return undefined; }
      v = v[parts[i]];
    }
    return v;
  }

  function evalAttr(str, scope) {
    var m = str.match(WHOLE);
    if (m) { return lookup(m[1], scope); }
    if (str.indexOf('{{') < 0) { return str; }
    return str.replace(HOLE, function (_, p) { var v = lookup(p, scope); return v === null || v === undefined ? '' : String(v); });
  }

  function childScope(parent, name, value, index) {
    var s = Object.create(parent);
    s[name] = value;
    s.$index = index;
    return s;
  }

  /* ---------- plantilla → árbol virtual ---------- */
  function buildChildren(node, scope, out) {
    for (var c = node.firstChild; c; c = c.nextSibling) { build(c, scope, out); }
  }

  function build(node, scope, out) {
    if (node.nodeType === 3) {
      var t = node.nodeValue;
      out.push({ t: 3, v: t.indexOf('{{') < 0 ? t : t.replace(HOLE, function (_, p) { var v = lookup(p, scope); return v === null || v === undefined ? '' : String(v); }) });
      return;
    }
    if (node.nodeType !== 1) { return; }
    var tag = node.localName;
    if (tag === 'sc-if') {
      if (evalAttr(node.getAttribute('value') || '', scope)) { buildChildren(node, scope, out); }
      else { out.push({ t: 8 }); }
      return;
    }
    if (tag === 'sc-for') {
      var list = evalAttr(node.getAttribute('list') || '', scope) || [];
      var as = node.getAttribute('as') || 'item';
      for (var i = 0; i < list.length; i++) { buildChildren(node, childScope(scope, as, list[i], i), out); }
      return;
    }
    var vn = { t: 1, tag: tag, svg: node.namespaceURI === SVG_NS, attrs: {}, ev: {}, ref: null, ch: [] };
    for (var a = 0; a < node.attributes.length; a++) {
      var at = node.attributes[a], name = at.name, low = name.toLowerCase();
      if (low.indexOf('hint-') === 0) { continue; }
      var val = evalAttr(at.value, scope);
      if (low === 'ref') { vn.ref = val; continue; }
      if (EVENTS[low]) { if (typeof val === 'function') { vn.ev[EVENTS[low]] = val; } continue; }
      vn.attrs[name] = val;
    }
    buildChildren(node.content || node, scope, vn.ch);
    out.push(vn);
  }

  /* ---------- árbol virtual → DOM ---------- */
  var refQueue = [];

  function normalize(name, v) {
    if (v === null || v === undefined) { return null; }
    if (typeof v === 'boolean') {
      if (name.indexOf('aria-') === 0 || name.indexOf('data-') === 0) { return String(v); }
      return v ? '' : null;
    }
    return String(v);
  }

  function create(vn) {
    if (vn.t === 3) { return document.createTextNode(vn.v); }
    if (vn.t === 8) { return document.createComment('if'); }
    var el = vn.svg ? document.createElementNS(SVG_NS, vn.tag) : document.createElement(vn.tag);
    update(el, vn);
    return el;
  }

  function update(el, vn) {
    var old = el.__bfA || {}, next = {}, k;
    for (k in vn.attrs) {
      var v = normalize(k, vn.attrs[k]);
      next[k] = v;
      if (old[k] !== v) { if (v === null) { el.removeAttribute(k); } else { el.setAttribute(k, v); } }
    }
    for (k in old) { if (!(k in next)) { el.removeAttribute(k); } }
    el.__bfA = next;

    if (!el.__bfH) { el.__bfH = {}; el.__bfBound = {}; }
    for (k in el.__bfH) { if (!vn.ev[k]) { el.__bfH[k] = null; } }
    for (k in vn.ev) {
      el.__bfH[k] = vn.ev[k];
      if (!el.__bfBound[k]) {
        el.__bfBound[k] = true;
        (function (type) { el.addEventListener(type, function (e) { var f = el.__bfH[type]; if (f) { f(e); } }); })(k);
      }
    }

    patchChildren(el, vn.ch);

    if (vn.ref && el.__bfRef !== vn.ref) {
      if (el.__bfRef) { refQueue.push([el.__bfRef, null]); }
      el.__bfRef = vn.ref;
      refQueue.push([vn.ref, el]);
    }
  }

  function same(node, vn) {
    if (vn.t === 3) { return node.nodeType === 3; }
    if (vn.t === 8) { return node.nodeType === 8; }
    return node.nodeType === 1 && node.localName === vn.tag && (node.namespaceURI === SVG_NS) === vn.svg;
  }

  function cleanup(node) {
    if (node.nodeType !== 1) { return; }
    if (node.__bfRef) { refQueue.push([node.__bfRef, null]); node.__bfRef = null; }
    for (var c = node.firstChild; c; c = c.nextSibling) { cleanup(c); }
  }

  function patchChildren(parent, vch) {
    for (var i = 0; i < vch.length; i++) {
      var vn = vch[i], cur = parent.childNodes[i];
      if (!cur) { parent.appendChild(create(vn)); continue; }
      if (same(cur, vn)) {
        if (vn.t === 3) { if (cur.nodeValue !== vn.v) { cur.nodeValue = vn.v; } }
        else if (vn.t === 1) { update(cur, vn); }
      } else {
        cleanup(cur);
        parent.replaceChild(create(vn), cur);
      }
    }
    while (parent.childNodes.length > vch.length) {
      var last = parent.lastChild;
      cleanup(last);
      parent.removeChild(last);
    }
  }

  function flushRefs() {
    var q = refQueue; refQueue = [];
    for (var i = 0; i < q.length; i++) { try { q[i][0](q[i][1]); } catch (e) { console.error(e); } }
  }

  /* ---------- componente ---------- */
  function DCLogic(props) {
    this.props = props || {};
    this.state = {};
  }
  DCLogic.prototype.setState = function (partial) {
    if (!this.__bfPrev) { this.__bfPrev = Object.assign({}, this.state); }
    if (typeof partial === 'function') { partial = partial(this.state, this.props); }
    Object.assign(this.state, partial || {});
    if (this.__bfSchedule) { this.__bfSchedule(); }
  };
  DCLogic.prototype.forceUpdate = function () { if (this.__bfSchedule) { this.__bfSchedule(); } };

  function mount(Component, props, template, root) {
    var inst = new Component(props);
    var tplNodes = template.content;
    var pending = false;

    function render() {
      var vals = inst.renderVals();
      var out = [];
      buildChildren(tplNodes, vals, out);
      patchChildren(root, out);
      flushRefs();
    }

    inst.__bfSchedule = function () {
      if (pending) { return; }
      pending = true;
      Promise.resolve().then(function () {
        pending = false;
        var prev = inst.__bfPrev || inst.state;
        inst.__bfPrev = null;
        render();
        if (inst.componentDidUpdate) { inst.componentDidUpdate(inst.props, prev); }
      });
    };

    render();
    inst.__bfPrev = null;
    if (inst.componentDidMount) { inst.componentDidMount(); }
    window.addEventListener('pagehide', function () { if (inst.componentWillUnmount) { inst.componentWillUnmount(); } });
    return inst;
  }

  window.DCLogic = DCLogic;
  window.BFRuntime = { mount: mount };
})();
