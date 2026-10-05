import React, { useState } from 'react';
import { X, Calendar, Clock, Users, MapPin, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ReservationModal({ isOpen, onClose, locations, selectedLocation, onSubmitReservation }) {
  const [locId, setLocId] = useState(selectedLocation?.id || locations[0]?.id || 'loc-1');
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('2026-10-06');
  const [time, setTime] = useState('20:00');
  const [seating, setSeating] = useState('Courtyard Cabana');
  const [occasion, setOccasion] = useState('Casual Fine Dining');
  const [specialRequests, setSpecialRequests] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  if (!isOpen) return null;

  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    const digitsOnly = raw.replace(/[^0-9]/g, '').slice(0, 10);
    setPhone(digitsOnly);
    if (digitsOnly.length > 0 && digitsOnly.length < 10) {
      setErrorMsg('Phone number must be exactly 10 digits.');
    } else {
      setErrorMsg('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMsg('Invalid phone number! Please enter exactly 10 digits.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const res = await onSubmitReservation({
        locationId: locId,
        guestName,
        email,
        phone: cleanPhone,
        guests: Number(guests),
        date,
        time,
        seating,
        occasion,
        specialRequests
      });
      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setConfirmation(res);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to create reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = [
    '12:30', '13:00', '13:30', '14:00',
    '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        
        {/* MODAL HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar color="var(--primary)" size={20} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--white)' }}>
              Reserve a Table
            </h2>
          </div>
          <button onClick={onClose} style={{ color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* BODY CONTENT */}
        <div style={{ padding: '32px' }}>
          {confirmation ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(74,222,128,0.15)', border: '1px solid #4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', margin: '0 auto 20px' }}>
                <CheckCircle2 size={36} />
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: 'var(--white)', marginBottom: '8px' }}>
                Reservation Confirmed!
              </h3>
              
              <div style={{ fontSize: '13px', color: 'var(--primary-light)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>
                Booking ID: {confirmation.id}
              </div>

              <div style={{ background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '4px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', marginBottom: '24px' }}>
                <div><strong style={{ color: 'var(--gray-light)' }}>Guest:</strong> {confirmation.guestName} ({confirmation.guests} Guests)</div>
                <div><strong style={{ color: 'var(--gray-light)' }}>Phone:</strong> {confirmation.phone}</div>
                <div><strong style={{ color: 'var(--gray-light)' }}>Branch:</strong> {confirmation.locationName}</div>
                <div><strong style={{ color: 'var(--gray-light)' }}>Date & Time:</strong> {confirmation.date} at {confirmation.time}</div>
                <div><strong style={{ color: 'var(--gray-light)' }}>Seating:</strong> {confirmation.seating}</div>
              </div>

              <button onClick={onClose} className="btn btn-primary" style={{ width: '100%' }}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              
              {errorMsg && (
                <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171', padding: '12px 16px', borderRadius: '4px', fontSize: '13px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <AlertCircle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* LOCATION SELECTOR */}
              <div className="form-group">
                <label className="form-label">Select Destination Branch</label>
                <select className="form-select" value={locId} onChange={e => setLocId(e.target.value)}>
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name} — {loc.address.split(',')[1]?.trim() || 'Hyd'}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Guests</label>
                  <select className="form-select" value={guests} onChange={e => setGuests(e.target.value)}>
                    {[1,2,3,4,5,6,7,8,10,12,15,20].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-input"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Time Slot</label>
                  <select className="form-select" value={time} onChange={e => setTime(e.target.value)}>
                    {timeSlots.map(t => (
                      <option key={t} value={t}>{t} PM</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SEATING & OCCASION */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Seating Atmosphere</label>
                  <select className="form-select" value={seating} onChange={e => setSeating(e.target.value)}>
                    <option value="Courtyard Cabana">Courtyard Cabana (Outdoor & Sitar)</option>
                    <option value="Indoor Fine Dining">Indoor Royal Fine Dining</option>
                    <option value="Rooftop Deck">Rooftop Skyline Lounge</option>
                    <option value="Private VIP Suite">Private VIP Dining Room</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Occasion</label>
                  <select className="form-select" value={occasion} onChange={e => setOccasion(e.target.value)}>
                    <option value="Casual Fine Dining">Casual Fine Dining</option>
                    <option value="Birthday Celebration">Birthday Celebration</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Business Meeting">Business Meeting</option>
                    <option value="Family Gathering">Family Gathering</option>
                  </select>
                </div>
              </div>

              {/* GUEST CONTACT INFO */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Your Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="e.g. Vikramaditya"
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number (10 Digits)</label>
                  <input
                    type="tel"
                    className="form-input"
                    required
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email (Optional)</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="vikram@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* SPECIAL REQUESTS */}
              <div className="form-group">
                <label className="form-label">Special Requests / Dietary Notes</label>
                <textarea
                  className="form-textarea"
                  placeholder="Candlelight arrangement, high-chair requirement, nut allergy, etc."
                  value={specialRequests}
                  onChange={e => setSpecialRequests(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '16px', fontSize: '12px' }}
              >
                {loading ? 'Confirming Reservation...' : 'Confirm Table Booking'}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
