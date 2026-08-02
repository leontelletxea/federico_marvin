import Hero from './components/Hero'
import SeccionTattoo from './components/SeccionTattoo'
import SeccionLuthier from './components/SeccionLuthier'
import Contacto from './components/Contacto'
import PieDePagina from './components/PieDePagina'
import BotonWhatsapp from './components/BotonWhatsapp'

// Orden de la página: hero → tattoo → luthier → contacto.
// (Tattoo va primero aunque el hero liste luthier a la izquierda.)
export default function App() {
  return (
    <>
      <Hero />
      <SeccionTattoo />
      <SeccionLuthier />
      <Contacto />
      <PieDePagina />
      <BotonWhatsapp />
    </>
  )
}
