// Adicione os logos das publicações/mídia que recomendam a Nouê
const mediaLogos: { src: string; alt: string }[] = [
  { src: '/images/logos/midia-1.png', alt: 'Mídia 1' },
  { src: '/images/logos/midia-2.png', alt: 'Mídia 2' },
  { src: '/images/logos/midia-3.png', alt: 'Mídia 3' },
  { src: '/images/logos/midia-4.png', alt: 'Mídia 4' },
  { src: '/images/logos/midia-5.png', alt: 'Mídia 5' },
]

export function AuthoritySection() {
  return (
    <section className="bg-white py-8 border-y border-noue-cream-dark">
      <div className="noue-container">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6 font-medium">
          Presente em
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {mediaLogos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="h-7 sm:h-9 object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
