import { useInstrumentos } from '../hooks/useInstrumentos'
import { WHATSAPP } from '../data/config'

// La hoja no tiene columna de precio, así que cada instrumento deriva la
// consulta a WhatsApp con el nombre ya escrito en el mensaje.
const consultar = nombre =>
  `${WHATSAPP}?text=${encodeURIComponent(`Hola Federico! Me interesa el ${nombre} que tenés en venta.`)}`

// Incluye su propio encabezado: si no hay instrumentos cargados no se renderiza
// nada, en vez de dejar un título suelto sin grilla debajo.
export default function InstrumentosVenta() {
  const instrumentos = useInstrumentos()

  if (!instrumentos.length) return null

  return (
    <>
      <div className="eyebrow">Instrumentos en venta</div>
      <ul className="instrumentos">
        {instrumentos.map(inst => (
          <li
            className={`instrumento${inst.vendido ? ' instrumento--vendido' : ''}`}
            key={inst.nombre}
          >
            <div className="instrumento-media">
              {inst.foto ? (
                <img
                  className="instrumento-foto"
                  src={inst.foto}
                  alt={inst.nombre}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="instrumento-foto instrumento-sinfoto">Sin foto</div>
              )}
              {inst.vendido && <span className="instrumento-sello">Vendido</span>}
            </div>
            <h3 className="instrumento-nombre">{inst.nombre}</h3>
            {inst.precio && <div className="instrumento-precio">{inst.precio}</div>}
            {inst.descripcion && <p className="instrumento-desc">{inst.descripcion}</p>}
            {/* lo vendido no ofrece consulta: no hay nada que consultar */}
            {!inst.vendido && (
              <a
                className="instrumento-cta"
                href={consultar(inst.nombre)}
                target="_blank"
                rel="noopener"
              >
                Consultar
              </a>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
