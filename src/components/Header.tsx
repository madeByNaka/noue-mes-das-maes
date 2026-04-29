import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'

// TODO: substitua pelo caminho real do logo Nouê
const LOGO_SRC = '/images/logo-noue.svg'

export function Header() {
  const { totalItems, setCartOpen } = useCart()

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-noue-cream-dark shadow-sm">
      <div className="noue-container h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" aria-label="Nouê Cosméticos – página inicial">
          <img src={LOGO_SRC} alt="Nouê Cosméticos" className="h-8 sm:h-10 object-contain" />
        </a>

        {/* Cart button */}
        <button
          onClick={() => setCartOpen(true)}
          className="relative p-2 rounded-full hover:bg-noue-cream transition-colors"
          aria-label="Abrir carrinho"
        >
          <ShoppingBag className="w-6 h-6 text-noue-charcoal" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-noue-rose text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
