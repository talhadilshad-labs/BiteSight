import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { UserProfile, Restaurant, MenuItem, CartItem, Order, OrderStatus, Category } from './types';
import { OnboardingScreen } from './components/Onboarding';
import { CustomerHome } from './components/CustomerHome';
import { RestaurantHome } from './components/RestaurantHome';
import { MenuScreen, ARScreen, CartScreen, CheckoutScreen, OrderConfirmationScreen, OrderTrackingScreen } from './components/Shared';
import { OrdersHistory } from './components/Orders';
import { RestaurantListScreen, MenuItemListScreen } from './components/ListScreens';
import { getMockOrders } from './mockOrders';
import { MOCK_RESTAURANTS } from './data';

function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedARItem, setSelectedARItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(getMockOrders('customer@example.com'));
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isOrdersHistoryOpen, setIsOrdersHistoryOpen] = useState(false);
  const [restaurantListConfig, setRestaurantListConfig] = useState<{ title: string, category: Category | 'All' } | null>(null);
  const [menuItemListConfig, setMenuItemListConfig] = useState<{ title: string, items: MenuItem[] } | null>(null);

  React.useEffect(() => {
    if (user?.role === 'customer') {
      // Ensure the mock orders match the current user's email
      setOrders(prev => {
        const hasUserOrders = prev.some(o => o.userId === user.email);
        if (hasUserOrders) return prev;
        const mockOrders = getMockOrders(user.email);
        return [...prev.filter(o => o.userId !== 'customer@example.com'), ...mockOrders];
      });
    }
  }, [user]);

  const handleAddToCart = (item: MenuItem) => {
    if (!selectedRestaurant) return;
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1, restaurantId: selectedRestaurant.id }];
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
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
    setCurrentOrder(null);
    setIsTrackingOpen(false);
    setIsOrdersHistoryOpen(false);
  };

  const handlePlaceOrder = (orderDetails: { address: string, phone: string, paymentMethod: 'Cash on Delivery' | 'Card' }) => {
    if (!selectedRestaurant || cart.length === 0 || !user) return;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 150;
    const total = subtotal + deliveryFee;

    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 1000000)}`,
      userId: user.email,
      restaurantId: selectedRestaurant.id,
      restaurantName: selectedRestaurant.name,
      restaurantImage: selectedRestaurant.image,
      items: [...cart],
      subtotal,
      deliveryFee,
      total,
      status: 'Order Placed',
      createdAt: new Date().toISOString(),
      ...orderDetails
    };

    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    if (currentOrder?.id === orderId) {
      setCurrentOrder(prev => prev ? { ...prev, status } : null);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-brand/30 selection:text-brand">
      <AnimatePresence mode="wait">
        {!user && (
          <OnboardingScreen key="onboarding" onLogin={setUser} />
        )}

        {user?.role === 'customer' && !selectedRestaurant && !isOrdersHistoryOpen && !currentOrder && !isTrackingOpen && !restaurantListConfig && !menuItemListConfig && (
          <CustomerHome 
            key="customer-home" 
            user={user} 
            onSelectRestaurant={setSelectedRestaurant} 
            onLogout={handleLogout} 
            onOpenOrders={() => setIsOrdersHistoryOpen(true)}
            onSeeAllRestaurants={(title, category) => setRestaurantListConfig({ title, category })}
          />
        )}

        {restaurantListConfig && (
          <RestaurantListScreen
            key="restaurant-list"
            title={restaurantListConfig.title}
            restaurants={MOCK_RESTAURANTS}
            initialCategory={restaurantListConfig.category}
            onBack={() => setRestaurantListConfig(null)}
            onSelectRestaurant={(rest) => {
              setSelectedRestaurant(rest);
              setRestaurantListConfig(null);
            }}
          />
        )}

        {menuItemListConfig && (
          <MenuItemListScreen
            key="menu-item-list"
            title={menuItemListConfig.title}
            items={menuItemListConfig.items}
            cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
            onBack={() => setMenuItemListConfig(null)}
            onAddToCart={handleAddToCart}
            onOpenAR={setSelectedARItem}
            onOpenCart={() => {
              setIsCartOpen(true);
              setMenuItemListConfig(null);
            }}
          />
        )}

        {user?.role === 'restaurant' && (
          <RestaurantHome 
            key="restaurant-home" 
            onLogout={handleLogout} 
            orders={orders.filter(o => o.restaurantId === user.restaurantId)}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        )}

        {selectedRestaurant && !selectedARItem && !isCartOpen && !isCheckoutOpen && !currentOrder && !isTrackingOpen && !menuItemListConfig && (
          <MenuScreen 
            key="menu" 
            restaurant={selectedRestaurant} 
            cart={cart} 
            onBack={() => setSelectedRestaurant(null)} 
            onOpenAR={setSelectedARItem} 
            onAddToCart={handleAddToCart} 
            onOpenCart={() => setIsCartOpen(true)} 
            onSeeAllItems={(title, items) => setMenuItemListConfig({ title, items })}
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

        {isCartOpen && !isCheckoutOpen && (
          <CartScreen 
            key="cart" 
            cart={cart} 
            onBack={() => setIsCartOpen(false)} 
            onAdd={handleAddToCart} 
            onRemove={handleRemoveFromCart} 
            onClear={() => setCart([])} 
            onCheckout={() => setIsCheckoutOpen(true)}
          />
        )}

        {isCheckoutOpen && (
          <CheckoutScreen
            key="checkout"
            cart={cart}
            onBack={() => setIsCheckoutOpen(false)}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {currentOrder && !isTrackingOpen && (
          <OrderConfirmationScreen
            key="confirmation"
            order={currentOrder}
            onTrack={() => setIsTrackingOpen(true)}
            onClose={() => {
              setCurrentOrder(null);
              setSelectedRestaurant(null);
            }}
          />
        )}

        {isTrackingOpen && currentOrder && (
          <OrderTrackingScreen
            key="tracking"
            order={currentOrder}
            onBack={() => {
              setIsTrackingOpen(false);
              setCurrentOrder(null);
              setSelectedRestaurant(null);
            }}
          />
        )}

        {isOrdersHistoryOpen && (
          <OrdersHistory
            key="history"
            orders={orders.filter(o => o.userId === user?.email)}
            onBack={() => setIsOrdersHistoryOpen(false)}
            onTrackOrder={(order) => {
              setCurrentOrder(order);
              setIsTrackingOpen(true);
              setIsOrdersHistoryOpen(false);
            }}
            onReorder={(order) => {
              setCart(order.items);
              setIsCartOpen(true);
              setIsOrdersHistoryOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
