import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { X, Heart, Star, Flame, Settings2, Check, Video, PhoneOff, MicOff, CameraOff, Sparkles, Ban, Bell, MessageSquare, Gift, Coins } from 'lucide-react';

const FETISHES = ['Submissão', 'Dominação', 'Bondage', 'Lingerie', 'Roleplay', 'Couro', 'Látex', 'Impacto'];

const GIFTS = [
  { id: 'rose', name: 'Rosa Negra', icon: '🌹', price: 10, color: 'text-red-600' },
  { id: 'diamond', name: 'Diamante Brut', icon: '💎', price: 100, color: 'text-blue-400' },
  { id: 'champagne', name: 'Moët & Chandon', icon: '🍾', price: 50, color: 'text-yellow-500' },
  { id: 'heart', name: 'Coração de Rubi', icon: '❤️', price: 25, color: 'text-red-500' },
];

const CANDIDATES = [
  { id: '1', name: 'Alana', age: 24, bio: 'Amo viajar e adoro novas experiências intensas. 🔥', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=700&fit=crop', interests: ['Dominação', 'Couro'] },
  { id: '2', name: 'Bruno', age: 28, bio: 'Em busca de alguém que entenda meus desejos mais profundos.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=700&fit=crop', interests: ['Submissão', 'Látex'] },
  { id: '3', name: 'Carla', age: 22, bio: 'Dançarina, flexível e muito curiosa.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=700&fit=crop', interests: ['Bondage', 'Lingerie'] },
];

export default function Match() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFetishes, setSelectedFetishes] = useState<string[]>(['Lingerie']);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showGiftMenu, setShowGiftMenu] = useState(false);
  const [activeGiftAnimation, setActiveGiftAnimation] = useState<string | null>(null);

  useEffect(() => {
    // Simulated real-time notification system
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const type = Math.random() > 0.5 ? 'match' : 'message';
        const newNotif = {
          id: Math.random().toString(36).substr(2, 9),
          type,
          user: CANDIDATES[Math.floor(Math.random() * CANDIDATES.length)],
          timestamp: new Date()
        };
        
        setNotifications(prev => [...prev, newNotif]);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== newNotif.id));
        }, 5000);
      }
    }, 15000); // Check every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredCandidates = CANDIDATES.filter(c => 
    selectedFetishes.length === 0 || c.interests.some(interest => selectedFetishes.includes(interest))
  );

  const currentCandidate = filteredCandidates[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (filteredCandidates.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredCandidates.length);
  };

  const toggleFetish = (fetish: string) => {
    setSelectedFetishes(prev => {
      const next = prev.includes(fetish) ? prev.filter(f => f !== fetish) : [...prev, fetish];
      setCurrentIndex(0); // Reset index when filters change
      return next;
    });
  };

  const sendGift = (gift: any) => {
    setActiveGiftAnimation(gift.icon);
    setShowGiftMenu(false);
    
    // Simulate API call and coin deduction
    setTimeout(() => {
      setActiveGiftAnimation(null);
      setNotifications(prev => [{
        id: 'gift-' + Date.now(),
        type: 'gift_sent',
        user: currentCandidate,
        giftName: gift.name
      }, ...prev]);
    }, 3000);
  };

  const startRandomCall = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowVideoCall(true);
    }, 2500);
  };

  if (showVideoCall) {
    return <VideoCallUI onEnd={() => setShowVideoCall(false)} />;
  }

  return (
    <div className="h-screen bg-velvet text-white flex flex-col pt-4 pb-20 px-4 relative overflow-hidden">
      {/* Gift Animation Layer */}
      <AnimatePresence>
        {activeGiftAnimation && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: 1000, 
                  x: Math.random() * 400 - 200, 
                  rotate: 0,
                  opacity: 1 
                }}
                animate={{ 
                  y: -1000, 
                  x: Math.random() * 600 - 300, 
                  rotate: 720,
                  opacity: 0 
                }}
                transition={{ 
                  duration: 2.5, 
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
                className="absolute text-5xl"
              >
                {activeGiftAnimation}
              </motion.div>
            ))}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              exit={{ scale: 3, opacity: 0 }}
              className="bg-red-600/20 backdrop-blur-3xl p-20 rounded-full border border-red-600/30 flex items-center justify-center"
            >
              <div className="text-8xl filter drop-shadow-[0_0_30px_rgba(220,38,38,0.8)]">
                {activeGiftAnimation}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications Overlay - Elite Noir Toasts */}
      <div className="absolute top-24 left-4 right-4 z-[55] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.9 }}
              className="bg-black/60 backdrop-blur-2xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-2xl pointer-events-auto"
            >
              <div className="relative">
                <img src={notif.user.image} className="w-12 h-12 rounded-xl object-cover grayscale brightness-75 border border-white/10" alt="" />
                <div className="absolute -bottom-1 -right-1 p-1 bg-red-600 rounded-lg shadow-lg">
                  {notif.type === 'match' ? <Heart className="w-3 h-3 text-white fill-white" /> : 
                   notif.type === 'gift_sent' ? <Gift className="w-3 h-3 text-white" /> :
                   <MessageSquare className="w-3 h-3 text-white" />}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-0.5">
                  {notif.type === 'match' ? 'Novo Match Elite' : 
                   notif.type === 'gift_sent' ? 'Presente Enviado' :
                   'Nova Mensagem'}
                </p>
                <p className="text-sm font-bold">
                  {notif.type === 'match' 
                    ? `${notif.user.name} tem desejos similares!` 
                    : notif.type === 'gift_sent'
                    ? `Você enviou um ${notif.giftName} para ${notif.user.name}!`
                    : `${notif.user.name} quer flertar em privado.`}
                </p>
              </div>
              <button 
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))}
                className="p-1 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black italic tracking-tighter text-red-600 uppercase leading-none">Velvet Match</h1>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 ml-0.5">Encontros Exclusivos</span>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowFilters(true)}
            className="bg-white/5 backdrop-blur-md p-2.5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all shadow-lg"
          >
            <Settings2 className="w-5 h-5 text-red-500" />
          </button>
          <div className="bg-red-600/10 backdrop-blur-md p-2.5 rounded-2xl border border-red-600/20 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
              <Star className="w-5 h-5 text-red-600 fill-red-600" />
          </div>
        </div>
      </div>

      {/* Random Video Call Banner - Exclusive Noir Style */}
      <button 
        onClick={startRandomCall}
        className="w-full bg-gradient-to-br from-zinc-900/40 to-black/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-5 mb-6 flex items-center justify-between group active:scale-[0.98] transition-all relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/5 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3 bg-red-600/20 rounded-2xl border border-red-600/30 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
            <Video className="w-6 h-6 text-red-500" />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-500 mb-0.5">Instant Access</p>
            <p className="text-lg font-black italic uppercase tracking-tighter">Conexão Noir</p>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/60 relative z-10 group-hover:border-red-600/50 group-hover:text-white transition-all">
           {isSearching ? 'Sintonizando...' : 'Conectar'}
        </div>
      </button>

      <div className="flex-1 relative mb-4">
        <AnimatePresence mode="popLayout">
          {currentCandidate ? (
             <SwipeCard
               key={currentCandidate.id}
               candidate={currentCandidate}
               onSwipeRight={() => handleSwipe('right')}
               onSwipeLeft={() => handleSwipe('left')}
               onGift={() => setShowGiftMenu(true)}
             />
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-zinc-900/20 rounded-[3rem] border border-white/5"
            >
              <div className="p-6 bg-red-600/10 rounded-full mb-4">
                <Flame className="w-12 h-12 text-red-600 opacity-20" />
              </div>
              <p className="text-white font-black uppercase tracking-tighter text-xl mb-2">Sem Resultados</p>
              <p className="text-white/40 text-sm max-w-[200px] font-bold uppercase tracking-widest leading-relaxed">Não encontramos desejos que combinem com seus filtros atuais.</p>
              <button 
                onClick={() => setSelectedFetishes([])}
                className="mt-6 text-red-500 font-black uppercase text-xs tracking-[0.2em] underline"
              >
                Limpar Filtros
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-8 mb-4">
        <button 
          className="p-5 bg-white/5 backdrop-blur-lg rounded-full text-white/40 border border-white/5 hover:bg-white/10 hover:text-white transition-all active:scale-90" 
          onClick={() => handleSwipe('left')}
        >
          <X className="w-8 h-8" />
        </button>
        <button className="p-4 bg-red-600/10 backdrop-blur-lg rounded-full text-red-600 border border-red-600/20 shadow-[0_0_20px_rgba(220,38,38,0.2)] active:scale-90 transition-all">
          <Star className="w-6 h-6 fill-red-600" />
        </button>
        <button 
          className="p-5 bg-red-600/80 backdrop-blur-lg rounded-full text-white border border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.4)] active:scale-90 transition-all" 
          onClick={() => handleSwipe('right')}
        >
          <Heart className="w-8 h-8 fill-white" />
        </button>
      </div>

      {/* Gift Selection Menu */}
      <AnimatePresence>
        {showGiftMenu && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="absolute inset-x-0 bottom-0 min-h-[50vh] bg-[#080808] z-[80] rounded-t-[3rem] p-8 border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
          >
            <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-8" />
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-black italic text-red-600 uppercase tracking-tighter">Enviar Mimo</h2>
                <p className="text-[10px] font-bold text-white/30 tracking-[0.2em] uppercase">Chame a atenção de {currentCandidate?.name}</p>
              </div>
              <button 
                onClick={() => setShowGiftMenu(false)}
                className="p-3 bg-white/5 rounded-2xl text-white/40 border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {GIFTS.map(gift => (
                <button
                  key={gift.id}
                  onClick={() => sendGift(gift)}
                  className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex flex-col items-center gap-2 hover:bg-red-600/10 hover:border-red-600/30 transition-all group"
                >
                  <span className="text-4xl filter grayscale-[40%] group-hover:grayscale-0 transition-all">{gift.icon}</span>
                  <p className="text-sm font-bold uppercase tracking-tighter">{gift.name}</p>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-black/40 rounded-full border border-white/5">
                    <Coins className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs font-black">{gift.price}</span>
                  </div>
                </button>
              ))}
            </div>

            <button className="w-full bg-white/5 border border-white/10 py-5 rounded-[2rem] flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest text-white/40">
              <Coins className="w-5 h-5 text-yellow-500" />
              Comprar mais Velvet Coins
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Searching Overlay - Atmospheric Noir */}
      <AnimatePresence>
        {isSearching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#050505]/95 backdrop-blur-2xl z-[60] flex flex-col items-center justify-center p-8 text-center"
          >
             <div className="relative mb-12">
                <motion.div 
                  animate={{ scale: [1, 2, 1], opacity: [0.2, 0.05, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-red-600 rounded-full blur-[80px]"
                />
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-600 to-red-950 flex items-center justify-center border border-red-500/30 relative z-10 shadow-[0_0_50px_rgba(220,38,38,0.3)]">
                   <Video className="w-12 h-12 text-white animate-pulse" />
                </div>
             </div>
             <h2 className="text-3xl font-black uppercase tracking-tighter italic text-red-600 mb-4">Sintonizando...</h2>
             <p className="text-white/40 text-xs max-w-xs uppercase tracking-[0.3em] font-bold leading-relaxed">Conectando você a frequências de desejos similares em tempo real.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters Overlay - Elegant Vault Style */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-x-0 bottom-0 top-0 bg-[#050505] z-50 p-8 flex flex-col"
          >
            <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-10" />
            
            <div className="flex justify-between items-start mb-10">
              <div className="flex flex-col">
                <h2 className="text-3xl font-black uppercase tracking-tighter italic text-red-600 leading-none mb-2">Seus Desejos</h2>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Personalize sua experiência</span>
              </div>
              <button 
                onClick={() => setShowFilters(false)}
                className="p-3 bg-white/5 rounded-2xl border border-white/10 text-white/40 hover:text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-white/50 mb-8 text-sm leading-relaxed font-medium">Selecione as fantasias e fetiches que definem seu momento. Encontraremos o par perfeito para sua realidade Velvet.</p>

            <div className="grid grid-cols-2 gap-4 flex-1 overflow-y-auto pb-12 scrollbar-hide">
               {FETISHES.map(fetish => (
                 <button
                    key={fetish}
                    onClick={() => toggleFetish(fetish)}
                    className={`p-6 rounded-[2rem] flex flex-col items-start justify-between border transition-all duration-500 ${
                      selectedFetishes.includes(fetish) 
                      ? 'bg-red-600/10 border-red-600/50 shadow-[0_0_20px_rgba(220,38,38,0.15)] scale-[1.02]' 
                      : 'bg-zinc-900/40 border-white/5 grayscale opacity-60'
                    }`}
                 >
                   <div className="flex justify-between w-full items-start mb-4">
                     <div className={`p-2 rounded-xl ${selectedFetishes.includes(fetish) ? 'bg-red-600 text-white' : 'bg-white/5 text-white/20'}`}>
                        <Flame className="w-4 h-4" />
                     </div>
                     {selectedFetishes.includes(fetish) && (
                       <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                         <Check className="w-4 h-4 text-red-500" />
                       </motion.div>
                     )}
                   </div>
                   <span className={`font-black uppercase tracking-tighter text-sm ${selectedFetishes.includes(fetish) ? 'text-white' : 'text-white/40'}`}>
                      {fetish}
                   </span>
                 </button>
               ))}
            </div>

            <button 
              onClick={() => setShowFilters(false)}
              className="w-full bg-red-600 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] italic shadow-[0_0_30px_rgba(220,38,38,0.4)] active:scale-[0.98] transition-transform"
            >
              Confirmar Desejos
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function VideoCallUI({ onEnd }: { onEnd: () => void }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    <div className="h-screen bg-[#050505] relative flex items-center justify-center z-[70]">
      {/* Remote User */}
      <img 
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=700&fit=crop" 
        className="w-full h-full object-cover" 
        alt="Remote" 
      />
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      
      {/* Local Preview - Premium Noir Style */}
      <div className="absolute top-10 right-6 w-36 h-52 bg-zinc-900 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl z-20">
        {!isVideoOff ? (
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=300&fit=crop" 
            className="w-full h-full object-cover grayscale brightness-75 contrast-125" 
            alt="Self" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-950">
             <CameraOff className="w-8 h-8 text-white/10" />
          </div>
        )}
        <div className="absolute bottom-4 left-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-xl border border-white/5 rounded-xl text-[8px] font-black uppercase tracking-widest text-center">Você</div>
      </div>

      {/* Call Info Overlay */}
      <div className="absolute top-10 left-6 flex flex-col gap-3">
        <div className="px-4 py-2 bg-red-600/90 backdrop-blur-xl rounded-2xl flex items-center gap-3 border border-red-500/30 shadow-lg">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]" />
          <span className="text-xs font-black uppercase tracking-tighter italic">LIVE: Carla, 22</span>
          <div className="px-1.5 py-0.5 bg-black/20 rounded text-[8px] font-black tracking-widest uppercase">4K NOIR</div>
        </div>
        <div className="px-4 py-2 bg-black/40 backdrop-blur-xl rounded-2xl flex items-center gap-2 border border-white/5 shadow-lg">
          <Sparkles className="w-3 h-3 text-yellow-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Dominação • Bondage</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 backdrop-blur-xl rounded-2xl w-fit border border-emerald-500/30 shadow-lg">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-0.5 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
          <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Hi-Fi Audio</span>
        </div>
      </div>

      {/* Controls - Minimalist Blackout */}
      <div className="absolute bottom-12 inset-x-0 px-10 flex items-center justify-between">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className={`p-5 rounded-[2rem] backdrop-blur-2xl border transition-all duration-300 ${isMuted ? 'bg-red-600 border-red-500' : 'bg-white/5 border-white/10 text-white/60 hover:text-white'}`}
        >
          <MicOff className="w-6 h-6" />
        </button>
        
        <button 
          onClick={onEnd}
          className="p-8 bg-red-600 rounded-full shadow-[0_0_40px_rgba(220,38,38,0.5)] active:scale-90 transition-all border-4 border-black/20"
        >
          <PhoneOff className="w-10 h-10 fill-white" />
        </button>

        <button 
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`p-5 rounded-[2rem] backdrop-blur-2xl border transition-all duration-300 ${isVideoOff ? 'bg-red-600 border-red-500' : 'bg-white/5 border-white/10 text-white/60 hover:text-white'}`}
        >
          <CameraOff className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

function SwipeCard({ candidate, onSwipeRight, onSwipeLeft, onGift }: { 
  candidate: any; 
  onSwipeRight: () => void; 
  onSwipeLeft: () => void;
  onGift: () => void;
  key?: string;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) {
      onSwipeRight();
    } else if (info.offset.x < -100) {
      onSwipeLeft();
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
    >
      <div className="w-full h-full rounded-[3rem] overflow-hidden relative shadow-2xl border border-white/5 bg-zinc-950">
        <img src={candidate.image} alt={candidate.name} className="w-full h-full object-cover grayscale-[20%] brightness-90 contrast-[1.1]" />
        
        <div className="absolute top-8 left-8 right-8 flex justify-between items-start pointer-events-none">
          <div className="px-5 py-2 bg-black/60 backdrop-blur-2xl rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 text-white/80 shadow-xl">
             On-line
          </div>
          <div className="flex gap-3 pointer-events-auto">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onGift();
              }}
              className="p-3 bg-red-600/80 backdrop-blur-2xl rounded-2xl border border-red-500 text-white shadow-xl hover:scale-110 transition-transform"
            >
               <Gift className="w-5 h-5" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if(window.confirm(`Deseja denunciar e bloquear ${candidate.name}?`)) {
                  alert('Usuário silenciado.');
                  onSwipeLeft();
                }
              }}
              className="p-3 bg-black/60 backdrop-blur-2xl rounded-2xl border border-white/10 hover:bg-red-600/20 text-white/30 hover:text-red-500 transition-all shadow-xl"
            >
               <Ban className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-8 pt-24 bg-gradient-to-t from-black via-black/80 to-transparent">
          <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
             {candidate.interests.map(interest => (
               <div key={interest} className="px-4 py-1.5 bg-red-600/10 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-[0.1em] text-red-500 border border-red-600/30 flex items-center gap-1.5 whitespace-nowrap">
                 <Flame className="w-3 h-3" />
                 {interest}
               </div>
             ))}
          </div>

          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none">{candidate.name}<span className="text-red-600 ml-1">.</span></h2>
            <span className="text-2xl font-bold text-white/40">{candidate.age}</span>
            <div className="w-5 h-5 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.8)] border-2 border-black" />
          </div>
          
          <p className="text-white/60 text-sm italic font-medium leading-relaxed line-clamp-2 pr-10 border-l-2 border-red-600/30 pl-4">
            "{candidate.bio}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}

