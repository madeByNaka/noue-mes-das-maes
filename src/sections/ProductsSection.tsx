import { ShoppingCart, Star } from 'lucide-react'
import { useState } from 'react'
import { PRODUCTS } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { calcDiscount, formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'w-3.5 h-3.5',
            star <= Math.round(rating) ? 'fill-noue-gold text-noue-gold' : 'text-gray-300',
          )}
        />
      ))}
    </div>
  )
}

function ProductCard({ product }: { product: (typeof PRODUCTS)[0] }) {
  const { addItem } = useCart()
  const [adding, setAdding] = useState(false)
  const discount = calcDiscount(product.originalPrice, product.price)

  function handleAdd() {
    if (adding) return
    setAdding(true)
    const { highlights: _h, description: _d, originalPrice: _o, reviewCount: _rc, rating: _rt, badge: _b, ...cartItem } = product
    addItem(cartItem)
    setTimeout(() => setAdding(false), 1200)
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col group border border-noue-cream-dark">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-noue-cream">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-noue-charcoal text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 tag-discount">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-serif text-noue-charcoal text-base leading-snug font-semibold line-clamp-2">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{product.description}</p>
        </div>

        {/* Highlights */}
        <ul className="space-y-1">
          {product.highlights.map((h) => (
            <li key={h} className="flex items-start gap-1.5 text-xs text-noue-charcoal-light">
              <span className="text-noue-gold font-bold mt-0.5">→</span>
              {h}
            </li>
          ))}
        </ul>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <StarRating rating={product.rating} />
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount.toLocaleString('pt-BR')})
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto">
          {product.originalPrice > product.price && (
            <p className="price-original">{formatPrice(product.originalPrice)}</p>
          )}
          <p className="price-current">{formatPrice(product.price)}</p>
          <p className="text-xs text-muted-foreground">ou 12x sem juros</p>
        </div>

        {/* CTA */}
        <button
          onClick={handleAdd}
          disabled={adding}
          className={cn(
            'btn-primary w-full flex items-center justify-center gap-2 py-3 text-sm',
            adding && 'bg-green-600 hover:bg-green-600 cursor-default',
          )}
        >
          {adding ? (
            '✓ Adicionado!'
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Adicionar ao Carrinho
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export function ProductsSection() {
  return (
    <section className="bg-noue-cream py-16 px-4">
      <div className="noue-container">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-noue-rose-light text-noue-rose text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Mês das Mães
          </span>
          <h2 className="section-title">Kits Presentes Especiais</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Presentes pensados com carinho para celebrar a mãe com o melhor em beleza e cuidados.
            <br />
            <strong className="text-noue-rose">Oferta exclusiva por tempo limitado.</strong>
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
