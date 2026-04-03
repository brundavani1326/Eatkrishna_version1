import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { items, removeFromCart, updateQty, total } = useCart()
  const navigate = useNavigate()
  const shipping = total >= 500 ? 0 : 49

  return (
    <div style={{ minHeight: '100vh', background: '#FFF5E1', paddingTop: 80 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 24px 64px' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontFamily: 'Poppins,sans-serif', fontSize: 14, marginBottom: 20 }}>
            <ArrowLeft size={15} /> Continue Shopping
          </button>
          <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: 'clamp(28px,5vw,40px)', fontWeight: 700, color: '#333', marginBottom: 32 }}>
            Shopping <span style={{ color: '#C8960C' }}>Cart</span>
          </h1>
        </motion.div>

        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', paddingTop: 80 }}>
            <ShoppingBag size={72} color="#ddd" style={{ margin: '0 auto 20px' }} />
            <p style={{ fontFamily: '"Playfair Display",serif', fontSize: 26, color: '#bbb', marginBottom: 8 }}>Your cart is empty</p>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, color: '#ccc', marginBottom: 28 }}>Add some divine sweets to get started!</p>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => navigate('/products')}
              style={{ padding: '13px 32px', background: '#C8960C', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontSize: 15, fontWeight: 600 }}>
              Browse Products
            </motion.button>
          </motion.div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32, alignItems: 'start' }}>
            <div>
              <AnimatePresence>
                {items.map(item => (
                  <motion.div key={item.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -30 }}
                    style={{ display: 'flex', gap: 16, alignItems: 'center', background: '#fff', borderRadius: 14, padding: '16px 18px', marginBottom: 14, border: '1px solid rgba(200,150,12,0.1)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                    <img src={item.image} alt={item.name} style={{ width: 72, height: 72, borderRadius: 10, objectFit: 'cover', flexShrink: 0, cursor: 'pointer' }} onClick={() => navigate(`/product/${item.id}`)} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: '"Playfair Display",serif', fontSize: 16, fontWeight: 600, color: '#333', marginBottom: 2, cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} onClick={() => navigate(`/product/${item.id}`)}>
                        {item.name}
                      </p>
                      <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 12, color: '#aaa', textTransform: 'capitalize', marginBottom: 6 }}>{item.category.replace('-',' ')}</p>
                      <p style={{ fontFamily: '"Playfair Display",serif', fontSize: 16, fontWeight: 700, color: '#C8960C' }}>₹{item.price}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button onClick={() => updateQty(item.id, item.qty-1)} style={{ width: 28, height: 28, borderRadius: 6, border: '1.5px solid #C8960C', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={12} color="#C8960C" /></button>
                      <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 15, fontWeight: 600, minWidth: 24, textAlign: 'center' }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty+1)} style={{ width: 28, height: 28, borderRadius: 6, border: '1.5px solid #C8960C', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={12} color="#C8960C" /></button>
                    </div>
                    <p style={{ fontFamily: '"Playfair Display",serif', fontSize: 17, fontWeight: 700, color: '#333', minWidth: 72, textAlign: 'right' }}>₹{(item.price*item.qty).toLocaleString()}</p>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, flexShrink: 0 }}><Trash2 size={16} color="#ddd" /></button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              style={{ background: '#fff', borderRadius: 16, padding: '24px', border: '1px solid rgba(200,150,12,0.15)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', position: 'sticky', top: 96 }}>
              <h2 style={{ fontFamily: '"Playfair Display",serif', fontSize: 20, fontWeight: 700, color: '#333', marginBottom: 20 }}>Order Summary</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                {items.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 13, color: '#666', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 8 }}>{item.name} x{item.qty}</span>
                    <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 13, color: '#333', fontWeight: 500, flexShrink: 0 }}>₹{(item.price*item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid rgba(200,150,12,0.12)', paddingTop: 14, marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 13, color: '#888' }}>Subtotal</span>
                  <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 13, color: '#333' }}>₹{total.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 13, color: '#888' }}>Shipping</span>
                  <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 13, color: shipping===0 ? '#2e7d32' : '#333' }}>{shipping===0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <span style={{ fontFamily: '"Playfair Display",serif', fontSize: 18, fontWeight: 700, color: '#333' }}>Total</span>
                <span style={{ fontFamily: '"Playfair Display",serif', fontSize: 22, fontWeight: 700, color: '#C8960C' }}>₹{(total+shipping).toLocaleString()}</span>
              </div>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => navigate('/checkout')}
                style={{ width: '100%', padding: '14px 0', background: '#C8960C', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontSize: 15, fontWeight: 600, marginBottom: 10, letterSpacing: '0.02em' }}>
                PROCEED TO CHECKOUT
              </motion.button>
              <button onClick={() => navigate('/products')} style={{ width: '100%', padding: '11px 0', background: 'none', border: '1.5px solid rgba(200,150,12,0.3)', borderRadius: 10, color: '#C8960C', fontFamily: 'Poppins,sans-serif', fontSize: 14, cursor: 'pointer' }}>
                Continue Shopping
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
