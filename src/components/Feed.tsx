import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Music2, X, MoreHorizontal, Bookmark, Sparkles, Ban } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VideoPost {
  id: string;
  creatorName: string;
  creatorAvatar: string;
  caption: string;
  videoUrl: string;
  musicName: string;
  likes: number;
  comments: number;
  shares: number;
}

const DUMMY_POSTS: VideoPost[] = [
  {
    id: '1',
    creatorName: 'Velvet_Queen',
    creatorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    caption: 'Explorando o lado obscuro da elegância. ✨ #velvet #nightlife',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-light-dancing-alone-22954-large.mp4',
    musicName: 'Deep Bass - Midnight Session',
    likes: 12500,
    comments: 890,
    shares: 420
  },
  {
    id: '2',
    creatorName: 'Dante_Night',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    caption: 'O mistério é o segredo do desejo. 🌑 #mystery #style',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-beautiful-sunset-over-the-ocean-156-large.mp4',
    musicName: 'Dark Noir - Instrumental',
    likes: 8700,
    comments: 340,
    shares: 156
  }
];

export default function Feed() {
  const [activeFeed, setActiveFeed] = useState<'foryou' | 'following'>('foryou');

  return (
    <div className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory scrollbar-hide relative">
      {/* Premium Header Nav */}
      <div className="absolute top-0 left-0 right-0 z-50 flex justify-center py-6 pointer-events-none">
        <div className="flex items-center gap-6 pointer-events-auto bg-black/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/5">
          <button 
            onClick={() => setActiveFeed('following')}
            className={`text-sm font-bold transition-all ${activeFeed === 'following' ? 'text-white scale-110' : 'text-white/40 hover:text-white/60'}`}
          >
            Seguindo
          </button>
          <div className="w-1 h-1 bg-red-600 rounded-full" />
          <button 
            onClick={() => setActiveFeed('foryou')}
            className={`text-sm font-bold transition-all ${activeFeed === 'foryou' ? 'text-white scale-110' : 'text-white/40 hover:text-white/60'}`}
          >
            Para Você
          </button>
        </div>
      </div>

      {DUMMY_POSTS.map((post) => (
        <VideoItem key={post.id} post={post} />
      ))}
    </div>
  );
}

