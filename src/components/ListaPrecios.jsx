import { usePrecios } from '../hooks/usePrecios'

// Lista de servicios y precios de una sección. Si la planilla no responde
// el array queda vacío y no se renderiza ningún ítem.
export default function ListaPrecios({ tipo }) {
  const items = usePrecios(tipo)

  return (
    <ul className="lista-servicios">
      {items.map(item => (
        <li key={`${item.nombre}-${item.precio}`}>
          <span className="nombre">{item.nombre}</span>
          <span className="precio">{item.precio}</span>
        </li>
      ))}
    </ul>
  )
}
