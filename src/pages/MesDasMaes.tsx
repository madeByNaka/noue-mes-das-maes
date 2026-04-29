import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CountdownSection } from '@/sections/CountdownSection'
import { HeroBannerSection } from '@/sections/HeroBannerSection'
import { AuthoritySection } from '@/sections/AuthoritySection'
import { ProductsSection } from '@/sections/ProductsSection'
import { SocialProofSection } from '@/sections/SocialProofSection'
import { ExpertSection } from '@/sections/ExpertSection'
import { BenefitsSection } from '@/sections/BenefitsSection'
import { GuaranteeSection } from '@/sections/GuaranteeSection'

export default function MesDasMaes() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. Countdown */}
      <CountdownSection />

      {/* 2. Header com carrinho */}
      <Header />

      <main className="flex-1">
        {/* 3. Hero banner */}
        <HeroBannerSection />

        {/* 4. Logos de autoridade / mídia */}
        <AuthoritySection />

        {/* 5. Kits / produtos (ancora: #kits) */}
        <div id="kits">
          <ProductsSection />
        </div>

        {/* 6. Prova social – depoimentos */}
        <SocialProofSection />

        {/* 7. Especialistas recomendam */}
        <ExpertSection />

        {/* 8. Benefícios da marca */}
        <BenefitsSection />

        {/* 9. Garantia 90 dias */}
        <GuaranteeSection />

        {/* 10. Segunda chamada para os kits (ancora repetida conforme referência) */}
        <div id="kits-bottom">
          <ProductsSection />
        </div>
      </main>

      <Footer />
    </div>
  )
}
