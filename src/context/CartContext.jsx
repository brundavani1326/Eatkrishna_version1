import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ek_cart') || '[]') } catch { return [] }
  })
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ek_wish') || '[]') } catch { return [] }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => { localStorage.setItem('ek_cart', JSON.stringify(items)) }, [items])
  useEffect(() => { localStorage.setItem('ek_wish', JSON.stringify(wishlist)) }, [wishlist])

  const addToCart = (product, qty = 1) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) { toast.success('Quantity updated!'); return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i) }
      toast.success('Added to cart!', { icon: '✨' })
      return [...prev, { ...product, qty }]
    })
  }

  const removeFromCart = id => { setItems(prev => prev.filter(i => i.id !== id)); toast.success('Removed') }
  const updateQty = (id, qty) => { if (qty < 1) { removeFromCart(id); return }; setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i)) }
  const clearCart = () => setItems([])

  const toggleWishlist = product => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) { toast.success('Removed from wishlist', { icon: '💔' }); return prev.filter(i => i.id !== product.id) }
      toast.success('Added to wishlist!', { icon: '❤️' }); return [...prev, product]
    })
  }
  const isInWishlist = id => wishlist.some(i => i.id === id)

  const count = items.reduce((s, i) => s + i.qty, 0)
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, count, total, isOpen, setIsOpen, wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
