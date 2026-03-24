export type Role = 'customer' | 'restaurant' | null;
export type Category = 'Fast Food' | 'Chinese' | 'Italian' | 'French' | 'Desi';

export interface UserProfile {
  name: string;
  email: string;
  role: Role;
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
}

export interface CartItem extends MenuItem {
  quantity: number;
  restaurantId: string;
}
