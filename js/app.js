/*!
 * Bioferia — lógica de la landing
 * Datos (zonas, stands, afiches, entradas, merch), raspadita, intro del logo,
 * carruseles, fotogramas de cianotipia, anillo 3D de stands y merch 3D.
 * Se monta sobre js/runtime.js.
 */
var LOGO = 'assets/img/logo-bioferia.png';
var CYANO = 'assets/texturas/cianotipia.jpg';
var LEAVES = 'assets/img/hojas-logo-mascara.png';
var BLUE = [47, 69, 181];
var SUB = ['#19D3E6', '#2440E6', '#7B3FE4', '#CF1477', '#FF6A1A', '#C6FF3D'];
var BF = {
  zones: [
    { id: 'palimpsesto', code: 'D', name: 'Palimpsesto', color: '#C6FF3D', fg: '#0E0B1F', desc: 'El pasado deja rastros.', x: 36, y: 38, w: 30, h: 56 },
    { id: 'resiliencia', code: 'A', name: 'Resiliencia', color: '#7B3FE4', fg: '#FFFFFF', desc: 'Somos lo que persiste y jamás será derrotado.', x: 3, y: 6, w: 30, h: 40 },
    { id: 'quorum', code: 'B', name: 'Quórum', color: '#CF1477', fg: '#FFFFFF', desc: 'Cuando el cambio sucede siendo muchos, se termina notando.', x: 36, y: 6, w: 30, h: 28 },
    { id: 'bioluminiscencia', code: 'C', name: 'Bioluminiscencia', color: '#19D3E6', fg: '#0E0B1F', desc: 'Iluminemos el camino que señala nuestro destino.', x: 69, y: 6, w: 28, h: 44 },
    { id: 'incomodidad', code: 'E', name: 'Incomodidad', color: '#FF6A1A', fg: '#0E0B1F', desc: 'Hacemos ruido porque estamos despiertos.', x: 3, y: 50, w: 30, h: 44 },
    { id: 'orbita', code: 'F', name: 'Estar en órbita', color: '#2440E6', fg: '#FFFFFF', desc: 'No olvidemos lo que ya hemos aprendido.', x: 69, y: 54, w: 28, h: 40 }
  ],
  stands: [
    { code: 'D-00', zone: 'palimpsesto', name: 'Arco de ingreso', img: 'stands/arco-ingreso.jpg', size: '', alt: 'arco de madera curva con vidrios de colores y el logo de Bioferia sobre cianotipia', desc: 'El arco de madera y vidrios de colores que marca el comienzo del recorrido. Al atravesarlo, la luz proyecta las capas de color sobre el pasto.' },
    { code: 'D-01', zone: 'palimpsesto', name: 'Información, entradas y merch', img: 'stands/informacion-entradas-merch.jpg', board: 'stands/fichas/informacion-entradas-merch.jpg', size: '18 × 6 m', alt: 'pérgola de madera con tres mostradores y una pared de vidrios de colores', desc: 'El punto de inicio de la feria: orientación, consultas y programación, venta y control de entradas, y el merchandising oficial.' },
    { code: 'D-02', zone: 'palimpsesto', name: 'Zona instagrameable', img: 'stands/zona-instagrameable.jpg', board: 'stands/fichas/zona-instagrameable.jpg', size: '', alt: 'instalación con vidrios de colores colgantes, cilindros giratorios y un muro de collage', desc: 'Una instalación inmersiva y participativa para habitar las capas del planeta, su memoria y sus transformaciones, a través de la luz, el color y la superposición.' },
    { code: 'A-01', zone: 'resiliencia', name: 'Gastronomía', img: 'stands/gastronomia.jpg', board: 'stands/fichas/gastronomia.jpg', size: '4 × 4 m', alt: 'barra de hormigón con carteles violeta, vidrios lima y mesas de madera', desc: 'Un espacio de encuentro y pausa para compartir, recargar energías y disfrutar de una propuesta gastronómica consciente, local y creativa.' },
    { code: 'A-02', zone: 'resiliencia', name: 'Espacio infancias', img: 'stands/espacio-infancias.jpg', size: '', alt: 'cúpulas de colores para dibujar, hamacas, pelotero e inflable bajo velas tensadas', desc: 'Cúpulas para dibujar y crear, hamacas, pelotero e inflable bajo velas de colores: un lugar para que las infancias también recorran la feria.' },
    { code: 'B-01', zone: 'quorum', name: 'Pabellón Quórum · Pymes', img: 'stands/pabellon-quorum-pymes.jpg', size: '', alt: 'cúpula de madera con paneles magenta y círculos lima, con estanterías de productos', desc: 'Una cúpula de madera y paneles magenta donde se reúnen pymes y emprendimientos locales: cuando el cambio sucede siendo muchos, se termina notando.' },
    { code: 'C-01', zone: 'bioluminiscencia', name: 'Bar Bioluminiscencia', img: 'stands/bar-bioluminiscencia.jpg', board: 'stands/fichas/bar-bioluminiscencia.jpg', size: '6 × 4 m', alt: 'pabellón de madera con lámparas medusa y una barra luminosa', desc: 'Conectar lo invisible: un espacio inmersivo que usa la luz como lenguaje. Un recorrido sensorial en tres zonas: exploración, interacción y consumo.' },
    { code: 'C-02', zone: 'bioluminiscencia', name: 'Stand ONG bioluminiscente', img: 'stands/stand-ong-bioluminiscente.jpg', size: '', alt: 'stand con mostrador de vidrio turquesa y un panel oscuro con una medusa', desc: 'Un stand para organizaciones: información, materiales y propuestas para cuidar lo que normalmente no vemos.' },
    { code: 'E-01', zone: 'incomodidad', name: 'Cuidado natural', img: 'stands/cuidado-natural.jpg', size: '', alt: 'stand de techo ondulado de madera con vidrios naranja y productos de cosmética natural', desc: 'Cosmética y cuidado personal natural bajo un techo de madera ondulado, vidrios naranja y paneles intervenidos.' },
    { code: 'E-02', zone: 'incomodidad', name: 'Cuidado natural · Sol', img: 'stands/cuidado-natural-sol.jpg', size: '', alt: 'stand naranja con protectores solares y un cartel de orientación', desc: 'Protección solar y cuidado natural para recorrer la feria al aire libre.' },
    { code: 'F-01', zone: 'orbita', name: 'Escenario principal', img: 'stands/escenario-principal.jpg', board: 'stands/fichas/escenario-principal.jpg', size: '22 × 10 m', alt: 'escenario con arcos de madera, pantalla con la Tierra y gradas con almohadones', desc: 'Un espacio para compartir ideas, aprender y generar acciones colectivas. Inspirado en las órbitas y los ciclos, invita a mirar el mundo desde otra posición.' },
    { code: 'F-02', zone: 'orbita', name: 'Charlas y streaming', img: 'stands/charlas-streaming.jpg', size: '', alt: 'set de entrevistas con dos sillones, micrófonos y órbitas de luz', desc: 'Un set para entrevistas y charlas transmitidas en vivo durante los tres días.' }
  ],
  pins: [
    { label: 'Entrada', x: 51, y: 96, icon: 'M5 12h14 M13 6l6 6-6 6' },
    { label: 'Información', x: 34.5, y: 47, icon: 'M12 8h.01 M11 12h1v5h1 M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z' },
    { label: 'Baños', x: 67.5, y: 30, icon: 'M8 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M16 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M6 21v-6H5l1.5-6h3L11 15h-1v6 M14 21V9h4v12' },
    { label: 'Agua', x: 67.5, y: 76, icon: 'M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z' }
  ],
  posters: [
    { name: 'Resiliencia', src: 'assets/afiches/resiliencia.jpg', phrase: 'Somos lo que persiste y jamás será derrotado.', color: '#7B3FE4', fg: '#FFFFFF' },
    { name: 'Quórum', src: 'assets/afiches/quorum.jpg', phrase: 'Cuando el cambio sucede siendo muchos, se termina notando.', color: '#CF1477', fg: '#FFFFFF' },
    { name: 'Palimpsesto', src: 'assets/afiches/palimpsesto.jpg', phrase: 'El pasado deja rastros.', color: '#C6FF3D', fg: '#0E0B1F' },
    { name: 'Incomodidad', src: 'assets/afiches/incomodidad.jpg', phrase: 'Hacemos ruido porque estamos despiertos.', color: '#FF6A1A', fg: '#0E0B1F' },
    { name: 'Bioluminiscencia', src: 'assets/afiches/bioluminiscencia.jpg', phrase: 'Iluminemos el camino que señala nuestro destino.', color: '#19D3E6', fg: '#0E0B1F' },
    { name: 'Estar en órbita', src: 'assets/afiches/estar-en-orbita.jpg', phrase: 'No olvidemos lo que ya hemos aprendido.', color: '#2440E6', fg: '#FFFFFF' }
  ],
  tickets: [
    { id: 'd1', day: 'Viernes', date: '09 de abril', phrase: 'Conectamos historias para lo que viene.', price: 8000, color: '#FF6A1A', src: 'assets/tickets/ticket-viernes-09.webp' },
    { id: 'd2', day: 'Sábado', date: '10 de abril', phrase: 'La vida siempre encuentra una forma de continuar.', price: 8000, color: '#2440E6', src: 'assets/tickets/ticket-sabado-10.webp' },
    { id: 'd3', day: 'Domingo', date: '11 de abril', phrase: 'Esta es una historia donde cada capa permanece.', price: 8000, color: '#CF1477', src: 'assets/tickets/ticket-domingo-11.webp' }
  ],
  merch: [
    { id: 'vaso', rx: -12, name: 'Vaso térmico', zone: 'incomodidad', price: 18000, phrase: 'Crecer molesta al principio.', desc: 'Vaso térmico con tapa, envuelto en un collage del concepto incomodidad.', views: ['merch/vaso-1.jpg', 'merch/vaso-2.jpg'] },
    { id: 'yerbero', rx: -14, name: 'Yerbero', zone: 'quorum', price: 15000, phrase: 'La fuerza de un bien mayor reside en la humilde suma de nuestras partes.', desc: 'Lata con pico vertedor y un collage que se descubre al girarla.', views: ['merch/yerbero-1.jpg', 'merch/yerbero-2.jpg', 'merch/yerbero-3.jpg'] },
    { id: 'shampoo', rx: -40, name: 'Shampoo sólido', zone: 'incomodidad', price: 9000, phrase: 'La incomodidad no cambia la realidad.', desc: 'Barra de shampoo sólido con la hoja del logo grabada, en lata reutilizable.', views: ['merch/shampoo.jpg'] },
    { id: 'beewrap', rx: -10, name: 'Bee wrap', zone: 'resiliencia', price: 8000, phrase: 'Aprendimos desde la sombra a mirar en la oscuridad.', desc: 'Envoltorio de tela encerada, reutilizable, para reemplazar el film plástico.', views: ['merch/bee-wrap.jpg'] },
    { id: 'llavero', rx: -4, name: 'Llavero', zone: 'bioluminiscencia', price: 6000, phrase: 'Nuestro destello es la brújula hacia la prosperidad.', desc: 'Llavero de acrílico que brilla en la oscuridad. Apagá la luz para verlo.', views: ['merch/llavero-luz-frente.jpg', 'merch/llavero-luz-dorso.jpg'], darkViews: ['merch/llavero-oscuridad-frente.jpg', 'merch/llavero-oscuridad-dorso.jpg'] }
  ],
  pictos: [
    { label: 'Información', icon: 'M12 8h.01 M11 12h1v5h1 M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z' },
    { label: 'Baños', icon: 'M8 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M16 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M6 21v-6H5l1.5-6h3L11 15h-1v6 M14 21V9h4v12' },
    { label: 'Agua', icon: 'M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z' },
    { label: 'Comida', icon: 'M4 11h16 M5 11a7 7 0 0 0 14 0 M9 4c0 2 2 2 2 4 M13 4c0 2 2 2 2 4' },
    { label: 'Reciclaje', icon: 'M7 19H4.8a1.8 1.8 0 0 1-1.6-2.7L7 10 M11 19h8.2a1.8 1.8 0 0 0 1.6-2.7L19 13 M14 16l-3 3 3 3 M8.3 6.6l1.1-1.9a1.8 1.8 0 0 1 3.1 0L16 11 M7 13l1.3-6.4L2 8' },
    { label: 'Primeros auxilios', icon: 'M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z' },
    { label: 'Accesible', icon: 'M12 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M8 8h8 M12 8v6h4l2 5 M9 12a5 5 0 1 0 6 7' },
    { label: 'Salida', icon: 'M14 4h6v16h-6 M4 12h11 M11 8l4 4-4 4' }
  ]
};

