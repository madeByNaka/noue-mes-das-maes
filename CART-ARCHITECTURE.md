# Arquitetura do Carrinho – Nouê Cosméticos

## Visão Geral

O carrinho é gerenciado por um **Context Provider** que envolve toda a aplicação, expondo estado e ações através do hook `useCart()`.

---

## 1. Estrutura de um Item (`CartItem`)

```ts
interface CartItem {
  productId: string   // ID interno do produto
  name: string        // Nome exibível
  sku: string         // Identificador único (chave do carrinho)
  quantity: number    // Quantidade no carrinho
  price: number       // Preço em centavos (ex: 19700 = R$ 197,00)
  imageUrl: string    // URL da imagem para exibição no drawer
  checkoutLink: string // Link direto do produto (opcional/fallback)
  yampiToken: string  // Token Yampi para montagem da URL de checkout
}
```

---

## 2. Estado Global via Context API

**Arquivo:** `src/context/CartContext.tsx`

```
CartProvider
  └── CartContext.Provider
        ├── items: CartItem[]
        ├── totalItems: number   (derivado)
        ├── totalPrice: number   (derivado, em centavos)
        ├── isOpen: boolean      (controla o drawer)
        └── ações expostas via useCart()
```

### Hook de consumo

```tsx
const { items, totalItems, totalPrice, isOpen, addItem, removeItem,
        updateQuantity, clearCart, setCartOpen, goToCheckout } = useCart()
```

> Lança erro se chamado fora do `CartProvider`.

---

## 3. Persistência em `localStorage`

- **Chave:** `noue-cart`
- **Ao montar** o Provider: carrega o carrinho salvo (`loadCart`)
- Um `useEffect` observa `items` e salva automaticamente a cada mudança (`saveCart`)
- **Resultado:** o carrinho sobrevive a reloads e navegação sem back-end

---

## 4. Ações Disponíveis

| Ação | O que faz |
|---|---|
| `addItem(item, qty=1)` | Se SKU já existe → soma quantidade. Senão → adiciona novo item. Dispara Meta Pixel `AddToCart`. |
| `removeItem(sku)` | Remove o item pelo SKU |
| `updateQuantity(sku, qty)` | Atualiza qty; se ≤ 0 remove o item |
| `clearCart()` | Esvazia tudo |
| `setCartOpen(bool)` | Abre / fecha o drawer |
| `goToCheckout()` | Monta URL Yampi e redireciona |

### Proteção anti-duplo-clique

`addingRef` bloqueia chamadas em sequência durante **500ms** para evitar adições duplicadas acidentais:

```ts
if (addingRef.current) return
addingRef.current = true
setTimeout(() => { addingRef.current = false }, 500)
```

---

## 5. Totais Derivados

Calculados via `useMemo` — sem estado extra:

```ts
totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
```

---

## 6. UI — Drawer Lateral

**Arquivo:** `src/components/CartDrawer.tsx`

- Usa o componente `Sheet` (shadcn/Radix UI) — abre pela direita
- Layout fixo: **header** + **área rolável** (itens) + **footer fixo**
- Badge no ícone do Header mostra `totalItems` quando > 0
- Abre automaticamente após `addItem` via `setCartOpen(true)` no contexto

---

## 7. Checkout Yampi Multi-Produto

```ts
const baseUrl = 'https://seguro.noue.com.br/r/'

const productPath = items
  .map(item => `${item.yampiToken}:${item.quantity}`)
  .join(',')

window.location.href = appendUtmToUrl(baseUrl + productPath)
```

- Concatena todos os tokens Yampi com suas quantidades em **uma única URL**
- Passa por `appendUtmToUrl()` que injeta UTMs salvos no `localStorage` (chave `noue-utms`)
- **Resultado:** checkout único com todos os produtos + tracking preservado

---

## 8. Captura e Passagem de UTMs

**Arquivo:** `src/lib/utils.ts`

```ts
// Executado no main.tsx na inicialização da aplicação
captureUtms()
```

- Lê parâmetros `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` da URL
- Salva em `localStorage` sob a chave `noue-utms`
- `appendUtmToUrl(url)` injeta esses parâmetros em qualquer URL de destino

---

## 9. Meta Pixel (AddToCart)

Disparado dentro de `addItem`, antes de atualizar o estado:

```ts
fbq('track', 'AddToCart', {
  content_ids: [item.sku],
  content_name: item.name,
  content_type: 'product',
  value: (item.price * qty) / 100,
  currency: 'BRL',
})
```

Falha silenciosamente se o Pixel não estiver carregado.

---

## 10. Fluxo Completo de uma Adição

```
Usuário clica "Adicionar ao Carrinho"
  ↓
addItem({ productId, sku, yampiToken, ... })
  ↓
CartContext: verifica addingRef (anti-duplo-clique)
  ↓
Meta Pixel dispara AddToCart
  ↓
setItems → useEffect salva em localStorage
  ↓
setCartOpen(true) → Drawer abre
  ↓
Usuário clica "Finalizar Compra"
  ↓
URL Yampi montada com todos itens + UTMs → redirect
```

---

## 11. Estrutura de Arquivos

```
src/
├── context/
│   └── CartContext.tsx       # Provider, hook useCart, lógica completa
├── components/
│   ├── CartDrawer.tsx        # UI do drawer (Sheet + itens + checkout)
│   └── Header.tsx            # Ícone do carrinho com badge
└── lib/
    └── utils.ts              # captureUtms, appendUtmToUrl, formatPrice, calcDiscount
```

---

## 12. Como Adicionar um Produto à Página

```tsx
import { useCart } from '@/context/CartContext'

function MeuBotao() {
  const { addItem } = useCart()

  return (
    <button onClick={() => addItem({
      productId: 'kit-xyz',
      name: 'Kit XYZ',
      sku: 'NOUE-KIT-XYZ',
      price: 19700,           // R$ 197,00 em centavos
      imageUrl: '/images/kit-xyz.jpg',
      checkoutLink: '',
      yampiToken: 'TOKEN_YAMPI_AQUI',
    })}>
      Adicionar ao Carrinho
    </button>
  )
}
```
