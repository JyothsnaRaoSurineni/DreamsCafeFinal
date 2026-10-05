import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Story from './components/Story';
import MenuSection from './components/MenuSection';
import SignatureDishes from './components/SignatureDishes';
import GallerySection from './components/GallerySection';
import ReviewsSection from './components/ReviewsSection';
import LocationsSection from './components/LocationsSection';
import Footer from './components/Footer';

import ReservationModal from './components/Modals/ReservationModal';
import CartModal from './components/Modals/CartModal';
import DishDetailModal from './components/Modals/DishDetailModal';
import AdminDashboardModal from './components/Modals/AdminDashboardModal';

export default function App() {
  const [locations, setLocations] = useState([]);
  const [menu, setMenu] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  // Cart state
  const [cart, setCart] = useState([]);

  // Modals state
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedDishDetail, setSelectedDishDetail] = useState(null);

  // Fetch initial data from backend API
  useEffect(() => {
    fetchLocations();
    fetchMenu();
    fetchReviews();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await fetch('/api/locations');
      const data = await res.json();
      setLocations(data);
      if (data.length > 0) setSelectedLocation(data[0]);
    } catch (err) {
      console.error('Error fetching locations:', err);
    }
  };

  const fetchMenu = async () => {
    try {
      const res = await fetch('/api/menu');
      const data = await res.json();
      setMenu(data);
    } catch (err) {
      console.error('Error fetching menu:', err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  // Cart operations
  const handleAddToCart = (dish) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === dish.id);
      const addQty = dish.quantity || 1;
      if (existing) {
        return prev.map(item =>
          item.id === dish.id ? { ...item, quantity: item.quantity + addQty } : item
        );
      }
      return [...prev, { ...dish, quantity: addQty }];
    });
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // API submit actions
  const handleSubmitReservation = async (reservationData) => {
    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservationData)
    });
    const data = await res.json();
    return data;
  };

  const handleSubmitOrder = async (orderData) => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    const data = await res.json();
    return data;
  };

  const handleAddReview = async (reviewData) => {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    const newRev = await res.json();
    setReviews(prev => [newRev, ...prev]);
    return newRev;
  };

  const totalCartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--black)' }}>
      {/* NAVBAR */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        locations={locations}
      />

      {/* HERO SECTION */}
      <Hero
        onOpenReservation={() => setIsReservationOpen(true)}
        onExploreMenu={() => {
          const menuElem = document.getElementById('menu');
          if (menuElem) menuElem.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* MARQUEE ANNOUNCEMENT */}
      <Marquee />

      {/* STORY SECTION */}
      <Story />

      {/* MENU & ORDERING SECTION */}
      <MenuSection
        menu={menu}
        onAddToCart={handleAddToCart}
        onSelectDish={(dish) => setSelectedDishDetail(dish)}
      />

      {/* SIGNATURE DISHES SPOTLIGHT */}
      <SignatureDishes
        menu={menu}
        onSelectDish={(dish) => setSelectedDishDetail(dish)}
      />

      {/* AMBIANCE & GALLERY */}
      <GallerySection />

      {/* REVIEWS & RATINGS */}
      <ReviewsSection
        reviews={reviews}
        onAddReview={handleAddReview}
        locations={locations}
      />

      {/* LOCATIONS EXPLORER */}
      <LocationsSection
        locations={locations}
        onSelectLocationForReservation={(loc) => {
          setSelectedLocation(loc);
          setIsReservationOpen(true);
        }}
      />

      {/* FOOTER */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* MODALS */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        locations={locations}
        selectedLocation={selectedLocation}
        onSubmitReservation={handleSubmitReservation}
      />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onSubmitOrder={handleSubmitOrder}
      />

      <DishDetailModal
        dish={selectedDishDetail}
        onClose={() => setSelectedDishDetail(null)}
        onAddToCart={handleAddToCart}
      />

      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
