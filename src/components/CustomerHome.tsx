import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Star, Clock, ChevronRight, Scan, Flame, Pizza, Coffee, Utensils, CakeSlice, Leaf, Tag, Home, Receipt, User, QrCode } from 'lucide-react';
import { CATEGORIES, MOCK_RESTAURANTS } from '../data';
import { Restaurant, Category, UserProfile } from '../types';
import { Logo, QRScannerScreen } from './Shared';
import { ProfileScreen } from './Profile';
import { OrdersScreen } from './Orders';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Fast Food': <Flame className="w-6 h-6" />,
  'Chinese': <Utensils className="w-6 h-6" />,
  'Italian': <Pizza className="w-6 h-6" />,
  'Cafe': <Coffee className="w-6 h-6" />,
  'Desi': <Utensils className="w-6 h-6" />,
  'Desserts': <CakeSlice className="w-6 h-6" />,
  'Healthy': <Leaf className="w-6 h-6" />
};

export const CustomerHome: React.FC<{ user: UserProfile, onSelectRestaurant: (r: Restaurant) => void, onLogout: () => void }> = ({ user, onSelectRestaurant, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'orders' | 'profile'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isScanning, setIsScanning] = useState(false);

  const filteredRestaurants = MOCK_RESTAURANTS.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.categories.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || r.categories.includes(selectedCategory as Category);
    return matchesSearch && matchesCategory;
  });

  const featuredRestaurants = MOCK_RESTAURANTS.filter(r => r.rating >= 4.8);
  const desiRestaurants = MOCK_RESTAURANTS.filter(r => r.categories.includes('Desi')).slice(0, 5);
  const fastFoodRestaurants = MOCK_RESTAURANTS.filter(r => r.categories.includes('Fast Food')).slice(0, 5);

  return (
    <div className="min-h-screen bg-black relative">
      <AnimatePresence mode="wait">
        {activeTab === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-24">
            <AnimatePresence>
              {isScanning && (
                <QRScannerScreen 
                  onClose={() => setIsScanning(false)} 
                  onScanComplete={() => {
                    setIsScanning(false);
                    onSelectRestaurant(MOCK_RESTAURANTS[0]);
                  }} 
                />
              )}
            </AnimatePresence>

            <div className="bg-zinc-950 pt-safe px-4 pb-6 rounded-b-[2rem] border-b border-zinc-900 shadow-xl relative z-10">
              <div className="flex justify-between items-center mb-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-[0_0_15px_rgba(255,193,7,0.15)] flex items-center justify-center">
                    <Logo />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-medium mb-0.5 uppercase tracking-wider">Delivering to</p>
                    <div className="flex items-center gap-1 font-semibold text-white text-sm">
                      <MapPin className="w-4 h-4 text-brand" /> Islamabad, PK
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center cursor-pointer" onClick={() => setActiveTab('profile')}>
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search restaurants, dishes, or sectors..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-brand transition-all shadow-inner focus:shadow-[0_0_20px_rgba(255,193,7,0.1)]"
                />
              </div>
            </div>

            <div className="px-4 py-8 space-y-10">
              
              {!searchQuery && selectedCategory === 'All' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-3xl p-6 overflow-hidden border border-zinc-800">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 blur-3xl rounded-full" />
                  <div className="relative z-10 w-2/3">
                    <div className="flex items-center gap-2 text-brand font-bold text-sm mb-2">
                      <Tag className="w-4 h-4" /> Special Offer
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">30% OFF at F-7 Markaz</h3>
                    <p className="text-sm text-gray-400 mb-4">Valid on all cafes and desserts today.</p>
                    <button className="bg-brand text-black px-5 py-2 rounded-xl font-bold text-sm shadow-[0_0_15px_rgba(255,193,7,0.3)]">Claim Now</button>
                  </div>
                  <div className="absolute -right-6 -bottom-6 w-40 h-40 opacity-50">
                    <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400&auto=format&fit=crop" alt="Burger" className="w-full h-full object-cover rounded-full" />
                  </div>
                </motion.div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Categories</h2>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
                  <button 
                    onClick={() => setSelectedCategory('All')}
                    className={`flex flex-col items-center gap-3 min-w-[76px] transition-all ${selectedCategory === 'All' ? 'opacity-100 scale-105' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${selectedCategory === 'All' ? 'bg-brand text-black shadow-[0_0_20px_rgba(255,193,7,0.3)]' : 'bg-zinc-900 border border-zinc-800 text-gray-400'}`}>
                      <Utensils className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-semibold ${selectedCategory === 'All' ? 'text-brand' : 'text-gray-400'}`}>All</span>
                  </button>
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat.name} 
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`flex flex-col items-center gap-3 min-w-[76px] transition-all ${selectedCategory === cat.name ? 'opacity-100 scale-105' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
                    >
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${selectedCategory === cat.name ? 'bg-brand text-black shadow-[0_0_20px_rgba(255,193,7,0.3)]' : 'bg-zinc-900 border border-zinc-800 text-gray-400'}`}>
                        {CATEGORY_ICONS[cat.name] || <Utensils className="w-6 h-6" />}
                      </div>
                      <span className={`text-xs font-semibold ${selectedCategory === cat.name ? 'text-brand' : 'text-gray-400'}`}>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {!searchQuery && selectedCategory === 'All' && (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">Featured in Islamabad</h2>
                      <button className="text-brand text-sm font-medium flex items-center">See all <ChevronRight className="w-4 h-4" /></button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
                      {featuredRestaurants.map((restaurant, i) => (
                        <motion.div 
                          key={`featured-${restaurant.id}`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          onClick={() => onSelectRestaurant(restaurant)}
                          className="min-w-[280px] group bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden cursor-pointer hover:border-brand/50 transition-all hover:shadow-[0_0_20px_rgba(255,193,7,0.1)]"
                        >
                          <div className="h-40 relative overflow-hidden">
                            <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold border border-white/10">
                              <Star className="w-3 h-3 text-brand fill-brand" /> {restaurant.rating}
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                              <h3 className="text-lg font-bold text-white mb-1">{restaurant.name}</h3>
                              <p className="text-xs text-gray-300 flex items-center gap-1"><MapPin className="w-3 h-3" /> {restaurant.location}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Craving Desi Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">Craving Desi?</h2>
                      <button className="text-brand text-sm font-medium flex items-center" onClick={() => setSelectedCategory('Desi')}>See all <ChevronRight className="w-4 h-4" /></button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
                      {desiRestaurants.map((restaurant, i) => (
                        <motion.div 
                          key={`desi-${restaurant.id}`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          onClick={() => onSelectRestaurant(restaurant)}
                          className="min-w-[200px] group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:border-brand/50 transition-all"
                        >
                          <div className="h-32 relative overflow-hidden">
                            <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded flex items-center gap-1 text-[10px] font-bold border border-white/10">
                              <Star className="w-3 h-3 text-brand fill-brand" /> {restaurant.rating}
                            </div>
                          </div>
                          <div className="p-3">
                            <h3 className="text-sm font-bold text-white mb-1 truncate">{restaurant.name}</h3>
                            <p className="text-xs text-gray-400 flex items-center gap-1 truncate"><MapPin className="w-3 h-3" /> {restaurant.location.split(',')[0]}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Bites Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">Quick Bites</h2>
                      <button className="text-brand text-sm font-medium flex items-center" onClick={() => setSelectedCategory('Fast Food')}>See all <ChevronRight className="w-4 h-4" /></button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
                      {fastFoodRestaurants.map((restaurant, i) => (
                        <motion.div 
                          key={`fastfood-${restaurant.id}`}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          onClick={() => onSelectRestaurant(restaurant)}
                          className="min-w-[200px] group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:border-brand/50 transition-all"
                        >
                          <div className="h-32 relative overflow-hidden">
                            <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded flex items-center gap-1 text-[10px] font-bold border border-white/10">
                              <Star className="w-3 h-3 text-brand fill-brand" /> {restaurant.rating}
                            </div>
                          </div>
                          <div className="p-3">
                            <h3 className="text-sm font-bold text-white mb-1 truncate">{restaurant.name}</h3>
                            <p className="text-xs text-gray-400 flex items-center gap-1 truncate"><MapPin className="w-3 h-3" /> {restaurant.location.split(',')[0]}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div>
                <h2 className="text-xl font-bold mb-4">{searchQuery ? 'Search Results' : (selectedCategory === 'All' ? 'All Restaurants' : `${selectedCategory} Restaurants`)}</h2>
                <div className="space-y-5">
                  {filteredRestaurants.map((restaurant, i) => (
                    <motion.div 
                      key={restaurant.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => onSelectRestaurant(restaurant)}
                      className="group bg-zinc-900/50 border border-zinc-800/80 rounded-3xl overflow-hidden cursor-pointer hover:border-brand/50 transition-all hover:shadow-[0_0_20px_rgba(255,193,7,0.1)] flex flex-col sm:flex-row"
                    >
                      <div className="h-48 sm:h-auto sm:w-48 relative overflow-hidden shrink-0">
                        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent sm:hidden" />
                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1 text-xs font-bold border border-white/10 sm:hidden">
                          <Star className="w-3 h-3 text-brand fill-brand" /> {restaurant.rating}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-xl font-bold text-white">{restaurant.name}</h3>
                            <div className="hidden sm:flex bg-zinc-800 px-2 py-1 rounded-lg items-center gap-1 text-xs font-bold border border-zinc-700">
                              <Star className="w-3 h-3 text-brand fill-brand" /> {restaurant.rating}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {restaurant.categories.map(cat => (
                              <span key={cat} className="text-[10px] uppercase tracking-wider font-bold bg-zinc-800 text-gray-300 px-2 py-1 rounded-md">
                                {cat}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-zinc-800/50">
                          <div className="flex items-center gap-4 text-sm text-gray-400 font-medium">
                            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-500" /> {restaurant.location.split(',')[0]}</span>
                            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gray-500" /> 30-45 min</span>
                          </div>
                          <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-black transition-colors">
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {filteredRestaurants.length === 0 && (
                    <div className="text-center py-16 bg-zinc-900/30 rounded-3xl border border-zinc-800/50">
                      <Search className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-white mb-2">No restaurants found</h3>
                      <p className="text-gray-500 text-sm max-w-xs mx-auto">We couldn't find any restaurants matching your criteria. Try a different search term or category.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'orders' && <OrdersScreen key="orders" />}
        {activeTab === 'profile' && <ProfileScreen key="profile" user={user} onLogout={onLogout} />}
      </AnimatePresence>

      {/* Bottom Navigation */}
      {!isScanning && (
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-900 pb-safe z-40">
          <div className="flex justify-between items-center px-6 py-3 relative">
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 transition-colors w-12 ${activeTab === 'home' && !searchQuery ? 'text-brand' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Home className="w-6 h-6" />
              <span className="text-[10px] font-bold tracking-wide">Home</span>
            </button>
            
            <button 
              onClick={() => { setActiveTab('home'); document.querySelector<HTMLInputElement>('input[type="text"]')?.focus(); }}
              className={`flex flex-col items-center gap-1 transition-colors w-12 ${activeTab === 'home' && searchQuery ? 'text-brand' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Search className="w-6 h-6" />
              <span className="text-[10px] font-bold tracking-wide">Search</span>
            </button>

            {/* Spacer for the absolute center button */}
            <div className="w-16" />
            
            <button 
              onClick={() => setActiveTab('orders')}
              className={`flex flex-col items-center gap-1 transition-colors w-12 ${activeTab === 'orders' ? 'text-brand' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Receipt className="w-6 h-6" />
              <span className="text-[10px] font-bold tracking-wide">Orders</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 transition-colors w-12 ${activeTab === 'profile' ? 'text-brand' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <User className="w-6 h-6" />
              <span className="text-[10px] font-bold tracking-wide">Profile</span>
            </button>

            {/* Scan Button (Prominent Center) */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-6">
              <button 
                onClick={() => setIsScanning(true)}
                className="w-16 h-16 bg-brand rounded-full flex items-center justify-center text-black shadow-[0_8px_30px_rgba(255,193,7,0.4)] hover:scale-105 transition-transform border-4 border-black"
              >
                <QrCode className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
