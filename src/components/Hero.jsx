import React from 'react';
import { Calendar, Utensils, Star, ArrowDown } from 'lucide-react';

export default function Hero({ onOpenReservation, onExploreMenu }) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '80px'
      }}
    >
      {/* BACKGROUND IMAGE WITH LUXURY GRADIENT OVERLAY */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&q=85&auto=format&fit=crop')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          transform: 'scale(1.03)',
          filter: 'brightness(0.7)'
        }}
      />
      
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(8,9,20,0.94) 0%, rgba(15,18,36,0.7) 50%, rgba(8,9,20,0.88) 100%)'
        }}
      />

      {/* HERO CONTENT */}
      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '120px 0 80px' }}>
        <div style={{ maxWidth: '820px' }}>
          
          {/* TAGLINE */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '28px'
            }}
          >
            <div style={{ width: '40px', height: '1px', background: 'var(--primary)' }} />
            <span
              style={{
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: 'var(--primary-light)'
              }}
            >
              Dreams Kitchen & Bar — Fine Dining Destination
            </span>
          </div>

          {/* MAIN HEADING */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(44px, 6.5vw, 90px)',
              fontWeight: '500',
              lineHeight: '1.05',
              color: 'var(--white)',
              marginBottom: '24px'
            }}
          >
            Where Culinary Dreams <br />
            <em style={{ fontStyle: 'italic', color: 'var(--primary-light)' }}>Become Reality.</em>
          </h1>

          {/* SUBTITLE */}
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(18px, 2.2vw, 24px)',
              fontWeight: '300',
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '580px',
              lineHeight: '1.6',
              marginBottom: '44px'
            }}
          >
            Immerse yourself in rare Nizami heritage recipes, artisanal wood-fired grills, and avant-garde Dreamscape mixology across 4 luxurious sanctuaries in Hyderabad.
          </p>

          {/* CTA ACTIONS */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={onOpenReservation} className="btn btn-primary">
              <Calendar size={15} />
              <span>Reserve a Table</span>
            </button>

            <a href="#menu" className="btn btn-outline">
              <Utensils size={15} />
              <span>View Signature Menu</span>
            </a>
          </div>
        </div>

        {/* FLOATING RATING BADGE */}
        <div
          style={{
            position: 'absolute',
            right: '32px',
            bottom: '80px',
            background: 'rgba(23, 28, 53, 0.8)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(192, 132, 252, 0.3)',
            padding: '24px 32px',
            borderRadius: '4px',
            textAlign: 'right',
            display: 'none'
          }}
          className="desktop-rating"
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '52px',
              fontWeight: '600',
              color: 'var(--gold)',
              lineHeight: '1'
            }}
          >
            4.9★
          </div>
          <div style={{ color: 'var(--gold)', fontSize: '12px', letterSpacing: '2px', margin: '6px 0' }}>
            ★★★★★
          </div>
          <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
            1,200+ Verified Reviews
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <a
        href="#marquee"
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(255,255,255,0.5)',
          transition: 'color 0.3s'
        }}
      >
        <span style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase' }}>Discover</span>
        <ArrowDown size={14} color="var(--primary)" />
      </a>

      <style>{`
        @media (min-width: 992px) {
          .desktop-rating { display: block !important; }
        }
      `}</style>
    </section>
  );
}
