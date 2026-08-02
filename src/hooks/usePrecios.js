import { useEffect, useState } from 'react'
import { SHEET_URL } from '../data/config'

// Trae la planilla una sola vez y la deja cacheada en memoria: las dos secciones
// (luthier y tattoo) leen del mismo pedido en lugar de hacer un fetch cada una.
let promesaPlanilla = null

function traerPlanilla() {
  if (!promesaPlanilla) {
    promesaPlanilla = fetch(SHEET_URL)
      .then(r => r.json())
      .catch(() => []) // fallback silencioso: la lista queda vacía
  }
  return promesaPlanilla
}

/**
 * Devuelve las filas de la planilla cuyo campo `tipo` coincide con el pedido.
 * @param {'luthier'|'tattoo'} tipo
 * @returns {Array<{nombre:string, precio:string, tipo:string}>}
 */
export function usePrecios(tipo) {
  const [items, setItems] = useState([])

  useEffect(() => {
    let vigente = true
    traerPlanilla().then(filas => {
      if (!vigente || !Array.isArray(filas)) return
      setItems(filas.filter(f => f.tipo === tipo))
    })
    return () => { vigente = false }
  }, [tipo])

  return items
}
