import { Coins, Gift, Zap, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const STORE_ITEMS = [
  { id: '1', name: 'Desejo Secreto', description: 'Mande uma mensagem anônima', price: 50, icon: Sparkles, color: 'text-red-400' },
  { id: '2', name: 'Visão VIP', description: 'Veja quem curtiu seu perfil no Match', price: 200, icon: Zap, color: 'text-yellow-400' },
  { id: '3', name: 'Champagne Virtual', description: 'Presente luxuoso para lives', price: 500, icon: Gift, color: 'text-red-600' },
  { id: '4', name: 'Dominação do Feed', description: 'Vídeo em destaque por 1 hora', price: 1000, icon: TrendingUp, color: 'text-white' },
];

export default function StoreView({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-screen bg-velvet text-white flex flex-col pt-4 overflow-hidden z-[70]">
      <div className="px-4 h-14 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-1">
            <ArrowRight className="w-6 h-6 rotate-180" />
          </button>
          <h1 className="text-xl font-black uppercase tracking-tighter">CLUBE VIP</h1>
        </div>
        <div className="bg-yellow-500/20 px-3 py-1 rounded-full flex items-center gap-2">
          <Coins className="w-4 h-4 text-yellow-500" />
          <span className="font-bold text-yellow-500">1,240</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="bg-gradient-to-br from-zinc-900 to-black p-6 rounded-3xl border border-white/5">
          <h2 className="text-lg font-bold mb-2">Ganhe mais moedas</h2>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white/5 p-3 rounded-2xl flex flex-col gap-1">
              <span className="text-[10px] text-white/40 uppercase font-bold">Assistir vídeos</span>
              <span className="text-emerald-400 font-bold">+5 moedas/min</span>
            </div>
            <div className="bg-white/5 p-3 rounded-2xl flex flex-col gap-1">
              <span className="text-[10px] text-white/40 uppercase font-bold">Postar conteúdo</span>
              <span className="text-emerald-400 font-bold">+50 moedas</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {STORE_ITEMS.map((item) => (
            <motion.div 
              whileTap={{ scale: 0.98 }}
              key={item.id} 
              className="bg-white/5 p-4 rounded-3xl flex items-center gap-4 border border-white/5 hover:bg-white/10 transition-colors"
            >
              <div className={`p-4 rounded-2xl bg-white/5 ${item.color}`}>
                <item.icon className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-xs text-white/40">{item.description}</p>
              </div>
              <button className="bg-white text-black px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2">
                <Coins className="w-4 h-4" />
                {item.price}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
