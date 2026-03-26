export type Role = 'customer' | 'restaurant' | null;
export type Category = 'Fast Food' | 'Chinese' | 'Italian' | 'French' | 'Desi' | 'Cafe' | 'Desserts' | 'Healthy';

export interface UserProfile {
  name: string;
  email: string;
  role: Role;
  restaurantId?: string; // Only for restaurant owners
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  desc: string;
  img: string;
  category: string;
  arImg?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  categories: Category[];
  menu: MenuItem[];
  deliveryTime: string;
  priceRange: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  restaurantId: string;
}

export type OrderStatus = 'Order Placed' | 'Preparing' | 'Ready' | 'Out for Delivery' | 'Delivered';

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  address: string;
  phone: string;
  paymentMethod: 'Cash on Delivery' | 'Card';
}