class Component extends DCLogic {
  constructor(props) {
    super(props);
    var logoOn = props.logoIntro !== false;
    this.state = { revealed: false, progress: 0, logoPhase: logoOn ? 'wait' : 'done', zone: 'palimpsesto', filter: 'todas', merch: 0, poster: 2, posterPaused: false, qty: {}, bought: false, printsOn: {}, ringPos: 0, ringPaused: false, dark: false, merchPaused: false };
    this.canvas = null; this.lastPt = null; this.moves = 0; this.cells = {}; this.dissolving = false;
    this.logoImg = null; this.leafPts = null; this.leafImg = null; this.cyImg = null; this.logoCanvas = null; this.logoStarted = false; this.logoTimers = [];
    var self = this;
    this.printEls = [];
    this.printRefs = {};
    [0, 1, 2, 3, 4, 5, 6].forEach(function (i) { self.printRefs['r' + i] = function (el) { self.printEls[i] = el; }; });
    this.setCanvas = (el) => { this.canvas = el; if (el) { this.paintFoil(); } };
    this.logoVideo = null;
    this.setLogoVideo = (el) => { this.logoVideo = el; if (el) { el.muted = true; } };
    this.onScratch = (e) => { this.scratch(e); };
    this.onLift = () => { this.lastPt = null; };
    this.skip = () => { this.dissolve(); };
    this.skipLogo = () => { this.endLogo(true); };
    this.onResize = () => {
      if (this.moves === 0 && this.canvas) { this.paintFoil(); }
    };
    this.ringDown = (e) => { this.ringX = e.clientX; this.ringDragged = false; };
    this.ringUp = (e) => {
      if (this.ringX == null) { return; }
      var dx = e.clientX - this.ringX; this.ringX = null;
      if (Math.abs(dx) > 30) {
        this.ringDragged = true;
        var steps = Math.max(1, Math.round(Math.abs(dx) / 170));
        this.setState({ ringPos: this.state.ringPos + (dx < 0 ? steps : -steps) });
        var self2 = this; setTimeout(function () { self2.ringDragged = false; }, 50);
      }
    };
    this.pauseRing = () => { this.setState({ ringPaused: true }); };
    this.resumeRing = () => { this.setState({ ringPaused: false }); };
    this.objEl = null; this.faceList = [];
    this.m3 = { rx: -12, ry: -25, v: 0, drag: false, hover: false, lx: 0, ly: 0, t: 0, prod: null };
    this.setObj = (el) => { this.objEl = el; if (el) { this.collectFaces(); } };
    this.m3Down = (e) => { var m = this.m3; m.drag = true; m.lx = e.clientX; m.ly = e.clientY; m.v = 0; try { e.currentTarget.setPointerCapture(e.pointerId); } catch (er) {} };
    this.m3Move = (e) => {
      var m = this.m3; if (!m.drag) { return; }
      var dx = e.clientX - m.lx, dy = e.clientY - m.ly; m.lx = e.clientX; m.ly = e.clientY;
      m.ry += dx * 0.45; m.rx = Math.max(-75, Math.min(45, m.rx - dy * 0.35)); m.v = dx * 0.45;
    };
    this.m3Up = () => { this.m3.drag = false; };
    this.pauseMerch = () => { this.m3.hover = true; this.setState({ merchPaused: true }); };
    this.resumeMerch = () => { this.m3.hover = false; this.m3.drag = false; this.setState({ merchPaused: false }); };
    this.pausePosters = () => { this.setState({ posterPaused: true }); };
    this.resumePosters = () => { this.setState({ posterPaused: false }); };
  }

