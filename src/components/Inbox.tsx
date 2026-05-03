import { useState } from 'react';
import { Search, Phone, Video, MoreVertical, Gift, Send, X } from 'lucide-react';

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
  const [messages, setMessages] = useState([
    { id: '1', text: 'Olá! Vi seu perfil no Match e adorei seu estilo!', sender: 'me', timestamp: '12:44' },
    { id: '2', text: chat.lastMessage, sender: 'them', timestamp: chat.time }
  ]);
  const [replyingTo, setReplyingTo] = useState<any>(null);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      replyTo: replyingTo ? replyingTo.text : null
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    setReplyingTo(null);
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col pt-4 overflow-hidden z-[60]">
      <div className="px-4 h-14 flex items-center gap-4 border-b border-white/10">
        <button onClick={onBack} className="p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex-1 flex items-center gap-3">
          <div className="relative">
            <img src={chat.avatar} className="w-9 h-9 rounded-full object-cover" />
            {chat.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full" />}
          </div>
          <div>
            <h3 className="font-semibold text-sm">{chat.name}</h3>
            <span className="text-[10px] text-green-500">Online agora</span>
          </div>
        </div>
        <div className="flex gap-4">
          <Video className="w-5 h-5 text-white/60" onClick={() => alert('Iniciando vídeo chamada...')} />
          <Phone className="w-5 h-5 text-white/60" />
          <MoreVertical className="w-5 h-5 text-white/60" />
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            onClick={() => setReplyingTo(msg)}
            className={`flex flex-col gap-1 max-w-[80%] cursor-pointer group ${msg.sender === 'me' ? 'self-end items-end' : 'self-start items-start'}`}
          >
            {msg.replyTo && (
              <div className="text-[10px] text-white/40 mb-1 flex items-center gap-1 italic">
                 Respondendo: "{msg.replyTo.substring(0, 20)}..."
              </div>
            )}
            <div className={`px-4 py-2 rounded-2xl relative transition-all active:scale-95 ${
              msg.sender === 'me' 
                ? 'bg-pink-600 rounded-tr-none' 
                : 'bg-white/10 rounded-tl-none'
            }`}>
              <p className="text-sm">{msg.text}</p>
              <span className="text-[8px] opacity-40 mt-1 block text-right">{msg.timestamp}</span>
            </div>
            <span className="text-[8px] text-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
              Toque para responder
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col bg-black border-t border-white/10">
        {replyingTo && (
          <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
               <div className="w-1 h-6 bg-pink-500 rounded-full flex-shrink-0" />
               <div className="truncate text-[10px]">
                 <span className="text-pink-500 font-bold">Replying to: </span>
                 <span className="text-white/60 font-medium">{replyingTo.text}</span>
               </div>
            </div>
            <button onClick={() => setReplyingTo(null)} className="p-1">
               <X className="w-4 h-4 text-white/40" />
            </button>
          </div>
        )}
        
        <div className="p-4 flex items-center gap-3">
          <button className="text-pink-500">
            <Gift className="w-6 h-6" />
          </button>
          <div className="flex-1 bg-white/10 rounded-full flex items-center px-4 py-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Enviar mensagem..."
              className="bg-transparent flex-1 focus:outline-none text-sm"
            />
          </div>
          <button 
            onClick={handleSendMessage}
            className={message ? "text-pink-500" : "text-white/20"}
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
