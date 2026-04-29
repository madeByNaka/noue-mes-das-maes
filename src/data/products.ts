import type { CartItem } from '@/context/CartContext'

export interface Product extends Omit<CartItem, 'quantity'> {
  originalPrice: number  // in cents
  reviewCount: number
  rating: number
  badge?: string         // ex: "Mais Vendido", "Lançamento"
  description: string
  highlights: string[]
}

// TODO: preencher yampiToken, imageUrl, checkoutLink e preços reais de cada kit
export const PRODUCTS: Product[] = [
  {
    productId: 'kit-mes-das-maes-1',
    name: 'Kit Presente Mês das Mães – Hidratação & Brilho',
    sku: 'NOUE-KIT-MDM-01',
    price: 19700,          // R$ 197,00
    originalPrice: 39400,  // R$ 394,00 → 50% OFF
    imageUrl: '/images/produtos/kit-hidratacao-brilho.jpg',
    checkoutLink: '',
    yampiToken: 'YAMPI_TOKEN_KIT_MDM_01',
    badge: 'Mais Vendido',
    reviewCount: 1240,
    rating: 4.9,
    description: 'O kit perfeito para presentear a mãe com hidratação profunda e brilho intenso.',
    highlights: [
      'Hidratação por até 72h',
      'Textura leve, não oleosa',
      'Sem parabenos e sem sulfatos',
    ],
  },
  {
    productId: 'kit-mes-das-maes-2',
    name: 'Kit Presente Mês das Mães – Skin Care Completo',
    sku: 'NOUE-KIT-MDM-02',
    price: 24700,
    originalPrice: 49400,
    imageUrl: '/images/produtos/kit-skincare-completo.jpg',
    checkoutLink: '',
    yampiToken: 'YAMPI_TOKEN_KIT_MDM_02',
    badge: 'Novo',
    reviewCount: 876,
    rating: 4.8,
    description: 'Rotina completa de cuidados com a pele em um único kit presente.',
    highlights: [
      'Limpeza + Tônico + Sérum + Hidratante',
      'Embalagem presenteável',
      'Fórmula vegana',
    ],
  },
  {
    productId: 'kit-mes-das-maes-3',
    name: 'Kit Presente Mês das Mães – Anti-Idade Premium',
    sku: 'NOUE-KIT-MDM-03',
    price: 29700,
    originalPrice: 49500,
    imageUrl: '/images/produtos/kit-anti-idade.jpg',
    checkoutLink: '',
    yampiToken: 'YAMPI_TOKEN_KIT_MDM_03',
    badge: 'Premium',
    reviewCount: 2103,
    rating: 5.0,
    description: 'Tratamento anti-idade de alto desempenho com ativos clinicamente testados.',
    highlights: [
      'Reduz linhas em até 4 semanas',
      'Retinol + Vitamina C + Ácido Hialurônico',
      'Dermatologicamente testado',
    ],
  },
  {
    productId: 'kit-mes-das-maes-4',
    name: 'Kit Presente Mês das Mães – Cabelos & Beleza',
    sku: 'NOUE-KIT-MDM-04',
    price: 16700,
    originalPrice: 27800,
    imageUrl: '/images/produtos/kit-cabelos-beleza.jpg',
    checkoutLink: '',
    yampiToken: 'YAMPI_TOKEN_KIT_MDM_04',
    reviewCount: 654,
    rating: 4.7,
    description: 'Kit especial para cabelos saudáveis e brilhosos com toque de luxo.',
    highlights: [
      'Shampoo + Condicionador + Máscara',
      'Para todos os tipos de cabelo',
      'Perfume floral exclusivo',
    ],
  },
  {
    productId: 'kit-mes-das-maes-5',
    name: 'Kit Presente Mês das Mães – Essencial',
    sku: 'NOUE-KIT-MDM-05',
    price: 12700,
    originalPrice: 18900,
    imageUrl: '/images/produtos/kit-essencial.jpg',
    checkoutLink: '',
    yampiToken: 'YAMPI_TOKEN_KIT_MDM_05',
    reviewCount: 432,
    rating: 4.8,
    description: 'O essencial de cuidados Nouê em embalagem especial para o Mês das Mães.',
    highlights: [
      'Hidratante Corporal + Sérum Facial',
      'Embalagem presenteável com laço',
      'Entrega em todo Brasil',
    ],
  },
  {
    productId: 'kit-mes-das-maes-6',
    name: 'Kit Presente Mês das Mães – Corpo & Alma',
    sku: 'NOUE-KIT-MDM-06',
    price: 21700,
    originalPrice: 36100,
    imageUrl: '/images/produtos/kit-corpo-alma.jpg',
    checkoutLink: '',
    yampiToken: 'YAMPI_TOKEN_KIT_MDM_06',
    reviewCount: 789,
    rating: 4.9,
    description: 'Experiência sensorial completa com aromas florais e texturas premium.',
    highlights: [
      'Esfoliante + Manteiga Corporal + Colônia',
      'Experiência de spa em casa',
      'Caixa presente luxuosa',
    ],
  },
]
