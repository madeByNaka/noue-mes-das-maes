// Substitua pelos caminhos reais das fotos de depoimentos/clientes
const testimonialImages: { src: string; alt: string }[] = [
  { src: '/images/depoimentos/depoimento-1.jpg', alt: 'Depoimento cliente 1' },
  { src: '/images/depoimentos/depoimento-2.jpg', alt: 'Depoimento cliente 2' },
  { src: '/images/depoimentos/depoimento-3.jpg', alt: 'Depoimento cliente 3' },
  { src: '/images/depoimentos/depoimento-4.jpg', alt: 'Depoimento cliente 4' },
]

const SOCIAL_PROOF_NUMBER = '+50 mil'

export function SocialProofSection() {
  return (
    <section className="bg-white py-14 px-4">
      <div className="noue-container">
        <div className="text-center mb-8">
          <h2 className="section-title">
            Aprovado por{' '}
            <span className="text-noue-rose">{SOCIAL_PROOF_NUMBER}</span>
            <br />
            mulheres que amam a Nouê
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Resultados reais de clientes reais
          </p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {testimonialImages.map((img) => (
            <div
              key={img.alt}
              className="aspect-square rounded-xl overflow-hidden bg-noue-cream shadow-sm"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div className="mt-10 grid grid-cols-3 gap-4 text-center">
          {[
            { value: '+50 mil', label: 'Clientes satisfeitas' },
            { value: '4.9★', label: 'Avaliação média' },
            { value: '97%', label: 'Recomendam para amigas' },
          ].map(({ value, label }) => (
            <div key={label} className="py-4">
              <p className="font-serif text-2xl sm:text-3xl font-bold text-noue-rose">{value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
