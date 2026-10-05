import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle } from 'lucide-react';

export default function ReviewsSection({ reviews, onAddReview, locations }) {
  const [showForm, setShowForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [location, setLocation] = useState(locations[0]?.name || 'Jubilee Hills Flagship');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author || !comment) return;
    setLoading(true);

    try {
      await onAddReview({ author, rating: Number(rating), location, comment });
      setSubmitted(true);
      setAuthor('');
      setComment('');
      setTimeout(() => {
        setSubmitted(false);
        setShowForm(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reviews" style={{ padding: '130px 0', background: 'var(--dark)' }}>
      <div className="container">
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 60px' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Guest Experiences</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: '500',
              color: 'var(--white)',
              marginBottom: '16px'
            }}
          >
            Words From Our Patrons
          </h2>

          {/* OVERALL RATING SCORE BOX */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '16px',
              background: 'rgba(201, 165, 103, 0.08)',
              border: '1px solid rgba(201, 165, 103, 0.25)',
              padding: '12px 28px',
              borderRadius: '4px',
              marginTop: '12px'
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: '600', color: 'var(--gold)' }}>
              4.9
            </span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: 'var(--gold)', fontSize: '13px', letterSpacing: '2px' }}>★★★★★</div>
              <div style={{ fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
                Based on 1,200+ Reviews
              </div>
            </div>
          </div>
        </div>

        {/* WRITE A REVIEW TRIGGER BUTTON */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-gold-outline"
            style={{ padding: '10px 24px', fontSize: '11px' }}
          >
            <MessageSquarePlus size={16} />
            <span>{showForm ? 'Close Review Form' : 'Share Your Dining Experience'}</span>
          </button>
        </div>

        {/* REVIEW FORM IF OPEN */}
        {showForm && (
          <div
            style={{
              maxWidth: '600px',
              margin: '0 auto 50px',
              background: 'var(--dark2)',
              border: '1px solid rgba(201, 165, 103, 0.3)',
              padding: '32px',
              borderRadius: '4px'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--white)', marginBottom: '20px' }}>
              Write a Verified Review
            </h3>

            {submitted ? (
              <div style={{ textAlign: 'center', color: '#4ade80', padding: '20px 0' }}>
                <CheckCircle size={36} style={{ margin: '0 auto 12px' }} />
                <p style={{ fontSize: '15px' }}>Thank you! Your review has been published.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Your Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={author}
                      onChange={e => setAuthor(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Branch Visited</label>
                    <select
                      className="form-select"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                    >
                      {locations.map(loc => (
                        <option key={loc.id} value={loc.name}>{loc.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Rating (1 to 5 Stars)</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        style={{
                          background: 'transparent',
                          color: star <= rating ? 'var(--gold)' : 'rgba(255,255,255,0.2)',
                          fontSize: '24px',
                          cursor: 'pointer'
                        }}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Your Comments & Highlights</label>
                  <textarea
                    className="form-textarea"
                    required
                    placeholder="Tell us about the dishes, service, or ambiance..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  {loading ? 'Publishing...' : 'Submit Review'}
                </button>
              </form>
            )}
          </div>
        )}

        {/* REVIEWS CARDS GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {reviews.map(rev => (
            <div
              key={rev.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '32px 28px',
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '20px'
              }}
            >
              <div>
                {/* RATING STARS & LOCATION */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ color: 'var(--gold)', fontSize: '14px', letterSpacing: '2px' }}>
                    {'★'.repeat(rev.rating)}
                  </div>
                  <span style={{ fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                    {rev.date || 'Recent'}
                  </span>
                </div>

                {/* COMMENT QUOTE */}
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)', fontStyle: 'italic' }}>
                  "{rev.comment}"
                </p>
              </div>

              {/* AUTHOR INFO */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                <img
                  src={rev.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80'}
                  alt={rev.author}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--gold)' }}
                />
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--white)' }}>
                    {rev.author}
                  </h4>
                  <span style={{ fontSize: '10px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {rev.location || 'Hyderabad'}
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
