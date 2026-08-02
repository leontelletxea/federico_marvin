import { SHEET_URL_INSTRUMENTOS } from '../data/config'
import { usePlanilla } from './usePlanilla'

// Las columnas las nombró el Google Form, con acentos y espacios. Si se
// reescribe una pregunta del formulario, cambia la clave y hay que tocarla acá.
const NOMBRE = 'Nombre del producto'
const DESCRIPCION = 'Descripción'
const FOTO = 'Foto'
// Columna agregada a mano en la planilla (no la genera el form): una casilla de
// verificación. Si la columna todavía no existe, todo cuenta como disponible.
const VENDIDO = 'Vendido'

// La casilla de Sheets devuelve TRUE/FALSE, pero se aceptan también las formas
// que alguien podría escribir a mano en vez de tildar.
const MARCAS = ['true', 'si', 'sí', 'x', '1', 'vendido']
const esVendido = valor => MARCAS.includes(String(valor ?? '').trim().toLowerCase())

// El form guarda la imagen en Drive y en la celda deja un link de página
// (`drive.google.com/open?id=...`), que no sirve como src de un <img>.
// `thumbnail` devuelve el archivo como imagen. Requiere que el archivo esté
// compartido como "cualquiera con el enlace"; si no, la foto no carga.
function fotoDeDrive(valor) {
  if (!valor) return null
  // si el form permite varios archivos, la celda trae los links separados por coma
  const primero = String(valor).split(',')[0].trim()
  const id = primero.match(/[?&]id=([-\w]+)/) || primero.match(/\/d\/([-\w]+)/)
  return id ? `https://drive.google.com/thumbnail?id=${id[1]}&sz=w1200` : null
}

/**
 * Instrumentos en venta, del más nuevo al más viejo (el form agrega al final),
 * con los vendidos al final de todo.
 * Descarta las filas sin nombre: una respuesta incompleta no rompe la grilla,
 * y de paso filtra las filas que quedan "ocupadas" por una casilla sin tildar.
 * @returns {Array<{nombre:string, descripcion:string, foto:string|null, vendido:boolean}>}
 */
export function useInstrumentos() {
  return usePlanilla(SHEET_URL_INSTRUMENTOS)
    .filter(fila => fila[NOMBRE]?.trim())
    .map(fila => ({
      nombre: fila[NOMBRE].trim(),
      descripcion: (fila[DESCRIPCION] || '').trim(),
      foto: fotoDeDrive(fila[FOTO]),
      vendido: esVendido(fila[VENDIDO]),
    }))
    .reverse()
    // sort es estable, así que dentro de cada grupo se mantiene el orden por fecha
    .sort((a, b) => a.vendido - b.vendido)
}
