import ListaPrecios from './ListaPrecios'
import tattoo01 from '../assets/img/tattoo-01.jpg'
import tattoo02 from '../assets/img/tattoo-02.jpg'
import tattoo03 from '../assets/img/tattoo-03.jpg'
import tattoo04 from '../assets/img/tattoo-04.jpg'
import tattoo05 from '../assets/img/tattoo-05.jpg'
import tattoo06 from '../assets/img/tattoo-06.jpg'
import tattoo07 from '../assets/img/tattoo-07.jpg'
import tattoo08 from '../assets/img/tattoo-08.jpg'

export default function SeccionTattoo() {
  return (
    <section id="tattoo" className="seccion sec-tattoo">
      <div className="contenedor">
        <div className="eyebrow">Tattoo</div>
        <div className="tattoo-cabecera">
          <h2 className="titulo-bebas">Más de 12 años<br />de <span>experiencia</span>.</h2>
          <div className="tattoo-estilos">Tradicional · Blackwork · Ornamental</div>
        </div>

        <div className="mosaico">
          <img className="mosaico-item mosaico-principal" src={tattoo01} alt="Ornamental blackwork en antebrazo" />
          <img className="mosaico-item" src={tattoo03} alt="Gorila estilo tradicional" />
          <img className="mosaico-item mosaico-navaja" src={tattoo02} alt="Blackwork navaja mariposa" />
        </div>

        <div className="mosaico-secundario">
          <img className="mosaico-item mosaico-secundario-tercio" src={tattoo04} alt="Manga japonesa de máscara hannya en blanco y negro" />
          <img className="mosaico-item mosaico-secundario-tercio" src={tattoo05} alt="Máscaras oni con kanji en pantorrillas" />
          <img className="mosaico-item mosaico-secundario-tercio" src={tattoo08} alt="Bombita de luz con cerebro, blackwork" />
          <img className="mosaico-item mosaico-secundario-mitad" src={tattoo06} alt="Rosas tradicionales en antebrazo" />
          <img className="mosaico-item mosaico-secundario-mitad" src={tattoo07} alt="Tradicional americano de águila y serpiente" />
        </div>

        <div className="eyebrow">Lista de precios</div>
        <ListaPrecios tipo="tattoo" />
      </div>
    </section>
  )
}
