import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, ShoppingBag, Clock, ChevronRight, Package, MapPin, 
  Truck, CheckCircle, ChefHat, CreditCard, Phone, Calendar, 
  FileText, Receipt, RefreshCw
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { SafeImage } from './Shared';

const ORDER_STATUS_STEPS: OrderStatus[] = [
  'Order Placed',
  'Preparing',
  'Ready',
  'Out for Delivery',
  'Delivered'
];

const HorizontalStatusProgress: React.FC<{ currentStatus: OrderStatus }> = ({ currentStatus }) => {
  const currentIndex = ORDER_STATUS_STEPS.indexOf(currentStatus);

  return (
    <div className="pt-2">
      <div className="flex justify-between mb-2">
        <span className="text-[9px] font-black uppercase tracking-widest text-brand">
          {currentStatus}
        </span>
        <span className="text-[9px] font-bold text-zinc-500">
          {Math.round((currentIndex / (ORDER_STATUS_STEPS.length - 1)) * 100)}%
        </span>
      </div>
      <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / (ORDER_STATUS_STEPS.length - 1)) * 100}%` }}
          className="h-full bg-brand shadow-[0_0_8px_rgba(255,193,7,0.5)]"
        />
      </div>
    </div>
  );
};

const VerticalTimeline: React.FC<{ currentStatus: OrderStatus }> = ({ currentStatus }) => {
  const currentIndex = ORDER_STATUS_STEPS.indexOf(currentStatus);

  return (
    <div className="space-y-0 relative">
      <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-zinc-800" />
      <div 
        className="absolute left-[11px] top-2 w-0.5 bg-brand transition-all duration-1000 origin-top" 
        style={{ height: `${(currentIndex / (ORDER_STATUS_STEPS.length - 1)) * 100}%` }}
      />
      
      {ORDER_STATUS_STEPS.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isFuture = index > currentIndex;

        return (
          <div key={step} className="flex gap-4 pb-8 last:pb-0 relative">
            <div className="relative z-10 mt-1.5">
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted || isCurrent 
                    ? 'bg-brand text-black scale-110 shadow-[0_0_15px_rgba(255,193,7,0.3)]' 
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-600'
                }`}
              >
                {isCompleted ? <CheckCircle className="w-3.5 h-3.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
              </div>
            </div>
            <div className="flex-1">
              <p className={`text-xs font-black uppercase tracking-widest ${isCurrent ? 'text-brand' : isFuture ? 'text-zinc-600' : 'text-zinc-400'}`}>
                {step}
              </p>
              {isCurrent && (
                <motion.p 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] text-zinc-500 mt-0.5 font-medium"
                >
                  {step === 'Preparing' ? 'Chef is working their magic...' : 
                   step === 'Out for Delivery' ? 'Rider is on the way to you!' : 
                   step === 'Delivered' ? 'Enjoy your meal!' : 'Processing your request...'}
                </motion.p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const OrderDetailsView: React.FC<{ 
  order: Order, 
  onBack: () => void,
  onReorder: (order: Order) => void
}> = ({ order, onBack, onReorder }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: '100%' }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: '100%' }} 
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-black flex flex-col"
    >
      {/* Immersive Background Header */}
      <div className="relative h-64 shrink-0 overflow-hidden">
        <SafeImage 
          src={order.restaurantImage || `https://picsum.photos/seed/${order.restaurantId}/800/600`} 
          alt={order.restaurantName} 
          className="w-full h-full object-cover scale-110 blur-[2px] opacity-40" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <button 
            onClick={onBack} 
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="px-3 py-1 rounded-full bg-brand/20 backdrop-blur-md border border-brand/30 text-brand text-[10px] font-black uppercase tracking-widest">
            {order.status}
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl shrink-0">
                <SafeImage 
                  src={order.restaurantImage || `https://picsum.photos/seed/${order.restaurantId}/200/200`} 
                  alt={order.restaurantName} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h2 className="text-4xl font-black text-white tracking-tighter leading-none">
                {order.restaurantName}
              </h2>
            </div>
            <div className="flex items-center gap-3 text-zinc-400 text-xs font-bold uppercase tracking-widest">
              <span>#{order.id.slice(-6).toUpperCase()}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-black rounded-t-[40px] -mt-8 relative z-10 px-6 pt-8 pb-32 space-y-8">
        {/* Status Timeline */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Order Progress</h3>
            <span className="text-[10px] font-bold text-brand animate-pulse flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-brand" />
              Live Tracking
            </span>
          </div>
          <div className="bg-zinc-900/30 rounded-3xl p-6 border border-white/5">
            <VerticalTimeline currentStatus={order.status} />
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Delivery Route</h3>
          <div className="h-48 bg-zinc-900 rounded-3xl border border-white/5 overflow-hidden relative group">
            <SafeImage 
              src="https://picsum.photos/seed/islamabad-map/800/400?grayscale" 
              alt="Map" 
              className="w-full h-full object-cover opacity-30 grayscale" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-brand/20 rounded-full animate-ping" />
                <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(255,193,7,0.4)]">
                  <Truck className="w-6 h-6 text-black" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-brand" />
                </div>
                <div>
                  <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Est. Arrival</p>
                  <p className="text-xs font-black text-white">15 - 20 MINS</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors">
                Call Rider
              </button>
            </div>
          </div>
        </section>

        {/* Items List */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Order Summary</h3>
            <span className="text-[10px] font-bold text-zinc-500">{order.items.length} Items</span>
          </div>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (idx * 0.1) }}
                className="flex items-center gap-4 bg-zinc-900/20 p-4 rounded-3xl border border-white/5"
              >
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/5">
                  <SafeImage src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-black text-white text-sm truncate tracking-tight">{item.name}</h4>
                  <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                    Qty: <span className="text-brand">{item.quantity}</span> • Rs {item.price.toLocaleString()}
                  </p>
                </div>
                <div className="text-sm font-black text-white tracking-tight">Rs {(item.price * item.quantity).toLocaleString()}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Delivery & Payment */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-zinc-900/30 rounded-[32px] p-8 border border-white/5 space-y-8">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center shrink-0 border border-brand/20">
                <MapPin className="w-6 h-6 text-brand" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-1.5">Delivery Address</p>
                <p className="text-sm text-white font-bold leading-relaxed tracking-tight">{order.address}</p>
              </div>
            </div>
            
            <div className="h-px bg-white/5" />

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center shrink-0 border border-brand/20">
                <CreditCard className="w-6 h-6 text-brand" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-1.5">Payment Method</p>
                <p className="text-sm text-white font-bold tracking-tight">{order.paymentMethod}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <section className="bg-zinc-900/20 rounded-3xl p-6 border border-dashed border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
              <Phone className="w-5 h-5 text-zinc-400" />
            </div>
            <div>
              <p className="text-xs font-black text-white uppercase tracking-widest">Need Help?</p>
              <p className="text-[10px] text-zinc-500 font-medium">Contact our 24/7 support</p>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors">
            Support
          </button>
        </section>

        {/* Total Summary */}
        <div className="bg-brand rounded-[32px] p-8 text-black shadow-[0_20px_50px_rgba(255,193,7,0.2)]">
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-bold uppercase tracking-tighter opacity-70">
              <span>Subtotal</span>
              <span>Rs {order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs font-bold uppercase tracking-tighter opacity-70">
              <span>Delivery Fee</span>
              <span>Rs {order.deliveryFee.toLocaleString()}</span>
            </div>
            <div className="pt-4 mt-2 border-t border-black/10 flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-[0.2em]">Total Amount</span>
              <span className="text-3xl font-black tracking-tighter">Rs {order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Action Button */}
      <div className="p-6 bg-black/80 backdrop-blur-xl border-t border-white/5">
        <button 
          onClick={() => onReorder(order)}
          className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-[0.98] transition-transform shadow-xl"
        >
          <RefreshCw className="w-5 h-5" /> Reorder Items
        </button>
      </div>
    </motion.div>
  );
};

