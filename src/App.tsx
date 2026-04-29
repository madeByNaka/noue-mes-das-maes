import { CartProvider } from '@/context/CartContext'
import { CartDrawer } from '@/components/CartDrawer'
import MesDasMaes from '@/pages/MesDasMaes'

export default function App() {
  return (
    <CartProvider>
      <MesDasMaes />
      <CartDrawer />
    </CartProvider>
  )
}
