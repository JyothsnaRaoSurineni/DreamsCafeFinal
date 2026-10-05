import React from 'react';

export default function Marquee() {
  const items = [
    "Dreams Kitchen & Bar Fine Dining",
    "★ 4.9 Rated Culinary Experience",
    "4 Iconic Locations in Hyderabad",
    "Courtyard Cabanas & Live Sitar",
    "Dreams Signature Dum Biryani",
    "Wood-Fired Tandoor & Charcoal",
    "24K Edible Gold Specials",
    "Dreamscape Botanical Cocktails"
  ];

  return (
    <section
      id="marquee"
      style={{
        background: 'linear-gradient(90deg, #9333ea 0%, #c084fc 50%, #f59e0b 100%)',
        padding: '14px 0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 20px rgba(0,0,0,0.6)'
      }}
    >
      <div style={{ display: 'inline-flex', animation: 'marqueeScroll 30s linear infinite' }}>
        {[...items, ...items, ...items].map((text, idx) => (
          <div
            key={idx}
            style={{
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#080914',
              padding: '0 36px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '36px'
            }}
          >
            <span>{text}</span>
            <span style={{ opacity: 0.4, fontSize: '14px' }}>◆</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
}
