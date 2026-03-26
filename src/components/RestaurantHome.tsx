import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Plus, QrCode, Settings, LogOut, Upload, CheckCircle, TrendingUp, Users, DollarSign, Clock, Sparkles, BarChart3, Edit2, Trash2, Box, Smartphone, X, ShoppingBag, MapPin, Truck, ChefHat } from 'lucide-react';
import { MenuItem, Order, OrderStatus } from '../types';
import { MOCK_RESTAURANTS } from '../data';
import { SafeImage } from './Shared';

export const RestaurantHome: React.FC<{ 
  onLogout: () => void,
  orders: Order[],
  onUpdateStatus: (orderId: string, status: OrderStatus) => void
}> = ({ onLogout, orders, onUpdateStatus }) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'orders' | 'menu' | 'qr'>('analytics');
  
  // Use the first mock restaurant for the demo
  const restaurant = MOCK_RESTAURANTS[0];
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>(restaurant.menu);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Menu Management State
  const [categories, setCategories] = useState<string[]>(Array.from(new Set(restaurant.menu.map(item => item.category))));
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    desc: '',
    category: categories[0] || 'Fast Food',
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop'
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="w-3 h-3" />;
      case 'Out for Delivery': return <Truck className="w-3 h-3" />;
      case 'Preparing': return <ChefHat className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500/10 text-green-500';
      case 'Out for Delivery': return 'bg-blue-500/10 text-blue-500';
      case 'Preparing': return 'bg-orange-500/10 text-orange-500';
      default: return 'bg-brand/10 text-brand';
    }
  };

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setEditingItem(null);
        setFormData({ name: '', price: '', desc: '', category: categories[0] || 'Fast Food', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop' });
        setIsItemModalOpen(true);
      }, 1000);
    }, 2000);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price.toString(),
      desc: item.desc,
      category: item.category,
      img: item.img
    });
    setIsItemModalOpen(true);
  };

  const handleSaveItem = () => {
    if (!formData.name || !formData.price) return;
    
    if (editingItem) {
      setMenuItems(prev => prev.map(item => item.id === editingItem.id ? {
        ...item,
        name: formData.name,
        price: Number(formData.price),
        desc: formData.desc,
        category: formData.category,
        img: formData.img
      } : item));
    } else {
      setMenuItems(prev => [{
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        price: Number(formData.price),
        desc: formData.desc,
        category: formData.category,
        img: formData.img
      }, ...prev]);
    }
    setIsItemModalOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddCategory = () => {
    if (newCategoryName && !categories.includes(newCategoryName)) {
      setCategories([...categories, newCategoryName]);
      setFormData(prev => ({ ...prev, category: newCategoryName }));
    }
    setIsCategoryModalOpen(false);
    setNewCategoryName('');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-black pb-24">
      <div className="bg-zinc-900/50 pt-safe px-4 pb-6 rounded-b-3xl border-b border-zinc-800">
        <div className="flex justify-between items-center mb-6 pt-4">
          <div>
            <h1 className="text-2xl font-bold">{restaurant.name}</h1>
            <p className="text-gray-400 text-sm flex items-center gap-1"><Sparkles className="w-3 h-3 text-brand" /> Premium Partner</p>
          </div>
          <button onClick={onLogout} className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 p-1 bg-zinc-800/50 rounded-xl overflow-x-auto no-scrollbar">
          <button onClick={() => setActiveTab('analytics')} className={`flex-1 min-w-[100px] py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'analytics' ? 'bg-zinc-700 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}>
            <BarChart3 className="w-4 h-4" /> Analytics
          </button>
          <button onClick={() => setActiveTab('orders')} className={`flex-1 min-w-[100px] py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'orders' ? 'bg-zinc-700 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}>
            <ShoppingBag className="w-4 h-4" /> Orders
            {orders.filter(o => o.status !== 'Delivered').length > 0 && (
              <span className="w-4 h-4 bg-brand text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {orders.filter(o => o.status !== 'Delivered').length}
              </span>
            )}
          </button>
          <button onClick={() => setActiveTab('menu')} className={`flex-1 min-w-[100px] py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'menu' ? 'bg-zinc-700 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}>
            <Camera className="w-4 h-4" /> Menu
          </button>
          <button onClick={() => setActiveTab('qr')} className={`flex-1 min-w-[100px] py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'qr' ? 'bg-zinc-700 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}>
            <QrCode className="w-4 h-4" /> QR Code
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">Active Orders</h3>
              <button 
                onClick={() => setActiveTab('orders')}
                className="text-brand text-xs font-bold uppercase tracking-widest hover:underline transition-all"
              >
                See all
              </button>
            </div>
            
            {orders.length === 0 ? (
              <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-3xl p-12 text-center">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-gray-600" />
                </div>
                <h4 className="font-bold text-white mb-1">No orders yet</h4>
                <p className="text-sm text-gray-500">New orders will appear here in real-time.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-zinc-900/40 border border-zinc-800/50 rounded-3xl overflow-hidden">
                    <div className="p-5 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-white text-lg">{order.id}</span>
                            <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <div className="text-sm text-gray-400 mt-1 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-brand" />
                            {order.address}
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </div>
                      </div>

                      <div className="space-y-2 bg-black/20 p-3 rounded-2xl border border-white/5">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-gray-300 font-medium">{item.quantity}x {item.name}</span>
                            <span className="text-white font-bold">Rs {item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-white/5">
                        <div className="text-sm font-bold text-white">Total: Rs {order.total.toLocaleString()}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 bg-zinc-800 px-2 py-1 rounded-md">{order.paymentMethod}</div>
                      </div>
                    </div>

                    {order.status !== 'Delivered' && (
                      <div className="flex border-t border-white/5 bg-zinc-900/20">
                        <select 
                          value={order.status}
                          onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
                          className="flex-1 bg-transparent text-xs font-bold uppercase tracking-widest text-brand py-4 px-4 focus:outline-none appearance-none text-center cursor-pointer"
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Ready">Ready</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900/40 border border-zinc-800/50 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-gray-400 mb-2"><DollarSign className="w-4 h-4 text-brand" /> Revenue</div>
                <div className="text-2xl font-bold">Rs 145K</div>
                <div className="text-xs text-green-500 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +12% this week</div>
              </div>
              <div className="bg-zinc-900/40 border border-zinc-800/50 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-gray-400 mb-2"><Users className="w-4 h-4 text-blue-400" /> Total Orders</div>
                <div className="text-2xl font-bold">342</div>
                <div className="text-xs text-green-500 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +8% this week</div>
              </div>
              <div className="bg-zinc-900/40 border border-zinc-800/50 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-gray-400 mb-2"><TrendingUp className="w-4 h-4 text-purple-400" /> Conversion Rate</div>
                <div className="text-2xl font-bold">18.5%</div>
                <div className="text-xs text-gray-500 mt-1">From AR views</div>
              </div>
              <div className="bg-zinc-900/40 border border-zinc-800/50 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-gray-400 mb-2"><Clock className="w-4 h-4 text-orange-400" /> Peak Time</div>
                <div className="text-2xl font-bold">8:00 PM</div>
                <div className="text-xs text-gray-500 mt-1">Highest activity</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand/10 to-zinc-900 border border-brand/20 p-5 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 blur-3xl rounded-full" />
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-brand" />
                <h3 className="font-bold text-lg">AI Insights</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Users who view the <span className="text-brand font-medium">Truffle Mushroom Pizza</span> in AR are <span className="text-green-400 font-bold">40% more likely</span> to add a side of Garlic Bread. Consider creating a combo offer.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800/50 p-5 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold flex items-center gap-2"><Sparkles className="w-4 h-4 text-brand fill-brand" /> Popular Items</h3>
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className="text-brand text-xs font-bold uppercase tracking-widest hover:underline transition-all"
                >
                  See all
                </button>
              </div>
              <div className="space-y-4">
                {menuItems.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                        <SafeImage src={item.img} alt={item.name} className="w-full h-full" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-gray-400">{120 - i * 30} orders this week</div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-brand">Rs {item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'menu' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-5 text-center">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-brand" />
              </div>
              <h3 className="text-lg font-bold mb-2">Add New Item</h3>
              <p className="text-sm text-gray-400 mb-6">Upload a 2D photo and our AI will generate a 3D AR model automatically.</p>
              
              {uploadSuccess ? (
                <div className="bg-green-500/10 text-green-500 py-3 rounded-xl flex items-center justify-center gap-2 font-medium">
                  <CheckCircle className="w-5 h-5" /> Model Generated!
                </div>
              ) : (
                <button 
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="w-full bg-brand hover:bg-brand-dark text-black py-3.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isUploading ? (
                    <><div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" /> Processing AI Model...</>
                  ) : (
                    <><Upload className="w-5 h-5" /> Upload Photo</>
                  )}
                </button>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Current Menu</h3>
                <div className="flex gap-4 items-center">
                  <button 
                    onClick={() => setActiveTab('menu')}
                    className="text-brand text-xs font-bold uppercase tracking-widest hover:underline transition-all mr-2"
                  >
                    See all
                  </button>
                  <button 
                    onClick={() => {
                      setEditingItem(null);
                      setFormData({ name: '', price: '', desc: '', category: categories[0], img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop' });
                      setIsItemModalOpen(true);
                    }} 
                    className="text-brand text-sm font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add Item
                  </button>
                  <button onClick={() => setIsCategoryModalOpen(true)} className="text-brand text-sm font-medium flex items-center gap-1">
                    <Plus className="w-4 h-4" /> Add Category
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {menuItems.map(item => (
                  <div key={item.id} className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-4 flex gap-4 group hover:border-brand/30 transition-colors">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative">
                      <SafeImage src={item.img} alt={item.name} className="w-full h-full" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Box className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{item.name}</h4>
                        <div className="flex gap-2">
                          <button onClick={() => handleEditItem(item)} className="text-gray-400 hover:text-white transition-colors"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteItem(item.id)} className="text-gray-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                      <div className="text-brand text-sm font-medium mb-1">Rs {item.price}</div>
                      <div className="text-xs text-gray-400 bg-zinc-800 inline-block px-2 py-1 rounded-md">{item.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'qr' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center py-8">
            <div className="w-64 h-64 bg-white p-4 rounded-3xl shadow-[0_0_40px_rgba(255,193,7,0.15)] mb-8 relative group">
              <SafeImage src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=https://bitesight.app/r/${restaurant.name.toLowerCase().replace(/\s+/g, '-')}`} alt="Restaurant QR" className="w-full h-full" />
              <div className="absolute inset-0 bg-black/60 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <button className="bg-brand text-black px-6 py-2 rounded-full font-bold shadow-lg">Preview Menu</button>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Your AR Menu is Live</h2>
            <p className="text-gray-400 mb-8 max-w-xs">Place this QR code on your tables. Customers scan it to see your food in 3D.</p>
            
            <div className="w-full space-y-3">
              <button className="w-full bg-brand hover:bg-brand-dark text-black py-3.5 rounded-xl font-bold transition-colors">
                Download High-Res QR
              </button>
              <button className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white py-3.5 rounded-xl font-medium transition-colors">
                Order Table Stickers
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Item Modal */}
      <AnimatePresence>
        {isItemModalOpen && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
                <button onClick={() => setIsItemModalOpen(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Image URL</label>
                  <input type="text" value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand" placeholder="e.g. Margherita Pizza" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Price (Rs)</label>
                  <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand" placeholder="e.g. 1200" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand appearance-none">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Description</label>
                  <textarea value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand h-24 resize-none" placeholder="Item description..." />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setIsItemModalOpen(false)} className="flex-1 py-3 rounded-xl font-medium bg-zinc-800 text-white hover:bg-zinc-700 transition-colors">Cancel</button>
                <button onClick={handleSaveItem} className="flex-1 py-3 rounded-xl font-bold bg-brand text-black hover:bg-brand-dark transition-colors">Save Item</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Category Modal */}
      <AnimatePresence>
        {isCategoryModalOpen && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add Category</h2>
                <button onClick={() => setIsCategoryModalOpen(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <input type="text" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand mb-6" placeholder="e.g. Beverages" autoFocus />
              <div className="flex gap-3">
                <button onClick={() => setIsCategoryModalOpen(false)} className="flex-1 py-3 rounded-xl font-medium bg-zinc-800 text-white hover:bg-zinc-700 transition-colors">Cancel</button>
                <button onClick={handleAddCategory} className="flex-1 py-3 rounded-xl font-bold bg-brand text-black hover:bg-brand-dark transition-colors">Add</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
