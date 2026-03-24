import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { UserProfile, Restaurant, MenuItem, CartItem } from './types';
import { OnboardingScreen } from './components/Onboarding';
import { CustomerHome } from './components/CustomerHome';
import { RestaurantHome } from './components/RestaurantHome';
import { MenuScreen, ARScreen, CartScreen } from './components/Shared';

function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedARItem, setSelectedARItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
    setSelectedARItem(null);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(0, i.quantity - 1) } : i).filter(i => i.quantity > 0));
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedRestaurant(null);
    setCart([]);
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-brand/30 selection:text-brand">
      <AnimatePresence mode="wait">
        {!user && (
          <OnboardingScreen key="onboarding" onLogin={setUser} />
        )}

        {user?.role === 'customer' && !selectedRestaurant && (
          <CustomerHome key="customer-home" user={user} onSelectRestaurant={setSelectedRestaurant} onLogout={handleLogout} />
        )}

        {user?.role === 'restaurant' && (
          <RestaurantHome key="restaurant-home" onLogout={handleLogout} />
        )}

        {selectedRestaurant && !selectedARItem && !isCartOpen && (
          <MenuScreen 
            key="menu" 
            restaurant={selectedRestaurant} 
            cart={cart} 
            onBack={() => setSelectedRestaurant(null)} 
            onOpenAR={setSelectedARItem} 
            onAddToCart={handleAddToCart} 
            onOpenCart={() => setIsCartOpen(true)} 
          />
        )}

        {selectedARItem && (
          <ARScreen 
            key="ar" 
            item={selectedARItem} 
            onBack={() => setSelectedARItem(null)} 
            onAddToCart={handleAddToCart} 
          />
        )}

        {isCartOpen && (
          <CartScreen 
            key="cart" 
            cart={cart} 
            onBack={() => setIsCartOpen(false)} 
            onAdd={handleAddToCart} 
            onRemove={handleRemoveFromCart} 
            onClear={() => setCart([])} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
