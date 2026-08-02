import { useEffect, useState } from 'react'

// Cada hoja se pide una sola vez y la promesa queda cacheada por URL: las dos
// listas de precios comparten el mismo pedido en lugar de disparar dos.
const promesas = new Map()

function traerHoja(url) {
  if (!promesas.has(url)) {
    promesas.set(
      url,
      fetch(url)
        .then(r => r.json())
        .catch(() => []) // fallback silencioso: la sección queda vacía
    )
  }
  return promesas.get(url)
}

/**
 * Devuelve las filas de una hoja de la planilla, o [] mientras carga o si falla.
 * @param {string} url endpoint de opensheet
 * @returns {Array<Object>}
 */
export function usePlanilla(url) {
  const [filas, setFilas] = useState([])

  useEffect(() => {
    let vigente = true
    traerHoja(url).then(datos => {
      if (vigente && Array.isArray(datos)) setFilas(datos)
    })
    return () => { vigente = false }
  }, [url])

  return filas
}
