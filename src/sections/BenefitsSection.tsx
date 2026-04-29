const benefits = [
  'Todos os produtos são feitos para funcionar na sua pele',
  'Fórmulas veganas e sem ingredientes agressivos',
  'Resultados visíveis a partir da 1ª semana de uso',
  'Marca brasileira especializada em cuidados da pele',
]

export function BenefitsSection() {
  return (
    <section className="bg-white py-14 px-4">
      <div className="noue-container max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="section-title">Por que escolher a Nouê?</h2>
        </div>

        <ul className="space-y-4 mb-10">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3">
              <span className="text-noue-rose font-bold text-xl leading-tight flex-shrink-0">→</span>
              <p className="text-noue-charcoal text-base sm:text-lg leading-snug">{benefit}</p>
            </li>
          ))}
        </ul>

        <div className="text-center">
          <a href="#kits" className="btn-primary inline-flex">
            Aproveitar Promoção
          </a>
        </div>
      </div>
    </section>
  )
}
