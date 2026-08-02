import { SHEET_URL_INSTRUMENTOS } from '../data/config'
import { usePlanilla } from './usePlanilla'

// Las columnas las nombró el Google Form, con acentos y espacios. Si se
// reescribe una pregunta del formulario, cambia la clave y hay que tocarla acá.
const NOMBRE = 'Nombre del producto'
const DESCRIPCION = 'Descripción'
const PRECIO = 'Precio'
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
// Se extrae solo el ID: la URL la arma el componente, que es el que sabe a qué
// tamaño se dibuja la foto y puede reintentar contra el otro host si una falla.
// Requiere que el archivo esté compartido como "cualquiera con el enlace".
function idDeDrive(valor) {
  if (!valor) return null
  // si el form permite varios archivos, la celda trae los links separados por coma
  const primero = String(valor).split(',')[0].trim()
  const id = primero.match(/[?&]id=([-\w]+)/) || primero.match(/\/d\/([-\w]+)/)
  return id ? id[1] : null
}

// Los dos endpoints que sirven el mismo archivo de Drive. Si el primero falla
// (Drive limita por momentos), el componente reintenta con el segundo.
export const urlFoto = (id, ancho) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${ancho}`
export const urlFotoAlterna = (id, ancho) =>
  `https://lh3.googleusercontent.com/d/${id}=w${ancho}`

/**
 * Instrumentos en venta, del más nuevo al más viejo (el form agrega al final),
 * con los vendidos al final de todo.
 * Descarta las filas sin nombre: una respuesta incompleta no rompe la grilla,
 * y de paso filtra las filas que quedan "ocupadas" por una casilla sin tildar.
 * El precio se muestra tal cual lo escribió el cliente en el form, sin formatear,
 * igual que en la lista de precios.
 * @returns {Array<{nombre:string, descripcion:string, precio:string, fotoId:string|null, vendido:boolean}>}
 */
export function useInstrumentos() {
  return usePlanilla(SHEET_URL_INSTRUMENTOS)
    .filter(fila => fila[NOMBRE]?.trim())
    .map(fila => ({
      nombre: fila[NOMBRE].trim(),
      descripcion: (fila[DESCRIPCION] || '').trim(),
      precio: (fila[PRECIO] || '').trim(),
      fotoId: idDeDrive(fila[FOTO]),
      vendido: esVendido(fila[VENDIDO]),
    }))
    .reverse()
    // sort es estable, así que dentro de cada grupo se mantiene el orden por fecha
    .sort((a, b) => a.vendido - b.vendido)
}
