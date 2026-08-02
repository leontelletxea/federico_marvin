import { UBICACIONES } from '../data/config'
import federico from '../assets/img/img-federico.jpg'

// Mapa embebido de Google sin API key: `output=embed` sobre una búsqueda por
// dirección. El link aparte abre la app / el sitio de Maps para el recorrido.
const srcMapa = consulta => `https://www.google.com/maps?q=${consulta}&z=16&output=embed`
const linkMapa = consulta => `https://www.google.com/maps/search/?api=1&query=${consulta}`

export default function Ubicaciones() {
  return (
    <section id="ubicaciones" className="seccion ubicaciones">
      <div className="contenedor">
        <div className="eyebrow">Ubicaciones</div>

        {/* La firma hace de encabezado de la sección: la foto y el nombre son
            el nexo entre los dos espacios. */}
        <div className="firma">
          <img className="firma-foto" src={federico} alt="Federico Marvin en su taller" />
          <div>
            <h2 className="titulo-serif firma-nombre">Federico Marvin</h2>
            <div className="firma-rol">Luthier · Tattoo Artist</div>
          </div>
        </div>

        <p className="texto-suave">Ambos espacios trabajan con turno. Escribime por WhatsApp y coordinamos día y horario.</p>

        <div className="ubicaciones-grid">
          {UBICACIONES.map(u => {
            const consulta = encodeURIComponent(`${u.calle}, ${u.ciudad}`)
            return (
              <article key={u.tipo} className={`ubicacion ubicacion--${u.tipo}`}>
                <div className="ubicacion-mapa">
                  <iframe
                    src={srcMapa(consulta)}
                    title={`Mapa de ${u.etiqueta}: ${u.calle}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="ubicacion-etiqueta">{u.etiqueta}</div>
                <h3 className="ubicacion-direccion">{u.calle}</h3>
                <p className="ubicacion-ciudad">{u.ciudad}</p>
                <a
                  className="ubicacion-cta"
                  href={linkMapa(consulta)}
                  target="_blank"
                  rel="noopener"
                >
                  Cómo llegar
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
