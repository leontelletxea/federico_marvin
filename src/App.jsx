import Hero from './components/Hero'
import SeccionTattoo from './components/SeccionTattoo'
import SeccionLuthier from './components/SeccionLuthier'
import Ubicaciones from './components/Ubicaciones'
import Footer from './components/Footer'
import BotonWhatsapp from './components/BotonWhatsapp'

// Orden de la página: hero → tattoo → luthier → ubicaciones → footer.
// (Tattoo va primero aunque el hero liste luthier a la izquierda.)
// El contacto se resuelve con el botón flotante de WhatsApp.
export default function App() {
  return (
    <>
      <Hero />
      <SeccionTattoo />
      <SeccionLuthier />
      <Ubicaciones />
      <Footer />
      <BotonWhatsapp />
    </>
  )
}
