import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/utils'

export function CartDrawer() {
  const { items, totalItems, totalPrice, isOpen, setCartOpen, removeItem, updateQuantity, goToCheckout } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex flex-col p-0 w-full sm:max-w-md">
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-noue-cream-dark">
          <SheetTitle className="flex items-center gap-2 font-serif text-noue-charcoal">
            <ShoppingBag className="w-5 h-5 text-noue-rose" />
            Meu Carrinho
            {totalItems > 0 && (
              <span className="ml-1 bg-noue-rose text-white text-xs font-bold rounded-full px-2 py-0.5">
                {totalItems}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center gap-3">
              <ShoppingBag className="w-12 h-12 text-noue-cream-dark" />
              <p className="text-muted-foreground text-sm">Seu carrinho está vazio</p>
              <button
                onClick={() => setCartOpen(false)}
                className="text-noue-rose underline text-sm font-medium"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.sku} className="flex gap-3">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0 bg-noue-cream"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-noue-charcoal leading-tight line-clamp-2">
                    {item.name}
                  </p>
                  <p className="text-noue-rose font-bold text-base mt-1">
                    {formatPrice(item.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-noue-cream-dark flex items-center justify-center hover:bg-noue-cream transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border border-noue-cream-dark flex items-center justify-center hover:bg-noue-cream transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeItem(item.sku)}
                      className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-noue-cream-dark px-6 py-5 space-y-4 bg-white">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Total</span>
              <span className="font-bold text-xl text-noue-charcoal">{formatPrice(totalPrice)}</span>
            </div>
            <Separator />
            <Button
              onClick={goToCheckout}
              className="w-full btn-primary h-12 text-base"
            >
              Finalizar Compra
            </Button>
            <button
              onClick={() => setCartOpen(false)}
              className="w-full text-center text-sm text-muted-foreground hover:text-noue-charcoal transition-colors"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