export const OrdersHistory: React.FC<{ 
  orders: Order[], 
  onBack: () => void,
  onTrackOrder: (order: Order) => void,
  onReorder: (order: Order) => void
}> = ({ orders, onBack, onTrackOrder, onReorder }) => {
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const activeOrders = orders.filter(o => o.status !== 'Delivered');
  const pastOrders = orders.filter(o => o.status === 'Delivered');

  const displayOrders = activeTab === 'active' ? activeOrders : pastOrders;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="w-3 h-3" />;
      case 'Out for Delivery': return <Truck className="w-3 h-3" />;
      case 'Preparing': return <ChefHat className="w-3 h-3" />;
      case 'Ready': return <Package className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-500/10 text-green-500';
      case 'Out for Delivery': return 'bg-blue-500/10 text-blue-500';
      case 'Preparing': return 'bg-orange-500/10 text-orange-500';
      case 'Ready': return 'bg-purple-500/10 text-purple-500';
      default: return 'bg-brand/10 text-brand';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: '100%' }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: '100%' }} 
      className="fixed inset-0 z-40 bg-black flex flex-col"
    >
      <div className="border-b border-zinc-900 bg-black/80 backdrop-blur-md sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between">
          <button onClick={onBack} className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="font-black text-xl tracking-tighter uppercase">My Orders</div>
          <button className="p-2 -mr-2 text-gray-400 hover:text-white transition-colors">
            <Receipt className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <ShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search your orders..." 
              className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand/30 transition-colors"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-4 pb-2">
          <button 
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-3 text-sm font-black uppercase tracking-widest transition-all relative ${
              activeTab === 'active' ? 'text-brand' : 'text-zinc-500'
            }`}
          >
            Active
            {activeTab === 'active' && (
              <motion.div layoutId="orderTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-3 text-sm font-black uppercase tracking-widest transition-all relative ${
              activeTab === 'past' ? 'text-brand' : 'text-zinc-500'
            }`}
          >
            Past
            {activeTab === 'past' && (
              <motion.div layoutId="orderTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {displayOrders.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="h-full flex flex-col items-center justify-center text-gray-500 py-20"
            >
              <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800">
                <Package className="w-10 h-10 opacity-40" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No orders yet</h3>
              <p className="text-sm max-w-[200px] text-center mb-8">
                {activeTab === 'active' 
                  ? "You don't have any active orders right now." 
                  : "You haven't placed any orders yet."}
              </p>
              <button 
                onClick={onBack} 
                className="bg-brand text-black px-8 py-3 rounded-full font-bold transition-transform active:scale-95"
              >
                Explore Restaurants
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 max-w-2xl mx-auto"
            >
              {displayOrders.map((order, idx) => (
                <motion.div 
                  key={order.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-zinc-900/40 rounded-3xl border border-white/5 overflow-hidden group hover:border-brand/20 transition-colors"
                >
                  <div className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                            <SafeImage 
                              src={order.restaurantImage || `https://picsum.photos/seed/${order.restaurantId}/200/200`} 
                              alt={order.restaurantName} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          {activeTab === 'active' && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-brand rounded-full flex items-center justify-center border-2 border-zinc-900 shadow-sm">
                              <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-black text-white text-lg tracking-tight group-hover:text-brand transition-colors">
                            {order.restaurantName}
                          </h4>
                          <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-0.5 font-bold uppercase tracking-widest">
                            <Calendar className="w-3 h-3" />
                            {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            <span className="w-1 h-1 rounded-full bg-zinc-800" />
                            <Clock className="w-3 h-3" />
                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-3 px-4 bg-white/[0.02] rounded-2xl border border-white/[0.03]">
                      <div className="text-[11px] text-zinc-400 font-medium flex items-center gap-2">
                        <Package className="w-3.5 h-3.5 text-zinc-600" />
                        <span className="truncate max-w-[180px]">
                          {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                        </span>
                      </div>
                      <div className="text-base font-black text-white ml-4 shrink-0 tracking-tight">
                        Rs {order.total.toLocaleString()}
                      </div>
                    </div>

                    {activeTab === 'active' && <HorizontalStatusProgress currentStatus={order.status} />}
                  </div>

                  <div className="flex border-t border-white/5 bg-zinc-900/20">
                    {activeTab === 'active' ? (
                      <button 
                        onClick={() => onTrackOrder(order)}
                        className="flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-brand hover:bg-brand/5 transition-colors flex items-center justify-center gap-2"
                      >
                        <MapPin className="w-3 h-3" /> Track Order
                      </button>
                    ) : (
                      <>
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-white/5 transition-colors border-r border-white/5 flex items-center justify-center gap-2"
                        >
                          <FileText className="w-3 h-3" /> View Details
                        </button>
                        <button 
                          onClick={() => onReorder(order)}
                          className="flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-brand hover:bg-brand/5 transition-colors flex items-center justify-center gap-2"
                        >
                          <ShoppingBag className="w-3 h-3" /> Reorder
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailsView 
            order={selectedOrder} 
            onBack={() => setSelectedOrder(null)} 
            onReorder={onReorder}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
