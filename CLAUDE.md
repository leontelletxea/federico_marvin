# CLAUDE.md

Contexto del proyecto para Claude Code (y para cualquiera que retome el código).

## Qué es

Landing page de una sola página (one-pager) para **Federico Marvin**, que ejerce
dos oficios: **luthier** (construcción, reparación y calibración de guitarras y
bajos) y **tatuador** (más de 12 años de experiencia). El sitio es una vidriera
comercial: mostrar trabajos, publicar la lista de precios y derivar la consulta a
WhatsApp. No hay carrito, ni reservas, ni backend propio.

Idioma del sitio y del código: **español rioplatense** (voseo: "Hacé tu
consulta", "Comunicate por WhatsApp"). Los nombres de componentes, clases CSS,
variables y comentarios están en español — mantener esa convención al agregar
código.

## La idea de diseño (lo importante)

El concepto central es la **identidad dual**: "dos oficios, las mismas manos".
Cada oficio tiene su propia voz tipográfica y su propio color, y el sitio los
presenta como iguales en jerarquía:

| | Luthier | Tattoo |
|---|---|---|
| Tipografía | `Fraunces` (serif; madera, taller, artesanía) | `Bebas Neue` (cartel de estudio, flash art) |
| Color de acento | `--ambar` `#d19a52` (barniz / madera) | `--tinta` `#b8453e` (rojo tradicional de flash) |
| Alineación en el hero | izquierda | derecha |
| Fondo de sección | `--carbon` `#17151a` | `--negro` `#0d0c0f` |

`Inter` es la tipografía de apoyo para texto corrido. Las tres se cargan desde
Google Fonts en [index.html](index.html) (con `preconnect`).

Paleta completa (variables CSS en `:root`, en
[src/styles/estilos.css](src/styles/estilos.css)):

- `--negro #0d0c0f` — fondo base
- `--carbon #17151a` — fondo de la sección luthier
- `--hueso #ece6da` — texto principal
- `--hueso-suave rgba(236,230,218,.78)` — texto secundario
- `--ambar #d19a52` — acento luthier
- `--tinta #b8453e` — acento tattoo
- `--borde rgba(236,230,218,.12)` — bordes hairline
- `--radio 10px` — esquinas de las fotos del mosaico y de los mapas
- `--transicion-panel 1.25s cubic-bezier(.65,0,.15,1)` — timing del hero

Al tocar colores, respetar el pareo oficio↔color: mezclarlos rompe la lectura
del sitio.

## Stack

React 19 + Vite 8, sin router ni librerías de UI. Todo el CSS es un único archivo
global con clases planas (sin CSS Modules ni Tailwind).

```
npm install
npm run dev       # servidor de desarrollo (http://localhost:5173)
npm run build     # build de producción a dist/
npm run preview   # sirve dist/ localmente
```

`vite.config.js` usa `base: './'` para que el sitio funcione publicado en un
subdirectorio (GitHub Pages y similares).

### Variables de entorno

Los datos de contacto y el ID de la planilla viven en `.env` (plantilla en
`.env.example`). Solo las variables con prefijo `VITE_` llegan al navegador.

**El `.env` está versionado a propósito**: no contiene secretos —son el WhatsApp,
el Instagram, el mail y el ID de una planilla pública, todos visibles en el sitio
igual— y así el build funciona en cualquier host sin configurar nada. Si algún
día entra un valor sensible (una API key, un token), **no va acá**: Vite reemplaza
cada `import.meta.env.VITE_X` por su valor literal dentro del JS público, así que
cualquiera puede leerlo. Ese caso necesita un backend o una función serverless.

`config.js` lee cada variable de forma literal (`import.meta.env.VITE_X`) para que
el reemplazo estático funcione; si se asigna `import.meta.env` a una variable
intermedia, Vite inyecta el objeto entero y se pierde el tree-shaking. En `dev`
avisa por consola si falta alguna variable; ese chequeo no llega a producción.

## Estructura

```
index.html                      # shell de Vite: meta tags, fonts, <div id="root">
vite.config.js
.env                            # datos de contacto y SHEET_ID (versionado, sin secretos)
.env.example                    # plantilla de las variables
src/
  main.jsx                      # createRoot + import del CSS global
  App.jsx                       # orden de la página
  styles/estilos.css            # TODO el CSS del sitio (archivo único)
  data/config.js                # lee el .env y exporta los valores tipados
  hooks/usePlanilla.js          # fetch + cache por URL de una hoja
  hooks/usePrecios.js           # filtra la hoja de precios por tipo
  hooks/useInstrumentos.js      # hoja del Google Form + URL de foto de Drive
  components/
    Hero.jsx                    # header con los dos paneles expandibles
    SeccionTattoo.jsx           # mosaico + lista de precios tattoo
    SeccionLuthier.jsx          # mosaico + lista de precios luthier
    ListaPrecios.jsx            # <ul> de servicios (compartido por ambas secciones)
    InstrumentosVenta.jsx       # grilla de instrumentos en venta (solo luthería)
    Ubicaciones.jsx             # firma (foto + nombre) + mapas del estudio y del taller
    Footer.jsx                  # footer + crédito del autor
    BotonWhatsapp.jsx           # botón flotante fijo
  assets/img/                   # todas las fotos
```

Orden en pantalla (definido en [src/App.jsx](src/App.jsx)): hero → **tattoo** →
**luthier** → ubicaciones → footer. Notar que tattoo va primero en el scroll aunque
en el hero el panel luthier esté a la izquierda; los paneles son anclas
(`#luthier`, `#tattoo`) y el scroll es suave (`scroll-behavior:smooth`).

## Hero: los paneles expandibles

Es la pieza con más lógica del sitio. Dos `<a>` (`.panel--luthier` y
`.panel--tattoo`) ocupan la altura completa de la ventana (`100dvh`) y comparten
el ancho al 50/50.

**Desktop (con hover): resuelto 100% en CSS**, sin JS.

```css
.paneles:has(.panel:hover) .panel{flex:.12}   /* el que no se hoverea se comprime */
.paneles:has(.panel:hover) .panel:hover{flex:1}
```

Al expandirse, el panel: sube el brillo del fondo (`.78` → `.92`), quita el
`scale(1.06)` de la imagen, separa el marco interior (`inset` `1.1rem` →
`1.6rem`), lo tiñe con su color de acento, y revela `.panel-sub` y `.panel-cta`
con fade+slide escalonado. El panel comprimido oculta su contenido
(`opacity:0`).

**Mobile / táctil (sin hover): lo maneja React.** `Hero.jsx` guarda en estado
qué panel está `activo`. El **primer tap expande** el panel (con
`e.preventDefault()`, no navega); el **segundo tap sobre el mismo panel navega**
a su sección. La detección es `window.matchMedia('(hover: none)').matches`,
evaluada en cada click. El estado agrega la clase `activo` al panel y
`con-activo` al contenedor `.paneles`; las reglas correspondientes viven en el
CSS (en el original se inyectaban con JS en runtime).

En ≤820px los paneles se apilan en vertical y el panel comprimido usa `flex:.3`
en lugar de `.12` para seguir siendo visible.

## Precios: se editan desde una Google Sheet, no desde el código

Las dos listas de precios **no están hardcodeadas**. Se leen en runtime desde una
planilla de Google vía [opensheet](https://opensheet.elk.sh), que devuelve la
hoja como JSON sin API key.

- Endpoint: `https://opensheet.elk.sh/${SHEET_ID}/${NOMBRE_DE_LA_HOJA}`.
- **Las hojas se piden por nombre, no por índice.** opensheet acepta las dos
  formas, pero el índice se rompe al reordenar pestañas: cuando se agregó la
  hoja de instrumentos adelante, el índice `1` dejó de apuntar a los precios y
  las dos listas quedaron vacías. Si se **renombra** una pestaña en la planilla,
  hay que actualizar el nombre en `config.js`.
- La hoja de precios se llama `Lista de precios` y debe tener exactamente estas columnas
  (la primera fila son los encabezados y se convierten en las claves del JSON):

| tipo | nombre | precio |
|---|---|---|
| `tattoo` | Tatuaje chico en negro (hasta 9cm) | ARS 50.000 |
| `luthier` | Calibración guitarra electrica | ARS 60.000 |

`tipo` solo acepta `tattoo` o `luthier`; es lo que decide en qué sección aparece
la fila. El `precio` se muestra tal cual viene (string), sin formateo: si querés
cambiar la moneda o el formato, se cambia en la planilla.

Para actualizar precios: editar la planilla y recargar el sitio. **No hace falta
rebuild ni deploy.**

Implementación: [src/hooks/usePlanilla.js](src/hooks/usePlanilla.js) hace el fetch
y **cachea la promesa por URL** a nivel de módulo, así cada hoja se pide una sola
vez aunque la usen varios componentes (las dos listas de precios comparten el
mismo pedido). [usePrecios.js](src/hooks/usePrecios.js) solo filtra por `tipo`.

**Si la planilla no responde, las listas quedan vacías.** El comentario del HTML
original hablaba de "fallback al HTML hardcodeado", pero ese fallback nunca
existió: los `<ul>` estaban vacíos y se llenaban solo por JS. Si se quiere un
fallback real, hay que agregar un array de precios por defecto en
`usePrecios.js`. El error de red se traga en silencio a propósito: se prefiere
una sección sin lista antes que un mensaje de error en la cara del cliente.

## Instrumentos en venta

Debajo de la lista de precios de luthería. Las filas las carga el cliente desde
un **Google Form**, que escribe en la hoja `Instrumentos en venta` de la misma
planilla. Columnas (las nombró el form, con acentos y espacios — si se reescribe
una pregunta cambia la clave y hay que tocarla en
[useInstrumentos.js](src/hooks/useInstrumentos.js)):

| Marca temporal | Nombre del producto | Descripción | Precio | Foto | Vendido |
|---|---|---|---|---|---|
| 2/8/2026 3:18:03 | Ejemplo guitarra | Ejemplo de descripción | ARS 250.000 | `https://drive.google.com/open?id=…` | `TRUE` |

El orden de las columnas **no importa**: se leen por nombre. Cuando se agregó la
pregunta del precio, Google la insertó antes de `Foto` y corrió `Vendido` a la
derecha, sin que hubiera que tocar nada. El `Precio` se muestra tal cual se
escribe en el form, sin formatear, igual que en la lista de precios.

**`Vendido` no la genera el form**: es una columna agregada a mano, con casillas
de verificación aplicadas al rango `E2:E100` (no a la columna entera: una casilla
sin tildar vale `FALSE`, o sea que la fila deja de estar vacía y la API
devolvería cientos de filas fantasma). El hook acepta `TRUE` y también `si`,
`sí`, `x`, `1` o `vendido` escritos a mano. Si la columna no existe, todo cuenta
como disponible.

Se muestran **del más nuevo al más viejo** (el form agrega al final, así que el
hook invierte el array) y **los vendidos van al final**. Las filas sin nombre se
descartan: una respuesta incompleta no rompe la grilla, y de paso se filtran las
filas que quedan ocupadas solo por una casilla sin tildar.

Un instrumento vendido se muestra igual, con la foto en gris y apagada, un sello
"Vendido" y sin el link de consulta. Es a propósito: para un luthier, lo vendido
es prueba de que el taller produce y vende. Si se quiere ocultar en vez de
mostrar, es filtrar por `vendido` en
[InstrumentosVenta.jsx](src/components/InstrumentosVenta.jsx).

Cada tarjeta cierra con "Consultar", que abre WhatsApp con el nombre del
instrumento ya escrito en el mensaje.

### Las fotos: el punto frágil

El form sube la imagen a Drive y en la celda deja un link *de página*
(`drive.google.com/open?id=…`), que no sirve como `src` de un `<img>`. El hook
extrae solo el **ID**; la URL la arma
[InstrumentosVenta.jsx](src/components/InstrumentosVenta.jsx), que es quien sabe
a qué tamaño se dibuja la foto y puede reintentar. Todo esto **exige que el
archivo esté compartido como "cualquiera con el enlace"**, y los que sube un form
no siempre lo están.

Las fotos fallaban de forma intermitente por tres causas, las tres resueltas:

**1. `referrerPolicy="no-referrer"` en el `<img>`, y no es opcional.** Drive tiene
protección anti-hotlinking: si el pedido llega con cabecera `Referer` responde
**429**; sin `Referer` devuelve la imagen. Comprobado y reproducible:

```
curl sin referer  → 200 image/jpeg
curl con referer  → 429 text/html
```

Por eso la foto se ve al abrir su link directo pero falla dentro de la página.
Si las fotos dejan de cargar, **antes de mirar permisos verificar que ese
atributo siga puesto**: es la causa más probable. Los permisos son la segunda
sospecha, no la primera.

**2. Reintento contra el otro host.** Drive corta pedidos por momentos aunque el
`Referer` esté bien. El componente `FotoInstrumento` maneja el `onError`: si
`drive.google.com/thumbnail` falla, reintenta con
`lh3.googleusercontent.com/d/<ID>`, que sirve el mismo archivo. Recién si también
falla cae al placeholder "Sin foto" (que es también lo que se muestra si la fila
no trae foto). Antes, un solo 429 dejaba la imagen rota hasta recargar la página.

**3. Tamaño.** Se pide `sz=w600`, no `w1200`: las tarjetas se dibujan a ~300px y
600 ya cubre pantallas retina. Medido sobre una foto real, **212 kB → 85 kB** por
imagen. Si algún día las tarjetas se agrandan, se sube `ANCHO_FOTO`.

El hueco de la foto lleva `aspect-ratio:4/5` y la imagen va absoluta adentro: la
altura la manda el contenedor y no la imagen, así todas las tarjetas miden lo
mismo y la grilla no salta a medida que van cargando. La imagen entra con un
fundido corto (clase `.cargada`, que agrega el `onLoad`).

## Ubicaciones

Encabeza la sección la **firma** (`.firma`): la foto circular de Federico con el
nombre y el rol al lado. Es el único elemento del sitio donde los dos acentos se
tocan — el aro de la foto es un degradado `--ambar` → `--tinta` — y por eso hace
de nexo entre los dos espacios. Antes vivía en contacto; se unificó acá para no
repetir dos bloques de presentación seguidos. El nombre es el `<h2>` de la
sección (reusa `.titulo-serif` con el tamaño bajado).

Debajo, dos tarjetas, una por oficio. Las
direcciones viven en el array `UBICACIONES` de
[src/data/config.js](src/data/config.js) (`calle` + `ciudad`); el orden del array
es el orden en pantalla.

El mapa es un `<iframe>` de Google **sin API key**: se arma la URL como
`https://www.google.com/maps?q=<dirección>&z=16&output=embed`. La misma dirección
alimenta el link "Cómo llegar", que usa el formato oficial
`maps/search/?api=1&query=`. Para cambiar una dirección alcanza con editar el
array: mapa y link se recalculan solos.

**Los dos iframes se cargan solos, con `loading="lazy"`.** Se probó una previa
con botón "Ver mapa" para no pedirle nada a Google hasta el clic (un embed de
Maps es una aplicación entera: JS, tiles y varios pedidos), pero **se descartó a
propósito**: obligar a un clic para ver dónde queda el taller molesta más de lo
que ahorra. Los mapas se ven de entrada aunque tarden. No reintroducir esa previa
sin pedirlo.

El embed viene con el mapa en claro, así que se lo invierte por CSS
(`invert(.92) hue-rotate(180deg)` + desaturación) para que entre en la paleta
oscura. Es la única parte del sitio que depende de ese truco: si el resultado se
ve mal en algún navegador, se ajusta en `.ubicacion-mapa iframe`. Los dos iframes
llevan `loading="lazy"` — están al pie de la página y son pedidos a terceros.

## Imágenes

Están en [src/assets/img/](src/assets/img/) y se importan desde los componentes
(Vite las procesa y les pone hash). Las dos del hero son excepción: se usan como
`background-image` desde el CSS.

| Archivo | Uso |
|---|---|
| `img-luthier.jpg` | fondo del panel luthier (CSS) |
| `img-tattoo.jpg` | fondo del panel tattoo (CSS), `background-position:center 65%` |
| `tattoo-01.jpg` | mosaico tattoo, foto principal (columna alta) |
| `tattoo-02.jpg` | mosaico tattoo, `.mosaico-navaja` con `object-position:50% 32%` |
| `tattoo-03.jpg` | mosaico tattoo |
| `taller-01.jpg` | mosaico luthier, foto principal |
| `taller-02.jpg` | mosaico luthier |
| `taller-03.jpg` | mosaico luthier, `.mosaico-tocando` con `object-position:50% 12%` |
| `img-federico.jpg` | foto circular de la firma, en la sección ubicaciones |
| `taller-02x.jpg` | **sin usar** (ya estaba sin usar en el HTML original) |

Varias fotos llevan `object-position` a medida porque el encuadre importa (que no
se corte la cara, la navaja, etc.). Si se reemplaza una foto, revisar ese valor.

Las imágenes son pesadas (el hero suma ~800 kB). No están optimizadas ni hay
`loading="lazy"`: es una mejora pendiente evidente si aparece un problema de
performance.

### El mosaico

Grid de 2 columnas (`1.5fr 1fr`) × 2 filas. La primera foto (`.mosaico-principal`)
ocupa las dos filas de la columna ancha (`min-height:520px`); las otras dos van
apiladas a la derecha en 4:3. En ≤820px se convierte en una sola columna y la
principal pasa a 4:5.

## Contacto

**No hay sección de contacto**: se borró junto con sus links a Instagram y mail.
El único canal es el **botón flotante de WhatsApp** (`.wsp`, abajo a la derecha,
`z-index:100`), que usa `WHATSAPP` de
[src/data/config.js](src/data/config.js) y tiene una animación de pulso
(`@keyframes pulso`) en un pseudo-elemento. El texto de la sección ubicaciones
("Escribime por WhatsApp y coordinamos día y hora") apunta a ese botón.

Pendientes conocidos:

- `WHATSAPP` — `wa.me/5493416248302` (Rosario, +54 9 341) — parece el número real,
  conviene confirmarlo.
- El link "leontelletxea" del footer apunta al LinkedIn del autor y está
  hardcodeado en [Footer.jsx](src/components/Footer.jsx) (constante
  `LINKEDIN_AUTOR`), no en `config.js`: es el crédito del desarrollador, no un
  dato de contacto del cliente.

## Accesibilidad y detalles a respetar

- Los paneles del hero tienen `aria-label`; el `<svg>` del botón de WhatsApp es
  `aria-hidden` y el `<a>` lleva su propio `aria-label`.
- Todas las `<img>` tienen `alt` descriptivo en español. Mantenerlo al agregar
  fotos.
- Hay un bloque `@media (prefers-reduced-motion:reduce)` que **desactiva todas
  las animaciones y transiciones** del sitio. Si agregás animación, verificá que
  quede cubierta por esa regla (usa `*` con `!important`, así que en general sí).
- Los textos sobre foto llevan `text-shadow` fuerte para legibilidad. No quitarlo.
- El único breakpoint es **820px**. No hay más: no inventar breakpoints
  intermedios sin necesidad.

## Historia del proyecto

Nació como un `index.html` monolítico (~620 líneas: CSS en `<style>`, markup y
dos `<script>` inline) con las imágenes sueltas en la raíz. Se migró a React +
Vite conservando el markup, el CSS y el comportamiento tal cual. Dos diferencias
deliberadas respecto del original:

1. El CSS que el script inyectaba en runtime para el modo táctil ahora vive en el
   archivo de estilos.
2. En táctil, `.panel-sub` y `.panel-cta` del panel activo ahora se muestran
   también por encima de 820px (tablets). En el original quedaban invisibles ahí,
   porque solo el media query de mobile las revelaba.
