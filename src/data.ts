import { Restaurant, Category, MenuItem } from './types';

export const CATEGORIES: { name: Category; icon: string }[] = [
  { name: 'Fast Food', icon: 'burger' },
  { name: 'Chinese', icon: 'noodles' },
  { name: 'Italian', icon: 'pizza' },
  { name: 'Cafe', icon: 'coffee' },
  { name: 'Desi', icon: 'curry' },
  { name: 'Desserts', icon: 'cake' },
  { name: 'Healthy', icon: 'leaf' }
];

// Reusable image URLs to save tokens and maintain consistent high-quality imagery
const imgs = {
  pizza1: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
  pizza2: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
  burger1: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
  burger2: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80',
  pasta1: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&q=80',
  rice1: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
  chicken1: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=800&q=80',
  dessert1: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
  coffee1: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80',
  chinese1: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80',
  salad1: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  drink1: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80',
  healthy1: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  desi1: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80',
  desi2: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80',
  desi3: 'https://images.unsplash.com/photo-1603496987351-f84a3ba5eca3?w=800&q=80',
  desi4: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80',
  fastfood1: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=800&q=80',
  soup1: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
  steak1: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80',
  rest_pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
  rest_desi: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
  rest_cafe: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
  rest_chinese: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&q=80',
  rest_italian: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&q=80',
  rest_monal: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
  rest_burger: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
  rest_coffee: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80',
  rest_fastfood: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&q=80',
  rest_kfc: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=800&q=80',
  rest_dominos: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800&q=80',
  rest_howdy: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=800&q=80',
  rest_cheezious: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80',
  rest_savour: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80',
  rest_burning_brownie: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80',
  rest_tuscany: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
  rest_kabul: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
  rest_ginyaki: 'https://images.unsplash.com/photo-1569058242253-1df3ad0cb45b?w=800&q=80',
  rest_chaaye_khana: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80',
  rest_ranchers: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=80',
  rest_johnny: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
  rest_chopchop: 'https://images.unsplash.com/photo-1512058560366-cd2427ff56f3?w=800&q=80',
  rest_chinatown: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80',
  rest_pappasallis: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
  rest_aylanto: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
  rest_loafology: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
  rest_butt: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80',
  rest_despardes: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
  rest_optp: 'https://images.unsplash.com/photo-1573821663912-56990145564c?w=800&q=80',
  rest_hardees: 'https://images.unsplash.com/photo-1534422298391-e4f8c170db0a?w=800&q=80',
  rest_wokrepublic: 'https://images.unsplash.com/photo-1562607349-590eb551fb46?w=800&q=80',
  rest_lanzhou: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80',
  rest_laterrazza: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&q=80',
  rest_pizzaoriginale: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
  rest_kitchencuisine: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=800&q=80',
  rest_frenchbakery: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
  rest_coffeebean: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80',
  rest_gloriajeans: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
  rest_usmania: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
  rest_studentbiryani: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80',
  rest_tandoori: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80',
  rest_goldendragon: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&q=80',
  rest_burgerfest: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
};

