import React from 'react';
import { Star, ChevronRight, Sparkles } from 'lucide-react';

export default function SignatureDishes({ menu, onSelectDish }) {
  const signatures = menu.filter(item => item.isChefSpecial).slice(0, 3);

  return (
    <section id="signatures" style={{ padding: '130px 0', background: 'var(--black)' }}>
      <div className="container">
        
        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '60px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="section-label">Chef's Masterpieces</div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                fontWeight: '500',
                color: 'var(--white)',
                lineHeight: '1.1'
              }}
            >
              Crown Jewels of <br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Our Nizami Kitchen.</em>
            </h2>
          </div>

          <a href="#menu" className="btn btn-gold-outline">
            <span>Explore Full Collection</span>
            <ChevronRight size={14} />
          </a>
        </div>

        {/* SIGNATURE DISHES CARDS GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {signatures.map((dish, idx) => (
            <div
              key={dish.id}
              onClick={() => onSelectDish(dish)}
              style={{
                position: 'relative',
                height: '480px',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 15px 35px rgba(0,0,0,0.6)'
              }}
              onMouseEnter={e => {
                const img = e.currentTarget.querySelector('.signature-img');
                const overlay = e.currentTarget.querySelector('.signature-desc');
                if (img) img.style.transform = 'scale(1.08)';
                if (overlay) {
                  overlay.style.maxHeight = '100px';
                  overlay.style.opacity = '1';
                }
              }}
              onMouseLeave={e => {
                const img = e.currentTarget.querySelector('.signature-img');
                const overlay = e.currentTarget.querySelector('.signature-desc');
                if (img) img.style.transform = 'scale(1)';
                if (overlay) {
                  overlay.style.maxHeight = '0';
                  overlay.style.opacity = '0';
                }
              }}
            >
              {/* IMAGE */}
              <img
                src={dish.image}
                alt={dish.name}
                className="signature-img"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.7s var(--ease-out)'
                }}
              />

              {/* OVERLAY GRADIENT */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.4) 60%, transparent 100%)'
                }}
              />

              {/* BADGE */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  background: 'rgba(201, 165, 103, 0.9)',
                  color: 'var(--black)',
                  padding: '6px 14px',
                  fontSize: '10px',
                  fontWeight: '700',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Sparkles size={12} />
                <span>Signature #0{idx + 1}</span>
              </div>

              {/* CONTENT AT BOTTOM */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '32px 28px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: '500', color: 'var(--white)' }}>
                    {dish.name}
                  </h3>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: '600', color: 'var(--gold)' }}>
                    ₹{dish.price}
                  </span>
                </div>

                <p
                  className="signature-desc"
                  style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: '1.6',
                    maxHeight: '0',
                    overflow: 'hidden',
                    opacity: 0,
                    transition: 'all 0.4s ease'
                  }}
                >
                  {dish.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gold)' }}>
                    Tap to explore recipe details & ingredients →
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
