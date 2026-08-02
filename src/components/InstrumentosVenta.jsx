import { useState } from 'react'
import { useInstrumentos, urlFoto, urlFotoAlterna } from '../hooks/useInstrumentos'
import { WHATSAPP } from '../data/config'

// La hoja no tiene columna de precio, así que cada instrumento deriva la
// consulta a WhatsApp con el nombre ya escrito en el mensaje.
const consultar = nombre =>
  `${WHATSAPP}?text=${encodeURIComponent(`Hola Federico! Me interesa el ${nombre} que tenés en venta.`)}`

// Las tarjetas se dibujan a ~300px de ancho como máximo; 600 cubre pantallas
// retina sin traer una foto de 1200px que después se achica (y pesa el cuádruple).
const ANCHO_FOTO = 600

// Foto alojada en Drive. Drive corta pedidos por momentos, así que si el primer
// host falla se reintenta con el otro, que sirve el mismo archivo; recién si
// también falla se cae al placeholder. Sin esto, un solo 429 dejaba la tarjeta
// con la imagen rota hasta recargar la página.
function FotoInstrumento({ id, alt }) {
  const [intento, setIntento] = useState(0)
  const [cargada, setCargada] = useState(false)

  if (!id || intento > 1) {
    return <div className="instrumento-foto instrumento-sinfoto">Sin foto</div>
  }

  const src = intento === 0 ? urlFoto(id, ANCHO_FOTO) : urlFotoAlterna(id, ANCHO_FOTO)

  return (
    <img
      key={src}
      className={`instrumento-foto${cargada ? ' cargada' : ''}`}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      /* Drive responde 429 a los pedidos que llegan con cabecera Referer
         (protección anti-hotlinking) y devuelve la imagen a los que llegan sin
         ella. Sin este atributo las fotos fallan de forma intermitente. */
      referrerPolicy="no-referrer"
      onLoad={() => setCargada(true)}
      onError={() => setIntento(n => n + 1)}
    />
  )
}

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
              <FotoInstrumento id={inst.fotoId} alt={inst.nombre} />
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
