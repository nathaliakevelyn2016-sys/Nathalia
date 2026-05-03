import { useState } from 'react';
import { Search, Phone, Video, MoreVertical, Gift, Send } from 'lucide-react';

const CHATS = [
  { id: '1', name: 'Maria Silva', lastMessage: 'Oi! Como você está?', time: '12:45', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', online: true },
  { id: '2', name: 'João Tech', lastMessage: 'Viu aquele vídeo novo?', time: 'Ontem', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', online: false },
  { id: '3', name: 'Equipe de Suporte', lastMessage: 'Seu presente foi enviado!', time: 'Ontem', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop', online: true },
];

export default function Inbox() {
  const [selectedChat, setSelectedChat] = useState<typeof CHATS[0] | null>(null);

  if (selectedChat) {
    return <ChatView chat={selectedChat} onBack={() => setSelectedChat(null)} />;
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col pt-4 pb-20 overflow-hidden">
      <div className="px-4 mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mensagens</h1>
        <div className="flex gap-4">
           <Video className="w-6 h-6 text-white/60" />
           <Search className="w-6 h-6 text-white/60" />
        </div>
      </div>

      <div className="flex gap-4 px-4 overflow-x-auto pb-4 scrollbar-hide">
        {CHATS.map((chat) => (
           <div key={`online-${chat.id}`} className="flex flex-col items-center gap-1 flex-shrink-0">
             <div className="relative">
               <img src={chat.avatar} className="w-16 h-16 rounded-full border-2 border-pink-500 p-0.5 object-cover" />
               {chat.online && <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full" />}
             </div>
             <span className="text-[10px] text-white/60">{chat.name.split(' ')[0]}</span>
           </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {CHATS.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setSelectedChat(chat)}
            className="w-full flex items-center gap-4 px-4 py-3 hover:bg-white/5 active:bg-white/10 transition-colors"
          >
            <img src={chat.avatar} className="w-14 h-14 rounded-full object-cover" />
            <div className="flex-1 text-left">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold">{chat.name}</h3>
                <span className="text-xs text-white/40">{chat.time}</span>
              </div>
              <p className="text-sm text-white/60 truncate">{chat.lastMessage}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatView({ chat, onBack }: { chat: typeof CHATS[0], onBack: () => void }) {
  const [message, setMessage] = useState('');

  return (
    <div className="h-screen bg-black text-white flex flex-col pt-4 overflow-hidden z-[60]">
      <div className="px-4 h-14 flex items-center gap-4 border-b border-white/10">
        <button onClick={onBack} className="p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex-1 flex items-center gap-3">
          <img src={chat.avatar} className="w-9 h-9 rounded-full object-cover" />
          <div>
            <h3 className="font-semibold text-sm">{chat.name}</h3>
            <span className="text-[10px] text-green-500">Online agora</span>
          </div>
        </div>
        <div className="flex gap-4">
          <Video className="w-5 h-5" onClick={() => alert('Iniciando vídeo chamada...')} />
          <Phone className="w-5 h-5" />
          <MoreVertical className="w-5 h-5" />
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
        <div className="self-end bg-pink-600 text-white px-4 py-2 rounded-2xl rounded-tr-none max-w-[80%] text-sm">
          Olá! Vi seu perfil no Match e adorei seu estilo!
        </div>
        <div className="self-start bg-white/10 text-white px-4 py-2 rounded-2xl rounded-tl-none max-w-[80%] text-sm">
          {chat.lastMessage}
        </div>
      </div>

      <div className="p-4 bg-black border-t border-white/10 flex items-center gap-3">
        <button className="text-pink-500">
          <Gift className="w-6 h-6" />
        </button>
        <div className="flex-1 bg-white/10 rounded-full flex items-center px-4 py-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enviar mensagem..."
            className="bg-transparent flex-1 focus:outline-none text-sm"
          />
        </div>
        <button className={message ? "text-pink-500" : "text-white/20"}>
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
