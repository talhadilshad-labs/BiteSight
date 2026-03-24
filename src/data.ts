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
  desi1: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80', // Biryani
  desi2: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80', // Karahi
  desi3: 'https://images.unsplash.com/photo-1603496987351-f84a3ba5eca3?w=800&q=80', // Kebabs
  desi4: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80', // Naan/Curry
  fastfood1: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=800&q=80',
  soup1: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
  steak1: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80',
  rest_pizza: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
  rest_desi: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
  rest_cafe: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
  rest_chinese: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&q=80',
  rest_italian: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&q=80',
  rest_monal: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80', // Outdoor view
  rest_burger: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
  rest_coffee: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80',
  rest_fastfood: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
  rest_kfc: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=800&q=80', // Fried chicken
  rest_dominos: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800&q=80', // Pizza box/delivery
  rest_howdy: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=800&q=80', // Juicy burger
  rest_cheezious: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80', // Cheesy pizza
  rest_savour: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80', // Biryani/Pulao
  rest_burning_brownie: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80', // Cafe/Brownie
  rest_tuscany: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80', // Fine dining
  rest_kabul: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80', // Kebabs/Meat
  rest_ginyaki: 'https://images.unsplash.com/photo-1569058242253-1df3ad0cb45b?w=800&q=80', // Asian bowl
  rest_chaaye_khana: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80', // Tea/Breakfast
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
  }
];
