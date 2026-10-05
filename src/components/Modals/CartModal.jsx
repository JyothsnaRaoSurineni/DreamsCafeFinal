import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';

export default function CartModal({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onSubmitOrder
}) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI / GPay');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const total = subtotal + tax;

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

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMsg('Invalid phone number! Please enter exactly 10 digits.');
      return;
    }

    if (!addressLine1.trim()) {
      setErrorMsg('Address Line 1 is required.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const order = await onSubmitOrder({
        customerName,
        phone: cleanPhone,
        addressLine1,
        addressLine2,
        address: `${addressLine1.trim()}, ${addressLine2.trim()}`.replace(/,\s*$/, ''),
        items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        totalAmount: total,
        paymentMethod
      });

      if (order.error) {
        setErrorMsg(order.error);
      } else {
        setOrderConfirmed(order);
        onClearCart();
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to process order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '650px' }}>
        
        {/* MODAL HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag color="var(--primary)" size={20} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--white)' }}>
              Your Gourmet Order
            </h2>
          </div>
          <button onClick={onClose} style={{ color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* MODAL BODY */}
        <div style={{ padding: '32px' }}>
          {orderConfirmed ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(74,222,128,0.15)', border: '1px solid #4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', margin: '0 auto 20px' }}>
                <CheckCircle size={36} />
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: 'var(--white)', marginBottom: '8px' }}>
                Order Received!
              </h3>
              
              <div style={{ fontSize: '13px', color: 'var(--primary-light)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>
                Order ID: {orderConfirmed.id}
              </div>

              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
                Our Master Chef is now preparing your culinary selection. Estimated delivery time: 35-45 mins.
              </p>

              <button onClick={onClose} className="btn btn-primary" style={{ width: '100%' }}>
                Back to Restaurant
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--gray)' }}>
              <ShoppingBag size={48} color="rgba(255,255,255,0.2)" style={{ margin: '0 auto 16px' }} />
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '18px' }}>Your dining cart is empty.</p>
              <button onClick={onClose} className="btn btn-gold-outline" style={{ marginTop: '20px' }}>
                Explore Menu
              </button>
            </div>
          ) : (
            <div>
              
              {/* CART ITEMS LIST */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', maxHeight: '220px', overflowY: 'auto', paddingRight: '6px' }}>
                {cart.map(item => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'var(--dark3)',
                      padding: '12px 16px',
                      borderRadius: '4px',
                      border: '1px solid rgba(255,255,255,0.06)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={item.image} alt={item.name} style={{ width: '48px', height: '48px', borderRadius: '4px', objectFit: 'cover' }} />
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--white)' }}>{item.name}</h4>
                        <span style={{ fontSize: '12px', color: 'var(--primary-light)' }}>₹{item.price} each</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      {/* QUANTITY ADJUSTER */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.4)', padding: '4px 8px', borderRadius: '2px' }}>
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} style={{ color: 'var(--white)' }}>
                          <Minus size={14} />
                        </button>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--primary-light)', minWidth: '16px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} style={{ color: 'var(--white)' }}>
                          <Plus size={14} />
                        </button>
                      </div>

                      <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--white)', minWidth: '60px', textAlign: 'right' }}>
                        ₹{item.price * item.quantity}
                      </span>

                      <button onClick={() => onRemoveItem(item.id)} style={{ color: '#ef4444', opacity: 0.8 }}>
                        <Trash2 size={16} />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* TOTALS SUMMARY */}
              <div style={{ background: 'rgba(192, 132, 252, 0.06)', border: '1px solid rgba(192, 132, 252, 0.2)', padding: '16px 20px', borderRadius: '4px', marginBottom: '24px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'rgba(255,255,255,0.7)' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'rgba(255,255,255,0.7)' }}>
                  <span>Taxes & Restaurant Packaging (5% GST)</span>
                  <span>₹{tax}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(192, 132, 252, 0.3)', paddingTop: '10px', marginTop: '6px', fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '600', color: 'var(--gold)' }}>
                  <span>Grand Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* CHECKOUT FORM */}
              <form onSubmit={handleCheckout}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: 'var(--white)', marginBottom: '14px' }}>
                  Delivery Details & Payment
                </h4>

                {errorMsg && (
                  <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171', padding: '12px 16px', borderRadius: '4px', fontSize: '13px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <AlertCircle size={16} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="e.g. Priya Verma"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Contact Phone (10 Digits)</label>
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
                </div>

                {/* ADDRESS LINE 1 AND ADDRESS LINE 2 */}
                <div className="form-group">
                  <label className="form-label">Address Line 1 (Flat / Villa No, Building, Street)</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="e.g. Villa 14, Royal Palm Avenue, Road No. 36"
                    value={addressLine1}
                    onChange={e => setAddressLine1(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Address Line 2 (Area, Landmark, City)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Near Metro Station, Jubilee Hills, Hyderabad"
                    value={addressLine2}
                    onChange={e => setAddressLine2(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Payment Mode</label>
                  <select className="form-select" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                    <option value="UPI / GPay">Instant UPI / GPay / PhonePe</option>
                    <option value="Credit/Debit Card">Credit / Debit Card</option>
                    <option value="Pay on Delivery">Cash / Card on Delivery</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '12px' }}
                >
                  {loading ? 'Processing Order...' : `Place Gourmet Order (₹${total})`}
                </button>
              </form>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
