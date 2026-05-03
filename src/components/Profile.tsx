import { Settings, Shield, UserPlus, Grid, Heart, Lock, LogOut, Bell, Coins, Ban, Trash2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import NotificationsView from './NotificationsView';
import StoreView from './StoreView';

export default function Profile() {
  const [isFaceIdEnabled, setIsFaceIdEnabled] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showStore, setShowStore] = useState(false);
  const [notifSettings, setNotifSettings] = useState({
    likes: true,
    comments: true,
    followers: true,
    messages: true,
    live: true
  });

  if (showNotifications) return <NotificationsView onBack={() => setShowNotifications(false)} />;
  if (showStore) return <StoreView onBack={() => setShowStore(false)} />;

  return (
    <div className="h-screen bg-black text-white flex flex-col pt-4 pb-20 overflow-y-auto">
      <div className="px-4 flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold">@nathalia_dev</h1>
        <div className="flex gap-4">
          <button onClick={() => setShowNotifications(true)} className="relative">
            <Bell className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-black rounded-full text-[8px] flex items-center justify-center font-bold">3</div>
          </button>
          <Settings className="w-6 h-6" />
        </div>
      </div>

      <div className="flex flex-col items-center px-4 mb-8">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/10 p-1">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop" className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-black">
            <UserPlus className="w-4 h-4" />
          </div>
        </div>
        <h2 className="text-lg font-bold mb-1">Nathalia Evelyn</h2>
        <p className="text-sm text-white/60 mb-2 font-bold tracking-tight">Lead Product Designer</p>
        
        <div className="flex gap-2 mb-4">
          <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-white/60">São Paulo, BR</div>
          <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-white/60">Atlética</div>
        </div>

        <button 
           onClick={() => setShowStore(true)}
           className="flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-4 py-1.5 rounded-full mb-6 text-sm font-bold border border-yellow-500/20"
        >
          <Coins className="w-4 h-4" />
          1,240 Moedas
        </button>

        <div className="flex gap-8 mb-6">
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">124</span>
            <span className="text-xs text-white/40">Seguindo</span>
          </div>
          <div className="flex flex-col items-center border-x border-white/10 px-8">
            <span className="font-bold text-lg">45.2K</span>
            <span className="text-xs text-white/40">Seguidores</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">892K</span>
            <span className="text-xs text-white/40">Curtidas</span>
          </div>
        </div>

        <div className="flex gap-2 w-full max-w-sm">
          <button className="flex-1 bg-white/10 py-2.5 rounded-lg font-bold text-sm">Editar perfil</button>
          <button className="flex-1 bg-white text-black py-2.5 rounded-lg font-bold text-sm underline font-sans">Compartilhar</button>
        </div>
      </div>

      <div className="flex border-b border-white/10 px-4 mb-1">
        <button className="flex-1 py-3 border-b-2 border-white flex justify-center">
          <Grid className="w-6 h-6" />
        </button>
        <button className="flex-1 py-3 text-white/40 flex justify-center">
          <Heart className="w-6 h-6" />
        </button>
        <button className="flex-1 py-3 text-white/40 flex justify-center">
          <Lock className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-0.5 px-0.5 mb-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-white/5 relative">
             <img src={`https://picsum.photos/seed/${i + 20}/300/400`} className="w-full h-full object-cover opacity-60" />
          </div>
        ))}
      </div>

      {/* Settings Section */}
      <div className="px-4 mb-8">
        <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">Configurações Avançadas</h3>
        <div className="bg-white/5 rounded-3xl p-6 space-y-6">
          {/* Facial Security */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-green-500/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-bold">Face ID</p>
                <p className="text-[10px] text-white/40">Segurança Biométrica</p>
              </div>
            </div>
            <button
              onClick={() => setIsFaceIdEnabled(!isFaceIdEnabled)}
              className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${isFaceIdEnabled ? 'bg-green-500' : 'bg-zinc-700'}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${isFaceIdEnabled ? 'translate-x-5' : ''}`} />
            </button>
          </div>

          {/* Notifications Toggle */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Notificações</p>
            {Object.entries(notifSettings).map(([key, val]) => (
               <div key={key} className="flex items-center justify-between">
                 <span className="text-xs font-medium capitalize">{key}</span>
                 <button
                    onClick={() => setNotifSettings(prev => ({ ...prev, [key]: !val }))}
                    className={`w-9 h-5 rounded-full relative transition-colors duration-200 ${val ? 'bg-pink-500' : 'bg-zinc-700'}`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${val ? 'translate-x-4' : ''}`} />
                  </button>
               </div>
            ))}
          </div>

          <button className="w-full flex items-center gap-4 pt-4 border-t border-white/5 opacity-60">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <Ban className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold">Usuários Bloqueados</p>
              <p className="text-[10px] text-white/40">Gerencie quem não pode te ver</p>
            </div>
          </button>

          <button className="w-full flex items-center gap-4 pt-4 border-t border-white/5 opacity-60">
            <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-red-500">Sair da conta</p>
            </div>
          </button>

          <button className="w-full flex items-center gap-4 pt-4 border-t border-red-500/10 opacity-60">
            <div className="w-10 h-10 rounded-2xl bg-red-900/20 flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-red-600">Excluir conta permanentemente</p>
            </div>
          </button>
        </div>

        <div className="mt-8 p-6 bg-red-600/10 border border-red-600/20 rounded-3xl flex items-start gap-4">
           <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
           <div>
              <p className="text-sm font-bold text-red-500 uppercase tracking-tighter mb-1">Diretrizes Velvet</p>
              <p className="text-[11px] text-white/60 leading-relaxed font-medium">Fotos sensuais e semi-nuas são permitidas desde que respeitem nossas diretrizes de segurança. Este ambiente é 18+ e privativo.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
