# Bioferia — orbitemos consciente

Landing page interactiva de **Bioferia** · 09, 10 y 11 de abril de 2027 · Hipódromo de Palermo, Buenos Aires.

Sitio estático: HTML, CSS y JavaScript puro, **sin dependencias ni paso de compilación**. Se puede publicar tal cual en GitHub Pages, Netlify o cualquier hosting.

## Qué tiene

| Sección | Interacción |
|---|---|
| Raspadita | Se raspa la pantalla con el mouse (o el dedo); a la mitad se deshace en bloques. Botón "Entrar sin rascar". |
| Intro del logo | Video de la animación del logo y el tagline (`assets/video/logo-intro.mp4`). Botón "Saltar". |
| Portada | Datos del evento, tipografía en capas y formas con parallax al scrollear. |
| Conceptos | Carrusel de los 6 afiches (resiliencia, incomodidad, estar en órbita, quórum, bioluminiscencia, palimpsesto). |
| Entradas | Una entrada por día con su ticket, selector de cantidad y total. |
| Mapa | Por ahora se muestra como "En proceso" (el mapa por zonas queda detrás, desenfocado). |
| Stands | Anillo 3D con los 12 espacios (arranca en Palimpsesto / ingreso) y ficha de cada uno. |
| Merch | Objetos 3D reales (vaso, yerbero, shampoo, bee wrap, llavero) que se giran arrastrando. El llavero tiene "Apagar la luz". |
| Cianotipia | Fotogramas que se revelan (papel verde → luz → azul) cuando entran en pantalla. |

## Estructura

```
bioferia-landing/
├── index.html          ← página + plantilla (<template id="bf-template">)
├── css/
│   └── styles.css      ← estilos, animaciones y texturas
├── js/
│   ├── runtime.js      ← mini motor de plantillas (sin dependencias)
│   └── app.js          ← datos y lógica: raspadita, intro, carruseles, 3D, etc.
└── assets/
    ├── img/            ← logo y máscara de las hojas
    ├── afiches/        ← los 6 afiches
    ├── tickets/        ← tickets de cada día
    ├── stands/         ← renders de los espacios (+ fichas/ con las láminas completas)
    ├── merch/          ← mockups de los productos (miniaturas)
    └── texturas/       ← etiquetas desenrolladas para el merch 3D y la cianotipia
```

## Probarlo en tu computadora

Hace falta un servidor local (abriendo el archivo con doble clic, el navegador bloquea la lectura de la máscara del logo):

```bash
cd bioferia-landing
python3 -m http.server 8000
# abrir http://localhost:8000
```

o con Node: `npx serve .`

## Publicarlo en GitHub Pages

1. Crear un repositorio y subir el contenido de esta carpeta (con `index.html` en la raíz).
   ```bash
   git init
   git add .
   git commit -m "Landing Bioferia"
   git branch -M main
   git remote add origin https://github.com/USUARIO/bioferia-landing.git
   git push -u origin main
   ```
2. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. En un minuto queda online en `https://USUARIO.github.io/bioferia-landing/`.

## Cómo editar

- **Textos de la página:** en `index.html`, dentro de `<template id="bf-template">`.
- **Datos** (zonas, stands, afiches, entradas y precios, merch): en `js/app.js`, objeto `BF` al principio del archivo.
- **Colores y animaciones:** en `css/styles.css`.
- **Opciones:** al final de `js/app.js`, `BF_PROPS`:
  - `accent`: color de acento (lima `#C6FF3D`)
  - `intro`: `false` para saltear la raspadita
  - `logoIntro`: `false` para saltear el video del logo

### Sintaxis de la plantilla

`js/runtime.js` interpreta la plantilla:

- `{{ ruta.al.valor }}` en textos y atributos
- `<sc-if value="{{ condicion }}"> … </sc-if>`
- `<sc-for list="{{ lista }}" as="item"> … </sc-for>`
- `onClick="{{ funcion }}"` (también `onPointerDown`, `onPointerMove`, `onMouseEnter`, etc.)
- `ref="{{ funcion }}"` para recibir el elemento del DOM

Los valores salen de `renderVals()` en `js/app.js`.

## Pendientes

- Los **precios** de entradas y merch son de ejemplo.
- El botón **"Ir a la tienda"** apunta a `#tienda`: reemplazar por la URL real.
- La **compra de entradas** muestra una confirmación: falta conectar la pasarela de pago.
- **Mapa:** está en "En proceso". Para mostrarlo, en `index.html` quitar el bloque `role="status"` de la sección `#mapa` y el desenfoque (`filter`) del contenedor anterior.
- Las **texturas del merch 3D** se desenrollaron de los mockups. Con los archivos de arte plano de cada producto el resultado es más preciso: reemplazar los archivos de `assets/texturas/` con el mismo nombre.
- Algunos textos de stands (infancias, pymes, ONG, charlas, cuidado natural) son provisorios.
