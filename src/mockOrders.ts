import { Order } from './types';
import { MOCK_RESTAURANTS } from './data';

const getRestaurant = (id: string) => MOCK_RESTAURANTS.find(r => r.id === id)!;

export const getMockOrders = (userId: string): Order[] => {
  const r1 = getRestaurant('r1'); // KFC
  const r2 = getRestaurant('r2'); // Domino's
  const r4 = getRestaurant('r4'); // Cheezious
  const r6 = getRestaurant('r6'); // Burning Brownie

  return [
    {
      id: 'ORD-88291',
      userId: userId,
      restaurantId: r1.id,
      restaurantName: r1.name,
      restaurantImage: r1.image,
      items: [
        { ...r1.menu[0], quantity: 2, restaurantId: r1.id }, // Zinger Burger
        { ...r1.menu[8], quantity: 1, restaurantId: r1.id }, // Fries
      ],
      subtotal: 1350,
      deliveryFee: 150,
      total: 1500,
      status: 'Delivered',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
      address: 'House 123, Street 5, F-10, Islamabad',
      phone: '0300-1234567',
      paymentMethod: 'Card'
    },
    {
      id: 'ORD-99102',
      userId: userId,
      restaurantId: r2.id,
      restaurantName: r2.name,
      restaurantImage: r2.image,
      items: [
        { ...r2.menu[0], quantity: 1, restaurantId: r2.id }, // Pepperoni Pizza
        { ...r2.menu[9], quantity: 1, restaurantId: r2.id }, // Lava Cake
      ],
      subtotal: 1650,
      deliveryFee: 150,
      total: 1800,
      status: 'Delivered',
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
      address: 'Apartment 4B, Silver Oaks, F-10, Islamabad',
      phone: '0300-1234567',
      paymentMethod: 'Cash on Delivery'
    },
    {
      id: 'ORD-12345',
      userId: userId,
      restaurantId: r4.id,
      restaurantName: r4.name,
      restaurantImage: r4.image,
      items: [
        { ...r4.menu[0], quantity: 1, restaurantId: r4.id }, // Crown Crust Pizza
        { ...r4.menu[5], quantity: 2, restaurantId: r4.id }, // Zinger Burger
      ],
      subtotal: 2400,
      deliveryFee: 150,
      total: 2550,
      status: 'Preparing',
      createdAt: new Date(Date.now() - 3600000 * 0.5).toISOString(), // 30 mins ago
      address: 'House 123, Street 5, F-10, Islamabad',
      phone: '0300-1234567',
      paymentMethod: 'Card'
    },
    {
      id: 'ORD-67890',
      userId: userId,
      restaurantId: r6.id,
      restaurantName: r6.name,
      restaurantImage: r6.image,
      items: [
        { ...r6.menu[0], quantity: 3, restaurantId: r6.id }, // Classic Brownie
        { ...r6.menu[2], quantity: 2, restaurantId: r6.id }, // Cappuccino
      ],
      subtotal: 2450,
      deliveryFee: 150,
      total: 2600,
      status: 'Out for Delivery',
      createdAt: new Date(Date.now() - 3600000 * 1.5).toISOString(), // 1.5 hours ago
      address: 'House 123, Street 5, F-10, Islamabad',
      phone: '0300-1234567',
      paymentMethod: 'Cash on Delivery'
    },
    {
      id: 'ORD-11223',
      userId: 'another-user@example.com',
      restaurantId: r1.id,
      restaurantName: r1.name,
      restaurantImage: r1.image,
      items: [
        { ...r1.menu[1], quantity: 1, restaurantId: r1.id }, // Mighty Zinger
        { ...r1.menu[5], quantity: 1, restaurantId: r1.id }, // Hot Wings
      ],
      subtotal: 1340,
      deliveryFee: 150,
      total: 1490,
      status: 'Order Placed',
      createdAt: new Date(Date.now() - 600000).toISOString(), // 10 mins ago
      address: 'Sector G-11/3, Islamabad',
      phone: '0311-9876543',
      paymentMethod: 'Card'
    },
    {
      id: 'ORD-44556',
      userId: 'third-user@example.com',
      restaurantId: r1.id,
      restaurantName: r1.name,
      restaurantImage: r1.image,
      items: [
        { ...r1.menu[3], quantity: 2, restaurantId: r1.id }, // Zinger Stacker
        { ...r1.menu[8], quantity: 2, restaurantId: r1.id }, // Fries
      ],
      subtotal: 2000,
      deliveryFee: 150,
      total: 2150,
      status: 'Preparing',
      createdAt: new Date(Date.now() - 1200000).toISOString(), // 20 mins ago
      address: 'DHA Phase 2, Islamabad',
      phone: '0322-5554443',
      paymentMethod: 'Cash on Delivery'
    }
  ];
};
