// Substitua os placeholders pelos paths reais das imagens do banner quando disponíveis
const BANNER_DESKTOP = '/images/banner-mes-das-maes-desktop.jpg'
const BANNER_MOBILE = '/images/banner-mes-das-maes-mobile.jpg'

export function HeroBannerSection() {
  return (
    <section className="w-full">
      {/* Desktop */}
      <img
        src={BANNER_DESKTOP}
        alt="Nouê Cosméticos – Mês das Mães"
        className="hidden md:block w-full object-cover"
        draggable={false}
      />
      {/* Mobile */}
      <img
        src={BANNER_MOBILE}
        alt="Nouê Cosméticos – Mês das Mães"
        className="block md:hidden w-full object-cover"
        draggable={false}
      />
    </section>
  )
}
