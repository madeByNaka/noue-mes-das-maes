// Substitua pelo caminho real da imagem de garantia / produto em contexto
const GUARANTEE_IMAGE = '/images/garantia-noue.jpg'

export function GuaranteeSection() {
  return (
    <section className="relative overflow-hidden bg-noue-charcoal py-16 px-4">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={GUARANTEE_IMAGE}
          alt=""
          className="w-full h-full object-cover opacity-20"
          aria-hidden
        />
      </div>

      <div className="relative noue-container max-w-2xl text-center text-white">
        {/* Badge */}
        <div className="inline-flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 border-noue-gold mb-6 mx-auto">
          <span className="font-serif font-bold text-2xl leading-none text-noue-gold">90</span>
          <span className="text-[10px] uppercase tracking-wider text-noue-gold">dias</span>
        </div>

        <h2 className="section-title text-white mb-4">Garantia Incondicional de 90 Dias</h2>

        <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-3">
          Teste por 90 dias completos. Pode usar até esvaziar a embalagem.
        </p>
        <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-2">
          Não gostou?{' '}
          <strong className="text-noue-gold">Devolvemos 100% do seu dinheiro.</strong>
        </p>
        <p className="text-white/60 text-sm">Sem formulário. Sem justificativa. Sem burocracia.</p>

        <p className="text-noue-gold text-sm font-medium mt-6 italic">
          80% das nossas clientes gostam tanto que recompram ♥
        </p>

        <div className="mt-8">
          <a href="#kits" className="btn-gold inline-flex">
            Aproveitar Promoção
          </a>
        </div>
      </div>
    </section>
  )
}
