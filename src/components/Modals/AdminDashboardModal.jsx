import React, { useState, useEffect } from 'react';
import { X, Shield, TrendingUp, Calendar, ShoppingBag, Utensils, Mail, CheckCircle, Clock, Plus, Trash2, RefreshCw } from 'lucide-react';

export default function AdminDashboardModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('analytics');
  const [analytics, setAnalytics] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);

  // New Dish Form State
  const [newDish, setNewDish] = useState({
    name: '',
    category: 'Starters',
    price: '',
    description: '',
    diet: 'Veg',
    spicyLevel: 1,
    isChefSpecial: false,
    image: ''
  });
  const [dishMsg, setDishMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [resAnal, resRes, resOrd, resMenu, resSub] = await Promise.all([
        fetch('/api/analytics').then(r => r.json()),
        fetch('/api/reservations').then(r => r.json()),
        fetch('/api/orders').then(r => r.json()),
        fetch('/api/menu').then(r => r.json()),
        fetch('/api/subscribers').then(r => r.json())
      ]);
      setAnalytics(resAnal);
      setReservations(resRes);
      setOrders(resOrd);
      setMenu(resMenu);
      setSubscribers(resSub);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateReservationStatus = async (id, status) => {
    try {
      await fetch(`/api/reservations/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await fetch(`/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    if (!newDish.name || !newDish.price) return;

    try {
      await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDish)
      });
      setDishMsg('✓ Gourmet dish added to live menu!');
      setNewDish({
        name: '',
        category: 'Starters',
        price: '',
        description: '',
        diet: 'Veg',
        spicyLevel: 1,
        isChefSpecial: false,
        image: ''
      });
      loadData();
      setTimeout(() => setDishMsg(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteDish = async (id) => {
    if (!window.confirm('Delete this menu item?')) return;
    try {
      await fetch(`/api/menu/${id}`, { method: 'DELETE' });
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '980px', width: '95%' }}>
        
        {/* MODAL HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'var(--black)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Shield color="var(--primary)" size={22} />
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--white)' }}>
                Dreams Kitchen Staff & Admin Portal
              </h2>
              <span style={{ fontSize: '11px', color: 'var(--primary-light)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Real-Time Restaurant Operations & VIP Subscriptions
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={loadData} style={{ color: 'var(--primary)', background: 'transparent', padding: '6px', cursor: 'pointer' }} title="Refresh Data">
              <RefreshCw size={18} className={loading ? 'spin' : ''} />
            </button>
            <button onClick={onClose} style={{ color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
              <X size={22} />
            </button>
          </div>
        </div>

        {/* ADMIN NAV TABS */}
        <div style={{ display: 'flex', gap: '4px', padding: '12px 32px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'var(--dark2)', flexWrap: 'wrap' }}>
          {[
            { id: 'analytics', label: 'Dashboard', icon: TrendingUp },
            { id: 'reservations', label: `Bookings (${reservations.length})`, icon: Calendar },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'subscribers', label: `VIP Subscriptions (${subscribers.length})`, icon: Mail },
            { id: 'menu', label: `Menu Manager (${menu.length})`, icon: Utensils }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 18px',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: activeTab === tab.id ? 'var(--primary)' : 'rgba(255,255,255,0.5)',
                  borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* MODAL BODY CONTENT */}
        <div style={{ padding: '32px', minHeight: '400px' }}>
          
          {/* TAB 1: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                
                <div style={{ background: 'var(--dark3)', border: '1px solid rgba(192,132,252,0.2)', padding: '20px', borderRadius: '4px' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gray-light)' }}>Total Online Revenue</span>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: '600', color: 'var(--gold)', marginTop: '8px' }}>
                    ₹{analytics?.totalRevenue || 0}
                  </div>
                </div>

                <div style={{ background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '4px' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gray-light)' }}>Table Bookings</span>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: '600', color: 'var(--white)', marginTop: '8px' }}>
                    {analytics?.totalReservations || 0}
                  </div>
                </div>

                <div style={{ background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '4px' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gray-light)' }}>Online Orders</span>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: '600', color: 'var(--white)', marginTop: '8px' }}>
                    {analytics?.totalOrders || 0}
                  </div>
                </div>

                <div style={{ background: 'var(--dark3)', border: '1px solid rgba(192,132,252,0.2)', padding: '20px', borderRadius: '4px' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gray-light)' }}>VIP Subscriptions</span>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: '600', color: 'var(--primary)', marginTop: '8px' }}>
                    {subscribers.length}
                  </div>
                </div>

              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--white)', marginBottom: '16px' }}>
                Operational Overview
              </h3>

              <div style={{ background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', padding: '20px' }}>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.7' }}>
                  Dreams Kitchen portal is active across Jubilee Hills, Gachibowli, Financial District, and Hitech City. VIP Private Invitations submitted via the website footer are immediately synced here under the <strong>VIP Subscriptions</strong> tab.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: RESERVATIONS MANAGER */}
          {activeTab === 'reservations' && (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {reservations.map(resv => (
                  <div key={resv.id} style={{ background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.08)', padding: '20px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1px', color: 'var(--primary)' }}>{resv.id}</span>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--white)' }}>{resv.guestName} ({resv.guests} Guests)</span>
                        <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '2px', background: resv.status === 'Confirmed' ? 'rgba(74,222,128,0.2)' : 'rgba(234,179,8,0.2)', color: resv.status === 'Confirmed' ? '#4ade80' : '#facc15' }}>
                          {resv.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <span>📍 {resv.locationName}</span>
                        <span>📅 {resv.date} @ {resv.time}</span>
                        <span>🪑 {resv.seating}</span>
                        <span>📞 {resv.phone}</span>
                      </div>
                      {resv.specialRequests && resv.specialRequests !== 'None' && (
                        <div style={{ fontSize: '11px', color: 'var(--primary-light)', marginTop: '6px' }}>
                          Note: {resv.specialRequests}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      {resv.status !== 'Confirmed' && (
                        <button onClick={() => handleUpdateReservationStatus(resv.id, 'Confirmed')} className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '10px' }}>
                          Approve
                        </button>
                      )}
                      {resv.status !== 'Cancelled' && (
                        <button onClick={() => handleUpdateReservationStatus(resv.id, 'Cancelled')} className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '10px' }}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS MANAGER */}
          {activeTab === 'orders' && (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {orders.map(ord => (
                  <div key={ord.id} style={{ background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.08)', padding: '20px', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--primary)' }}>{ord.id}</span>
                          <h4 style={{ fontSize: '14px', color: 'var(--white)' }}>{ord.customerName}</h4>
                          <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '2px', background: 'rgba(192,132,252,0.2)', color: 'var(--primary)' }}>
                            {ord.status}
                          </span>
                        </div>
                        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>📞 {ord.phone} | 🏠 {ord.address}</span>
                      </div>

                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '600', color: 'var(--gold)' }}>
                        ₹{ord.totalAmount}
                      </div>
                    </div>

                    {/* ITEMS LIST */}
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '2px', fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>
                      {ord.items?.map((it, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{it.quantity}x {it.name}</span>
                          <span>₹{it.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* STATUS UPDATER */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: 'var(--gray)' }}>Update Status:</span>
                      {['Preparing', 'Out for Delivery', 'Completed'].map(st => (
                        <button
                          key={st}
                          onClick={() => handleUpdateOrderStatus(ord.id, st)}
                          style={{
                            padding: '4px 10px',
                            fontSize: '10px',
                            borderRadius: '2px',
                            background: ord.status === st ? 'var(--primary)' : 'transparent',
                            color: ord.status === st ? 'var(--black)' : 'var(--white)',
                            border: '1px solid var(--primary)'
                          }}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PRIVATE INVITATION SUBSCRIBERS */}
          {activeTab === 'subscribers' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--white)' }}>
                    VIP Private Invitation Subscriptions
                  </h3>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                    Subscribers registered via the Dreams Kitchen website footer newsletter.
                  </p>
                </div>
                <div style={{ background: 'rgba(192, 132, 252, 0.15)', border: '1px solid var(--primary)', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', color: 'var(--primary)' }}>
                  Total VIP Subscribers: <strong>{subscribers.length}</strong>
                </div>
              </div>

              {subscribers.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--gray)' }}>
                  No subscriptions received yet.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {subscribers.map((sub, idx) => (
                    <div
                      key={sub.id || idx}
                      style={{
                        background: 'var(--dark3)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        padding: '14px 20px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Mail size={16} color="var(--primary)" />
                        <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--white)' }}>
                          {sub.email}
                        </span>
                      </div>
                      <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>
                        Subscribed {new Date(sub.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: MENU MANAGER */}
          {activeTab === 'menu' && (
            <div>
              
              {/* ADD NEW DISH FORM */}
              <div style={{ background: 'var(--dark3)', border: '1px solid rgba(192,132,252,0.2)', padding: '24px', borderRadius: '4px', marginBottom: '32px' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--white)', marginBottom: '16px' }}>
                  Add New Gourmet Creation to Menu
                </h4>

                {dishMsg && (
                  <div style={{ color: '#4ade80', fontSize: '13px', marginBottom: '16px' }}>{dishMsg}</div>
                )}

                <form onSubmit={handleAddDish}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Dish Name</label>
                      <input
                        type="text"
                        className="form-input"
                        required
                        placeholder="e.g. Royal Truffle Galouti Kebab"
                        value={newDish.name}
                        onChange={e => setNewDish({ ...newDish, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        value={newDish.category}
                        onChange={e => setNewDish({ ...newDish, category: e.target.value })}
                      >
                        <option value="Starters">Starters</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Biryanis & Rice">Biryanis & Rice</option>
                        <option value="Cocktails & Beverages">Cocktails & Beverages</option>
                        <option value="Desserts">Desserts</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Price (₹ INR)</label>
                      <input
                        type="number"
                        className="form-input"
                        required
                        placeholder="650"
                        value={newDish.price}
                        onChange={e => setNewDish({ ...newDish, price: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Diet</label>
                      <select
                        className="form-select"
                        value={newDish.diet}
                        onChange={e => setNewDish({ ...newDish, diet: e.target.value })}
                      >
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Spice Level (0 to 3)</label>
                      <select
                        className="form-select"
                        value={newDish.spicyLevel}
                        onChange={e => setNewDish({ ...newDish, spicyLevel: Number(e.target.value) })}
                      >
                        <option value={0}>0 (Mild / Sweet)</option>
                        <option value={1}>1 (Medium Spice)</option>
                        <option value={2}>2 (Spicy)</option>
                        <option value={3}>3 (Fiery Guntur Heat)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Image URL</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="https://images.unsplash.com/..."
                        value={newDish.image}
                        onChange={e => setNewDish({ ...newDish, image: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Culinary Description</label>
                    <textarea
                      className="form-textarea"
                      required
                      placeholder="Describe the heritage ingredients and preparation..."
                      value={newDish.description}
                      onChange={e => setNewDish({ ...newDish, description: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    <Plus size={14} /> Add Item to Live Menu
                  </button>
                </form>
              </div>

              {/* CURRENT MENU TABLE */}
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--white)', marginBottom: '16px' }}>
                Active Menu Catalog ({menu.length} Items)
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {menu.map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--dark3)', padding: '12px 20px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <img src={item.image} alt={item.name} style={{ width: '44px', height: '44px', borderRadius: '4px', objectFit: 'cover' }} />
                      <div>
                        <h4 style={{ fontSize: '14px', color: 'var(--white)' }}>{item.name}</h4>
                        <span style={{ fontSize: '11px', color: 'var(--primary)' }}>{item.category} • ₹{item.price} • {item.diet}</span>
                      </div>
                    </div>

                    <button onClick={() => handleDeleteDish(item.id)} style={{ color: '#ef4444', padding: '6px', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
