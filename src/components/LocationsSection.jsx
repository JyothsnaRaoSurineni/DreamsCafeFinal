import React from 'react';
import { MapPin, Phone, Clock, Calendar, CheckCircle2 } from 'lucide-react';

export default function LocationsSection({ locations, onSelectLocationForReservation }) {
  return (
    <section id="locations" style={{ padding: '130px 0', background: 'var(--black)' }}>
      <div className="container">
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 60px' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Hyderabad Destinations</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: '500',
              color: 'var(--white)',
              marginBottom: '16px'
            }}
          >
            Visit Our Sanctuaries
          </h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--gray-light)' }}>
            Each AnTeRa location offers a distinct ambiance, from open-air courtyards to rooftop city view lounges.
          </p>
        </div>

        {/* LOCATIONS GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}
        >
          {locations.map(loc => (
            <div
              key={loc.id}
              style={{
                background: 'var(--dark2)',
                border: '1px solid rgba(201, 165, 103, 0.2)',
                borderRadius: '4px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--gold)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(201, 165, 103, 0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(201, 165, 103, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* IMAGE */}
              <div style={{ position: 'relative', height: '220px' }}>
                <img
                  src={loc.image}
                  alt={loc.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,28,28,1) 0%, transparent 60%)' }} />
                
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'var(--gold)',
                    color: 'var(--black)',
                    padding: '4px 12px',
                    fontSize: '10px',
                    fontWeight: '700',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    borderRadius: '2px'
                  }}
                >
                  {loc.capacity}
                </span>
              </div>

              {/* DETAILS CONTENT */}
              <div style={{ padding: '24px', flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: '500', color: 'var(--white)', marginBottom: '12px' }}>
                    {loc.name}
                  </h3>

                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', marginBottom: '20px' }}>
                    {loc.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <MapPin size={16} color="var(--gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{loc.address}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Phone size={16} color="var(--gold)" style={{ flexShrink: 0 }} />
                      <a href={`tel:${loc.phone.replace(/\s+/g, '')}`} style={{ color: 'var(--gold)', fontWeight: '500' }}>
                        {loc.phone}
                      </a>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Clock size={16} color="var(--gold)" style={{ flexShrink: 0 }} />
                      <span>{loc.hours}</span>
                    </div>
                  </div>

                  {/* FEATURES TAGS */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
                    {loc.features.map((feat, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '10px',
                          color: 'var(--gold-light)',
                          background: 'rgba(201, 165, 103, 0.08)',
                          border: '1px solid rgba(201, 165, 103, 0.2)',
                          padding: '3px 8px',
                          borderRadius: '2px'
                        }}
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => onSelectLocationForReservation(loc)}
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '10px' }}
                >
                  <Calendar size={14} />
                  <span>Reserve at {loc.name.split(' ')[0]}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
