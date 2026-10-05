import React from 'react';
import { Award, ShieldCheck, Flame, Users } from 'lucide-react';

export default function Story() {
  return (
    <section id="story" style={{ padding: '130px 0', background: 'var(--cream)', color: 'var(--dark)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '60px', alignItems: 'center' }} className="story-grid">
          
          {/* LEFT: COMPOSITE IMAGE GALLERY */}
          <div style={{ position: 'relative', minHeight: '440px' }}>
            {/* Main large image */}
            <img
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80"
              alt="Dreams Kitchen Atmosphere"
              style={{
                width: '80%',
                height: '420px',
                objectFit: 'cover',
                borderRadius: '4px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
              }}
            />
            {/* Accent floating image */}
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"
              alt="Chef crafting dish at Dreams Kitchen"
              style={{
                position: 'absolute',
                bottom: '-30px',
                right: '0',
                width: '55%',
                height: '260px',
                objectFit: 'cover',
                border: '6px solid var(--cream)',
                borderRadius: '4px',
                boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
              }}
            />
            {/* Badge */}
            <div
              style={{
                position: 'absolute',
                top: '40px',
                left: '-20px',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
                color: 'var(--white)',
                padding: '20px 24px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                borderRadius: '4px'
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '38px', fontWeight: '700', lineHeight: '1' }}>
                4.9★
              </div>
              <div style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px' }}>
                Michelin Grade Craft
              </div>
            </div>
          </div>

          {/* RIGHT: STORY CONTENT */}
          <div>
            <div className="section-label">Heritage & Craftsmanship</div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 3.8vw, 50px)',
                fontWeight: '500',
                lineHeight: '1.15',
                color: 'var(--dark)',
                marginBottom: '24px'
              }}
            >
              Where Royal Heritage Meets <em style={{ fontStyle: 'italic', color: 'var(--primary-dark)' }}>Culinary Dreams.</em>
            </h2>

            <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a4a4a', marginBottom: '20px' }}>
              Dreams Kitchen & Bar was born out of a passion to honor Hyderabad's opulent culinary legacy while creating an enchanting, elevated dining experience for every guest.
            </p>

            <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#4a4a4a', marginBottom: '32px' }}>
              Every broth is simmered for up to 18 hours in copper Handis over white wood ash. From our 24K gold-leaf infused Zafrani Paneer to our Dreamscape Mutton Biryani, every dish is crafted fresh to order with precision.
            </p>

            <div style={{ width: '60px', height: '3px', background: 'linear-gradient(to right, var(--primary), var(--gold))', marginBottom: '36px' }} />

            {/* KEY STATS GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: '600', color: 'var(--primary-dark)' }}>
                  4+
                </div>
                <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#777', marginTop: '4px' }}>
                  Iconic Locations
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: '600', color: 'var(--primary-dark)' }}>
                  120+
                </div>
                <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#777', marginTop: '4px' }}>
                  Signature Dishes
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: '600', color: 'var(--primary-dark)' }}>
                  50k+
                </div>
                <div style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#777', marginTop: '4px' }}>
                  Happy Guests
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .story-grid { grid-template-columns: 1fr 1fr !important; gap: 80px !important; }
        }
      `}</style>
    </section>
  );
}
