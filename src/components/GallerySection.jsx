import React, { useState } from 'react';
import { Eye, X, Maximize2 } from 'lucide-react';

export default function GallerySection() {
  const [activeImage, setActiveImage] = useState(null);

  const galleryItems = [
    {
      id: 1,
      title: 'Jubilee Hills Courtyard Sanctuary',
      category: 'Outdoor Courtyard',
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&q=80'
    },
    {
      id: 2,
      title: 'Royal Chandelier Dining Suite',
      category: 'Grand Interior',
      url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1000&q=80'
    },
    {
      id: 3,
      title: 'Dreamscape Cocktail Bar Lounge',
      category: 'Bar & Lounge',
      url: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1000&q=80'
    },
    {
      id: 4,
      title: 'Skyline Terrace Rooftop Lounge',
      category: 'Rooftop Ambiance',
      url: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=1000&q=80'
    },
    {
      id: 5,
      title: 'Intimate Candlelit Dining Alcove',
      category: 'Private Booths',
      url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1000&q=80'
    },
    {
      id: 6,
      title: 'Live Acoustic & Sitar Lounge',
      category: 'Musical Atmosphere',
      url: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1000&q=80'
    }
  ];

  return (
    <section id="gallery" style={{ padding: '130px 0', background: 'var(--cream)' }}>
      <div className="container">
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Atmosphere & Aesthetics</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: '500',
              color: 'var(--dark)'
            }}
          >
            The Dreams Sanctuary
          </h2>
        </div>

        {/* GALLERY GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px'
          }}
        >
          {galleryItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              style={{
                position: 'relative',
                height: '300px',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={e => {
                const img = e.currentTarget.querySelector('img');
                const overlay = e.currentTarget.querySelector('.overlay');
                if (img) img.style.transform = 'scale(1.06)';
                if (overlay) overlay.style.opacity = '1';
              }}
              onMouseLeave={e => {
                const img = e.currentTarget.querySelector('img');
                const overlay = e.currentTarget.querySelector('.overlay');
                if (img) img.style.transform = 'scale(1)';
                if (overlay) overlay.style.opacity = '0';
              }}
            >
              <img
                src={item.url}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s var(--ease-out)'
                }}
              />

              {/* OVERLAY ON HOVER */}
              <div
                className="overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(8, 9, 20, 0.75)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                  textAlign: 'center',
                  color: 'var(--white)'
                }}
              >
                <div style={{ width: '48px', height: '48px', border: '1px solid var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '12px' }}>
                  <Maximize2 size={20} />
                </div>
                <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)' }}>
                  {item.category}
                </span>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', marginTop: '4px' }}>
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {activeImage && (
        <div
          className="modal-overlay"
          onClick={() => setActiveImage(null)}
          style={{ background: 'rgba(8, 9, 20, 0.96)' }}
        >
          <button
            onClick={() => setActiveImage(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '32px',
              color: 'var(--white)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <X size={32} />
          </button>

          <div
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '85vh', textAlign: 'center' }}
          >
            <img
              src={activeImage.url}
              alt={activeImage.title}
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '4px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
              }}
            />
            <div style={{ marginTop: '16px', color: 'var(--white)' }}>
              <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--primary)' }}>
                {activeImage.category}
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginTop: '4px' }}>
                {activeImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
