import React, { useState, useEffect } from 'react';
import { ShoppingBag, Calendar, MapPin, Shield, Menu as MenuIcon, X, Sparkles } from 'lucide-react';

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenAdmin,
  selectedLocation,
  setSelectedLocation,
  locations
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '14px 0' : '24px 0',
          background: scrolled ? 'rgba(8, 9, 20, 0.95)' : 'linear-gradient(to bottom, rgba(8,9,20,0.92), transparent)',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(192, 132, 252, 0.2)' : 'none',
          transition: 'all 0.4s ease'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* LOGO */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid var(--primary)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: '700',
                color: 'var(--primary)',
                fontSize: '22px',
                background: 'rgba(192, 132, 252, 0.12)',
                boxShadow: '0 0 15px rgba(192, 132, 252, 0.2)'
              }}
            >
              D
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: '600',
                  letterSpacing: '1.5px',
                  color: 'var(--white)',
                  display: 'block',
                  lineHeight: '1.1'
                }}
              >
                Dreams
              </span>
              <span
                style={{
                  fontSize: '9px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  display: 'block'
                }}
              >
                Kitchen & Bar
              </span>
            </div>
          </a>

          {/* DESKTOP NAV LINKS */}
          <div style={{ display: 'none', alignItems: 'center', gap: '32px' }} className="desktop-nav">
            <a href="#menu" style={{ fontSize: '12px', fontWeight: '500', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', transition: 'color 0.3s' }}>
              Menu
            </a>
            <a href="#signatures" style={{ fontSize: '12px', fontWeight: '500', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', transition: 'color 0.3s' }}>
              Signatures
            </a>
            <a href="#story" style={{ fontSize: '12px', fontWeight: '500', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', transition: 'color 0.3s' }}>
              Our Story
            </a>
            <a href="#gallery" style={{ fontSize: '12px', fontWeight: '500', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', transition: 'color 0.3s' }}>
              Ambiance
            </a>
            <a href="#locations" style={{ fontSize: '12px', fontWeight: '500', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', transition: 'color 0.3s' }}>
              Locations
            </a>
          </div>

          {/* ACTION CONTROLS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            
            {/* LOCATION SELECTOR */}
            <div style={{ display: 'none', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(192, 132, 252, 0.2)', padding: '6px 12px', borderRadius: '4px' }} className="desktop-nav">
              <MapPin size={14} color="var(--primary)" />
              <select
                value={selectedLocation ? selectedLocation.id : ''}
                onChange={(e) => {
                  const loc = locations.find(l => l.id === e.target.value);
                  if (loc) setSelectedLocation(loc);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--white)',
                  fontSize: '11px',
                  fontWeight: '500',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id} style={{ background: '#171c35', color: '#fff' }}>
                    {loc.name.split(' ')[0]} ({loc.address.split(',')[1]?.trim() || 'Hyd'})
                  </option>
                ))}
              </select>
            </div>

            {/* CART TRIGGER BUTTON */}
            <button
              onClick={onOpenCart}
              style={{
                position: 'relative',
                background: 'rgba(192, 132, 252, 0.12)',
                border: '1px solid rgba(192, 132, 252, 0.3)',
                padding: '10px 14px',
                borderRadius: '4px',
                color: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s'
              }}
              title="View Cart & Order"
            >
              <ShoppingBag size={18} />
              <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '1px', display: 'none' }} className="cart-text">Order</span>
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    background: 'var(--gold)',
                    color: 'var(--black)',
                    fontSize: '10px',
                    fontWeight: '700',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* TABLE RESERVATION BUTTON */}
            <button
              onClick={onOpenReservation}
              className="btn btn-primary"
              style={{ padding: '10px 20px', fontSize: '11px' }}
            >
              <Calendar size={14} />
              <span>Book Table</span>
            </button>

            {/* ADMIN DASHBOARD LINK */}
            <button
              onClick={onOpenAdmin}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '9px',
                borderRadius: '4px',
                color: 'rgba(255,255,255,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s'
              }}
              title="Admin Portal"
            >
              <Shield size={16} />
            </button>

            {/* MOBILE HAMBURGER BUTTON */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: 'var(--white)', padding: '6px' }}
              className="mobile-toggle"
            >
              {mobileOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(8, 9, 20, 0.98)',
            zIndex: 998,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <a
            href="#menu"
            onClick={() => setMobileOpen(false)}
            style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: 'var(--white)' }}
          >
            Menu & Dining
          </a>
          <a
            href="#signatures"
            onClick={() => setMobileOpen(false)}
            style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: 'var(--white)' }}
          >
            Signature Dishes
          </a>
          <a
            href="#story"
            onClick={() => setMobileOpen(false)}
            style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: 'var(--white)' }}
          >
            Our Story
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileOpen(false)}
            style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: 'var(--white)' }}
          >
            Ambiance
          </a>
          <a
            href="#locations"
            onClick={() => setMobileOpen(false)}
            style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: 'var(--white)' }}
          >
            Locations
          </a>

          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px', width: '80%', maxWidth: '280px' }}>
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenReservation();
              }}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              <Calendar size={14} /> Book a Table
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenCart();
              }}
              className="btn btn-gold-outline"
              style={{ width: '100%' }}
            >
              <ShoppingBag size={14} /> View Order ({cartCount})
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .cart-text { display: inline !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </>
  );
}
