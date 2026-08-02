import { SHEET_URL } from '../data/config'
import { usePlanilla } from './usePlanilla'

/**
 * Devuelve las filas de la hoja de precios cuyo campo `tipo` coincide con el
 * pedido. Columnas de la hoja: tipo | nombre | precio.
 * @param {'luthier'|'tattoo'} tipo
 * @returns {Array<{nombre:string, precio:string, tipo:string}>}
 */
export function usePrecios(tipo) {
  return usePlanilla(SHEET_URL).filter(fila => fila.Tipo === tipo)
}
