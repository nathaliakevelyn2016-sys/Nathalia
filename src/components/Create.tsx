import { Camera, Radio, Video, Image as ImageIcon, X } from 'lucide-react';
import { motion } from 'motion/react';

export default function Create() {
  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-pink-500/20 blur-[100px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full" />

      <h1 className="text-3xl font-bold mb-2">Criar conteúdo</h1>
      <p className="text-white/60 text-center mb-12">Escolha como você quer se expressar hoje</p>

      <div className="grid grid-cols-2 gap-6 w-full max-w-md">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="aspect-square bg-white/5 rounded-3xl flex flex-col items-center justify-center gap-3 border border-white/5 hover:bg-white/10 transition-colors"
        >
          <div className="p-4 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl shadow-[0_0_15px_rgba(220,38,38,0.3)]">
            <Video className="w-8 h-8" />
          </div>
          <span className="font-semibold text-lg">Vídeo</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="aspect-square bg-white/5 rounded-3xl flex flex-col items-center justify-center gap-3 border border-white/5 hover:bg-white/10 transition-colors"
        >
          <div className="p-4 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-2xl">
            <Radio className="w-8 h-8" />
          </div>
          <span className="font-semibold text-lg">Ao Vivo</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="aspect-square bg-white/5 rounded-3xl flex flex-col items-center justify-center gap-3 border border-white/5 hover:bg-white/10 transition-colors"
        >
          <div className="p-4 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl shadow-[0_0_15px_rgba(220,38,38,0.3)]">
            <Camera className="w-8 h-8" />
          </div>
          <span className="font-semibold text-lg">Foto</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="aspect-square bg-white/5 rounded-3xl flex flex-col items-center justify-center gap-3 border border-white/5 hover:bg-white/10 transition-colors"
        >
          <div className="p-4 bg-gradient-to-br from-zinc-600 to-zinc-800 rounded-2xl">
            <ImageIcon className="w-8 h-8" />
          </div>
          <span className="font-semibold text-lg">Galeria</span>
        </motion.button>
      </div>

      <button className="mt-12 text-white/40 hover:text-white transition-colors">
        Ajuda e FAQ
      </button>
    </div>
  );
}
