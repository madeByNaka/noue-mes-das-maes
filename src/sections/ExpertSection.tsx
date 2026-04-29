interface Expert {
  name: string
  credential: string
  handle: string
  avatarSrc: string
  quote: string
}

// TODO: substituir pelos especialistas reais da Nouê
const experts: Expert[] = [
  {
    name: 'Dra. Ana Lima',
    credential: 'Dermatologista · CRM/SP 12345',
    handle: '@dra.analima_dermato',
    avatarSrc: '/images/especialistas/dra-ana-lima.jpg',
    quote:
      'Os produtos Nouê têm formulações que realmente entregam resultados. Indico para minhas pacientes que buscam cuidados de qualidade com ingredientes gentis e eficazes para a pele.',
  },
]

export function ExpertSection() {
  return (
    <section className="bg-noue-cream-dark py-16 px-4">
      <div className="noue-container max-w-3xl">
        <div className="text-center mb-10">
          <span className="inline-block bg-white text-noue-rose text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 shadow-sm">
            Aprovado por especialistas
          </span>
          <h2 className="section-title">Quem entende de pele recomenda</h2>
        </div>

        <div className="space-y-6">
          {experts.map((expert) => (
            <div
              key={expert.handle}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row gap-5 items-start"
            >
              <img
                src={expert.avatarSrc}
                alt={expert.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0 bg-noue-cream border-2 border-noue-rose-light"
              />
              <div>
                <p className="text-noue-charcoal text-base italic leading-relaxed">
                  &ldquo;{expert.quote}&rdquo;
                </p>
                <div className="mt-3">
                  <p className="font-semibold text-noue-charcoal text-sm">{expert.name}</p>
                  <p className="text-xs text-muted-foreground">{expert.credential}</p>
                  <p className="text-xs text-noue-rose font-medium">{expert.handle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#kits" className="btn-primary inline-flex">
            Aproveitar Promoção
          </a>
        </div>
      </div>
    </section>
  )
}
