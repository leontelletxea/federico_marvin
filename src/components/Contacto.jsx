import { WHATSAPP, INSTAGRAM, EMAIL } from '../data/config'
import federico from '../assets/img/img-federico.jpg'

export default function Contacto() {
  return (
    <section id="contacto" className="seccion contacto">
      <div className="contenedor">
        <div className="avatar">
          <img src={federico} alt="Federico Marvin en su taller" />
          <div className="avatar-nombre">Federico Marvin</div>
          <div className="avatar-rol">Luthier · Tattoo Artist</div>
        </div>
        <h2 className="titulo-serif">Hacé tu <em>consulta</em></h2>
        <p className="texto-suave">Comunicate por WhatsApp.</p>
        <div className="contacto-links">
          <a href={WHATSAPP} target="_blank" rel="noopener">WhatsApp</a>
          <a href={INSTAGRAM} target="_blank" rel="noopener">Instagram</a>
          <a href={EMAIL}>Email</a>
        </div>
      </div>
    </section>
  )
}
