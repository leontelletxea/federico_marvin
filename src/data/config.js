// Configuración editable del sitio: datos de contacto y origen de los precios.
// REEMPLAZAR: número real.
// Único canal de contacto del sitio (botón flotante). Instagram y email se
// quitaron junto con la sección de contacto.
export const WHATSAPP = 'https://wa.me/5493416248302'

// Ubicaciones. `mapaUrl` es el link a la ficha del negocio en Google Maps (con
// su pin exacto) y lo usa el botón "Cómo llegar". `cid` es el ID interno que
// Google le asigna a esa misma ficha (se obtiene del link largo al que
// redirige `mapaUrl`, en el segmento `!4c...:0x<cid en hex>`) y arma el mapa
// embebido — con la dirección sola, el embed muestra un pin genérico de la
// calle en vez de la ficha "Federico Marvin Luthier/Tattoo". El orden del
// array es el orden en pantalla.
export const UBICACIONES = [
  {
    tipo: 'luthier',
    etiqueta: 'Taller de luthería',
    calle: 'Mendoza 1765',
    ciudad: 'S2000BII Rosario, Santa Fe',
    mapaUrl: 'https://maps.app.goo.gl/LPzBL5aJbRza1NuG6',
    cid: '14855219056150540968',
  },
  {
    tipo: 'tattoo',
    etiqueta: 'Tattoo Studio',
    calle: 'Zeballos 3667',
    ciudad: 'S2000 Rosario, Santa Fe',
    mapaUrl: 'https://maps.app.goo.gl/6CrUiK5kn49b5Uts7',
    cid: '14400708714676849228',
  },
]

// Contenido dinámico desde Google Sheets (ver CLAUDE.md).
export const SHEET_ID = '1Lx8EWrry6guBKAaXOzCD9l_zt_7jlhxxoH3j4hYJLzE'

// Las hojas se piden POR NOMBRE, no por índice. opensheet acepta las dos formas,
// pero el índice se rompe al reordenar o agregar pestañas: cuando entró la hoja
// de instrumentos adelante, el índice 1 dejó de ser la de precios y las listas
// quedaron vacías. Con el nombre, el orden de las pestañas deja de importar.
// Si se renombra una pestaña en la planilla, hay que actualizarlo acá.
const hoja = nombre => `https://opensheet.elk.sh/${SHEET_ID}/${encodeURIComponent(nombre)}`

export const SHEET_URL = hoja('Lista de precios')
export const SHEET_URL_INSTRUMENTOS = hoja('Instrumentos en venta')
