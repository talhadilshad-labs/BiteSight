import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShoppingBag, Box, Plus, Minus, CheckCircle, Scan, Smartphone, Sparkles, Move, Maximize, Rotate3D, UtensilsCrossed } from 'lucide-react';
import { Restaurant, MenuItem, CartItem } from '../types';

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

export const MenuScreen: React.FC<{ restaurant: Restaurant, cart: CartItem[], onBack: () => void, onOpenAR: (item: MenuItem) => void, onAddToCart: (item: MenuItem) => void, onOpenCart: () => void }> = ({ restaurant, cart, onBack, onOpenAR, onAddToCart, onOpenCart }) => {
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="min-h-screen bg-black pb-24">
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-zinc-900 px-4 py-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors"><ArrowLeft className="w-6 h-6" /></button>
        <div className="font-semibold text-lg tracking-tight">{restaurant.name} <span className="text-brand">AR</span></div>
        <button onClick={onOpenCart} className="p-2 -mr-2 relative text-gray-400 hover:text-white transition-colors">
          <ShoppingBag className="w-6 h-6" />
          {cartItemsCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-brand text-black text-[10px] font-bold flex items-center justify-center rounded-full">{cartItemsCount}</span>}
        </button>
      </div>

      <div className="px-4 py-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Explore Menu</h2>
        <div className="space-y-6">
          {restaurant.menu.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl overflow-hidden flex flex-col sm:flex-row group hover:border-brand/30 transition-colors">
              <div className="h-48 sm:h-auto sm:w-40 relative overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
                <img src={item.arImg || item.img} alt={item.name} className="w-full h-full object-cover" />
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

export const CartScreen: React.FC<{ cart: CartItem[], onBack: () => void, onAdd: (item: MenuItem) => void, onRemove: (id: string) => void, onClear: () => void }> = ({ cart, onBack, onAdd, onRemove, onClear }) => {
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = total * 0.16;
  const grandTotal = total + tax;

  const handleOrder = () => {
    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false); setOrderSuccess(true);
      setTimeout(() => { onClear(); onBack(); }, 3000);
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 z-40 bg-black flex flex-col">
      <div className="border-b border-zinc-900 px-4 py-4 flex items-center justify-between bg-black">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors"><ArrowLeft className="w-6 h-6" /></button>
        <div className="font-semibold text-lg">Your Order</div>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {cart.length === 0 && !orderSuccess ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
            <p>Your cart is empty</p>
            <button onClick={onBack} className="mt-6 text-brand font-medium">Explore Menu</button>
          </div>
        ) : orderSuccess ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6"><CheckCircle className="w-10 h-10 text-green-500" /></div>
            <h2 className="text-2xl font-bold mb-2">Order Sent!</h2>
            <p className="text-gray-400">Your order has been sent to the kitchen successfully. It will be ready soon.</p>
          </motion.div>
        ) : (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 bg-zinc-900/50 p-3 rounded-2xl border border-zinc-800/50">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0"><img src={item.img} alt={item.name} className="w-full h-full object-cover" /></div>
                  <div className="flex-1"><h4 className="font-medium mb-1">{item.name}</h4><div className="text-brand text-sm font-medium">Rs {item.price}</div></div>
                  <div className="flex items-center gap-3 bg-black rounded-lg p-1 border border-zinc-800">
                    <button onClick={() => onRemove(item.id)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"><Minus className="w-4 h-4" /></button>
                    <span className="w-4 text-center font-medium">{item.quantity}</span>
                    <button onClick={() => onAdd(item)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-zinc-900/30 rounded-2xl p-5 border border-zinc-800/50 space-y-3">
              <div className="flex justify-between text-gray-400 text-sm"><span>Subtotal</span><span>Rs {total}</span></div>
              <div className="flex justify-between text-gray-400 text-sm"><span>Tax (16%)</span><span>Rs {tax.toFixed(0)}</span></div>
              <div className="h-px bg-zinc-800 my-2" />
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-brand">Rs {grandTotal.toFixed(0)}</span></div>
            </div>
          </div>
        )}
      </div>

      {cart.length > 0 && !orderSuccess && (
        <div className="p-4 bg-black border-t border-zinc-900 pb-safe">
          <button onClick={handleOrder} disabled={isOrdering} className="w-full bg-brand hover:bg-brand-dark text-black py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,193,7,0.2)] disabled:opacity-70">
            {isOrdering ? <span className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" /> Processing...</span> : `Confirm Order • Rs ${grandTotal.toFixed(0)}`}
          </button>
        </div>
      )}
    </motion.div>
  );
};
