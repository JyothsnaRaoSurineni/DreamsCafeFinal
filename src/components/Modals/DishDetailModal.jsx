import React, { useState } from 'react';
import { X, Flame, Plus, Minus, Star, Sparkles, ShoppingBag } from 'lucide-react';

export default function DishDetailModal({ dish, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!dish) return null;

  const handleAdd = () => {
    onAddToCart({ ...dish, quantity: qty });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', overflow: 'hidden' }}>
        
        {/* IMAGE BANNER WITH CLOSE BUTTON */}
        <div style={{ position: 'relative', height: '280px' }}>
          <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,28,28,1) 0%, transparent 60%)' }} />
          
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(13,13,13,0.7)',
              backdropFilter: 'blur(8px)',
              border: 'none',
              color: 'var(--white)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>

          <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                <span className={`badge-diet ${dish.diet === 'Veg' ? 'badge-veg' : 'badge-nonveg'}`}>
                  {dish.diet}
                </span>
                {dish.isChefSpecial && (
                  <span className="badge-diet badge-chef">
                    <Sparkles size={10} /> Royal Special
                  </span>
                )}
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: 'var(--white)', fontWeight: '500' }}>
                {dish.name}
              </h2>
            </div>

            <div style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: 'var(--gold)', fontWeight: '600' }}>
              ₹{dish.price}
            </div>
          </div>
        </div>

        {/* DETAILS BODY */}
        <div style={{ padding: '24px 28px' }}>
          <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'rgba(255,255,255,0.75)', marginBottom: '20px' }}>
            {dish.description}
          </p>

          <div style={{ background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.08)', padding: '16px', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--gray-light)' }}>Culinary Style:</span>
              <strong style={{ color: 'var(--gold)' }}>Contemporary Hyderabadi Fine Dining</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--gray-light)' }}>Spice Profile:</span>
              <span style={{ color: 'var(--white)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {Array.from({ length: dish.spicyLevel || 0 }).map((_, i) => (
                  <Flame key={i} size={12} color="#ef4444" fill="#ef4444" />
                ))}
                {dish.spicyLevel === 0 ? 'Mild & Fragrant' : `Level ${dish.spicyLevel} Heat`}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--gray-light)' }}>Preparation Method:</span>
              <span style={{ color: 'var(--white)' }}>Freshly slow-simmered over white wood ash</span>
            </div>
          </div>

          {/* QUANTITY AND ADD TO CART */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px 16px', borderRadius: '4px' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ color: 'var(--white)' }}>
                <Minus size={16} />
              </button>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: '600', color: 'var(--gold)', minWidth: '20px', textAlign: 'center' }}>
                {qty}
              </span>
              <button onClick={() => setQty(qty + 1)} style={{ color: 'var(--white)' }}>
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="btn btn-primary"
              style={{ flex: 1, padding: '14px', fontSize: '11px' }}
            >
              <ShoppingBag size={15} />
              <span>{added ? 'Added to Order!' : `Add to Order (₹${dish.price * qty})`}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
