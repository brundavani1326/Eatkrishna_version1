import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X, User, LogOut, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { signOut } from '../services/supabase'
import toast from 'react-hot-toast'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { count, setIsOpen, wishlist } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setMobileOpen(false), [location.pathname])

  const handleSignOut = async () => {
    await signOut()
    toast.success('Signed out!')
    navigate('/')
  }

  const isActive = path => location.pathname === path
  const navBg = scrolled ? '#FFF5E1' : 'rgba(255,245,225,0.14)'
  const navBorder = scrolled ? '1px solid rgba(200,150,12,0.15)' : '1px solid rgba(255,255,255,0.32)'
  const navTextColor = scrolled ? '#4A2D06' : '#fff'
  const navAccentColor = scrolled ? '#C8960C' : '#FDE68A'
  const navTextShadow = scrolled ? 'none' : '0 2px 10px rgba(0,0,0,0.45)'

  return (
    <>
      <motion.nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background: navBg,
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
          transition: 'all 0.4s ease',
          borderBottom: navBorder
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(12px, 4vw, 16px)', minHeight: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: 8, gap: 16 }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', flex: '1 1 0', minWidth: 0 }}>
            <motion.div whileHover={{ scale: 1.02 }} style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
              <span style={{ fontSize: 32, color: scrolled ? '#C8960C' : '#FDE68A' }}>🪈</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: '"Playfair Display",serif', fontWeight: 700, fontSize: 20, color: scrolled ? '#C8960C' : '#fff', lineHeight: 1, letterSpacing: '0.05em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textShadow: navTextShadow }}>
                  EAT KRISHNA
                </div>
                <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: 10, color: scrolled ? '#A07808' : 'rgba(255,255,255,0.9)', opacity: 0.9, letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: 2, textShadow: navTextShadow }}>
                  Handcrafted Devotion
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div style={{ gap: 40, alignItems: 'center' }} className="hidden md:flex">
            {[['Home', '/'], ['Products', '/products']].map(([label, path]) => (
              <Link key={path} to={path} style={{ textDecoration: 'none', position: 'relative', paddingBottom: 4, fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: isActive(path) ? 600 : 500, color: isActive(path) ? navAccentColor : navTextColor, textShadow: navTextShadow, transition: 'all 0.3s' }}>
                {label}
                {isActive(path) && <motion.div layoutId="nav-ul" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: '#C8960C', borderRadius: 1 }} />}
              </Link>
            ))}
          </div>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, flexWrap: 'nowrap' }}>
            {/* Wishlist */}
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/wishlist')}
              style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8, display: 'flex' }}>
              <Heart size={20} color={wishlist?.length ? '#C8960C' : navTextColor} fill={wishlist?.length ? '#C8960C' : 'none'} />
              {wishlist?.length > 0 && (
                <span style={{ position: 'absolute', top: 2, right: 2, background: '#C8960C', color: '#fff', fontSize: 9, fontWeight: 700, width: 14, height: 14, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{wishlist.length}</span>
              )}
            </motion.button>

            {/* Cart */}
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8, display: 'flex' }}>
              <ShoppingCart size={20} color={navTextColor} />
              {count > 0 && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                  style={{ position: 'absolute', top: 1, right: 1, background: '#C8960C', color: '#fff', fontSize: 10, fontWeight: 700, width: 17, height: 17, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins,sans-serif' }}>
                  {count}
                </motion.span>
              )}
            </motion.button>

            {/* Auth */}
            {!user && (
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/login')}
                style={{ padding: '10px 28px', borderRadius: 10, background: '#C8960C', color: '#1A0000', border: 'none', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: scrolled ? '0 8px 18px rgba(200,150,12,0.16)' : '0 8px 18px rgba(0,0,0,0.22)' }}
                className="hidden md:flex"
              >
                Login
              </motion.button>
            )}

            {/* Mobile toggle */}
            <motion.button whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}
              className="flex md:hidden"
            >
              {mobileOpen ? <X size={22} color={navTextColor} /> : <Menu size={22} color={navTextColor} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              style={{ background: '#FFF5E1', borderTop: '1px solid rgba(200,150,12,0.15)', overflow: 'hidden' }}>
              <div style={{ padding: '14px clamp(16px, 4vw, 20px) 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[['Home', '/'], ['Products', '/products'], ['Wishlist', '/wishlist']].map(([label, path]) => (
                  <Link key={path} to={path} style={{ textDecoration: 'none', color: '#555', fontFamily: 'Poppins,sans-serif', fontSize: 15, padding: '6px 0', borderBottom: '1px solid rgba(200,150,12,0.08)' }}>{label}</Link>
                ))}
                {user
                  ? <button onClick={handleSignOut} style={{ textAlign: 'left', background: 'none', border: 'none', color: '#e44', fontFamily: 'Poppins,sans-serif', fontSize: 15, cursor: 'pointer' }}>Sign Out</button>
                  : <Link to="/login" style={{ textDecoration: 'none', color: '#fff', background: '#C8960C', padding: '10px 16px', borderRadius: 8, fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 500, textAlign: 'center' }}>Login / Sign Up</Link>
                }
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
