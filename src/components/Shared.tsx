import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShoppingBag, Box, Plus, Minus, CheckCircle, Scan, Smartphone, Sparkles, Move, Maximize, Rotate3D, UtensilsCrossed, Star, Clock, MapPin, CreditCard, Truck, Home, Phone, CheckCircle2, Circle, ChevronRight, User } from 'lucide-react';
import { Restaurant, MenuItem, CartItem, Order, OrderStatus } from '../types';
import { Image as ImageIcon } from 'lucide-react';

export const SafeImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}> = ({ src, alt, className = "", fallbackSrc = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
    setError(false);
    setIsLoading(true);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-zinc-800 animate-pulse flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-zinc-700" />
        </div>
      )}
      <motion.img
        src={error ? fallbackSrc : imgSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-700 ${isLoading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export const Logo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(255,193,7,0.2)]" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD54F" />
          <stop offset="50%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FF9800" />
        </linearGradient>
        <mask id="bunMask">
          <rect width="100" height="100" fill="white" />
          <circle cx="35" cy="30" r="2.5" fill="black" />
          <circle cx="50" cy="24" r="2.5" fill="black" />
          <circle cx="65" cy="30" r="2.5" fill="black" />
          <circle cx="42" cy="36" r="2.5" fill="black" />
          <circle cx="58" cy="36" r="2.5" fill="black" />
        </mask>
        <mask id="biteMask">
          <rect width="100" height="100" fill="white" />
          {/* Bite mark circles */}
          <circle cx="80" cy="50" r="12" fill="black" />
          <circle cx="72" cy="38" r="8" fill="black" />
          <circle cx="72" cy="62" r="8" fill="black" />
        </mask>
      </defs>
      
      {/* Outer AR Brackets */}
      <path d="M25 15 L15 15 L15 25" stroke="url(#brandGradient)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M75 15 L85 15 L85 25" stroke="url(#brandGradient)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 85 L15 85 L15 75" stroke="url(#brandGradient)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M75 85 L85 85 L85 75" stroke="url(#brandGradient)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Burger with a Bite taken out */}
      <g mask="url(#biteMask)">
        <g fill="#FFFFFF">
          {/* Top Bun */}
          <path d="M 20 42 A 30 25 0 0 1 80 42 Z" mask="url(#bunMask)" />
          {/* Patty */}
          <rect x="16" y="48" width="68" height="12" rx="6" />
          {/* Bottom Bun */}
          <path d="M 20 66 A 30 15 0 0 0 80 66 Z" />
        </g>
      </g>
      
      {/* AR scanning line */}
      <motion.line 
        x1="20" 
        y1="0" 
        x2="80" 
        y2="0" 
        stroke="url(#brandGradient)" 
        strokeWidth="4" 
        strokeLinecap="round"
        animate={{ y: [25, 75, 25], opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      />
    </svg>
  </div>
);

export const QRScannerScreen: React.FC<{ onScanComplete: () => void, onClose: () => void }> = ({ onScanComplete, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => { 
        if (videoRef.current) { 
          videoRef.current.srcObject = stream; 
          setHasCamera(true); 
        } 
      })
      .catch(() => console.log("Camera access denied."));
      
    const scanTimer = setTimeout(() => {
      onScanComplete();
    }, 3000);

    return () => {
      clearTimeout(scanTimer);
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, [onScanComplete]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover transition-opacity duration-1000 ${hasCamera ? 'opacity-100' : 'opacity-0'}`} />
        {!hasCamera && <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center text-gray-500">Initializing camera...</div>}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="pt-safe px-4 py-4 flex justify-between items-center relative z-10">
        <button onClick={onClose} className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10"><ArrowLeft className="w-5 h-5" /></button>
        <div className="bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-sm font-medium">Scan AR Menu</div>
        <div className="w-10 h-10" />
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 border-2 border-brand/30 rounded-3xl" />
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-brand rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-brand rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-brand rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-brand rounded-br-3xl" />
          <motion.div animate={{ y: [0, 250, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="absolute top-0 left-0 right-0 h-0.5 bg-brand shadow-[0_0_15px_rgba(255,193,7,1)]" />
        </div>
      </div>
      
      <div className="pb-safe p-8 text-center relative z-10 bg-gradient-to-t from-black to-transparent">
        <h3 className="text-xl font-bold mb-2">Point at the QR Code</h3>
        <p className="text-gray-400 text-sm">Scan the restaurant's QR code to view their menu in 3D AR.</p>
      </div>
    </motion.div>
  );
};

export const MenuScreen: React.FC<{ 
  restaurant: Restaurant, 
  cart: CartItem[], 
  onBack: () => void, 
  onOpenAR: (item: MenuItem) => void, 
  onAddToCart: (item: MenuItem) => void, 
  onOpenCart: () => void,
  onSeeAllItems: (title: string, items: MenuItem[]) => void
}> = ({ restaurant, cart, onBack, onOpenAR, onAddToCart, onOpenCart, onSeeAllItems }) => {
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-black pb-24">
      <div className="relative h-[250px] sm:h-[350px] w-full overflow-hidden">
        <SafeImage src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between">
          <button onClick={onBack} className="p-2.5 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-colors border border-white/10"><ArrowLeft className="w-5 h-5" /></button>
          <button onClick={onOpenCart} className="p-2.5 bg-black/50 backdrop-blur-md rounded-full relative text-white hover:bg-black/70 transition-colors border border-white/10">
            <ShoppingBag className="w-5 h-5" />
            {cartItemsCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand text-black text-[10px] font-bold flex items-center justify-center rounded-full shadow-lg">{cartItemsCount}</span>}
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 max-w-3xl mx-auto w-full">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {restaurant.categories.map(cat => (
                <span key={cat} className="px-2.5 py-0.5 bg-brand/20 text-brand text-[10px] font-bold uppercase tracking-wider rounded-md border border-brand/30 backdrop-blur-sm">{cat}</span>
              ))}
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-3 tracking-tight text-white drop-shadow-lg">{restaurant.name}</h2>
            <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-gray-200">
              <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-brand fill-brand" /> {restaurant.rating}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-brand" /> {restaurant.deliveryTime}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-brand" /> {restaurant.location}</span>
              <span className="text-brand font-bold bg-brand/10 px-2 py-0.5 rounded border border-brand/20">{restaurant.priceRange}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-4 py-8 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-zinc-900 pb-4">
          <h3 className="text-xl font-bold tracking-tight">Menu Items</h3>
          <button 
            onClick={() => onSeeAllItems(`${restaurant.name} Menu`, restaurant.menu)}
            className="text-brand text-sm font-medium flex items-center hover:underline transition-all"
          >
            See all <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="space-y-6">
          {restaurant.menu.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl overflow-hidden flex flex-col sm:flex-row group hover:border-brand/30 transition-colors">
              <div className="h-48 sm:h-auto sm:w-40 relative overflow-hidden">
                <SafeImage src={item.img} alt={item.name} className="w-full h-full group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:hidden" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <span className="font-medium text-brand">Rs {item.price}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed">{item.desc}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => onOpenAR(item)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors border border-zinc-700"><Box className="w-4 h-4 text-brand" /> View in AR</button>
                  <button onClick={() => onAddToCart(item)} className="flex-1 bg-brand hover:bg-brand-dark text-black py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(255,193,7,0.1)]">Add to Cart</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const ARScreen: React.FC<{ item: MenuItem, onBack: () => void, onAddToCart: (item: MenuItem) => void }> = ({ item, onBack, onAddToCart }) => {
  const [phase, setPhase] = useState<'initializing' | 'scanning' | 'placing' | 'viewing'>('initializing');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState(false);

  useEffect(() => {
    const initTimer = setTimeout(() => setPhase('scanning'), 1500);
    const scanTimer = setTimeout(() => setPhase('placing'), 3500);
    const placeTimer = setTimeout(() => setPhase('viewing'), 5000);
    
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => { if (videoRef.current) { videoRef.current.srcObject = stream; setHasCamera(true); } })
      .catch(() => console.log("Camera access denied."));
      
    return () => {
      clearTimeout(initTimer); clearTimeout(scanTimer); clearTimeout(placeTimer);
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-zinc-950 flex flex-col">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover transition-opacity duration-1000 ${hasCamera ? 'opacity-100' : 'opacity-0'}`} />
        {!hasCamera && <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-black opacity-50" />}
        
        {/* AR Grid Overlay */}
        {(phase === 'scanning' || phase === 'placing') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-60" style={{ transform: 'perspective(500px) rotateX(60deg) scale(2)', transformOrigin: 'bottom' }} />
        )}
        
        {/* Camera UI Corners */}
        <div className="absolute top-24 left-6 w-8 h-8 border-t-2 border-l-2 border-white/50" />
        <div className="absolute top-24 right-6 w-8 h-8 border-t-2 border-r-2 border-white/50" />
        <div className="absolute bottom-48 left-6 w-8 h-8 border-b-2 border-l-2 border-white/50" />
        <div className="absolute bottom-48 right-6 w-8 h-8 border-b-2 border-r-2 border-white/50" />
      </div>

      <div className="pt-safe px-4 py-4 flex justify-between items-center relative z-10">
        <button onClick={onBack} className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10"><ArrowLeft className="w-5 h-5" /></button>
        <div className="bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-sm font-medium flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Live AR
        </div>
        <div className="w-10 h-10" />
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          {phase === 'initializing' && (
            <motion.div key="initializing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-black/60 backdrop-blur-md px-6 py-4 rounded-2xl flex items-center gap-3 border border-white/10">
              <div className="w-5 h-5 border-2 border-brand/20 border-t-brand rounded-full animate-spin" />
              <span className="font-medium">Initializing camera...</span>
            </motion.div>
          )}
          {phase === 'scanning' && (
            <motion.div key="scanning" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="flex flex-col items-center text-center bg-black/40 backdrop-blur-sm p-6 rounded-3xl border border-white/10">
              <div className="w-20 h-20 border-2 border-brand border-dashed rounded-full animate-[spin_4s_linear_infinite] mb-4 flex items-center justify-center"><Scan className="w-8 h-8 text-brand animate-pulse" /></div>
              <h3 className="text-lg font-medium mb-1">Detecting surface...</h3>
              <p className="text-sm text-gray-300">Move your phone slowly</p>
            </motion.div>
          )}
          {phase === 'placing' && (
            <motion.div key="placing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center bg-black/40 backdrop-blur-sm p-6 rounded-3xl border border-white/10">
              <div className="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center mb-4"><Box className="w-6 h-6 text-brand animate-bounce" /></div>
              <h3 className="text-lg font-medium">Placing object...</h3>
            </motion.div>
          )}
          {phase === 'viewing' && (
            <motion.div key="viewing" initial={{ opacity: 0, y: 50, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', damping: 20 }} className="relative w-full max-w-sm aspect-square flex items-center justify-center">
              <motion.div 
                drag 
                dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                whileTap={{ cursor: "grabbing" }}
                animate={{ y: [-5, 5, -5], rotateY: [0, 5, -5, 0] }} 
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} 
                className="relative z-10 w-4/5 h-4/5 rounded-full overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border-4 border-white/10 cursor-grab" 
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                <SafeImage src={item.arImg || item.img} alt={item.name} className="w-full h-full" />
              </motion.div>
              {/* Realistic Shadow */}
              <motion.div animate={{ scale: [1, 0.9, 1], opacity: [0.6, 0.4, 0.6] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} className="absolute -bottom-4 w-3/4 h-12 bg-black rounded-[100%] blur-2xl -z-10" />
              
              <div className="absolute -bottom-16 left-0 right-0 flex justify-center items-center gap-6">
                <div className="flex flex-col items-center gap-1 text-white/70">
                  <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10"><Rotate3D className="w-4 h-4" /></div>
                  <span className="text-[10px] uppercase tracking-wider font-medium">Rotate</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-white/70">
                  <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10"><Move className="w-4 h-4" /></div>
                  <span className="text-[10px] uppercase tracking-wider font-medium">Move</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-white/70">
                  <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10"><Maximize className="w-4 h-4" /></div>
                  <span className="text-[10px] uppercase tracking-wider font-medium">Scale</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div initial={{ y: 100 }} animate={{ y: phase === 'viewing' ? 0 : 100 }} className="bg-black/80 backdrop-blur-xl border-t border-white/10 p-6 pb-safe relative z-20">
        <div className="flex justify-between items-end mb-6">
          <div><h2 className="text-xl font-bold">{item.name}</h2><div className="text-brand font-medium mt-1">Rs {item.price}</div></div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setPhase('scanning')} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-3.5 rounded-xl font-medium transition-colors border border-zinc-700">Reset Position</button>
          <button onClick={() => onAddToCart(item)} className="flex-[2] bg-brand hover:bg-brand-dark text-black py-3.5 rounded-xl font-bold transition-colors shadow-[0_0_20px_rgba(255,193,7,0.2)]">Add to Order</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const CartScreen: React.FC<{ 
  cart: CartItem[], 
  onBack: () => void, 
  onAdd: (item: MenuItem) => void, 
  onRemove: (id: string) => void, 
  onClear: () => void,
  onCheckout: () => void
}> = ({ cart, onBack, onAdd, onRemove, onClear, onCheckout }) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 150;
  const total = subtotal + deliveryFee;

  return (
    <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-0 z-40 bg-black flex flex-col">
      <div className="border-b border-zinc-900 px-4 py-4 flex items-center justify-between bg-black/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors"><ArrowLeft className="w-6 h-6" /></button>
        <div className="font-bold text-lg tracking-tight">My Cart</div>
        <button onClick={onClear} className="text-xs font-medium text-red-500 hover:text-red-400 transition-colors uppercase tracking-wider">Clear</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 py-20">
            <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800">
              <ShoppingBag className="w-10 h-10 opacity-40" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Your cart is empty</h3>
            <p className="text-sm max-w-[200px] text-center mb-8">Add some delicious items from the menu to get started.</p>
            <button onClick={onBack} className="bg-brand text-black px-8 py-3 rounded-full font-bold transition-transform active:scale-95">Browse Menu</button>
          </div>
        ) : (
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">{cart.length} Items</span>
            </div>
            {cart.map(item => (
              <motion.div layout key={item.id} className="flex items-center gap-4 bg-zinc-900/40 p-4 rounded-3xl border border-white/5">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-white/5 shadow-lg">
                  <SafeImage src={item.img} alt={item.name} className="w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white truncate mb-0.5">{item.name}</h4>
                  <div className="text-brand font-bold text-sm">Rs {item.price}</div>
                </div>
                <div className="flex items-center gap-3 bg-black/50 rounded-2xl p-1.5 border border-white/5">
                  <button onClick={() => onRemove(item.id)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white bg-zinc-800 rounded-xl transition-colors"><Minus className="w-4 h-4" /></button>
                  <span className="w-4 text-center font-bold text-sm">{item.quantity}</span>
                  <button onClick={() => onAdd(item)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white bg-zinc-800 rounded-xl transition-colors"><Plus className="w-4 h-4" /></button>
                </div>
              </motion.div>
            ))}

            <div className="mt-8 bg-zinc-900/40 rounded-3xl p-6 border border-white/5 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">Bill Details</h3>
              <div className="flex justify-between text-gray-300 text-sm">
                <span className="flex items-center gap-2"><UtensilsCrossed className="w-4 h-4 text-gray-500" /> Item Total</span>
                <span className="font-medium">Rs {subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-300 text-sm">
                <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-gray-500" /> Delivery Fee</span>
                <span className="font-medium">Rs {deliveryFee}</span>
              </div>
              <div className="h-px bg-white/5 my-2" />
              <div className="flex justify-between items-center pt-1">
                <span className="text-lg font-bold text-white">To Pay</span>
                <span className="text-2xl font-black text-brand">Rs {total}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-6 bg-black border-t border-white/5 pb-safe">
          <button onClick={onCheckout} className="w-full bg-brand hover:bg-brand-dark text-black py-4.5 rounded-2xl font-black text-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(255,193,7,0.2)]">
            Proceed to Checkout <ArrowLeft className="w-5 h-5 rotate-180" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export const CheckoutScreen: React.FC<{ 
  cart: CartItem[], 
  onBack: () => void, 
  onPlaceOrder: (details: { address: string, phone: string, paymentMethod: 'Cash on Delivery' | 'Card' }) => void 
}> = ({ cart, onBack, onPlaceOrder }) => {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Card'>('Cash on Delivery');
  const [isPlacing, setIsPlacing] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 150;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    if (!address || !phone) {
      alert('Please fill in all details');
      return;
    }
    setIsPlacing(true);
    setTimeout(() => {
      onPlaceOrder({ address, phone, paymentMethod });
      setIsPlacing(false);
    }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="border-b border-zinc-900 px-4 py-4 flex items-center justify-between bg-black/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors"><ArrowLeft className="w-6 h-6" /></button>
        <div className="font-bold text-lg tracking-tight">Checkout</div>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Delivery Details */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Delivery Details
            </h3>
            <div className="space-y-4">
              <div className="relative">
                <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Delivery Address" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand/50 transition-colors"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand/50 transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> Payment Method
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setPaymentMethod('Cash on Delivery')}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${paymentMethod === 'Cash on Delivery' ? 'bg-brand/10 border-brand text-brand' : 'bg-zinc-900 border-white/5 text-gray-400'}`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'Cash on Delivery' ? 'border-brand' : 'border-gray-600'}`}>
                  {paymentMethod === 'Cash on Delivery' && <div className="w-3 h-3 bg-brand rounded-full" />}
                </div>
                <span className="text-xs font-bold uppercase">Cash</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('Card')}
                className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${paymentMethod === 'Card' ? 'bg-brand/10 border-brand text-brand' : 'bg-zinc-900 border-white/5 text-gray-400'}`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'Card' ? 'border-brand' : 'border-gray-600'}`}>
                  {paymentMethod === 'Card' && <div className="w-3 h-3 bg-brand rounded-full" />}
                </div>
                <span className="text-xs font-bold uppercase">Card</span>
              </button>
            </div>
          </section>

          {/* Order Summary */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Order Summary
            </h3>
            <div className="bg-zinc-900/40 rounded-3xl p-6 border border-white/5 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-300">{item.quantity}x {item.name}</span>
                  <span className="font-medium">Rs {item.price * item.quantity}</span>
                </div>
              ))}
              <div className="h-px bg-white/5 my-2" />
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-white">Total Amount</span>
                <span className="text-xl font-black text-brand">Rs {total}</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="p-6 bg-black border-t border-white/5 pb-safe">
        <button 
          onClick={handlePlaceOrder} 
          disabled={isPlacing}
          className="w-full bg-brand hover:bg-brand-dark text-black py-4.5 rounded-2xl font-black text-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(255,193,7,0.2)] disabled:opacity-70"
        >
          {isPlacing ? (
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              Placing Order...
            </span>
          ) : (
            <>Place Order • Rs {total}</>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export const OrderConfirmationScreen: React.FC<{ 
  order: Order, 
  onTrack: () => void, 
  onClose: () => void 
}> = ({ order, onTrack, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        className="relative mb-10"
      >
        <div className="w-28 h-28 bg-brand rounded-[32px] flex items-center justify-center shadow-[0_20px_50px_rgba(255,193,7,0.3)] rotate-12">
          <CheckCircle2 className="w-14 h-14 text-black -rotate-12" />
        </div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-brand" />
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-4xl font-black mb-3 tracking-tighter leading-none">ORDER<br/>CONFIRMED!</h2>
        <p className="text-zinc-500 mb-10 max-w-[280px] text-sm font-medium leading-relaxed">
          Your feast from <span className="text-white font-black">{order.restaurantName}</span> is being prepared with love.
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-sm bg-zinc-900/40 rounded-[32px] p-8 border border-white/5 mb-12 space-y-6"
      >
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Order ID</span>
          <span className="text-xs font-black text-white">#{order.id.slice(-6).toUpperCase()}</span>
        </div>
        <div className="h-px bg-white/5" />
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Estimated Time</span>
          <span className="text-xs font-black text-brand">25 - 35 MINS</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-sm space-y-4"
      >
        <button 
          onClick={onTrack} 
          className="w-full bg-brand text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-[0_15px_40px_rgba(255,193,7,0.2)] active:scale-[0.98] transition-transform"
        >
          Track Order
        </button>
        <button 
          onClick={onClose} 
          className="w-full bg-zinc-900/50 text-zinc-400 py-5 rounded-2xl font-black uppercase tracking-[0.2em] border border-white/5 hover:text-white transition-colors"
        >
          Back to Home
        </button>
      </motion.div>
    </motion.div>
  );
};

export const OrderTrackingScreen: React.FC<{ 
  order: Order, 
  onBack: () => void 
}> = ({ order, onBack }) => {
  const steps: OrderStatus[] = ['Order Placed', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered'];
  const currentStepIndex = steps.indexOf(order.status);

  return (
    <motion.div 
      initial={{ opacity: 0, y: '100%' }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: '100%' }} 
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-black flex flex-col"
    >
      {/* Immersive Header */}
      <div className="relative h-72 shrink-0 overflow-hidden">
        <SafeImage 
          src={order.restaurantImage || `https://picsum.photos/seed/${order.restaurantId}/800/600`} 
          alt={order.restaurantName} 
          className="w-full h-full object-cover scale-110 blur-[1px] opacity-40" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <button 
            onClick={onBack} 
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white border border-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="px-3 py-1 rounded-full bg-brand/20 backdrop-blur-md border border-brand/30 text-brand text-[10px] font-black uppercase tracking-widest">
            Live Tracking
          </div>
        </div>

        <div className="absolute bottom-10 left-6 right-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-brand text-[10px] font-black uppercase tracking-[0.2em]">On the way</span>
            </div>
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
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Order #{order.id.slice(-6).toUpperCase()}</p>
          </motion.div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-black rounded-t-[40px] -mt-10 relative z-10 px-6 pt-10 pb-32 space-y-8">

        {/* Rider Info Card */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Your Rider</h3>
          <div className="bg-zinc-900/40 rounded-3xl p-5 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative group">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-brand" />
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center mb-0.5">
                      <User className="w-4 h-4 text-brand" />
                    </div>
                    <div className="w-8 h-1.5 bg-brand/20 rounded-full" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-zinc-900 flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h4 className="font-black text-white text-base">Ahmed Khan</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex items-center gap-1 bg-brand/10 px-1.5 py-0.5 rounded text-[9px] font-black text-brand uppercase">
                    <Star className="w-2.5 h-2.5 fill-brand" /> 4.9
                  </div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Top Rated</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-white hover:bg-zinc-700 transition-colors border border-white/5">
                <Phone className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-2xl bg-brand flex items-center justify-center text-black hover:bg-brand-dark transition-colors shadow-lg">
                <Smartphone className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Status Timeline */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Order Status</h3>
          <div className="bg-zinc-900/20 rounded-3xl p-6 border border-white/5">
            <div className="space-y-0 relative">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-zinc-800" />
              <div 
                className="absolute left-[11px] top-2 w-0.5 bg-brand transition-all duration-1000 origin-top" 
                style={{ height: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
              />
              
              {steps.map((step, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const isFuture = index > currentStepIndex;

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
                        {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
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
          </div>
        </section>

        {/* Order Summary */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Order Summary</h3>
          <div className="bg-zinc-900/30 rounded-3xl p-6 border border-white/5 space-y-4">
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-[10px] font-black text-brand border border-white/5">
                    {item.quantity}x
                  </div>
                  <span className="text-xs font-bold text-zinc-300">{item.name}</span>
                </div>
                <span className="text-xs font-black text-white">Rs {item.price * item.quantity}</span>
              </div>
            ))}
            <div className="h-px bg-white/5 my-2" />
            <div className="flex justify-between items-center pt-1">
              <span className="text-sm font-black text-zinc-500 uppercase tracking-widest">Total Paid</span>
              <span className="text-xl font-black text-brand tracking-tighter">Rs {order.total}</span>
            </div>
          </div>
        </section>

        {/* Help Section */}
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
      </div>

      {/* Bottom Action */}
      <div className="p-6 bg-black/80 backdrop-blur-xl border-t border-white/5 pb-safe">
        <button 
          onClick={onBack} 
          className="w-full bg-white text-black py-4.5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-xl"
        >
          Back to Home
        </button>
      </div>
    </motion.div>
  );
};
