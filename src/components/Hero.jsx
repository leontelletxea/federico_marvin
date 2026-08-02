import { useState } from 'react'

// Panel activo en dispositivos táctiles: 'luthier' | 'tattoo' | null.
// En desktop el efecto de expansión lo resuelve CSS con :has(:hover);
// en mobile no hay hover, así que el primer tap expande y el segundo navega.
export default function Hero() {
  const [activo, setActivo] = useState(null)

  const alTocar = (e, panel) => {
    const sinHover = window.matchMedia('(hover: none)').matches
    if (sinHover && activo !== panel) {
      e.preventDefault()
      setActivo(panel)
    }
  }

  const clasesPanel = panel =>
    `panel panel--${panel}${activo === panel ? ' activo' : ''}`

  return (
    <header className="hero">
      <div className="hero-nombre">
        <h1>Federico <span>Marvin</span></h1>
        <div className="amp">Luthier &nbsp;·&nbsp; Tattoo Artist</div>
      </div>

      <div className={`paneles${activo ? ' con-activo' : ''}`}>
        {/* PANEL LUTHIER */}
        <a
          className={clasesPanel('luthier')}
          href="#luthier"
          aria-label="Sección Luthier"
          onClick={e => alTocar(e, 'luthier')}
        >
          <div className="panel-fondo"></div>
          <div className="panel-borde"></div>
          <div className="panel-contenido">
            <div className="panel-etiqueta">Guitarras &amp; Bajos</div>
            <div className="panel-titulo">Luthier</div>
            <p className="panel-sub">Construcción, reparación y calibración. Cada instrumento tratado como una pieza única.</p>
            <span className="panel-cta">Ver el taller</span>
          </div>
        </a>

        {/* PANEL TATTOO */}
        <a
          className={clasesPanel('tattoo')}
          href="#tattoo"
          aria-label="Sección Tattoo"
          onClick={e => alTocar(e, 'tattoo')}
        >
          <div className="panel-fondo"></div>
          <div className="panel-borde"></div>
          <div className="panel-contenido">
            <div className="panel-etiqueta">Estudio &amp; Diseño</div>
            <div className="panel-titulo">Tattoo Artist</div>
            <p className="panel-sub">Diseños propios. estilos Blackwork, tradicional y ornamental.</p>
            <span className="panel-cta">Ver trabajos</span>
          </div>
        </a>
      </div>
    </header>
  )
}
