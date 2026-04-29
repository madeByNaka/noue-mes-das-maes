const BANNER_DESKTOP = 'https://cdn.shopify.com/s/files/1/0579/3546/2464/files/Banner_02_Desk_MAES26.png?v=1777402037'
const BANNER_MOBILE = 'https://cdn.shopify.com/s/files/1/0579/3546/2464/files/Banner_02_Mobile_MAES26.png?v=1777402037'

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
