import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

const INGREDIENTS = [
  'Pista', 'Mamra Badam', 'Cashew', 'Walnuts',
  'Pumpkin Seeds', 'Watermelon Seeds', 'Sunflower Seeds', 'Chia Seeds',
  'Flax Seeds', 'Quinoa', 'Muskmelon Seeds', 'Sesame Seeds'
]

const VARIETY_TYPES = [
  { name: 'Protein Laddu', price: 1800, weight: '800g' },
  { name: 'Nutrition Bar', price: 2000, weight: '800g' },
  { name: 'Protein Bite', price: 2000, weight: '800g' },
  { name: 'Protein Chocolate Bite', price: 2200, weight: '800g' },
  { name: 'Protein Mix', price: 1600, weight: '800g' },
]

const SIZES = [
  { size: '800g', price: 2000 },
  { size: '400g', price: 1000 },
  { size: '200g', price: 500 },
]

export default function CustomizeLaddu({ isOpen, onClose }) {
  const [step, setStep] = useState(1)
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [selectedVariety, setSelectedVariety] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleIngredientToggle = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient))
    } else if (selectedIngredients.length < 11) {
      setSelectedIngredients([...selectedIngredients, ingredient])
    } else {
      toast.error('Maximum 11 ingredients allowed')
    }
  }

  const canProceed = () => {
    if (step === 1) return selectedIngredients.length >= 3
    if (step === 2) return selectedVariety !== null
    if (step === 3) return selectedSize !== null
    return true
  }

  const getComboCount = () => selectedIngredients.length
  const getVarietyName = () => selectedVariety ? VARIETY_TYPES[selectedVariety].name : ''
  const getSizeName = () => selectedSize !== null ? SIZES[selectedSize].size : ''
  const getFinalPrice = () => {
    if (selectedVariety === null || selectedSize === null) return 0
    const varietyPrice = VARIETY_TYPES[selectedVariety].price
    const sizePrice = SIZES[selectedSize].price
    return sizePrice
  }

  const handleAddToCart = () => {
    const customProduct = {
      id: `custom-laddu-${Date.now()}`,
      name: `Custom ${getVarietyName()} - ${getComboCount()}-Combo`,
      price: getFinalPrice(),
      qty: quantity,
      image: 'https://via.placeholder.com/300x300?text=Custom+Laddu',
      customDetails: {
        ingredients: selectedIngredients,
        variety: getVarietyName(),
        size: getSizeName(),
      }
    }
    addToCart(customProduct)
    toast.success('Added to cart!')
    onClose()
    resetForm()
  }

  const resetForm = () => {
    setStep(1)
    setSelectedIngredients([])
    setSelectedVariety(null)
    setSelectedSize(null)
    setQuantity(1)
  }

  if (!isOpen) return null

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        style={{ background: '#fff', borderRadius: 20, maxWidth: 700, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '40px 32px' }}>

        {/* Header with close button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h1 style={{ fontFamily: '"Playfair Display",serif', fontSize: 28, fontWeight: 700, color: '#1A0000', margin: 0 }}>
            Krishna’s Special Laddu Maker
          </h1>
          <button onClick={() => { onClose(); resetForm(); }} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#999' }}>
            ✕
          </button>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
          {[1, 2, 3, 4].map((s) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: s <= step ? '#E85D04' : '#ddd', color: s <= step ? '#fff' : '#999',
                fontWeight: 700, fontSize: 16
              }}>
                {s}
              </div>
              {s < 4 && <div style={{ width: 30, height: 2, background: s < step ? '#E85D04' : '#ddd' }} />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 20, fontWeight: 700, color: '#1A0000', marginBottom: 8 }}>
                Step 1: Select Ingredients
              </h2>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, color: '#666', marginBottom: 4 }}>
                Choose 3 to 11 ingredients for your custom laddu
              </p>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 13, color: '#999', marginBottom: 24 }}>
                Selected: {selectedIngredients.length} / 11
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 32 }}>
                {INGREDIENTS.map((ing) => (
                  <label key={ing} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', border: '1.5px solid rgba(200,150,12,0.15)',
                    borderRadius: 12, cursor: 'pointer', background: selectedIngredients.includes(ing) ? 'rgba(200,150,12,0.05)' : '#fff',
                    transition: 'all 0.2s'
                  }}>
                    <input type="checkbox" checked={selectedIngredients.includes(ing)} onChange={() => handleIngredientToggle(ing)}
                      style={{ width: 18, height: 18, cursor: 'pointer' }} />
                    <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, color: '#333' }}>{ing}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 20, fontWeight: 700, color: '#1A0000', marginBottom: 8 }}>
                Step 2: Select Variety Type
              </h2>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, color: '#666', marginBottom: 24 }}>
                Choose one variety type for your custom laddu
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {VARIETY_TYPES.map((v, idx) => (
                  <label key={idx} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px',
                    border: selectedVariety === idx ? '2px solid #C8960C' : '1.5px solid rgba(200,150,12,0.15)',
                    borderRadius: 12, cursor: 'pointer', background: selectedVariety === idx ? 'rgba(200,150,12,0.04)' : '#fff',
                    transition: 'all 0.2s'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <input type="radio" checked={selectedVariety === idx} onChange={() => setSelectedVariety(idx)}
                        style={{ width: 18, height: 18, cursor: 'pointer' }} />
                      <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, color: '#333' }}>{v.name}</span>
                    </div>
                    <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 600, color: '#C8960C' }}>
                      Rs. {v.price / 400 > 100 ? (v.price / 400).toFixed(0) : v.price}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 20, fontWeight: 700, color: '#1A0000', marginBottom: 8 }}>
                Step 3: Select Size
              </h2>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, color: '#666', marginBottom: 24 }}>
                Choose the size for your custom laddu
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {SIZES.map((s, idx) => (
                  <label key={idx} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px',
                    border: selectedSize === idx ? '2px solid #C8960C' : '1.5px solid rgba(200,150,12,0.15)',
                    borderRadius: 12, cursor: 'pointer', background: selectedSize === idx ? 'rgba(200,150,12,0.04)' : '#fff',
                    transition: 'all 0.2s'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <input type="radio" checked={selectedSize === idx} onChange={() => setSelectedSize(idx)}
                        style={{ width: 18, height: 18, cursor: 'pointer' }} />
                      <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, color: '#333' }}>{s.size}</span>
                    </div>
                    <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 600, color: '#C8960C' }}>
                      Rs. {s.price}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 20, fontWeight: 700, color: '#1A0000', marginBottom: 16 }}>
                Summary
              </h2>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 13, color: '#999', marginBottom: 24 }}>
                Review your custom laddu details
              </p>

              {/* Selected Ingredients */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 13, fontWeight: 600, color: '#1A0000', marginBottom: 12 }}>
                  Selected Ingredients
                </h3>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {selectedIngredients.map((ing) => (
                    <span key={ing} style={{
                      padding: '6px 14px', background: 'rgba(200,150,12,0.1)', borderRadius: 20,
                      fontFamily: 'Poppins,sans-serif', fontSize: 12, color: '#555'
                    }}>
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid rgba(200,150,12,0.1)' }}>
                <div>
                  <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 12, color: '#999', marginBottom: 4 }}>
                    Total Ingredients (Combo Count)
                  </p>
                  <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 18, fontWeight: 700, color: '#1A0000' }}>
                    {getComboCount()}-Combo
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 12, color: '#999', marginBottom: 4 }}>
                    Variety Type
                  </p>
                  <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 18, fontWeight: 700, color: '#1A0000' }}>
                    {getVarietyName()}
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 12, color: '#999', marginBottom: 4 }}>
                    Size
                  </p>
                  <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 18, fontWeight: 700, color: '#1A0000' }}>
                    {getSizeName()}
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 12, color: '#999', marginBottom: 4 }}>
                    Final Price
                  </p>
                  <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 20, fontWeight: 700, color: '#E85D04' }}>
                    Rs. {getFinalPrice()}
                  </p>
                </div>
              </div>

              {/* Quantity selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 14, color: '#555' }}>Quantity</span>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{
                  width: 36, height: 36, border: '1.5px solid rgba(200,150,12,0.2)', borderRadius: 8,
                  background: '#fff', cursor: 'pointer', fontSize: 18, color: '#555'
                }}>
                  −
                </button>
                <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 16, fontWeight: 600, minWidth: 30, textAlign: 'center' }}>
                  {quantity}
                </span>
                <button onClick={() => setQuantity(quantity + 1)} style={{
                  width: 36, height: 36, border: '1.5px solid rgba(200,150,12,0.2)', borderRadius: 8,
                  background: '#fff', cursor: 'pointer', fontSize: 18, color: '#555'
                }}>
                  +
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 40, paddingTop: 24, borderTop: '1px solid rgba(200,150,12,0.1)' }}>
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} style={{
              padding: '12px 24px', border: '1.5px solid rgba(200,150,12,0.2)', borderRadius: 10,
              background: '#fff', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 600, color: '#333'
            }}>
              ← Back
            </button>
          )}
          {step < 4 ? (
            <button onClick={() => canProceed() && setStep(step + 1)} disabled={!canProceed()} style={{
              padding: '12px 32px', background: canProceed() ? '#E85D04' : '#ddd', color: '#fff',
              border: 'none', borderRadius: 10, cursor: canProceed() ? 'pointer' : 'not-allowed',
              fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 600
            }}>
              Next →
            </button>
          ) : (
            <>
              <button onClick={() => { onClose(); resetForm(); }} style={{
                padding: '12px 24px', border: '1.5px solid rgba(200,150,12,0.2)', borderRadius: 10,
                background: '#fff', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 600, color: '#333'
              }}>
                Close
              </button>
              <button onClick={handleAddToCart} style={{
                padding: '12px 32px', background: '#E85D04', color: '#fff',
                border: 'none', borderRadius: 10, cursor: 'pointer',
                fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 600
              }}>
                Add to Cart
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
