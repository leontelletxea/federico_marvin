const LINKEDIN_AUTOR = 'https://www.linkedin.com/in/leon-tellechea-99991a192/'

export default function Footer() {
  return (
    <footer>
      <div>© 2026 Federico Marvin — Luthier &amp; Tattoo Artist en Rosario, Santa Fe, Argentina</div>
      <div className="credito">
        Desarrollado por{' '}
        <a
          className="credito-link"
          href={LINKEDIN_AUTOR}
          target="_blank"
          rel="noopener"
          aria-label="LinkedIn de leontelletxea, desarrollador del sitio"
        >
          leontelletxea
        </a>
      </div>
    </footer>
  )
}