function VideoItem({ post }: { post: VideoPost; key?: string }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  return (
    <div className="h-screen w-full snap-start relative flex flex-col justify-center bg-black">
      <video
        ref={videoRef}
        src={post.videoUrl}
        className="w-full h-full object-cover"
        loop
        playsInline
        autoPlay
        muted
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
      />

      {/* Sophisticated Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

      {/* Right Sidebar Actions - Premium Design */}
      <div className="absolute right-4 bottom-28 flex flex-col items-center gap-7 z-10">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center mb-2"
        >
          <div className="w-14 h-14 rounded-full border-[3px] border-red-600 p-0.5 overflow-hidden mb-1 shadow-[0_0_15px_rgba(220,38,38,0.4)]">
            <img src={post.creatorAvatar} alt={post.creatorName} className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="bg-red-600 rounded-full w-5 h-5 flex items-center justify-center -mt-4 border-2 border-black z-20">
            <span className="text-white text-[10px] font-black">+</span>
          </div>
        </motion.div>

        <button onClick={() => setIsLiked(!isLiked)} className="flex flex-col items-center group">
          <div className="p-3 bg-red-600/10 backdrop-blur-sm rounded-full mb-1 group-hover:bg-red-600/20 transition-colors border border-red-600/20">
            <Heart className={`w-7 h-7 ${isLiked ? 'fill-red-600 text-red-600' : 'text-white'}`} />
          </div>
          <span className="text-white text-[10px] font-bold tracking-widest">AMAR</span>
        </button>

        <button onClick={() => setShowComments(true)} className="flex flex-col items-center group">
          <div className="p-3 bg-white/5 backdrop-blur-sm rounded-full mb-1 group-hover:bg-white/10 transition-colors">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <span className="text-white text-[10px] font-bold tracking-widest">CONVERSAR</span>
        </button>

        <button className="flex flex-col items-center group">
          <div className="p-3 bg-pink-600/10 backdrop-blur-sm rounded-full mb-1 group-hover:bg-pink-600/20 transition-colors border border-pink-600/20">
            <Sparkles className="w-7 h-7 text-pink-500" />
          </div>
          <span className="text-white text-[10px] font-bold tracking-widest">FLERTAR</span>
        </button>

        <button className="flex flex-col items-center group">
          <div className="p-3 bg-white/5 backdrop-blur-sm rounded-full mb-1 group-hover:bg-white/10 transition-colors">
            <Share2 className="w-7 h-7 text-white" />
          </div>
          <span className="text-white text-[10px] font-bold tracking-widest">{post.shares}</span>
        </button>

        <button 
          onClick={() => {
            if(window.confirm(`Deseja bloquear @${post.creatorName}?`)) {
              alert('Usuário bloqueado com sucesso.');
            }
          }}
          className="p-3 bg-white/5 backdrop-blur-sm rounded-full group-hover:bg-white/10 transition-colors"
        >
          <Ban className="w-7 h-7 text-white" />
        </button>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-16 left-0 right-0 h-0.5 bg-white/10 z-20">
        <motion.div 
          className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Bottom Info - Refined Typography */}
      <div className="absolute left-6 bottom-20 right-24 text-white z-10">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="font-black text-xl tracking-tighter uppercase italic">@{post.creatorName}</h3>
          <div className="px-2 py-0.5 bg-red-600 rounded text-[10px] font-black uppercase tracking-widest shadow-[0_0_10px_rgba(220,38,38,0.4)]">
            PRO
          </div>
        </div>
        <p className="text-sm font-medium leading-relaxed opacity-90 mb-4 pr-10">{post.caption}</p>
        
        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/5">
          <Music2 className="w-4 h-4 text-red-500 animate-pulse" />
          <div className="overflow-hidden w-32">
            <div className="whitespace-nowrap animate-marquee">
              <span className="text-xs font-bold tracking-tight uppercase">{post.musicName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Sidebar/Drawer */}
      <AnimatePresence>
        {showComments && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowComments(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 h-[75%] bg-[#0a0a0a] border-t border-white/10 rounded-t-[40px] z-50 p-8 flex flex-col shadow-2xl"
            >
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto mb-8" />
              
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-black text-2xl tracking-tighter uppercase italic text-red-600">{post.comments} Comentários</h3>
                <button onClick={() => setShowComments(false)} className="p-2 bg-white/5 rounded-full text-white/40 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 mb-6 scrollbar-hide">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-xs font-black text-red-600 uppercase tracking-tighter">usuário_{i+1}</p>
                        <span className="text-[10px] text-white/20 font-bold">2H</span>
                      </div>
                      <p className="text-sm leading-relaxed text-white/80">Este conteúdo é absolutamente impecável. A produção eleva o nível da plataforma! 🔥</p>
                      <div className="flex gap-6 mt-3 text-[10px] text-white/40 font-black uppercase tracking-widest">
                        <button className="hover:text-red-500 transition-colors">Responder</button>
                        <button className="hover:text-red-500 transition-colors">Curtir</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 bg-white/5 p-2 pr-4 rounded-3xl border border-white/5 focus-within:border-red-600/50 transition-all">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                  <span className="text-white font-black text-xs">SV</span>
                </div>
                <input
                  type="text"
                  placeholder="Deixe sua marca..."
                  className="bg-transparent flex-1 text-sm font-medium focus:outline-none placeholder:text-white/20"
                />
                <div className="flex gap-4 text-white/40">
                  <button className="hover:text-white transition-colors">@</button>
                  <button className="hover:text-red-600 transition-colors font-black uppercase text-xs tracking-widest">Postar</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

