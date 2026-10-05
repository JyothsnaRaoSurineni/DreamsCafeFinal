import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, Shield, Globe } from 'lucide-react';

export default function Footer({ onOpenAdmin, onOpenReservation }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subMsg, setSubMsg] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setSubscribed(true);
      setSubMsg(data.message || '✓ You are now subscribed to Dreams Kitchen VIP Private Invitations!');
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    } catch (err) {
      console.error('Subscription error:', err);
    }
  };

  return (
    <footer style={{ background: 'var(--black)', color: 'var(--cream)', borderTop: '1px solid rgba(192, 132, 252, 0.2)', paddingTop: '90px', paddingBottom: '40px' }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '50px', marginBottom: '70px' }}>
          
          {/* BRAND COLUMN */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '38px', height: '38px', border: '1px solid var(--primary)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', color: 'var(--primary)', fontSize: '20px', background: 'rgba(192, 132, 252, 0.12)' }}>
                D
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: '600', color: 'var(--white)' }}>
                Dreams Kitchen
              </span>
            </div>

            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', marginBottom: '24px' }}>
              Contemporary fine dining celebrating royal heritage recipes, artisanal tandoor techniques, and high-end botanical mixology in Hyderabad.
            </p>

            <div style={{ display: 'flex', gap: '14px' }}>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{ width: '36px', height: '36px', border: '1px solid rgba(192, 132, 252, 0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}
                title="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                style={{ width: '36px', height: '36px', border: '1px solid rgba(192, 132, 252, 0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}
                title="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: 'var(--primary-light)', marginBottom: '20px', letterSpacing: '1px' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
              <li><a href="#menu" style={{ transition: 'color 0.3s' }}>Signature Menu</a></li>
              <li><a href="#signatures" style={{ transition: 'color 0.3s' }}>Chef Specials</a></li>
              <li><a href="#story" style={{ transition: 'color 0.3s' }}>Our Heritage</a></li>
              <li><a href="#gallery" style={{ transition: 'color 0.3s' }}>Ambiance Gallery</a></li>
              <li><a href="#locations" style={{ transition: 'color 0.3s' }}>Locations & Timings</a></li>
            </ul>
          </div>

          {/* HOURS & CONTACT */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: 'var(--primary-light)', marginBottom: '20px', letterSpacing: '1px' }}>
              Hours & Concierge
            </h4>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <strong style={{ color: 'var(--white)', display: 'block' }}>Lunch Service</strong>
                <span>12:00 PM – 03:30 PM</span>
              </div>
              <div>
                <strong style={{ color: 'var(--white)', display: 'block' }}>Dinner Service</strong>
                <span>07:00 PM – 12:30 AM</span>
              </div>
              <div style={{ marginTop: '8px' }}>
                <strong style={{ color: 'var(--gold)', display: 'block' }}>Table Booking Hotline:</strong>
                <span>+91 73737 34634</span>
              </div>
            </div>
          </div>

          {/* NEWSLETTER FORM FOR PRIVATE INVITATIONS */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: 'var(--primary-light)', marginBottom: '20px', letterSpacing: '1px' }}>
              Private Invitations
            </h4>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '16px', lineHeight: '1.6' }}>
              Subscribe to receive exclusive tasting menu launches, private chef table invitations, and special dining offers.
            </p>

            {subscribed ? (
              <div style={{ color: '#4ade80', fontSize: '13px', lineHeight: '1.5', background: 'rgba(74,222,128,0.1)', padding: '10px 14px', borderRadius: '4px', border: '1px solid rgba(74,222,128,0.3)' }}>
                {subMsg}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ position: 'relative' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="form-input"
                  style={{ paddingRight: '46px', fontSize: '12px' }}
                />
                <button
                  type="submit"
                  title="Subscribe to Private Invitations"
                  style={{
                    position: 'absolute',
                    right: '6px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'var(--primary)',
                    color: 'var(--black)',
                    padding: '8px',
                    borderRadius: '2px'
                  }}
                >
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>
          <div>
            © {new Date().getFullYear()} Dreams Kitchen. All Rights Reserved. Fine Dining Experience.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button
              onClick={onOpenAdmin}
              style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}
            >
              <Shield size={12} /> Staff & Admin Portal (View Subscriptions)
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