  componentDidMount() {
    var self = this;
    if (this.introOn()) { this.lockScroll(true); }
    try {
      window.addEventListener('resize', this.onResize);
    } catch (e) {}
    try {
      var img = new Image();
      img.onload = function () { self.logoImg = img; if (self.moves === 0 && self.canvas) { self.paintFoil(); } };
      img.src = LOGO;
      var cimg = new Image();
      cimg.onload = function () { self.cyImg = cimg; };
      cimg.src = CYANO;
    } catch (e) {}
    if (!this.introOn() && this.state.logoPhase === 'wait') { setTimeout(function () { self.startLogo(); }, 50); }
    try {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () { if (self.moves === 0 && self.canvas) { self.paintFoil(); } });
      }
    } catch (e) {}
    this.watchPrints();
    this.timer = setInterval(function () {
      if (!self.state.posterPaused) { self.setState({ poster: (self.state.poster + 1) % BF.posters.length }); }
    }, 4500);
    this.ringTicks = 0;
    this.ringTimer = setInterval(function () {
      var sec = document.getElementById('stands');
      var inView = false;
      if (sec) { var r = sec.getBoundingClientRect(); inView = r.top < window.innerHeight * 0.4 && r.bottom > window.innerHeight * 0.6; }
      if (inView) { self.ringSeen = true; }
      if (!self.state.ringPaused && inView && self.ringSeen && self.ringTicks++ > 0) { self.setState({ ringPos: self.state.ringPos + 1 }); }
    }, 6000);
    this.m3Loop();
  }

  componentWillUnmount() {
    try {
      window.removeEventListener('resize', this.onResize);
    } catch (e) {}
    if (this.logoRaf) { cancelAnimationFrame(this.logoRaf); }
    clearInterval(this.timer); clearInterval(this.ringTimer); if (this.m3Raf) { cancelAnimationFrame(this.m3Raf); }
    this.logoTimers.forEach(function (t) { clearTimeout(t); });
    if (this.io) { this.io.disconnect(); }
    this.lockScroll(false);
  }

  componentDidUpdate(prevProps, prevState) {
    this.collectFaces();
    if (!this.introOn() && !this.logoActive()) { this.lockScroll(false); }
    if (this.props.logoIntro === false && this.state.logoPhase !== 'done') { this.endLogo(false); }
  }

  /* ---------- Fotogramas de cianotipia: se revelan al entrar en pantalla ---------- */
  watchPrints() {
    var self = this;
    var all = function () { var on = {}; for (var i = 0; i < 7; i++) { on['p' + i] = true; } self.setState({ printsOn: on }); };
    if (typeof IntersectionObserver === 'undefined') { all(); return; }
    this.io = new IntersectionObserver(function (entries) {
      var add = {};
      entries.forEach(function (en) {
        if (en.isIntersecting) { var i = self.printEls.indexOf(en.target); if (i >= 0) { add['p' + i] = true; self.io.unobserve(en.target); } }
      });
      if (Object.keys(add).length) { self.setState({ printsOn: Object.assign({}, self.state.printsOn, add) }); }
    }, { threshold: 0.45 });
    this.printEls.forEach(function (el) { if (el) { self.io.observe(el); } });
  }

  fern(seed) {
    var d = '', stem = 'M150 280 C142 200 160 120 150 30';
    var pt = function (t) { var m = 1 - t; return [m * m * m * 150 + 3 * m * m * t * 142 + 3 * m * t * t * 160 + t * t * t * 150, m * m * m * 280 + 3 * m * m * t * 200 + 3 * m * t * t * 120 + t * t * t * 30]; };
    for (var i = 0; i < 13; i++) {
      var t = 0.08 + i * 0.07, p = pt(t), len = 70 * (1 - t * 0.85), side = i % 2 === 0 ? 1 : -1, ang = (side > 0 ? -35 : -145) * Math.PI / 180;
      var ex = p[0] + Math.cos(ang) * len, ey = p[1] + Math.sin(ang) * len, nx = -Math.sin(ang) * len * 0.22, ny = Math.cos(ang) * len * 0.22;
      var mx = (p[0] + ex) / 2, my = (p[1] + ey) / 2;
      d += 'M' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ' Q' + (mx + nx).toFixed(1) + ' ' + (my + ny).toFixed(1) + ' ' + ex.toFixed(1) + ' ' + ey.toFixed(1) + ' Q' + (mx - nx).toFixed(1) + ' ' + (my - ny).toFixed(1) + ' ' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ' Z ';
    }
    var tip = pt(0.98);
    d += 'M' + tip[0].toFixed(1) + ' ' + (tip[1] - 14).toFixed(1) + ' Q' + (tip[0] + 9).toFixed(1) + ' ' + tip[1].toFixed(1) + ' ' + tip[0].toFixed(1) + ' ' + (tip[1] + 16).toFixed(1) + ' Q' + (tip[0] - 9).toFixed(1) + ' ' + tip[1].toFixed(1) + ' ' + tip[0].toFixed(1) + ' ' + (tip[1] - 14).toFixed(1) + ' Z';
    return { d: d, stem: stem };
  }

  scatter() {
    var leaf = function (x, y, a, l) {
      var r = a * Math.PI / 180, ex = x + Math.cos(r) * l, ey = y + Math.sin(r) * l, nx = -Math.sin(r) * l * 0.3, ny = Math.cos(r) * l * 0.3, mx = (x + ex) / 2, my = (y + ey) / 2;
      return 'M' + x + ' ' + y + ' Q' + (mx + nx).toFixed(1) + ' ' + (my + ny).toFixed(1) + ' ' + ex.toFixed(1) + ' ' + ey.toFixed(1) + ' Q' + (mx - nx).toFixed(1) + ' ' + (my - ny).toFixed(1) + ' ' + x + ' ' + y + ' Z ';
    };
    var dot = function (x, y, r) { return 'M' + (x - r) + ' ' + y + ' a' + r + ' ' + r + ' 0 1 0 ' + (2 * r) + ' 0 a' + r + ' ' + r + ' 0 1 0 ' + (-2 * r) + ' 0 Z '; };
    var d = leaf(70, 90, 20, 80) + leaf(190, 70, 120, 70) + leaf(120, 170, -60, 90) + leaf(210, 200, 200, 60) + leaf(60, 220, -20, 55);
    d += dot(150, 120, 6) + dot(240, 140, 4) + dot(95, 260, 5) + dot(175, 245, 3) + dot(40, 150, 3);
    return { d: d, stem: 'M120 170 C130 210 150 240 160 285' };
  }

  /* ---------- Máscara del logo para la intro ---------- */
  prepLeaves(img) {
    try {
      var w = 170, h = Math.round(170 * img.height / img.width);
      var c = document.createElement('canvas'); c.width = w; c.height = h;
      var x = c.getContext('2d'); x.drawImage(img, 0, 0, w, h);
      var data = x.getImageData(0, 0, w, h).data, a = [], b = [];
      for (var yy = 0; yy < h; yy++) { for (var xx = 0; xx < w; xx++) {
        var o = (yy * w + xx) * 4;
        if (data[o + 3] > 160) { if (data[o] > data[o + 1]) { a.push(xx / w, yy / h); } else { b.push(xx / w, yy / h); } }
      } }
      this.leafImg = img;
      this.leafPts = { a: a, b: b, aspect: img.width / img.height };
    } catch (e) {}
  }

  logoActive() { var p = this.state.logoPhase; return p === 'wait' || p === 'run' || p === 'word' || p === 'fade'; }

  introOn() {
    var on = this.props.intro;
    if (on === undefined || on === null) { on = true; }
    return on && !this.state.revealed;
  }

  lockScroll(on) {
    try {
      document.documentElement.style.overflow = on ? 'hidden' : '';
      document.body.style.overflow = on ? 'hidden' : '';
    } catch (e) {}
  }

  /* ---------- Raspadita ---------- */
  paintFoil() {
    var c = this.canvas;
    if (!c) { return; }
    var r = c.getBoundingClientRect();
    if (!r.width || !r.height) { return; }
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = Math.round(r.width * dpr); c.height = Math.round(r.height * dpr);
    var ctx = c.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    var w = r.width, h = r.height;
    this.cw = w; this.ch = h; this.cells = {};

    var g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, '#B9BDC6'); g.addColorStop(0.25, '#EEF0F3'); g.addColorStop(0.5, '#A9AEB8');
    g.addColorStop(0.72, '#E6E8EC'); g.addColorStop(1, '#B3B8C1');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 0.12; ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 1;
    for (var d = -h; d < w; d += 7) { ctx.beginPath(); ctx.moveTo(d, 0); ctx.lineTo(d + h, h); ctx.stroke(); }
    ctx.globalAlpha = 1;
    var n = Math.round(w * h / 90);
    for (var i = 0; i < n; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.35)' : 'rgba(60,64,74,0.18)';
      ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
    }
    var m = 28;
    ctx.setLineDash([10, 8]); ctx.strokeStyle = 'rgba(14,11,31,0.35)'; ctx.lineWidth = 2;
    ctx.strokeRect(m, m, w - m * 2, h - m * 2); ctx.setLineDash([]);

    var cx = w / 2, cy = h * 0.40;
    var lw = Math.max(220, Math.min(560, w * 0.42));
    if (this.logoImg) {
      var lh = lw * this.logoImg.height / this.logoImg.width;
      ctx.drawImage(this.logoImg, cx - lw / 2, cy - lh / 2, lw, lh);
      cy = cy + lh / 2;
    } else {
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#0E0B1F';
      ctx.font = "900 " + Math.round(lw / 4.5) + "px Inter, sans-serif";
      ctx.fillText('Bioferia', cx, cy); cy = cy + lw / 8;
    }
    var bw = Math.min(300, w * 0.5), bx = cx - bw / 2, by = cy + 26;
    var bands = ['#19D3E6', '#2440E6', '#7B3FE4', '#CF1477', '#FF6A1A', '#C6FF3D'];
    for (var b = 0; b < bands.length; b++) { ctx.fillStyle = bands[b]; ctx.fillRect(bx + b * bw / bands.length, by, bw / bands.length, 10); }

    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    var fs = Math.max(16, Math.min(28, w * 0.022));
    ctx.font = "700 " + fs + "px Inter, sans-serif"; ctx.fillStyle = '#0E0B1F';
    var msg = 'Rasca la pantalla con el mouse para acceder a nuestra página';
    if (ctx.measureText(msg).width > w - 80) {
      ctx.fillText('Rasca la pantalla con el mouse', cx, by + 56);
      ctx.fillText('para acceder a nuestra página', cx, by + 56 + fs * 1.35);
    } else { ctx.fillText(msg, cx, by + 60); }
    ctx.font = "italic 400 20px 'Libre Caslon Text', serif"; ctx.fillStyle = 'rgba(14,11,31,0.7)';
    ctx.fillText('09 · 10 · 11 de abril 2027 — Hipódromo de Palermo', cx, by + 110 + fs);
  }

  mark(x, y, rad) {
    var cols = 24, rows = 16, cw = this.cw / cols, ch = this.ch / rows;
    var c0 = Math.max(0, Math.floor((x - rad) / cw)), c1 = Math.min(cols - 1, Math.floor((x + rad) / cw));
    var r0 = Math.max(0, Math.floor((y - rad) / ch)), r1 = Math.min(rows - 1, Math.floor((y + rad) / ch));
    for (var cc = c0; cc <= c1; cc++) { for (var rr = r0; rr <= r1; rr++) {
      var mx = (cc + 0.5) * cw, my = (rr + 0.5) * ch;
      if ((mx - x) * (mx - x) + (my - y) * (my - y) <= rad * rad * 1.2) { this.cells[cc + '_' + rr] = 1; }
    } }
  }

  scratch(e) {
    var c = this.canvas;
    if (!c || this.dissolving) { return; }
    var r = c.getBoundingClientRect();
    var x = e.clientX - r.left, y = e.clientY - r.top;
    var ctx = c.getContext('2d');
    var rad = Math.max(34, Math.min(70, r.width * 0.04));
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = rad * 2;
    var from = this.lastPt || { x: x - 0.1, y: y };
    ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.lineTo(x, y); ctx.stroke();
    for (var j = 0; j < 5; j++) {
      ctx.beginPath();
      ctx.arc(x + (Math.random() - 0.5) * rad * 2.4, y + (Math.random() - 0.5) * rad * 2.4, Math.random() * 4 + 1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
    var dist = Math.hypot(x - from.x, y - from.y), steps = Math.max(1, Math.ceil(dist / (rad / 2)));
    for (var s = 0; s <= steps; s++) { this.mark(from.x + (x - from.x) * s / steps, from.y + (y - from.y) * s / steps, rad); }
    this.lastPt = { x: x, y: y };
    this.moves++;
    if (this.moves % 6 === 0) {
      var p = Object.keys(this.cells).length / (24 * 16);
      if (p >= 0.5) { this.dissolve(); } else { this.setState({ progress: p }); }
    }
  }

  dissolve() {
    if (this.dissolving) { return; }
    this.dissolving = true;
    var self = this, c = this.canvas, reduce = false;
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    if (!c || reduce || !this.cw) { this.finish(); return; }
    this.setState({ progress: 1 });
    var ctx = c.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    var cols = 20, rows = 12, bw = this.cw / cols, bh = this.ch / rows, blocks = [];
    for (var i = 0; i < cols; i++) { for (var j = 0; j < rows; j++) { blocks.push([i, j]); } }
    for (var k = blocks.length - 1; k > 0; k--) { var q = Math.floor(Math.random() * (k + 1)); var t = blocks[k]; blocks[k] = blocks[q]; blocks[q] = t; }
    var idx = 0, per = Math.ceil(blocks.length / 24);
    var step = function () {
      for (var n = 0; n < per && idx < blocks.length; n++, idx++) {
        var bl = blocks[idx], jx = (Math.random() - 0.5) * bw * 0.6;
        ctx.fillRect(bl[0] * bw + jx - 1, bl[1] * bh - 1, bw * (0.7 + Math.random() * 0.8), bh + 2);
      }
      if (idx < blocks.length) { requestAnimationFrame(step); }
      else { ctx.clearRect(0, 0, self.cw, self.ch); setTimeout(function () { self.finish(); }, 60); }
    };
    requestAnimationFrame(step);
  }

  finish() {
    var self = this;
    if (this.state.logoPhase === 'wait') {
      this.setState({ revealed: true });
      setTimeout(function () { self.startLogo(); }, 30);
    } else {
      this.lockScroll(false); this.setState({ revealed: true });
    }
  }

  /* ---------- Intro: líneas que se unen y forman el logo ---------- */
  startLogo() {
    if (this.logoStarted) { return; }
    this.logoStarted = true;
    var self = this, v = this.logoVideo;
    this.setState({ logoPhase: 'run' });
    if (!v) { this.endLogo(false); return; }
    var done = function () { self.logoTimers.push(setTimeout(function () { self.endLogo(true); }, 600)); };
    v.addEventListener('ended', done, { once: true });
    try {
      v.muted = true; v.currentTime = 0;
      var pr = v.play();
      if (pr && pr.catch) { pr.catch(function () { self.endLogo(true); }); }
    } catch (e) { this.endLogo(true); return; }
    this.logoTimers.push(setTimeout(function () { self.endLogo(true); }, 9000));
  }

  endLogo(animated) {
    var self = this;
    if (this.state.logoPhase === 'done' || this.state.logoPhase === 'fade') { return; }
    this.logoTimers.forEach(function (t) { clearTimeout(t); }); this.logoTimers = [];
    if (!animated) { if (this.logoRaf) { cancelAnimationFrame(this.logoRaf); this.logoRaf = 0; } this.setState({ logoPhase: 'done' }); this.lockScroll(false); return; }
    this.setState({ logoPhase: 'fade' });
    this.logoTimers.push(setTimeout(function () {
      if (self.logoRaf) { cancelAnimationFrame(self.logoRaf); self.logoRaf = 0; }
      self.setState({ logoPhase: 'done' }); self.lockScroll(false);
    }, 750));
  }

  money(n) { return '$' + Number(n).toLocaleString('es-AR'); }

  goTo(id) {
    try { var el = document.getElementById(id); if (el && el.scrollIntoView) { el.scrollIntoView({ behavior: 'smooth' }); } } catch (e) {}
  }

  setQty(id, q) {
    var qty = Object.assign({}, this.state.qty);
    if (q <= 0) { delete qty[id]; } else { qty[id] = q; }
    this.setState({ qty: qty, bought: false });
  }

  /* ---------- Merch 3D: geometría real + luz ---------- */
  collectFaces() {
    if (!this.objEl) { return; }
    var list = this.objEl.querySelectorAll('[data-sh]'), out = [];
    for (var i = 0; i < list.length; i++) { var sh = list[i].getAttribute('data-sh'); if (sh === 'none') { list[i].style.filter = ''; } out.push({ el: list[i], a: parseFloat(list[i].getAttribute('data-a')) || 0, sh: sh, b: -1 }); }
    this.faceList = out;
    var id = BF.merch[this.state.merch].id + (this.state.dark ? '-d' : '');
    if (this.m3.prod !== id) { this.m3.prod = id; this.m3.rx = BF.merch[this.state.merch].rx; }
  }

  m3Loop() {
    var self = this, reduce = false, frame = 0, visible = true;
    try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    var tick = function () {
      self.m3Raf = requestAnimationFrame(tick);
      frame++;
      if (frame % 30 === 0) { var sec = document.getElementById('merch'); if (sec) { var r = sec.getBoundingClientRect(); visible = r.bottom > 0 && r.top < window.innerHeight; } }
      if (!visible || !self.objEl) { return; }
      var m = self.m3, rx0 = BF.merch[self.state.merch].rx;
      if (!m.drag) {
        m.ry += m.v; m.v *= 0.94;
        if (Math.abs(m.v) < 0.05 && !m.hover && !reduce) { m.ry += 0.35; }
        m.rx += (rx0 - m.rx) * 0.015;
      }
      m.t += 0.02;
      var bob = reduce ? 0 : Math.sin(m.t) * 7;
      self.objEl.style.transform = 'translateY(' + bob.toFixed(2) + 'px) rotateX(' + m.rx.toFixed(2) + 'deg) rotateY(' + m.ry.toFixed(2) + 'deg)';
      var rxr = m.rx * Math.PI / 180;
      for (var i = 0; i < self.faceList.length; i++) {
        var f = self.faceList[i], b;
        if (f.sh === 'cyl') {
          var w = (f.a + m.ry) * Math.PI / 180, lam = Math.max(0, Math.cos(w + 0.55));
          b = 0.52 + 0.58 * lam + 0.18 * Math.pow(lam, 24);
        } else if (f.sh === 'top') { b = 0.72 + 0.42 * Math.max(0, Math.sin(-rxr)); }
        else if (f.sh === 'bot') { b = 0.55 + 0.3 * Math.max(0, Math.sin(rxr)); }
        else { continue; }
        if (Math.abs(b - f.b) > 0.012) { f.b = b; f.el.style.filter = 'brightness(' + b.toFixed(3) + ')'; }
      }
    };
    tick();
  }

  geom(id, dark) {
    var F = [];
    var face = function (o) { F.push(Object.assign({ cls: '', a: 0, sh: 'none', l: 0, t: 0, w: 10, h: 10, tf: 'none', bg: 'transparent', bs: 'auto', bp: '0px 0px', br: '0', glow: 'none' }, o)); };
    var cyl = function (o) {
      var n = o.n || 40, C = 2 * Math.PI * o.r, w = C / n + 0.9, d = o.r * Math.cos(Math.PI / n);
      for (var i = 0; i < n; i++) {
        var a = i * 360 / n;
        face({ cls: o.cls || '', a: a, sh: 'cyl', l: -w / 2, t: o.y - o.h / 2, w: w, h: o.h, bg: o.bg || 'transparent',
          tf: 'rotateY(' + a.toFixed(3) + 'deg) translateZ(' + d.toFixed(2) + 'px)',
          bs: o.cls ? (C.toFixed(1) + 'px ' + o.h + 'px') : 'auto', bp: o.cls ? ((-i * C / n).toFixed(2) + 'px 0px') : '0px 0px' });
      }
    };
    var disc = function (o) {
      var tf = o.dir === 'up' ? 'translateY(' + o.y + 'px) rotateX(90deg)' : o.dir === 'down' ? 'translateY(' + o.y + 'px) rotateX(-90deg)' :
        o.dir === 'front' ? 'translateY(' + o.y + 'px) translateZ(' + o.z + 'px)' : 'translateY(' + o.y + 'px) translateZ(' + (-o.z) + 'px) rotateY(180deg)';
      face({ cls: o.cls || '', a: o.dir === 'back' ? 180 : 0, sh: o.dir === 'up' ? 'top' : o.dir === 'down' ? 'bot' : 'cyl', l: -o.r, t: -o.r, w: 2 * o.r, h: 2 * o.r,
        tf: tf, bg: o.bg || 'transparent', bs: 'cover', br: '50%', glow: o.glow || 'none' });
    };
    var box = function (o) {
      var base = 'translate3d(' + o.x + 'px,' + o.y + 'px,' + o.z + 'px) rotateX(' + (o.rx || 0) + 'deg) ';
      face({ a: 0, sh: 'cyl', l: -o.w / 2, t: -o.h / 2, w: o.w, h: o.h, bg: o.bg, br: o.br || '0', tf: base + 'translateZ(' + o.d / 2 + 'px)' });
      face({ a: 180, sh: 'cyl', l: -o.w / 2, t: -o.h / 2, w: o.w, h: o.h, bg: o.bg, br: o.brb || o.br || '0', tf: base + 'rotateY(180deg) translateZ(' + o.d / 2 + 'px)' });
      face({ a: 90, sh: 'cyl', l: -o.d / 2, t: -o.h / 2, w: o.d, h: o.h, bg: o.bg, tf: base + 'rotateY(90deg) translateZ(' + o.w / 2 + 'px)' });
      face({ a: -90, sh: 'cyl', l: -o.d / 2, t: -o.h / 2, w: o.d, h: o.h, bg: o.bg, tf: base + 'rotateY(-90deg) translateZ(' + o.w / 2 + 'px)' });
      face({ sh: 'top', l: -o.w / 2, t: -o.d / 2, w: o.w, h: o.d, bg: o.bg, tf: base + 'rotateX(90deg) translateZ(' + o.h / 2 + 'px)' });
    };
    if (id === 'vaso') {
      cyl({ r: 95, h: 341, y: 30, n: 40, cls: 'tx-vaso' });
      cyl({ r: 101, h: 44, y: -162.5, n: 40, bg: '#1d1d21' });
      disc({ dir: 'up', r: 101, y: -184.5, bg: '#27272c' });
      disc({ dir: 'up', r: 84, y: -185.5, bg: '#18181b' });
      box({ w: 34, h: 12, d: 98, x: 0, y: -199, z: -8, rx: -22, bg: '#222226' });
      disc({ dir: 'down', r: 95, y: 200.5, bg: '#2440C8' });
    } else if (id === 'yerbero') {
      cyl({ r: 105, h: 289, y: 24, n: 44, cls: 'tx-yerbero' });
      cyl({ r: 109, h: 22, y: -131.5, n: 44, bg: '#cfd2d8' });
      cyl({ r: 108, h: 16, y: 176.5, n: 44, bg: '#c6c9d0' });
      disc({ dir: 'up', r: 109, y: -142.5, bg: '#2F3A9E' });
      box({ w: 64, h: 58, d: 24, x: 0, y: -172, z: 0, bg: '#f1f1f3', br: '0 58px 0 0', brb: '58px 0 0 0' });
      disc({ dir: 'down', r: 108, y: 184.5, bg: '#b8bcc4' });
    } else if (id === 'shampoo') {
      cyl({ r: 150, h: 58, y: 0, n: 48, bg: '#c9ccd3' });
      cyl({ r: 151.5, h: 5, y: -12, n: 48, bg: '#a8acb5' });
      cyl({ r: 151.5, h: 5, y: 12, n: 48, bg: '#a8acb5' });
      disc({ dir: 'up', r: 150, y: -29, cls: 'tx-shampoo' });
      disc({ dir: 'down', r: 150, y: 29, bg: '#b5b9c1' });
    } else if (id === 'llavero') {
      var glow = dark ? '0 0 60px rgba(25,211,230,0.55)' : 'none';
      disc({ dir: 'front', r: 150, y: 20, z: 5, cls: dark ? 'tx-llof' : 'tx-llf', glow: glow });
      disc({ dir: 'back', r: 150, y: 20, z: 5, cls: dark ? 'tx-llod' : 'tx-lld', glow: glow });
      var n = 56, C = 2 * Math.PI * 150, w = C / n + 0.9;
      for (var i = 0; i < n; i++) {
        var a = i * 360 / n;
        face({ l: -w / 2, t: -5, w: w, h: 10, bg: dark ? '#19D3E6' : 'rgba(222,232,248,0.95)', tf: 'translateY(20px) rotateZ(' + a.toFixed(2) + 'deg) translateY(-150px) rotateX(90deg)' });
      }
      var silver = 'inset 0 0 0 9px #c3c6cd, inset 0 0 0 10px #8f939b, 0 0 0 1px #8f939b';
      var lsilver = 'inset 0 0 0 5px #c3c6cd, 0 0 0 1px #8f939b';
      [[0, -132, 0], [14, -150, 90], [30, -166, 0], [48, -180, 90]].forEach(function (p) {
        face({ l: -14, t: -10, w: 28, h: 20, br: '50%', glow: lsilver, tf: 'translate3d(' + p[0] + 'px,' + p[1] + 'px,0px) rotateZ(-40deg) rotateY(' + p[2] + 'deg)' });
        face({ l: -14, t: -10, w: 28, h: 20, br: '50%', glow: lsilver, tf: 'translate3d(' + p[0] + 'px,' + p[1] + 'px,0px) rotateZ(-40deg) rotateY(' + (p[2] + 180) + 'deg)' });
      });
      face({ l: -78, t: -78, w: 156, h: 156, br: '50%', glow: silver, tf: 'translate3d(112px,-246px,0px) rotateY(50deg)' });
      face({ l: -78, t: -78, w: 156, h: 156, br: '50%', glow: silver, tf: 'translate3d(112px,-246px,0px) rotateY(230deg)' });
    } else if (id === 'beewrap') {
      var np = 6, W = 420, H = 330, th = 16, pw = W / np, c = Math.cos(th * Math.PI / 180), sn = Math.sin(th * Math.PI / 180);
      var tot = np * pw * c, zc = pw * sn / 2;
      for (var j = 0; j < np; j++) {
        var ang = j % 2 === 0 ? th : -th, xc = -tot / 2 + pw * c * (j + 0.5);
        face({ cls: 'tx-beewrap', a: ang, sh: 'cyl', l: -pw / 2 - 0.5, t: -H / 2, w: pw + 1, h: H, bs: W + 'px ' + H + 'px', bp: (-j * pw).toFixed(2) + 'px 0px',
          tf: 'translate3d(' + xc.toFixed(2) + 'px,0px,' + zc.toFixed(2) + 'px) rotateY(' + ang + 'deg)' });
        face({ a: 180 + ang, sh: 'cyl', l: -pw / 2 - 0.5, t: -H / 2, w: pw + 1, h: H, bg: '#ece2d0',
          tf: 'translate3d(' + xc.toFixed(2) + 'px,0px,' + zc.toFixed(2) + 'px) rotateY(' + (180 + ang) + 'deg)' });
      }
    }
    return F;
  }

  goStand(i) {
    var n = BF.stands.length, cur = this.state.ringPos, idx = ((cur % n) + n) % n;
    var d = i - idx; if (d > n / 2) { d -= n; } if (d < -n / 2) { d += n; }
    this.setState({ ringPos: cur + d });
  }

  printsData() {
    var on = this.state.printsOn, fern = this.fern(), sc = this.scatter();
    var defs = [
      { side: 'right', kind: 'logo', rot: -6, br: '46% 54% 58% 42% / 52% 40% 60% 48%', br2: '60% 40% 45% 55% / 40% 58% 42% 60%', label: 'resiliencia' },
      { side: 'left', kind: 'fern', rot: 8, br: '40% 60% 52% 48% / 58% 44% 56% 42%', br2: '55% 45% 60% 40% / 45% 55% 45% 55%', label: 'quórum' },
      { side: 'right', kind: 'scatter', rot: -10, br: '58% 42% 46% 54% / 44% 56% 44% 56%', br2: '42% 58% 55% 45% / 60% 40% 60% 40%', label: 'palimpsesto' },
      { side: 'left', kind: 'logo', rot: 12, br: '50% 50% 40% 60% / 60% 50% 50% 40%', br2: '40% 60% 60% 40% / 50% 40% 60% 50%', label: 'incomodidad' },
      { side: 'right', kind: 'fern', rot: -4, br: '44% 56% 60% 40% / 48% 58% 42% 52%', br2: '58% 42% 40% 60% / 42% 52% 48% 58%', label: 'bioluminiscencia' },
      { side: 'left', kind: 'scatter', rot: 6, br: '52% 48% 56% 44% / 40% 60% 40% 60%', br2: '46% 54% 44% 56% / 56% 46% 54% 44%', label: 'estar en órbita' },
      { side: 'right', kind: 'logo', rot: -12, br: '48% 52% 44% 56% / 56% 42% 58% 44%', br2: '56% 44% 58% 42% / 44% 56% 44% 56%', label: 'orbitemos' }
    ];
    var out = {};
    defs.forEach(function (d, i) {
      var left = d.side === 'left';
      var g = d.kind === 'fern' ? fern : sc;
      out['p' + i] = {
        cls: on['p' + i] ? 'on' : '',
        pos: (left ? 'left: -120px' : 'right: -120px') + (i === 0 ? '; bottom: 30px' : '; bottom: -80px'),
        rot: d.rot, br: d.br, br2: d.br2,
        isLogo: d.kind === 'logo', isSvg: d.kind !== 'logo',
        ix: left ? 128 : 22, irot: left ? -8 : 10,
        d: g.d, stem: g.stem,
        label: d.label,
        tpos: left ? 'left: 140px' : 'left: 24px'
      };
    });
    return out;
  }

  renderVals() {
    var self = this, st = this.state;
    var accent = this.props.accent ?? '#C6FF3D';
    var zoneById = {};
    BF.zones.forEach(function (z) { zoneById[z.id] = z; });

    var zonesMap = BF.zones.map(function (z) {
      var sel = st.zone === z.id;
      return Object.assign({}, z, {
        selected: sel,
        shadow: sel ? '0 0 0 4px #FFFFFF, 0 0 0 7px #0E0B1F' : '4px 4px 0 rgba(14,11,31,0.85)',
        pick: function () { self.setState({ zone: z.id }); }
      });
    });
    var zone = zoneById[st.zone];
    var zoneStands = BF.stands.filter(function (s) { return s.zone === st.zone; });

    var ns = BF.stands.length, ringStep = 360 / ns;
    var sIdx = ((st.ringPos % ns) + ns) % ns;
    var standX = function (sd) {
      var z = zoneById[sd.zone];
      return Object.assign({}, sd, { color: z.color, fg: z.fg, zoneName: z.name, phrase: z.desc,
        img: 'assets/' + sd.img, detail: 'assets/' + (sd.board || sd.img),
        hasSize: !!sd.size, sizeLabel: sd.size ? 'Planta ' + sd.size : 'Ver ficha' });
    };
    var standCards = BF.stands.map(function (sd, i) {
      var x = standX(sd);
      var rel = ((i - st.ringPos) % ns + ns) % ns; if (rel > ns / 2) { rel -= ns; }
      var dist = Math.abs(rel);
      x.ang = (i * ringStep).toFixed(2);
      x.op = dist === 0 ? 1 : (dist === 1 ? 0.92 : (dist === 2 ? 0.7 : 0.4));
      x.filter = dist === 0 ? 'none' : 'saturate(0.65) brightness(0.97)';
      x.pick = function () { if (self.ringDragged) { return; } self.goStand(i); };
      return x;
    });
    var stand = standX(BF.stands[sIdx]);
    var filters = BF.zones.map(function (f) {
      var on = BF.stands[sIdx].zone === f.id;
      return { label: f.name, active: on, dot: f.color, bg: on ? '#0E0B1F' : '#FFFFFF', fg: on ? '#FFF2F2' : '#0E0B1F',
        pick: function () { var k = BF.stands.findIndex(function (x) { return x.zone === f.id; }); if (k >= 0) { self.goStand(k); } } };
    });

    var np = BF.posters.length, pa = st.poster;
    var posters = BF.posters.map(function (p, i) {
      var off = ((i - pa + np + 2) % np) - 2;
      var abs = Math.abs(off);
      var tx = off * 330, sc = abs === 0 ? 1 : (abs === 1 ? 0.78 : 0.6), rot = off * 4;
      var op = abs === 0 ? 1 : (abs === 1 ? 0.95 : (abs === 2 ? 0.55 : 0));
      return {
        name: p.name, src: p.src, phrase: p.phrase,
        tf: 'translateX(' + tx + 'px) scale(' + sc + ') rotate(' + rot + 'deg)',
        op: op, z: 10 - abs,
        filter: abs === 0 ? 'none' : 'saturate(0.7)',
        pick: function () { self.setState({ poster: i }); }
      };
    });
    var posterDots = BF.posters.map(function (p, i) {
      var on = i === pa;
      return { name: p.name, active: on, w: on ? 36 : 12, bg: on ? '#0E0B1F' : 'rgba(14,11,31,0.25)', pick: function () { self.setState({ poster: i }); } };
    });

    var mi = st.merch, mp = BF.merch[mi], mz = zoneById[mp.zone];
    var dark = st.dark && mp.id === 'llavero';
    var hx = mz.color.replace('#', ''), rgb = [parseInt(hx.slice(0, 2), 16), parseInt(hx.slice(2, 4), 16), parseInt(hx.slice(4, 6), 16)];
    var product = Object.assign({}, mp, { color: mz.color, fg: mz.fg, zoneName: mz.name, priceLabel: this.money(mp.price),
      glow: dark ? 'rgba(25,211,230,0.28)' : 'rgba(' + rgb.join(',') + ',0.26)' });
    var merchThumbs = BF.merch.map(function (m, i) {
      var on = i === mi;
      return { name: m.name, active: on, img: 'assets/' + m.views[0], border: on ? (dark ? '#19D3E6' : '#0E0B1F') : 'transparent', shadow: on ? '4px 4px 0 ' + zoneById[m.zone].color : 'none',
        pick: function () { self.setState({ merch: i, dark: false }); } };
    });
    var mc = BF.merch.length;

    var totems = [
      { code: 'D', name: 'Palimpsesto', color: '#C6FF3D', fg: '#0E0B1F', h: 380, rows: [{ label: 'Información y entradas', rot: -90 }, { label: 'Zona instagrameable', rot: 0 }, { label: 'Ingreso', rot: 90 }] },
      { code: 'A', name: 'Resiliencia', color: '#7B3FE4', fg: '#FFFFFF', h: 420, rows: [{ label: 'Gastronomía', rot: 0 }, { label: 'Espacio infancias', rot: 180 }, { label: 'Baños', rot: -90 }] },
      { code: 'F', name: 'Estar en órbita', color: '#2440E6', fg: '#FFFFFF', h: 390, rows: [{ label: 'Escenario principal', rot: -90 }, { label: 'Charlas y streaming', rot: 180 }, { label: 'Salida', rot: 90 }] }
    ];

    var total = 0, tcount = 0, parts = [];
    var tickets = BF.tickets.map(function (t) {
      var q = st.qty[t.id] || 0;
      if (q > 0) { total += q * t.price; tcount += q; parts.push(q + ' × ' + t.day + ' ' + t.date); }
      return Object.assign({}, t, {
        qty: q, priceLabel: self.money(t.price),
        add: function () { self.setQty(t.id, q + 1); },
        dec: function () { self.setQty(t.id, q - 1); }
      });
    });

    return {
      accent: accent,
      showIntro: this.introOn(),
      progressPct: Math.round(Math.min(1, st.progress / 0.5) * 100),
      setCanvas: this.setCanvas, setLogoVideo: this.setLogoVideo, skipLogo: this.skipLogo,
      prints: this.printsData(), printRefs: this.printRefs,
      showLogo: this.props.logoIntro !== false && st.logoPhase !== 'done',
      logoOpacity: st.logoPhase === 'fade' ? 0 : 1,
      wordOpacity: (st.logoPhase === 'word' || st.logoPhase === 'fade') ? 1 : 0,
      wordY: (st.logoPhase === 'word' || st.logoPhase === 'fade') ? 0 : 24,
      onScratch: this.onScratch, onLift: this.onLift, skip: this.skip,
      navLinks: [
        { href: '#afiches', label: 'Conceptos', color: '#7B3FE4' },
        { href: '#entradas', label: 'Entradas', color: '#FF6A1A' },
        { href: '#mapa', label: 'Mapa', color: '#2440E6' },
        { href: '#stands', label: 'Stands', color: '#CF1477' },
        { href: '#merch', label: 'Merch', color: '#C6FF3D' }
      ],
      posters: posters, posterDots: posterDots, poster: BF.posters[pa],
      prevPoster: function () { self.setState({ poster: (pa - 1 + np) % np }); },
      nextPoster: function () { self.setState({ poster: (pa + 1) % np }); },
      pausePosters: this.pausePosters, resumePosters: this.resumePosters,
      zonesMap: zonesMap, zone: zone, zoneStands: zoneStands, pins: BF.pins,
      seeZoneStands: function () { var k = BF.stands.findIndex(function (x) { return x.zone === st.zone; }); if (k >= 0) { self.goStand(k); } self.goTo('stands'); },
      filters: filters, standCards: standCards, stand: stand,
      ringR: Math.round((340 + 44) / (2 * Math.tan(Math.PI / ns))), ringRot: (-st.ringPos * ringStep).toFixed(2),
      standPos: (sIdx + 1) + ' de ' + ns,
      prevStand: function () { self.setState({ ringPos: st.ringPos - 1 }); },
      nextStand: function () { self.setState({ ringPos: st.ringPos + 1 }); },
      seeOnMap: function () { self.setState({ zone: BF.stands[sIdx].zone }); self.goTo('mapa'); },
      ringDown: this.ringDown, ringUp: this.ringUp, pauseRing: this.pauseRing, resumeRing: this.resumeRing,
      product: product, faces: this.geom(mp.id, dark), rx0: mp.rx,
      setObj: this.setObj, m3Down: this.m3Down, m3Move: this.m3Move, m3Up: this.m3Up,
      merchThumbs: merchThumbs, isLlavero: mp.id === 'llavero', dark: dark,
      darkLabel: dark ? 'Prender la luz' : 'Apagar la luz',
      toggleDark: function () { self.setState({ dark: !st.dark }); },
      mBg: dark ? '#141320' : 'transparent', mInk: dark ? '#F4F1FF' : '#0E0B1F',
      mLine: dark ? 'rgba(25,211,230,0.45)' : 'rgba(14,11,31,0.3)', mShadow: dark ? 'rgba(25,211,230,0.35)' : 'rgba(14,11,31,0.22)',
      mAccentText: dark ? '#19D3E6' : '#CF1477', mBtnBg: dark ? '#19D3E6' : '#0E0B1F', mBtnFg: dark ? '#0E0B1F' : accent,
      pauseMerch: this.pauseMerch, resumeMerch: this.resumeMerch,
      prevMerch: function () { self.setState({ merch: (mi - 1 + mc) % mc, dark: false }); },
      nextMerch: function () { self.setState({ merch: (mi + 1) % mc, dark: false }); },
      pictos: BF.pictos, totems: totems,
      tickets: tickets, ticketCount: tcount, totalLabel: this.money(total),
      summaryLine: tcount === 0 ? 'Todavía no elegiste entradas.' : parts.join(' · '),
      noTickets: tcount === 0,
      buyBg: tcount === 0 ? '#9A94AE' : accent,
      bought: st.bought && tcount > 0,
      notBought: !(st.bought && tcount > 0),
      buy: function () { if (tcount > 0) { self.setState({ bought: true }); } },
      resetTickets: function () { self.setState({ qty: {}, bought: false }); }
    };
  }
}

/* ---------- arranque ---------- */
// Opciones: accent (color lima), intro (raspadita), logoIntro (video del logo)
var BF_PROPS = {"accent": "#C6FF3D", "intro": true, "logoIntro": true, "sendero": true};
document.addEventListener('DOMContentLoaded', function () {
  window.bioferia = BFRuntime.mount(Component, BF_PROPS, document.getElementById('bf-template'), document.getElementById('app'));
});