const createMenu = (prefix: string, items: {name: string, price: number, desc: string, img: string, category: string}[]): MenuItem[] => {
  return items.map((item, i) => ({
    id: `${prefix}-${i}`,
    name: item.name,
    price: item.price,
    desc: item.desc,
    img: item.img,
    category: item.category
  }));
};

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 'r1', name: 'KFC', location: 'F-10 Markaz, Islamabad', rating: 4.3, image: imgs.rest_kfc, categories: ['Fast Food'],
    deliveryTime: '25-35 min', priceRange: '$$',
    menu: createMenu('r1', [
      { name: 'Zinger Burger', price: 550, desc: 'Signature crispy chicken fillet burger.', img: imgs.burger1, category: 'Burger' },
      { name: 'Mighty Zinger', price: 850, desc: 'Double crispy chicken fillet burger.', img: imgs.burger2, category: 'Burger' },
      { name: 'Krunch Burger', price: 350, desc: 'Crunchy chicken fillet with spicy mayo.', img: imgs.burger1, category: 'Burger' },
      { name: 'Zinger Stacker', price: 750, desc: 'Double zinger fillets with cheese and jalapenos.', img: imgs.burger2, category: 'Burger' },
      { name: 'Twister Wrap', price: 450, desc: 'Crispy chicken strips wrapped in a tortilla.', img: imgs.fastfood1, category: 'Wrap' },
      { name: 'Hot Wings', price: 490, desc: '10 pieces of spicy hot wings.', img: imgs.chicken1, category: 'Chicken' },
      { name: 'Chicken Nuggets', price: 400, desc: '6 pieces of crispy chicken nuggets.', img: imgs.chicken1, category: 'Chicken' },
      { name: 'Hot Shots', price: 420, desc: 'Bite-sized crispy chicken pieces.', img: imgs.chicken1, category: 'Chicken' },
      { name: 'Fries', price: 250, desc: 'Crispy golden french fries.', img: imgs.fastfood1, category: 'Sides' },
      { name: 'Rice & Spice', price: 350, desc: 'Spicy rice with crispy chicken chunks.', img: imgs.rice1, category: 'Rice' },
      { name: 'Coleslaw', price: 150, desc: 'Freshly prepared creamy coleslaw.', img: imgs.salad1, category: 'Sides' }
    ])
  },
  {
    id: 'r2', name: 'Domino\'s', location: 'F-11 Markaz, Islamabad', rating: 4.4, image: imgs.rest_dominos, categories: ['Italian', 'Fast Food'],
    deliveryTime: '30-40 min', priceRange: '$$',
    menu: createMenu('r2', [
      { name: 'Pepperoni Pizza', price: 1200, desc: 'Classic pizza loaded with pepperoni and cheese.', img: imgs.pizza1, category: 'Pizza' },
      { name: 'Chicken Tikka Pizza', price: 1300, desc: 'Spicy chicken tikka chunks with onions.', img: imgs.pizza2, category: 'Pizza' },
      { name: 'Fajita Pizza', price: 1350, desc: 'Chicken fajita, green peppers, and onions.', img: imgs.pizza1, category: 'Pizza' },
      { name: 'Cheese Lover Pizza', price: 1100, desc: 'Loaded with 100% mozzarella cheese.', img: imgs.pizza2, category: 'Pizza' },
      { name: 'Veggie Pizza', price: 1000, desc: 'Fresh tomatoes, onions, mushrooms, and olives.', img: imgs.pizza1, category: 'Pizza' },
      { name: 'Garlic Bread', price: 350, desc: 'Freshly baked garlic bread sticks.', img: imgs.fastfood1, category: 'Sides' },
      { name: 'Chicken Wings', price: 550, desc: 'Oven-baked spicy chicken wings.', img: imgs.chicken1, category: 'Sides' },
      { name: 'Pasta Alfredo', price: 850, desc: 'Creamy fettuccine pasta with grilled chicken.', img: imgs.pasta1, category: 'Pasta' },
      { name: 'Stuffed Crust Pizza', price: 1500, desc: 'Pizza with cheese-stuffed crust.', img: imgs.pizza2, category: 'Pizza' },
      { name: 'Lava Cake', price: 450, desc: 'Warm chocolate cake with a gooey center.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Breadsticks', price: 300, desc: 'Oven-baked breadsticks with marinara dip.', img: imgs.fastfood1, category: 'Sides' }
    ])
  },
  {
    id: 'r3', name: 'Howdy', location: 'F-7 Markaz, Islamabad', rating: 4.6, image: imgs.rest_howdy, categories: ['Fast Food'],
    deliveryTime: '35-45 min', priceRange: '$$',
    menu: createMenu('r3', [
      { name: 'Classic Beef Burger', price: 850, desc: 'Juicy beef patty with fresh lettuce and tomato.', img: imgs.burger1, category: 'Burger' },
      { name: 'Double Patty Burger', price: 1200, desc: 'Two beef patties with double cheese.', img: imgs.burger2, category: 'Burger' },
      { name: 'Grilled Chicken Burger', price: 750, desc: 'Grilled chicken breast with special sauce.', img: imgs.burger1, category: 'Burger' },
      { name: 'Loaded Fries', price: 650, desc: 'Fries topped with cheese, jalapenos, and chicken.', img: imgs.fastfood1, category: 'Sides' },
      { name: 'Cheese Fries', price: 450, desc: 'Crispy fries with melted cheese sauce.', img: imgs.fastfood1, category: 'Sides' },
      { name: 'Chicken Wings', price: 550, desc: 'BBQ glazed chicken wings.', img: imgs.chicken1, category: 'Sides' },
      { name: 'Onion Rings', price: 350, desc: 'Crispy battered onion rings.', img: imgs.fastfood1, category: 'Sides' },
      { name: 'Chicken Sandwich', price: 700, desc: 'Grilled chicken sandwich in artisan bread.', img: imgs.burger1, category: 'Sandwich' },
      { name: 'Milkshake', price: 450, desc: 'Thick and creamy chocolate milkshake.', img: imgs.drink1, category: 'Beverages' },
      { name: 'Soft Drink', price: 150, desc: 'Chilled carbonated beverage.', img: imgs.drink1, category: 'Beverages' }
    ])
  },
  {
    id: 'r4', name: 'Cheezious', location: 'F-11 Markaz, Islamabad', rating: 4.8, image: imgs.rest_cheezious, categories: ['Fast Food', 'Italian'],
    deliveryTime: '40-50 min', priceRange: '$$',
    menu: createMenu('r4', [
      { name: 'Crown Crust Pizza', price: 1400, desc: 'Signature pizza with chicken-stuffed crust.', img: imgs.pizza1, category: 'Pizza' },
      { name: 'Euro Pizza', price: 1300, desc: 'Smoked chicken, sausages, and mushrooms.', img: imgs.pizza2, category: 'Pizza' },
      { name: 'Fajita Sicilian', price: 1250, desc: 'Spicy chicken fajita with jalapenos.', img: imgs.pizza1, category: 'Pizza' },
      { name: 'Chicken Tikka Pizza', price: 1200, desc: 'Traditional chicken tikka flavor.', img: imgs.pizza2, category: 'Pizza' },
      { name: 'Veggie Lover', price: 1000, desc: 'Loaded with fresh vegetables.', img: imgs.pizza1, category: 'Pizza' },
      { name: 'Zinger Burger', price: 500, desc: 'Crispy chicken burger with mayo.', img: imgs.burger1, category: 'Burger' },
      { name: 'Tower Burger', price: 700, desc: 'Double crispy chicken fillet burger.', img: imgs.burger2, category: 'Burger' },
      { name: 'Oven Baked Wings', price: 500, desc: 'Spicy oven-baked chicken wings.', img: imgs.chicken1, category: 'Sides' },
      { name: 'Garlic Bread', price: 300, desc: 'Freshly baked garlic bread.', img: imgs.fastfood1, category: 'Sides' },
      { name: 'Fettuccine Alfredo', price: 800, desc: 'Creamy pasta with grilled chicken.', img: imgs.pasta1, category: 'Pasta' }
    ])
  },
  {
    id: 'r5', name: 'Savour Foods', location: 'G-8 Markaz, Islamabad', rating: 4.6, image: imgs.rest_savour, categories: ['Desi', 'Fast Food'],
    deliveryTime: '20-30 min', priceRange: '$',
    menu: createMenu('r5', [
      { name: 'Chicken Pulao', price: 450, desc: 'Traditional chicken pulao with shami kebab.', img: imgs.rice1, category: 'Rice' },
      { name: 'Beef Pulao', price: 550, desc: 'Flavorful beef pulao with shami kebab.', img: imgs.rice1, category: 'Rice' },
      { name: 'Zinger Burger', price: 400, desc: 'Crispy chicken burger.', img: imgs.burger1, category: 'Burger' },
      { name: 'Chicken Roast', price: 600, desc: 'Spicy roasted chicken quarter.', img: imgs.chicken1, category: 'Chicken' },
      { name: 'Shami Kebab', price: 100, desc: 'Traditional beef and lentil patty.', img: imgs.desi3, category: 'Sides' },
      { name: 'Chicken Piece', price: 250, desc: 'Fried chicken piece.', img: imgs.chicken1, category: 'Chicken' },
      { name: 'French Fries', price: 200, desc: 'Crispy potato fries.', img: imgs.fastfood1, category: 'Sides' },
      { name: 'Zarda', price: 250, desc: 'Sweet yellow rice with nuts.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Kheer', price: 200, desc: 'Traditional rice pudding.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Soft Drink', price: 100, desc: 'Chilled beverage.', img: imgs.drink1, category: 'Beverages' }
    ])
  },
  {
    id: 'r6', name: 'Burning Brownie', location: 'F-7 Markaz, Islamabad', rating: 4.9, image: imgs.rest_burning_brownie, categories: ['Cafe', 'Desserts'],
    deliveryTime: '15-25 min', priceRange: '$$$',
    menu: createMenu('r6', [
      { name: 'Classic Brownie', price: 450, desc: 'Rich and fudgy chocolate brownie.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Cheesecake Slice', price: 650, desc: 'New York style cheesecake.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Cappuccino', price: 550, desc: 'Freshly brewed espresso with steamed milk foam.', img: imgs.coffee1, category: 'Coffee' },
      { name: 'Latte', price: 500, desc: 'Espresso with steamed milk.', img: imgs.coffee1, category: 'Coffee' },
      { name: 'Iced Caramel Macchiato', price: 600, desc: 'Chilled espresso with caramel and milk.', img: imgs.coffee1, category: 'Coffee' },
      { name: 'Club Sandwich', price: 850, desc: 'Triple-decker sandwich with chicken and egg.', img: imgs.burger1, category: 'Sandwich' },
      { name: 'Chicken Fajita Panini', price: 750, desc: 'Grilled panini with spicy chicken fajita.', img: imgs.burger2, category: 'Sandwich' },
      { name: 'Molten Lava Cake', price: 700, desc: 'Warm chocolate cake with a gooey center.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Mint Margarita', price: 450, desc: 'Refreshing mint and lemon drink.', img: imgs.drink1, category: 'Beverages' },
      { name: 'Lotus Biscoff Shake', price: 750, desc: 'Thick shake made with Lotus Biscoff spread.', img: imgs.drink1, category: 'Beverages' }
    ])
  },
  {
    id: 'r7', name: 'Tuscany Courtyard', location: 'F-6 Markaz, Islamabad', rating: 4.8, image: imgs.rest_tuscany, categories: ['Italian', 'Healthy'],
    deliveryTime: '45-60 min', priceRange: '$$$$',
    menu: createMenu('r7', [
      { name: 'Penne Arrabiata', price: 950, desc: 'Penne pasta in spicy tomato sauce.', img: imgs.pasta1, category: 'Pasta' },
      { name: 'Grilled Chicken Parmesan', price: 1250, desc: 'Breaded chicken breast topped with cheese.', img: imgs.chicken1, category: 'Chicken' },
      { name: 'Beef Tenderloin Steak', price: 2500, desc: 'Premium beef steak with peppercorn sauce.', img: imgs.steak1, category: 'Steak' },
      { name: 'Caesar Salad', price: 850, desc: 'Crisp romaine lettuce with Caesar dressing.', img: imgs.salad1, category: 'Salad' },
      { name: 'Quinoa Salad', price: 950, desc: 'Healthy quinoa mixed with fresh vegetables.', img: imgs.salad1, category: 'Salad' },
      { name: 'Margherita Pizza', price: 1100, desc: 'Classic pizza with fresh mozzarella and basil.', img: imgs.pizza1, category: 'Pizza' },
      { name: 'Seafood Risotto', price: 1800, desc: 'Creamy Italian rice with mixed seafood.', img: imgs.rice1, category: 'Rice' },
      { name: 'Tiramisu', price: 750, desc: 'Classic Italian coffee-flavored dessert.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Panna Cotta', price: 650, desc: 'Sweetened cream thickened with gelatin.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Fresh Lime', price: 350, desc: 'Refreshing lime juice with soda.', img: imgs.drink1, category: 'Beverages' }
    ])
  },
  {
    id: 'r8', name: 'Kabul Restaurant', location: 'F-7 Markaz, Islamabad', rating: 4.5, image: imgs.rest_kabul, categories: ['Desi'],
    deliveryTime: '30-45 min', priceRange: '$$',
    menu: createMenu('r8', [
      { name: 'Kabuli Pulao', price: 850, desc: 'Traditional Afghan rice with meat, carrots, and raisins.', img: imgs.rice1, category: 'Rice' },
      { name: 'Afghan Kebab', price: 950, desc: 'Tender minced meat kebabs with Afghan spices.', img: imgs.desi3, category: 'BBQ' },
      { name: 'Mutton Tikka', price: 1200, desc: 'Juicy mutton pieces grilled to perfection.', img: imgs.desi3, category: 'BBQ' },
      { name: 'Chicken Boti', price: 800, desc: 'Spicy marinated chicken pieces grilled on charcoal.', img: imgs.desi3, category: 'BBQ' },
      { name: 'Chapli Kebab', price: 600, desc: 'Peshawari style flat minced meat kebab.', img: imgs.desi3, category: 'BBQ' },
      { name: 'Afghani Naan', price: 100, desc: 'Large traditional Afghan flatbread.', img: imgs.desi4, category: 'Breads' },
      { name: 'Mutton Karahi', price: 1800, desc: 'Mutton cooked in a wok with tomatoes and spices.', img: imgs.desi2, category: 'Curry' },
      { name: 'Chicken Karahi', price: 1400, desc: 'Chicken cooked in a wok with tomatoes and spices.', img: imgs.desi2, category: 'Curry' },
      { name: 'Green Tea', price: 150, desc: 'Traditional Afghan green tea with cardamom.', img: imgs.coffee1, category: 'Beverages' },
      { name: 'Firni', price: 300, desc: 'Sweet rice pudding flavored with cardamom and nuts.', img: imgs.dessert1, category: 'Desserts' }
    ])
  },
  {
    id: 'r9', name: 'Ginyaki', location: 'F-7 Markaz, Islamabad', rating: 4.8, image: imgs.rest_ginyaki, categories: ['Chinese'],
    deliveryTime: '35-50 min', priceRange: '$$$',
    menu: createMenu('r9', [
      { name: 'Ginyaki Special Soup', price: 550, desc: 'Thick soup with chicken, prawns, and vegetables.', img: imgs.soup1, category: 'Soup' },
      { name: 'Crispy Beef', price: 1100, desc: 'Crispy fried beef strips in a sweet and spicy sauce.', img: imgs.chinese1, category: 'Beef' },
      { name: 'Sesame Chicken', price: 950, desc: 'Crispy chicken coated in a sweet sesame sauce.', img: imgs.chinese1, category: 'Chicken' },
      { name: 'Sweet & Sour Chicken', price: 900, desc: 'Chicken chunks with bell peppers in sweet and sour sauce.', img: imgs.chinese1, category: 'Chicken' },
      { name: 'Garlic Rice', price: 450, desc: 'Fried rice flavored with roasted garlic.', img: imgs.rice1, category: 'Rice' },
      { name: 'Hakka Noodles', price: 650, desc: 'Stir-fried noodles with vegetables and chicken.', img: imgs.chinese1, category: 'Noodles' },
      { name: 'Prawn Tempura', price: 1200, desc: 'Crispy deep-fried battered prawns.', img: imgs.chinese1, category: 'Seafood' },
      { name: 'Spring Rolls', price: 400, desc: 'Crispy rolls stuffed with vegetables and chicken.', img: imgs.fastfood1, category: 'Appetizers' },
      { name: 'Mango Chiller', price: 450, desc: 'Refreshing mango flavored iced drink.', img: imgs.drink1, category: 'Beverages' },
      { name: 'Fried Ice Cream', price: 550, desc: 'Vanilla ice cream coated in a crispy shell and deep-fried.', img: imgs.dessert1, category: 'Desserts' }
    ])
  },
  {
    id: 'r10', name: 'Chaaye Khana', location: 'F-6 Markaz, Islamabad', rating: 4.8, image: imgs.rest_chaaye_khana, categories: ['Cafe', 'Desi'],
    deliveryTime: '20-35 min', priceRange: '$$',
    menu: createMenu('r10', [
      { name: 'Special Mixed Tea', price: 250, desc: 'Signature strong milk tea.', img: imgs.coffee1, category: 'Tea' },
      { name: 'Kashmiri Chai', price: 300, desc: 'Traditional pink tea with crushed nuts.', img: imgs.coffee1, category: 'Tea' },
      { name: 'Aloo Paratha', price: 350, desc: 'Flaky flatbread stuffed with spiced potatoes.', img: imgs.desi4, category: 'Breakfast' },
      { name: 'Chicken Qeema', price: 650, desc: 'Minced chicken cooked with spices.', img: imgs.desi2, category: 'Curry' },
      { name: 'French Toast', price: 450, desc: 'Classic french toast served with maple syrup.', img: imgs.dessert1, category: 'Breakfast' },
      { name: 'Club Sandwich', price: 750, desc: 'Triple-decker sandwich with chicken, egg, and cheese.', img: imgs.burger1, category: 'Sandwich' },
      { name: 'Chicken Patties', price: 200, desc: 'Flaky puff pastry filled with savory chicken.', img: imgs.fastfood1, category: 'Snacks' },
      { name: 'Chocolate Cake', price: 550, desc: 'Rich and moist chocolate cake slice.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Walnut Pie', price: 600, desc: 'Sweet pie crust filled with caramelized walnuts.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Cold Coffee', price: 450, desc: 'Chilled blended coffee with milk and sugar.', img: imgs.coffee1, category: 'Beverages' }
    ])
  },
  {
    id: 'r11', name: 'Ranchers', location: 'I-8 Markaz, Islamabad', rating: 4.5, image: imgs.rest_ranchers, categories: ['Fast Food'],
    deliveryTime: '30-40 min', priceRange: '$$',
    menu: createMenu('r11', [
      { name: 'Big Bang Burger', price: 750, desc: 'Huge beef patty with special ranch sauce.', img: imgs.burger1, category: 'Burger' },
      { name: 'Cowboy Burger', price: 850, desc: 'Beef patty with onion rings and BBQ sauce.', img: imgs.burger2, category: 'Burger' },
      { name: 'Chicken Rodeo', price: 650, desc: 'Crispy chicken with jalapenos and spicy mayo.', img: imgs.burger1, category: 'Burger' },
      { name: 'Firehouse Burger', price: 800, desc: 'Spicy beef burger with hot sauce.', img: imgs.burger2, category: 'Burger' },
      { name: 'Ranch Fries', price: 450, desc: 'Fries topped with ranch dressing and herbs.', img: imgs.fastfood1, category: 'Sides' },
      { name: 'Chicken Strips', price: 550, desc: '5 pieces of crispy chicken strips.', img: imgs.chicken1, category: 'Chicken' },
      { name: 'Cheese Balls', price: 400, desc: 'Deep-fried mozzarella cheese balls.', img: imgs.fastfood1, category: 'Sides' },
      { name: 'Steak Sandwich', price: 950, desc: 'Sliced steak with onions and peppers.', img: imgs.steak1, category: 'Sandwich' },
      { name: 'Vanilla Shake', price: 400, desc: 'Classic vanilla bean milkshake.', img: imgs.drink1, category: 'Beverages' },
      { name: 'Apple Pie', price: 350, desc: 'Warm apple pie with cinnamon.', img: imgs.dessert1, category: 'Desserts' }
    ])
  },
  {
    id: 'r12', name: 'Johnny & Jugnu', location: 'F-11 Markaz, Islamabad', rating: 4.7, image: imgs.rest_johnny, categories: ['Fast Food'],
    deliveryTime: '25-35 min', priceRange: '$$',
    menu: createMenu('r12', [
      { name: 'Wehshi Burger', price: 650, desc: 'Spicy crispy chicken burger with signature sauce.', img: imgs.burger1, category: 'Burger' },
      { name: 'Tortilla Wrap', price: 550, desc: 'Crispy chicken wrap with fresh veggies.', img: imgs.fastfood1, category: 'Wrap' },
      { name: 'Fillet Burger', price: 600, desc: 'Classic chicken fillet burger.', img: imgs.burger2, category: 'Burger' },
      { name: 'Mushroom Burger', price: 750, desc: 'Beef patty with creamy mushroom sauce.', img: imgs.burger1, category: 'Burger' },
      { name: 'Atomic Fries', price: 500, desc: 'Super spicy loaded fries.', img: imgs.fastfood1, category: 'Sides' },
      { name: 'Garlic Mayo Fries', price: 400, desc: 'Fries with creamy garlic mayo.', img: imgs.fastfood1, category: 'Sides' },
      { name: 'Chicken Chunks', price: 450, desc: '8 pieces of spicy chicken chunks.', img: imgs.chicken1, category: 'Chicken' },
      { name: 'Nuggets', price: 350, desc: '6 pieces of golden nuggets.', img: imgs.chicken1, category: 'Chicken' },
      { name: 'Chocolate Brownie', price: 300, desc: 'Warm chocolate brownie.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Fresh Lime', price: 200, desc: 'Chilled lime soda.', img: imgs.drink1, category: 'Beverages' }
    ])
  },
  {
    id: 'r13', name: 'OPTP', location: 'F-7 Markaz, Islamabad', rating: 4.2, image: imgs.rest_optp, categories: ['Fast Food'],
    deliveryTime: '20-30 min', priceRange: '$$',
    menu: createMenu('r13', [
      { name: 'Natural Fries', price: 350, desc: 'Hand-cut skin-on natural fries.', img: imgs.fastfood1, category: 'Fries' },
      { name: 'Masala Fries', price: 380, desc: 'Fries with spicy masala seasoning.', img: imgs.fastfood1, category: 'Fries' },
      { name: 'Garlic Mayo Fries', price: 420, desc: 'Fries topped with garlic mayo.', img: imgs.fastfood1, category: 'Fries' },
      { name: 'Zing Burger', price: 550, desc: 'Crispy chicken thigh burger.', img: imgs.burger1, category: 'Burger' },
      { name: 'GMC Burger', price: 650, desc: 'Garlic mayo chicken burger.', img: imgs.burger2, category: 'Burger' },
      { name: 'Fish & Chips', price: 950, desc: 'Crispy battered fish with fries.', img: imgs.chinese1, category: 'Seafood' },
      { name: 'Chicken Wings', price: 450, desc: '6 pieces of BBQ wings.', img: imgs.chicken1, category: 'Chicken' },
      { name: 'Nuggets', price: 300, desc: '6 pieces of chicken nuggets.', img: imgs.chicken1, category: 'Chicken' },
      { name: 'Dip Sauce', price: 50, desc: 'Extra dip sauce.', img: imgs.fastfood1, category: 'Sides' },
      { name: 'Soft Drink', price: 150, desc: 'Chilled beverage.', img: imgs.drink1, category: 'Beverages' }
    ])
  },
  {
    id: 'r14', name: 'Hardee\'s', location: 'F-7 Markaz, Islamabad', rating: 4.4, image: imgs.rest_hardees, categories: ['Fast Food'],
    deliveryTime: '35-45 min', priceRange: '$$$',
    menu: createMenu('r14', [
      { name: 'Famous Star', price: 950, desc: 'Charbroiled beef patty with cheese.', img: imgs.burger1, category: 'Burger' },
      { name: 'Super Star', price: 1350, desc: 'Double charbroiled beef patties.', img: imgs.burger2, category: 'Burger' },
      { name: 'Mushroom & Swiss', price: 1100, desc: 'Beef patty with mushroom sauce and Swiss cheese.', img: imgs.burger1, category: 'Burger' },
      { name: 'Santa Fe Chicken', price: 900, desc: 'Grilled chicken with Santa Fe sauce.', img: imgs.burger2, category: 'Burger' },
      { name: 'Curly Fries', price: 450, desc: 'Signature seasoned curly fries.', img: imgs.fastfood1, category: 'Sides' },
      { name: 'Hand-Breaded Tenders', price: 750, desc: '3 pieces of crispy chicken tenders.', img: imgs.chicken1, category: 'Chicken' },
      { name: 'Onion Rings', price: 400, desc: 'Crispy breaded onion rings.', img: imgs.fastfood1, category: 'Sides' },
      { name: 'Ice Cream Shake', price: 650, desc: 'Hand-scooped real ice cream shake.', img: imgs.drink1, category: 'Beverages' },
      { name: 'Chocolate Chip Cookie', price: 250, desc: 'Freshly baked large cookie.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Soft Drink', price: 200, desc: 'Refillable chilled beverage.', img: imgs.drink1, category: 'Beverages' }
    ])
  },
  {
    id: 'r15', name: 'Chop Chop Wok', location: 'F-7 Markaz, Islamabad', rating: 4.6, image: imgs.rest_chopchop, categories: ['Chinese'],
    deliveryTime: '30-45 min', priceRange: '$$$',
    menu: createMenu('r15', [
      { name: '3-Step Wok', price: 1200, desc: 'Customize your wok with base, protein, and sauce.', img: imgs.chinese1, category: 'Wok' },
      { name: 'Chicken Chilli Dry', price: 950, desc: 'Sliced chicken with green chillies and ginger.', img: imgs.chinese1, category: 'Chicken' },
      { name: 'Beef with Basil', price: 1100, desc: 'Stir-fried beef with fresh basil and oyster sauce.', img: imgs.chinese1, category: 'Beef' },
      { name: 'Prawn Tempura', price: 1400, desc: '6 pieces of crispy fried prawns.', img: imgs.chinese1, category: 'Seafood' },
      { name: 'Egg Fried Rice', price: 450, desc: 'Classic stir-fried rice with eggs.', img: imgs.rice1, category: 'Rice' },
      { name: 'Chow Mein', price: 850, desc: 'Stir-fried noodles with chicken and vegetables.', img: imgs.chinese1, category: 'Noodles' },
      { name: 'Hot & Sour Soup', price: 450, desc: 'Classic spicy and sour soup.', img: imgs.soup1, category: 'Soup' },
      { name: 'Spring Rolls', price: 350, desc: '4 pieces of vegetable spring rolls.', img: imgs.fastfood1, category: 'Appetizer' },
      { name: 'Thai Green Curry', price: 1150, desc: 'Spicy green curry with coconut milk.', img: imgs.chinese1, category: 'Curry' },
      { name: 'Iced Tea', price: 300, desc: 'Refreshing peach iced tea.', img: imgs.drink1, category: 'Beverages' }
    ])
  },
  {
    id: 'r16', name: 'China Town', location: 'F-8 Markaz, Islamabad', rating: 4.4, image: imgs.rest_chinatown, categories: ['Chinese'],
    deliveryTime: '35-50 min', priceRange: '$$$',
    menu: createMenu('r16', [
      { name: 'Kung Pao Chicken', price: 950, desc: 'Chicken with peanuts and dried chillies.', img: imgs.chinese1, category: 'Chicken' },
      { name: 'Manchurian Chicken', price: 900, desc: 'Chicken in a tangy tomato-based sauce.', img: imgs.chinese1, category: 'Chicken' },
      { name: 'Szechuan Beef', price: 1100, desc: 'Spicy beef in Szechuan sauce.', img: imgs.chinese1, category: 'Beef' },
      { name: 'Sweet & Sour Prawns', price: 1350, desc: 'Prawns with pineapple and bell peppers.', img: imgs.chinese1, category: 'Seafood' },
      { name: 'Vegetable Fried Rice', price: 400, desc: 'Rice stir-fried with seasonal veggies.', img: imgs.rice1, category: 'Rice' },
      { name: 'Chicken Chow Mein', price: 800, desc: 'Noodles with chicken and cabbage.', img: imgs.chinese1, category: 'Noodles' },
      { name: 'Corn Soup', price: 400, desc: 'Creamy sweet corn soup with chicken.', img: imgs.soup1, category: 'Soup' },
      { name: 'Dumplings', price: 650, desc: '6 pieces of steamed chicken dumplings.', img: imgs.chinese1, category: 'Appetizer' },
      { name: 'Beef Chilli Onion', price: 1050, desc: 'Beef stir-fried with onions and green chillies.', img: imgs.chinese1, category: 'Beef' },
      { name: 'Mint Margarita', price: 350, desc: 'Refreshing mint and lime drink.', img: imgs.drink1, category: 'Beverages' }
    ])
  },
  {
    id: 'r17', name: 'Wok Republic', location: 'F-7 Markaz, Islamabad', rating: 4.5, image: imgs.rest_wokrepublic, categories: ['Chinese'],
    deliveryTime: '30-40 min', priceRange: '$$',
    menu: createMenu('r17', [
      { name: 'Nasi Goreng', price: 950, desc: 'Indonesian fried rice with chicken and egg.', img: imgs.rice1, category: 'Rice' },
      { name: 'Pad Thai', price: 1050, desc: 'Thai stir-fried rice noodles with peanuts.', img: imgs.chinese1, category: 'Noodles' },
      { name: 'Korean Fried Chicken', price: 850, desc: 'Crispy chicken with spicy Korean glaze.', img: imgs.chicken1, category: 'Chicken' },
      { name: 'Teriyaki Beef', price: 1150, desc: 'Beef strips in sweet teriyaki sauce.', img: imgs.chinese1, category: 'Beef' },
      { name: 'Tom Yum Soup', price: 600, desc: 'Spicy and sour Thai soup with prawns.', img: imgs.soup1, category: 'Soup' },
      { name: 'Dynamite Prawns', price: 1250, desc: 'Crispy prawns in spicy mayo sauce.', img: imgs.chinese1, category: 'Appetizer' },
      { name: 'Singaporean Rice', price: 1100, desc: 'Layered rice, noodles, and chicken gravy.', img: imgs.rice1, category: 'Rice' },
      { name: 'Stir-fry Veggies', price: 650, desc: 'Assorted seasonal vegetables in light sauce.', img: imgs.chinese1, category: 'Vegetables' },
      { name: 'Sticky Toffee Pudding', price: 550, desc: 'Warm pudding with toffee sauce.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Thai Tea', price: 350, desc: 'Sweet and creamy Thai milk tea.', img: imgs.drink1, category: 'Beverages' }
    ])
  },
  {
    id: 'r18', name: 'Lanzhou Beef Noodles', location: 'F-7 Markaz, Islamabad', rating: 4.8, image: imgs.rest_lanzhou, categories: ['Chinese', 'Healthy'],
    deliveryTime: '25-35 min', priceRange: '$$',
    menu: createMenu('r18', [
      { name: 'Signature Beef Noodles', price: 950, desc: 'Hand-pulled noodles in clear beef broth.', img: imgs.chinese1, category: 'Noodles' },
      { name: 'Dry Beef Noodles', price: 900, desc: 'Hand-pulled noodles with spicy beef sauce.', img: imgs.chinese1, category: 'Noodles' },
      { name: 'Braised Beef', price: 1100, desc: 'Slow-cooked tender beef chunks.', img: imgs.chinese1, category: 'Beef' },
      { name: 'Cold Beef Salad', price: 750, desc: 'Sliced beef with cilantro and chilli oil.', img: imgs.chinese1, category: 'Appetizer' },
      { name: 'Scallion Pancake', price: 350, desc: 'Crispy flatbread with green onions.', img: imgs.fastfood1, category: 'Appetizer' },
      { name: 'Stir-fry Bok Choy', price: 550, desc: 'Fresh bok choy with garlic.', img: imgs.chinese1, category: 'Vegetables' },
      { name: 'Beef Dumplings', price: 850, desc: '8 pieces of boiled beef dumplings.', img: imgs.chinese1, category: 'Appetizer' },
      { name: 'Egg Tomato Noodles', price: 800, desc: 'Hand-pulled noodles with egg and tomato.', img: imgs.chinese1, category: 'Noodles' },
      { name: 'Herbal Tea', price: 250, desc: 'Traditional Chinese herbal tea.', img: imgs.drink1, category: 'Beverages' },
      { name: 'Mochi', price: 450, desc: 'Sweet rice cake with various fillings.', img: imgs.dessert1, category: 'Desserts' }
    ])
  },
  {
    id: 'r19', name: 'La Terrazza', location: 'The Centaurus Mall, Islamabad', rating: 4.5, image: imgs.rest_laterrazza, categories: ['Italian'],
    deliveryTime: '40-55 min', priceRange: '$$$',
    menu: createMenu('r19', [
      { name: 'Fettuccine Alfredo', price: 1100, desc: 'Fettuccine pasta in rich creamy white sauce.', img: imgs.pasta1, category: 'Pasta' },
      { name: 'Margherita Pizza', price: 1200, desc: 'Classic tomato and mozzarella pizza.', img: imgs.pizza1, category: 'Pizza' },
      { name: 'Chicken Lasagna', price: 1050, desc: 'Layered pasta with chicken and cheese.', img: imgs.pasta1, category: 'Pasta' },
      { name: 'Bruschetta', price: 550, desc: 'Toasted bread with tomato and basil.', img: imgs.fastfood1, category: 'Appetizer' },
      { name: 'Caesar Salad', price: 750, desc: 'Fresh romaine lettuce with parmesan.', img: imgs.healthy1, category: 'Salad' },
      { name: 'Minestrone Soup', price: 450, desc: 'Traditional Italian vegetable soup.', img: imgs.soup1, category: 'Soup' },
      { name: 'Grilled Salmon', price: 1850, desc: 'Fresh salmon with lemon butter sauce.', img: imgs.chinese1, category: 'Seafood' },
      { name: 'Tiramisu', price: 650, desc: 'Classic Italian coffee-flavored dessert.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Panna Cotta', price: 550, desc: 'Creamy Italian custard with berry sauce.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Espresso', price: 350, desc: 'Strong black Italian coffee.', img: imgs.coffee1, category: 'Beverages' }
    ])
  },
  {
    id: 'r20', name: 'Pappasallis', location: 'F-7 Markaz, Islamabad', rating: 4.3, image: imgs.rest_pappasallis, categories: ['Italian', 'Fast Food'],
    deliveryTime: '30-45 min', priceRange: '$$',
    menu: createMenu('r20', [
      { name: 'Deep Dish Pizza', price: 1500, desc: 'Chicago-style thick crust pizza.', img: imgs.pizza2, category: 'Pizza' },
      { name: 'Spaghetti Bolognese', price: 950, desc: 'Spaghetti with rich meat sauce.', img: imgs.pasta1, category: 'Pasta' },
      { name: 'Chicken Kiev', price: 1150, desc: 'Breaded chicken stuffed with garlic butter.', img: imgs.chicken1, category: 'Chicken' },
      { name: 'Garlic Bread', price: 350, desc: 'Toasted bread with garlic and herbs.', img: imgs.fastfood1, category: 'Appetizer' },
      { name: 'Stuffed Mushrooms', price: 650, desc: 'Mushrooms filled with cheese and herbs.', img: imgs.fastfood1, category: 'Appetizer' },
      { name: 'Chicken Steak', price: 1250, desc: 'Grilled chicken breast with mushroom sauce.', img: imgs.steak1, category: 'Steak' },
      { name: 'Beef Lasagna', price: 1100, desc: 'Layered pasta with minced beef.', img: imgs.pasta1, category: 'Pasta' },
      { name: 'Greek Salad', price: 650, desc: 'Fresh veggies with feta and olives.', img: imgs.healthy1, category: 'Salad' },
      { name: 'Apple Crumble', price: 450, desc: 'Warm apple dessert with crumbly topping.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Lemonade', price: 250, desc: 'Freshly squeezed lemon juice.', img: imgs.drink1, category: 'Beverages' }
    ])
  },
  {
    id: 'r21', name: 'Cafe Aylanto', location: 'F-7 Markaz, Islamabad', rating: 4.7, image: imgs.rest_aylanto, categories: ['Italian', 'Healthy'],
    deliveryTime: '45-60 min', priceRange: '$$$$',
    menu: createMenu('r21', [
      { name: 'Moroccan Chicken', price: 1450, desc: 'Grilled chicken with spicy Moroccan sauce.', img: imgs.chicken1, category: 'Chicken' },
      { name: 'Beef Medallions', price: 1950, desc: 'Tender beef medallions with pepper sauce.', img: imgs.steak1, category: 'Steak' },
      { name: 'Lobster Thermidor', price: 3500, desc: 'Creamy lobster baked in its shell.', img: imgs.chinese1, category: 'Seafood' },
      { name: 'Burrata Salad', price: 1250, desc: 'Fresh burrata cheese with tomatoes.', img: imgs.healthy1, category: 'Salad' },
      { name: 'Mushroom Risotto', price: 1150, desc: 'Creamy rice with wild mushrooms.', img: imgs.rice1, category: 'Rice' },
      { name: 'Seafood Pasta', price: 1650, desc: 'Pasta with prawns, mussels, and squid.', img: imgs.pasta1, category: 'Pasta' },
      { name: 'French Onion Soup', price: 650, desc: 'Classic soup with caramelized onions.', img: imgs.soup1, category: 'Soup' },
      { name: 'Chocolate Fondant', price: 850, desc: 'Warm chocolate cake with molten center.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Creme Brulee', price: 750, desc: 'Rich custard with burnt sugar topping.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Fresh Juice', price: 450, desc: 'Seasonal fresh fruit juice.', img: imgs.drink1, category: 'Beverages' }
    ])
  },
  {
    id: 'r22', name: 'Pizza Originale', location: 'F-11 Markaz, Islamabad', rating: 4.6, image: imgs.rest_pizzaoriginale, categories: ['Italian'],
    deliveryTime: '25-40 min', priceRange: '$$',
    menu: createMenu('r22', [
      { name: 'Neapolitan Pizza', price: 1100, desc: 'Authentic thin crust pizza.', img: imgs.pizza1, category: 'Pizza' },
      { name: 'Quattro Formaggi', price: 1300, desc: 'Four cheese pizza.', img: imgs.pizza1, category: 'Pizza' },
      { name: 'Diavola Pizza', price: 1250, desc: 'Spicy salami and chilli pizza.', img: imgs.pizza1, category: 'Pizza' },
      { name: 'Calzone', price: 1050, desc: 'Folded pizza stuffed with cheese and meat.', img: imgs.pizza2, category: 'Pizza' },
      { name: 'Pesto Pasta', price: 950, desc: 'Pasta with fresh basil pesto.', img: imgs.pasta1, category: 'Pasta' },
      { name: 'Caprese Salad', price: 750, desc: 'Tomato, mozzarella, and basil salad.', img: imgs.healthy1, category: 'Salad' },
      { name: 'Garlic Knots', price: 350, desc: 'Soft bread knots with garlic butter.', img: imgs.fastfood1, category: 'Appetizer' },
      { name: 'Meatballs', price: 650, desc: 'Italian meatballs in tomato sauce.', img: imgs.chicken1, category: 'Appetizer' },
      { name: 'Cannoli', price: 450, desc: 'Crispy pastry tubes with sweet filling.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Italian Soda', price: 300, desc: 'Sparkling water with fruit syrup.', img: imgs.drink1, category: 'Beverages' }
    ])
  },
  {
    id: 'r23', name: 'Loafology', location: 'F-7 Markaz, Islamabad', rating: 4.8, image: imgs.rest_loafology, categories: ['Cafe', 'Healthy'],
    deliveryTime: '20-35 min', priceRange: '$$$',
    menu: createMenu('r23', [
      { name: 'Sourdough Avocado Toast', price: 850, desc: 'Fresh avocado on toasted sourdough bread.', img: imgs.healthy1, category: 'Breakfast' },
      { name: 'Eggs Benedict', price: 950, desc: 'Poached eggs with hollandaise sauce.', img: imgs.healthy1, category: 'Breakfast' },
      { name: 'Smoked Salmon Bagel', price: 1100, desc: 'Bagel with cream cheese and smoked salmon.', img: imgs.healthy1, category: 'Breakfast' },
      { name: 'Quinoa Salad', price: 800, desc: 'Healthy quinoa with roasted vegetables.', img: imgs.healthy1, category: 'Salad' },
      { name: 'Chicken Pesto Panini', price: 900, desc: 'Grilled panini with chicken and pesto.', img: imgs.burger1, category: 'Sandwich' },
      { name: 'Beef Pastrami Sandwich', price: 1200, desc: 'Slow-cooked beef pastrami on rye bread.', img: imgs.burger2, category: 'Sandwich' },
      { name: 'Almond Croissant', price: 450, desc: 'Flaky croissant with almond filling.', img: imgs.dessert1, category: 'Bakery' },
      { name: 'Blueberry Muffin', price: 350, desc: 'Freshly baked muffin with blueberries.', img: imgs.dessert1, category: 'Bakery' },
      { name: 'Flat White', price: 450, desc: 'Double shot of espresso with microfoam.', img: imgs.coffee1, category: 'Coffee' },
      { name: 'Matcha Latte', price: 550, desc: 'Japanese green tea with steamed milk.', img: imgs.coffee1, category: 'Beverages' }
    ])
  },
  {
    id: 'r24', name: 'Kitchen Cuisine', location: 'F-6 Markaz, Islamabad', rating: 4.4, image: imgs.rest_kitchencuisine, categories: ['Cafe', 'Desserts'],
    deliveryTime: '25-40 min', priceRange: '$$',
    menu: createMenu('r24', [
      { name: 'Chocolate Fudge Cake', price: 600, desc: 'Signature rich chocolate fudge cake.', img: imgs.dessert1, category: 'Cakes' },
      { name: 'Red Velvet Cake', price: 650, desc: 'Classic red velvet with cream cheese frosting.', img: imgs.dessert1, category: 'Cakes' },
      { name: 'Chicken Pot Pie', price: 750, desc: 'Creamy chicken filling in a flaky crust.', img: imgs.fastfood1, category: 'Savory' },
      { name: 'Beef Lasagna', price: 950, desc: 'Homemade style beef lasagna.', img: imgs.pasta1, category: 'Main' },
      { name: 'Chicken Pineapple Salad', price: 550, desc: 'Creamy salad with chicken and pineapple.', img: imgs.healthy1, category: 'Salad' },
      { name: 'Assorted Cookies', price: 400, desc: 'Box of 6 assorted butter cookies.', img: imgs.dessert1, category: 'Bakery' },
      { name: 'Cheese Omelette', price: 450, desc: 'Three-egg omelette with melted cheese.', img: imgs.healthy1, category: 'Breakfast' },
      { name: 'Cappuccino', price: 400, desc: 'Espresso with steamed milk and foam.', img: imgs.coffee1, category: 'Coffee' },
      { name: 'Hot Chocolate', price: 500, desc: 'Rich and creamy hot cocoa.', img: imgs.coffee1, category: 'Beverages' },
      { name: 'Fruit Tart', price: 350, desc: 'Sweet pastry shell with custard and fruit.', img: imgs.dessert1, category: 'Desserts' }
    ])
  },
  {
    id: 'r25', name: 'French Bakery', location: 'F-7 Markaz, Islamabad', rating: 4.5, image: imgs.rest_frenchbakery, categories: ['Cafe', 'Desserts'],
    deliveryTime: '20-30 min', priceRange: '$$',
    menu: createMenu('r25', [
      { name: 'Baguette', price: 250, desc: 'Traditional French crusty bread.', img: imgs.fastfood1, category: 'Bakery' },
      { name: 'Pain au Chocolat', price: 400, desc: 'Flaky pastry with chocolate center.', img: imgs.dessert1, category: 'Bakery' },
      { name: 'Macarons Box', price: 1200, desc: 'Box of 6 assorted French macarons.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Quiche Lorraine', price: 750, desc: 'Savory pie with eggs, cheese, and bacon.', img: imgs.fastfood1, category: 'Savory' },
      { name: 'Eclair', price: 350, desc: 'Choux pastry filled with cream.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Fruit Danish', price: 380, desc: 'Sweet pastry with fruit topping.', img: imgs.dessert1, category: 'Bakery' },
      { name: 'Chicken Mushroom Crepe', price: 850, desc: 'Thin pancake with savory filling.', img: imgs.fastfood1, category: 'Main' },
      { name: 'Cafe au Lait', price: 400, desc: 'Classic French coffee with milk.', img: imgs.coffee1, category: 'Coffee' },
      { name: 'Lemon Tart', price: 450, desc: 'Zesty lemon curd in a sweet crust.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Profiteroles', price: 550, desc: 'Small cream puffs with chocolate sauce.', img: imgs.dessert1, category: 'Desserts' }
    ])
  },
  {
    id: 'r26', name: 'Coffee Bean & Tea Leaf', location: 'F-6 Markaz, Islamabad', rating: 4.6, image: imgs.rest_coffeebean, categories: ['Cafe'],
    deliveryTime: '15-30 min', priceRange: '$$$',
    menu: createMenu('r26', [
      { name: 'Ice Blended Mocha', price: 750, desc: 'Signature coffee-based frozen drink.', img: imgs.coffee1, category: 'Beverages' },
      { name: 'Vanilla Latte', price: 650, desc: 'Espresso with vanilla syrup and milk.', img: imgs.coffee1, category: 'Coffee' },
      { name: 'Caramel Macchiato', price: 700, desc: 'Layered espresso with caramel.', img: imgs.coffee1, category: 'Coffee' },
      { name: 'African Sunrise Tea', price: 450, desc: 'Rooibos tea with honey and vanilla.', img: imgs.coffee1, category: 'Tea' },
      { name: 'Chicken Caesar Wrap', price: 850, desc: 'Grilled chicken with Caesar dressing.', img: imgs.fastfood1, category: 'Food' },
      { name: 'Beef Lasagna', price: 1100, desc: 'Hearty beef lasagna.', img: imgs.pasta1, category: 'Food' },
      { name: 'Chocolate Muffin', price: 350, desc: 'Moist chocolate chip muffin.', img: imgs.dessert1, category: 'Bakery' },
      { name: 'New York Cheesecake', price: 700, desc: 'Classic creamy cheesecake.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Cold Brew', price: 550, desc: 'Smooth slow-steeped iced coffee.', img: imgs.coffee1, category: 'Coffee' },
      { name: 'Hot Tea', price: 350, desc: 'Selection of premium loose leaf teas.', img: imgs.coffee1, category: 'Tea' }
    ])
  },
  {
    id: 'r27', name: 'Gloria Jean\'s', location: 'F-11 Markaz, Islamabad', rating: 4.3, image: imgs.rest_gloriajeans, categories: ['Cafe'],
    deliveryTime: '20-35 min', priceRange: '$$',
    menu: createMenu('r27', [
      { name: 'Chiller Mocha', price: 700, desc: 'Blended chocolate and coffee drink.', img: imgs.coffee1, category: 'Beverages' },
      { name: 'Americano', price: 450, desc: 'Espresso with hot water.', img: imgs.coffee1, category: 'Coffee' },
      { name: 'Cafe Latte', price: 550, desc: 'Espresso with steamed milk.', img: imgs.coffee1, category: 'Coffee' },
      { name: 'Hot Chocolate', price: 600, desc: 'Rich chocolate with frothed milk.', img: imgs.coffee1, category: 'Beverages' },
      { name: 'Chicken Tikka Sandwich', price: 650, desc: 'Spicy chicken tikka in toasted bread.', img: imgs.burger1, category: 'Food' },
      { name: 'Pasta Alfredo', price: 950, desc: 'Creamy pasta with chicken.', img: imgs.pasta1, category: 'Food' },
      { name: 'Carrot Cake', price: 500, desc: 'Spiced cake with cream cheese frosting.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Brownie with Ice Cream', price: 650, desc: 'Warm brownie with vanilla scoop.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Iced Americano', price: 450, desc: 'Chilled espresso with water.', img: imgs.coffee1, category: 'Coffee' },
      { name: 'English Breakfast Tea', price: 300, desc: 'Classic black tea.', img: imgs.coffee1, category: 'Tea' }
    ])
  },
  {
    id: 'r28', name: 'Butt Karahi', location: 'F-8 Markaz, Islamabad', rating: 4.6, image: imgs.rest_butt, categories: ['Desi'],
    deliveryTime: '40-55 min', priceRange: '$$$',
    menu: createMenu('r28', [
      { name: 'Chicken Karahi', price: 1800, desc: 'Full chicken karahi cooked in butter.', img: imgs.desi1, category: 'Karahi' },
      { name: 'Mutton Karahi', price: 2800, desc: 'Full mutton karahi with traditional spices.', img: imgs.desi1, category: 'Karahi' },
      { name: 'Chicken Makhni', price: 1200, desc: 'Boneless chicken in creamy butter gravy.', img: imgs.desi2, category: 'Curry' },
      { name: 'Brain Masala', price: 1400, desc: 'Spicy fried brain masala.', img: imgs.desi2, category: 'Specialty' },
      { name: 'Seekh Kebab', price: 850, desc: '4 pieces of beef seekh kebab.', img: imgs.desi3, category: 'BBQ' },
      { name: 'Chicken Boti', price: 950, desc: '8 pieces of grilled chicken boti.', img: imgs.desi3, category: 'BBQ' },
      { name: 'Roghni Naan', price: 80, desc: 'Fluffy naan with sesame seeds.', img: imgs.desi4, category: 'Bread' },
      { name: 'Garlic Naan', price: 100, desc: 'Naan topped with fresh garlic.', img: imgs.desi4, category: 'Bread' },
      { name: 'Fresh Salad', price: 150, desc: 'Seasonal fresh vegetable salad.', img: imgs.healthy1, category: 'Sides' },
      { name: 'Raita', price: 100, desc: 'Yogurt with herbs and spices.', img: imgs.fastfood1, category: 'Sides' }
    ])
  },
  {
    id: 'r29', name: 'Des Pardes', location: 'Saidpur Village, Islamabad', rating: 4.7, image: imgs.rest_despardes, categories: ['Desi'],
    deliveryTime: '50-65 min', priceRange: '$$$$',
    menu: createMenu('r29', [
      { name: 'Mutton Handi', price: 2200, desc: 'Mutton cooked in a clay pot.', img: imgs.desi2, category: 'Curry' },
      { name: 'Chicken Ginger', price: 1100, desc: 'Chicken cooked with fresh ginger and spices.', img: imgs.desi2, category: 'Curry' },
      { name: 'Fish Tikka', price: 1500, desc: 'Grilled fish marinated in desi spices.', img: imgs.desi3, category: 'BBQ' },
      { name: 'Daal Makhni', price: 750, desc: 'Lentils cooked with butter and cream.', img: imgs.desi2, category: 'Vegetarian' },
      { name: 'Palak Paneer', price: 850, desc: 'Spinach cooked with cottage cheese.', img: imgs.desi2, category: 'Vegetarian' },
      { name: 'Mixed BBQ Platter', price: 3500, desc: 'Assorted kebabs, boti, and chops.', img: imgs.desi3, category: 'BBQ' },
      { name: 'Kandhari Naan', price: 120, desc: 'Large traditional Kandhari naan.', img: imgs.desi4, category: 'Bread' },
      { name: 'Gulab Jamun', price: 450, desc: '3 pieces of sweet milk solids in syrup.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Kulfi', price: 350, desc: 'Traditional Pakistani ice cream.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Lassi', price: 300, desc: 'Sweet or salty yogurt drink.', img: imgs.drink1, category: 'Beverages' }
    ])
  },
  {
    id: 'r30', name: 'Usmania Restaurant', location: 'Blue Area, Islamabad', rating: 4.2, image: imgs.rest_usmania, categories: ['Desi', 'Chinese'],
    deliveryTime: '35-50 min', priceRange: '$$',
    menu: createMenu('r30', [
      { name: 'Chicken Biryani', price: 650, desc: 'Spicy and flavorful chicken biryani.', img: imgs.rice1, category: 'Rice' },
      { name: 'Mutton Biryani', price: 950, desc: 'Rich mutton biryani with aromatic rice.', img: imgs.rice1, category: 'Rice' },
      { name: 'Chicken Jalfrezi', price: 850, desc: 'Chicken with bell peppers and tomatoes.', img: imgs.desi2, category: 'Curry' },
      { name: 'Beef Nihari', price: 1100, desc: 'Slow-cooked beef stew.', img: imgs.desi2, category: 'Specialty' },
      { name: 'Chicken Shashlik', price: 950, desc: 'Chicken skewers with egg fried rice.', img: imgs.chinese1, category: 'Chinese' },
      { name: 'Vegetable Chow Mein', price: 750, desc: 'Stir-fried noodles with veggies.', img: imgs.chinese1, category: 'Chinese' },
      { name: 'Tandoori Roti', price: 30, desc: 'Whole wheat bread baked in tandoor.', img: imgs.desi4, category: 'Bread' },
      { name: 'Kheer', price: 400, desc: 'Traditional rice pudding.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Soft Drink', price: 150, desc: 'Chilled beverage.', img: imgs.drink1, category: 'Beverages' },
      { name: 'Mineral Water', price: 100, desc: 'Chilled mineral water.', img: imgs.drink1, category: 'Beverages' }
    ])
  },
  {
    id: 'r31', name: 'Student Biryani', location: 'I-8 Markaz, Islamabad', rating: 4.1, image: imgs.rest_studentbiryani, categories: ['Desi', 'Fast Food'],
    deliveryTime: '20-35 min', priceRange: '$',
    menu: createMenu('r31', [
      { name: 'Regular Chicken Biryani', price: 450, desc: 'Classic Karachi-style chicken biryani.', img: imgs.rice1, category: 'Rice' },
      { name: 'Large Chicken Biryani', price: 650, desc: 'Extra portion of chicken biryani.', img: imgs.rice1, category: 'Rice' },
      { name: 'Zarda', price: 350, desc: 'Sweet yellow rice with nuts.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Shami Kebab', price: 150, desc: '2 pieces of beef shami kebab.', img: imgs.desi3, category: 'Sides' },
      { name: 'Chicken Burger', price: 400, desc: 'Simple chicken patty burger.', img: imgs.burger1, category: 'Fast Food' },
      { name: 'Club Sandwich', price: 550, desc: 'Classic club sandwich with fries.', img: imgs.burger1, category: 'Fast Food' },
      { name: 'Raita', price: 50, desc: 'Spiced yogurt.', img: imgs.fastfood1, category: 'Sides' },
      { name: 'Salad', price: 50, desc: 'Fresh cut veggies.', img: imgs.healthy1, category: 'Sides' },
      { name: 'Soft Drink', price: 120, desc: 'Chilled beverage.', img: imgs.drink1, category: 'Beverages' },
      { name: 'Cold Coffee', price: 350, desc: 'Chilled coffee drink.', img: imgs.coffee1, category: 'Beverages' }
    ])
  },
  {
    id: 'r32', name: 'Tandoori Restaurant', location: 'G-8 Markaz, Islamabad', rating: 4.4, image: imgs.rest_tandoori, categories: ['Desi'],
    deliveryTime: '30-45 min', priceRange: '$$',
    menu: createMenu('r32', [
      { name: 'Tandoori Chicken', price: 1200, desc: 'Full chicken roasted in tandoor.', img: imgs.chicken1, category: 'BBQ' },
      { name: 'Chicken Malai Boti', price: 950, desc: 'Creamy grilled chicken chunks.', img: imgs.desi3, category: 'BBQ' },
      { name: 'Mutton Chops', price: 1800, desc: 'Grilled mutton chops with spices.', img: imgs.desi3, category: 'BBQ' },
      { name: 'Chicken Achari', price: 1050, desc: 'Chicken cooked with pickling spices.', img: imgs.desi2, category: 'Curry' },
      { name: 'Mix Vegetable', price: 650, desc: 'Seasonal vegetables cooked together.', img: imgs.desi2, category: 'Vegetarian' },
      { name: 'Daal Mash', price: 550, desc: 'Lentils cooked with ginger and garlic.', img: imgs.desi2, category: 'Vegetarian' },
      { name: 'Kalwanji Naan', price: 90, desc: 'Naan with nigella seeds.', img: imgs.desi4, category: 'Bread' },
      { name: 'Peshawari Naan', price: 150, desc: 'Sweet naan with nuts and raisins.', img: imgs.desi4, category: 'Bread' },
      { name: 'Suji Ka Halwa', price: 400, desc: 'Sweet semolina dessert.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Doodh Patti', price: 200, desc: 'Strong milk tea.', img: imgs.coffee1, category: 'Beverages' }
    ])
  },
  {
    id: 'r33', name: 'Burger Fest', location: 'F-7 Markaz, Islamabad', rating: 4.5, image: imgs.rest_burgerfest, categories: ['Fast Food'],
    deliveryTime: '25-35 min', priceRange: '$$',
    menu: createMenu('r33', [
      { name: 'The Beast', price: 1100, desc: 'Triple patty beef burger with extra cheese.', img: imgs.burger1, category: 'Burger' },
      { name: 'Swiss Mushroom', price: 850, desc: 'Beef patty with Swiss cheese and mushrooms.', img: imgs.burger2, category: 'Burger' },
      { name: 'Jalapeno Crunch', price: 750, desc: 'Crispy chicken with spicy jalapenos.', img: imgs.burger1, category: 'Burger' },
      { name: 'Classic Cheese', price: 650, desc: 'Simple and delicious cheeseburger.', img: imgs.burger2, category: 'Burger' },
      { name: 'Loaded Fries', price: 550, desc: 'Fries with cheese, chicken, and sauces.', img: imgs.fastfood1, category: 'Sides' },
      { name: 'Chicken Wings', price: 450, desc: '6 pieces of spicy buffalo wings.', img: imgs.chicken1, category: 'Chicken' },
      { name: 'Mozzarella Sticks', price: 500, desc: '4 pieces of gooey cheese sticks.', img: imgs.fastfood1, category: 'Sides' },
      { name: 'Onion Rings', price: 350, desc: 'Crispy fried onion rings.', img: imgs.fastfood1, category: 'Sides' },
      { name: 'Chocolate Shake', price: 450, desc: 'Thick chocolate milkshake.', img: imgs.drink1, category: 'Beverages' },
      { name: 'Brownie', price: 300, desc: 'Fudgy chocolate brownie.', img: imgs.dessert1, category: 'Desserts' }
    ])
  },
  {
    id: 'r34', name: 'Golden Dragon', location: 'F-7 Markaz, Islamabad', rating: 4.3, image: imgs.rest_goldendragon, categories: ['Chinese'],
    deliveryTime: '30-45 min', priceRange: '$$',
    menu: createMenu('r34', [
      { name: 'Dragon Special Rice', price: 850, desc: 'Rice with chicken, beef, and prawns.', img: imgs.rice1, category: 'Rice' },
      { name: 'Chicken with Cashew Nuts', price: 950, desc: 'Stir-fried chicken with crunchy cashews.', img: imgs.chinese1, category: 'Chicken' },
      { name: 'Beef with Broccoli', price: 1050, desc: 'Beef strips with fresh broccoli.', img: imgs.chinese1, category: 'Beef' },
      { name: 'Hot Garlic Prawns', price: 1300, desc: 'Prawns in spicy garlic sauce.', img: imgs.chinese1, category: 'Seafood' },
      { name: 'Vegetable Chow Mein', price: 700, desc: 'Noodles with assorted vegetables.', img: imgs.chinese1, category: 'Noodles' },
      { name: 'Wonton Soup', price: 450, desc: 'Clear soup with chicken wontons.', img: imgs.soup1, category: 'Soup' },
      { name: 'Chicken Drumsticks', price: 650, desc: '4 pieces of fried chicken drumsticks.', img: imgs.chicken1, category: 'Appetizer' },
      { name: 'Honey Chilli Potato', price: 450, desc: 'Crispy potatoes in sweet chilli glaze.', img: imgs.fastfood1, category: 'Appetizer' },
      { name: 'Fried Ice Cream', price: 550, desc: 'Unique hot and cold dessert.', img: imgs.dessert1, category: 'Desserts' },
      { name: 'Green Tea', price: 150, desc: 'Soothing hot green tea.', img: imgs.drink1, category: 'Beverages' }
    ])
  }
];
