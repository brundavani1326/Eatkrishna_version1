import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

export default function WishlistPage() {
  const { wishlist } = useCart()
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#FFF5E1', paddingTop: 60 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px clamp(16px, 4vw, 20px) 64px' }}>
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontFamily: 'Poppins,sans-serif', fontSize: 14, marginBottom: 24 }}>
          <ArrowLeft size={16} /> Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
          <Heart size={28} color="#C8960C" fill="#C8960C" />
          <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: 36, fontWeight: 700, color: '#333' }}>
            My <span style={{ color: '#C8960C' }}>Wishlist</span>
          </h1>
          <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, color: '#aaa' }}>({wishlist.length} items)</span>
        </div>

        {wishlist.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', paddingTop: 80 }}>
            <Heart size={72} color="#ddd" style={{ margin: '0 auto 20px' }} />
            <p style={{ fontFamily: '"Playfair Display",serif', fontSize: 26, color: '#bbb', marginBottom: 8 }}>Your wishlist is empty</p>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, color: '#ccc', marginBottom: 28 }}>Save your favourite divine treats here</p>
            <button className="btn-primary" onClick={() => navigate('/products')}>Browse Products</button>
          </motion.div>
        ) : (
          <div className="products-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            <AnimatePresence>
              {wishlist.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
