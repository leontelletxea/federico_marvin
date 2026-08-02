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

// Precios dinámicos desde Google Sheets.
// Reemplazá SHEET_ID por el ID de tu planilla (ver CLAUDE.md).
export const SHEET_ID = '1Lx8EWrry6guBKAaXOzCD9l_zt_7jlhxxoH3j4hYJLzE'
export const SHEET_URL = `https://opensheet.elk.sh/${SHEET_ID}/1`
