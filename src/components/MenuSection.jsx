import React, { useState, useMemo } from 'react';
import { Search, Flame, Plus, Star, Award, Filter } from 'lucide-react';

export default function MenuSection({ menu, onAddToCart, onSelectDish }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDiet, setActiveDiet] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItem, setAddedItem] = useState(null);

  const categories = ['All', 'Starters', 'Main Course', 'Biryanis & Rice', 'Cocktails & Beverages', 'Desserts'];

  const filteredMenu = useMemo(() => {
    return menu.filter(item => {
      const matchCat = activeCategory === 'All' || item.category.toLowerCase() === activeCategory.toLowerCase();
      const matchDiet = activeDiet === 'All' || item.diet.toLowerCase() === activeDiet.toLowerCase();
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchDiet && matchSearch;
    });
  }, [menu, activeCategory, activeDiet, searchQuery]);

  const handleAdd = (e, item) => {
    e.stopPropagation();
    onAddToCart(item);
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 1200);
  };

  return (
    <section id="menu" style={{ padding: '130px 0', background: 'var(--dark)' }}>
      <div className="container">
        
        {/* HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 50px' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Artisanal Creations</div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: '500',
              color: 'var(--white)',
              marginBottom: '16px'
            }}
          >
            The Culinary Canvas
          </h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--gray-light)', fontStyle: 'italic' }}>
            Freshly prepared to order using hand-pounded spices, cold-pressed oils, and royal Nizam court traditions.
          </p>
        </div>

        {/* CONTROLS: CATEGORIES & SEARCH & DIET FILTER */}
        <div style={{ marginBottom: '40px' }}>
          
          {/* CATEGORY TABS */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '24px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              paddingBottom: '16px'
            }}
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 20px',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: activeCategory === cat ? 'var(--gold)' : 'rgba(255,255,255,0.5)',
                  background: activeCategory === cat ? 'rgba(201, 165, 103, 0.12)' : 'transparent',
                  border: activeCategory === cat ? '1px solid var(--gold)' : '1px solid transparent',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* SEARCH BAR & DIET SELECTOR */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            
            {/* SEARCH */}
            <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: '400px' }}>
              <Search size={16} color="var(--gold)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search dish, ingredient, or flavor..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '40px', paddingRight: '16px', borderRadius: '2px', fontSize: '13px' }}
              />
            </div>

            {/* DIET TOGGLES */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gray)' }}>Preference:</span>
              {['All', 'Veg', 'Non-Veg'].map(diet => (
                <button
                  key={diet}
                  onClick={() => setActiveDiet(diet)}
                  style={{
                    padding: '6px 14px',
                    fontSize: '10px',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    borderRadius: '2px',
                    background: activeDiet === diet ? 'rgba(201,165,103,0.2)' : 'rgba(255,255,255,0.04)',
                    color: activeDiet === diet ? 'var(--gold)' : 'rgba(255,255,255,0.6)',
                    border: activeDiet === diet ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MENU ITEMS GRID */}
        {filteredMenu.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray)' }}>
            <p style={{ fontSize: '16px', fontFamily: 'var(--font-serif)' }}>No menu items match your current filter or search criteria.</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px'
            }}
          >
            {filteredMenu.map(item => (
              <div
                key={item.id}
                onClick={() => onSelectDish(item)}
                style={{
                  background: 'var(--dark2)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(201, 165, 103, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.5)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* DISH IMAGE HEADER */}
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(28,28,28,1) 0%, transparent 60%)'
                    }}
                  />

                  {/* BADGES */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                    <span className={`badge-diet ${item.diet === 'Veg' ? 'badge-veg' : 'badge-nonveg'}`}>
                      {item.diet}
                    </span>
                    {item.isChefSpecial && (
                      <span className="badge-diet badge-chef">
                        ★ Royal Special
                      </span>
                    )}
                  </div>

                  {/* RATING */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(13, 13, 13, 0.8)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 8px',
                      borderRadius: '2px',
                      fontSize: '11px',
                      fontWeight: '600',
                      color: 'var(--gold)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Star size={12} fill="var(--gold)" color="var(--gold)" />
                    {item.rating || '4.9'}
                  </div>
                </div>

                {/* CONTENT */}
                <div style={{ padding: '20px 24px', flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '500', color: 'var(--white)' }}>
                        {item.name}
                      </h3>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '600', color: 'var(--gold)', whiteSpace: 'nowrap' }}>
                        ₹{item.price}
                      </span>
                    </div>

                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.6', marginBottom: '16px' }}>
                      {item.description}
                    </p>
                  </div>

                  {/* BOTTOM ROW: SPICE LEVEL + ADD BUTTON */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px', marginTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {Array.from({ length: item.spicyLevel || 0 }).map((_, i) => (
                        <Flame key={i} size={14} color="#ef4444" fill="#ef4444" />
                      ))}
                      {item.spicyLevel === 0 && (
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Mild & Delicate</span>
                      )}
                    </div>

                    <button
                      onClick={e => handleAdd(e, item)}
                      style={{
                        background: addedItem === item.id ? 'var(--gold)' : 'rgba(201, 165, 103, 0.15)',
                        border: '1px solid var(--gold)',
                        color: addedItem === item.id ? 'var(--black)' : 'var(--gold)',
                        padding: '8px 16px',
                        borderRadius: '2px',
                        fontSize: '11px',
                        fontWeight: '700',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.3s'
                      }}
                    >
                      {addedItem === item.id ? (
                        <span>Added!</span>
                      ) : (
                        <>
                          <Plus size={14} /> <span>Add to Order</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
