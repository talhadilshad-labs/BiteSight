import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, Star, Clock, MapPin, Filter, ChevronRight, Box, ShoppingBag } from 'lucide-react';
import { Restaurant, MenuItem, Category } from '../types';
import { SafeImage } from './Shared';

interface RestaurantListScreenProps {
  title: string;
  restaurants: Restaurant[];
  onBack: () => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  initialCategory?: Category | 'All';
}

export const RestaurantListScreen: React.FC<RestaurantListScreenProps> = ({ 
  title, 
  restaurants, 
  onBack, 
  onSelectRestaurant,
  initialCategory = 'All'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(initialCategory);

  const categories: (Category | 'All')[] = ['All', 'Fast Food', 'Chinese', 'Italian', 'Cafe', 'Desi', 'Desserts', 'Healthy'];

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(rest => {
      const matchesSearch = rest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          rest.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || rest.categories.includes(selectedCategory as Category);
      return matchesSearch && matchesCategory;
    });
  }, [restaurants, searchQuery, selectedCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: '100%' }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: '100%' }} 
      className="fixed inset-0 z-40 bg-black flex flex-col"
    >
      <div className="border-b border-zinc-900 px-4 py-4 flex items-center justify-between bg-black/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="font-bold text-lg tracking-tight">{title}</div>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6 max-w-3xl mx-auto">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search restaurants or locations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand/50 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat 
                    ? 'bg-brand border-brand text-black shadow-[0_0_15px_rgba(255,193,7,0.2)]' 
                    : 'bg-zinc-900 border-white/5 text-gray-400 hover:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between px-1">
            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">
              {filteredRestaurants.length} Restaurants Found
            </span>
            <button className="text-brand text-xs font-bold flex items-center gap-1">
              <Filter className="w-3 h-3" /> Sort
            </button>
          </div>

          {/* Restaurant List */}
          <div className="space-y-4">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((rest, idx) => (
                <motion.div
                  key={rest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => onSelectRestaurant(rest)}
                  className="bg-zinc-900/40 rounded-3xl border border-white/5 overflow-hidden group cursor-pointer hover:border-brand/20 transition-all active:scale-[0.98]"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="h-48 sm:h-auto sm:w-48 relative overflow-hidden">
                      <SafeImage src={rest.image} alt={rest.name} className="w-full h-full group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 flex items-center gap-1.5">
                        <Star className="w-3 h-3 text-brand fill-brand" />
                        <span className="text-[10px] font-bold text-white">{rest.rating}</span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-xl text-white group-hover:text-brand transition-colors">{rest.name}</h3>
                          <span className="text-brand font-bold text-sm">{rest.priceRange}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                          <MapPin className="w-3 h-3" />
                          {rest.location}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {rest.categories.map(cat => (
                            <span key={cat} className="px-2 py-0.5 bg-zinc-800 text-gray-400 text-[9px] font-bold uppercase tracking-wider rounded border border-white/5">{cat}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Clock className="w-3.5 h-3.5 text-brand" />
                          {rest.deliveryTime}
                        </div>
                        <div className="text-brand font-bold text-xs flex items-center gap-1">
                          View Menu <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center">
                <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-800">
                  <Search className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">No restaurants found</h3>
                <p className="text-sm text-gray-500 max-w-[250px] mx-auto">Try adjusting your search or filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface MenuItemListScreenProps {
  title: string;
  items: MenuItem[];
  onBack: () => void;
  onAddToCart: (item: MenuItem) => void;
  onOpenAR: (item: MenuItem) => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const MenuItemListScreen: React.FC<MenuItemListScreenProps> = ({
  title,
  items,
  onBack,
  onAddToCart,
  onOpenAR,
  onOpenCart,
  cartCount
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = new Set(items.map(item => item.category));
    return ['All', ...Array.from(cats)];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: '100%' }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: '100%' }} 
      className="fixed inset-0 z-40 bg-black flex flex-col"
    >
      <div className="border-b border-zinc-900 px-4 py-4 flex items-center justify-between bg-black/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="font-bold text-lg tracking-tight">{title}</div>
        <button onClick={onOpenCart} className="p-2.5 bg-zinc-900 rounded-full relative text-white hover:bg-zinc-800 transition-colors border border-white/5">
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand text-black text-[10px] font-bold flex items-center justify-center rounded-full shadow-lg">{cartCount}</span>}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6 max-w-3xl mx-auto">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search dishes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand/50 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat 
                    ? 'bg-brand border-brand text-black shadow-[0_0_15px_rgba(255,193,7,0.2)]' 
                    : 'bg-zinc-900 border-white/5 text-gray-400 hover:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between px-1">
            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">
              {filteredItems.length} Items Found
            </span>
          </div>

          {/* Menu Item List */}
          <div className="space-y-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: idx * 0.05 }} 
                  className="bg-zinc-900/40 border border-zinc-800/50 rounded-3xl overflow-hidden flex flex-col sm:flex-row group hover:border-brand/30 transition-colors"
                >
                  <div className="h-48 sm:h-auto sm:w-40 relative overflow-hidden">
                    <SafeImage src={item.img} alt={item.name} className="w-full h-full group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:hidden" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-white">{item.name}</h3>
                        <span className="font-bold text-brand">Rs {item.price}</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-6 leading-relaxed line-clamp-2">{item.desc}</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => onOpenAR(item)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors border border-zinc-700">
                        <Box className="w-4 h-4 text-brand" /> AR
                      </button>
                      <button onClick={() => onAddToCart(item)} className="flex-[2] bg-brand hover:bg-brand-dark text-black py-2.5 rounded-xl text-sm font-bold transition-colors shadow-[0_0_15px_rgba(255,193,7,0.1)]">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center">
                <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-800">
                  <Search className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">No items found</h3>
                <p className="text-sm text-gray-500 max-w-[250px] mx-auto">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
