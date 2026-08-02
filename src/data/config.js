// Configuración editable del sitio: datos de contacto y origen de los precios.
// REEMPLAZAR: número real.
// Único canal de contacto del sitio (botón flotante). Instagram y email se
// quitaron junto con la sección de contacto.
export const WHATSAPP = 'https://wa.me/5493416248302'

// Ubicaciones. La dirección se usa tal cual para el mapa embebido y para el
// link "Cómo llegar"; el orden del array es el orden en pantalla.
export const UBICACIONES = [
  {
    tipo: 'luthier',
    etiqueta: 'Taller de luthería',
    calle: 'Mendoza 1765',
    ciudad: 'S2000BII Rosario, Santa Fe',
  },
  {
    tipo: 'tattoo',
    etiqueta: 'Estudio de tatuajes',
    calle: 'Zeballos 3667',
    ciudad: 'S2000 Rosario, Santa Fe',
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
