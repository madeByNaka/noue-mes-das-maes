const LOGO_SRC = '/images/logo-noue.svg'

export function Footer() {
  return (
    <footer className="bg-noue-charcoal text-white/70 py-10 px-4">
      <div className="noue-container flex flex-col items-center text-center gap-4">
        <img src={LOGO_SRC} alt="Nouê Cosméticos" className="h-8 object-contain brightness-0 invert opacity-70" />
        <div className="flex flex-wrap justify-center gap-4 text-xs uppercase tracking-wider">
          <a href="/politica-de-privacidade" className="hover:text-white transition-colors">Privacidade</a>
          <a href="/trocas-e-devolucoes" className="hover:text-white transition-colors">Trocas e Devoluções</a>
          <a href="/fale-conosco" className="hover:text-white transition-colors">Fale Conosco</a>
        </div>
        <p className="text-xs mt-2">
          © {new Date().getFullYear()} Nouê Cosméticos. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
