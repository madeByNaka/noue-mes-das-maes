import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { appendUtmToUrl } from '@/lib/utils'

export interface CartItem {
  productId: string
  name: string
  sku: string
  quantity: number
  price: number        // in cents
  imageUrl: string
  checkoutLink: string
  yampiToken: string
}

interface CartContextValue {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void
  removeItem: (sku: string) => void
  updateQuantity: (sku: string, qty: number) => void
  clearCart: () => void
  setCartOpen: (open: boolean) => void
  goToCheckout: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'noue-cart'
const YAMPI_BASE_URL = 'https://seguro.noue.com.br/r/'
const ADD_DEBOUNCE_MS = 500

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // storage unavailable — fail silently
  }
}

function fireMetaPixelAddToCart(item: Omit<CartItem, 'quantity'>, qty: number) {
  try {
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq
    if (typeof fbq === 'function') {
      fbq('track', 'AddToCart', {
        content_ids: [item.sku],
        content_name: item.name,
        content_type: 'product',
        value: (item.price * qty) / 100,
        currency: 'BRL',
      })
    }
  } catch {
    // pixel not loaded — fail silently
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart)
  const [isOpen, setIsOpen] = useState(false)
  const addingRef = useRef(false)

  useEffect(() => {
    saveCart(items)
  }, [items])

  const addItem = useCallback((newItem: Omit<CartItem, 'quantity'>, qty = 1) => {
    if (addingRef.current) return
    addingRef.current = true
    setTimeout(() => { addingRef.current = false }, ADD_DEBOUNCE_MS)

    fireMetaPixelAddToCart(newItem, qty)

    setItems((prev) => {
      const existing = prev.find((i) => i.sku === newItem.sku)
      if (existing) {
        return prev.map((i) =>
          i.sku === newItem.sku ? { ...i, quantity: i.quantity + qty } : i,
        )
      }
      return [...prev, { ...newItem, quantity: qty }]
    })

    setIsOpen(true)
  }, [])

  const removeItem = useCallback((sku: string) => {
    setItems((prev) => prev.filter((i) => i.sku !== sku))
  }, [])

  const updateQuantity = useCallback((sku: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.sku !== sku))
    } else {
      setItems((prev) =>
        prev.map((i) => (i.sku === sku ? { ...i, quantity: qty } : i)),
      )
    }
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const setCartOpen = useCallback((open: boolean) => setIsOpen(open), [])

  const goToCheckout = useCallback(() => {
    if (items.length === 0) return
    const productPath = items
      .map((item) => `${item.yampiToken}:${item.quantity}`)
      .join(',')
    const url = appendUtmToUrl(YAMPI_BASE_URL + productPath)
    window.location.href = url
  }, [items])

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  )

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items],
  )

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalItems,
      totalPrice,
      isOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      setCartOpen,
      goToCheckout,
    }),
    [items, totalItems, totalPrice, isOpen, addItem, removeItem, updateQuantity, clearCart, setCartOpen, goToCheckout],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
