import ListaPrecios from './ListaPrecios'
import taller01 from '../assets/img/taller-01.jpg'
import taller02 from '../assets/img/taller-02.jpg'
import taller03 from '../assets/img/taller-03.jpg'

export default function SeccionLuthier() {
  return (
    <section id="luthier" className="seccion sec-luthier">
      <div className="contenedor">
        <div className="eyebrow">El taller</div>
        <div className="luthier-cabecera">
          <h2 className="titulo-serif">Guitarras y bajos<br />que <em>vuelven a sonar</em>.</h2>
          <div className="luthier-estilos">Eléctricas · Acústicas · Bajos</div>
        </div>

        <div className="mosaico mosaico-luthier">
          <img className="mosaico-item mosaico-principal" src={taller01} alt="Guitarras en el taller de Federico Marvin" />
          <img className="mosaico-item" src={taller02} alt="Guitarra custom NEWEN terminada" />
          <img className="mosaico-item mosaico-tocando" src={taller03} alt="Federico Marvin tocando una guitarra Flying V" />
        </div>

        <div className="eyebrow">Lista de precios</div>
        <ListaPrecios tipo="luthier" />
      </div>
    </section>
  )
}
