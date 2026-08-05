import { UBICACIONES } from '../data/config'
import federico from '../assets/img/img-federico.jpg'

// Mapa embebido de Google sin API key: `output=embed` sobre el `cid` de la
// ficha del negocio (no sobre la dirección como texto, que muestra un pin
// genérico de la calle en vez del pin real "Federico Marvin Luthier/Tattoo").
// El botón "Cómo llegar" usa `mapaUrl`, el link corto a esa misma ficha.
const srcMapa = cid => `https://www.google.com/maps?cid=${cid}&z=16&output=embed`

// Íconos de redes en su color de marca (no en ámbar/tinta): acá se los
// reconoce por el color antes que por la forma.
const ICONOS_RED = {
  instagram: (
    <svg viewBox="0 0 448 512" aria-hidden="true">
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 320 512" aria-hidden="true">
      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
    </svg>
  ),
}

const NOMBRE_RED = { instagram: 'Instagram', facebook: 'Facebook' }

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
            return (
              <article key={u.tipo} className={`ubicacion ubicacion--${u.tipo}`}>
                <div className="ubicacion-mapa">
                  <iframe
                    src={srcMapa(u.cid)}
                    title={`Mapa de ${u.etiqueta}: ${u.calle}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="ubicacion-etiqueta">{u.etiqueta}</div>
                <h3 className="ubicacion-direccion">{u.calle}</h3>
                <p className="ubicacion-ciudad">{u.ciudad}</p>
                <div className="ubicacion-acciones">
                  <a
                    className="ubicacion-cta"
                    href={u.mapaUrl}
                    target="_blank"
                    rel="noopener"
                  >
                    Cómo llegar
                  </a>
                  <div className="ubicacion-social">
                    {u.redes.map(r => (
                      <a
                        key={r.tipo}
                        className={`ubicacion-social-link ubicacion-social-link--${r.tipo}`}
                        href={r.url}
                        target="_blank"
                        rel="noopener"
                        aria-label={`${NOMBRE_RED[r.tipo]} de ${u.etiqueta}`}
                      >
                        {ICONOS_RED[r.tipo]}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
