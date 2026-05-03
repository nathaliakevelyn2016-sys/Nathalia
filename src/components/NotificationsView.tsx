import { Bell, Heart, MessageSquare, UserPlus, Radio, Gift, ArrowRight } from 'lucide-react';

const NOTIFICATIONS = [
  { id: '1', type: 'like', user: 'julia_sun', message: 'curtiu seu vídeo', time: '2m', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: '2', type: 'comment', user: 'marco_dev', message: 'comentou: "Incrível! 👏"', time: '15m', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  { id: '3', type: 'follow', user: 'ana_dance', message: 'começou a te seguir', time: '1h', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
  { id: '4', type: 'live', user: 'carlos_live', message: 'está ao vivo agora!', time: '2h', avatar: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
  { id: '5', type: 'friend_request', user: 'pedro_vibe', message: 'enviou uma solicitação de amizade', time: '5h', avatar: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
];

export default function NotificationsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-screen bg-black text-white flex flex-col pt-4 overflow-hidden z-[70]">
      <div className="px-4 h-14 flex items-center gap-4 border-b border-white/10">
        <button onClick={onBack} className="p-1">
          <ArrowRight className="w-6 h-6 rotate-180" />
        </button>
        <h1 className="text-xl font-bold">Atividade</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {NOTIFICATIONS.map((notif) => (
            <div key={notif.id} className="flex items-center gap-3">
              <div className="relative">
                <img src={notif.avatar} className="w-12 h-12 rounded-full object-cover" />
                <div className={`absolute -bottom-1 -right-1 p-1 rounded-full border-2 border-black
                  ${notif.type === 'like' ? 'bg-red-500' : 
                    notif.type === 'comment' ? 'bg-blue-500' :
                    notif.type === 'follow' ? 'bg-pink-500' :
                    notif.type === 'live' ? 'bg-purple-500' : 'bg-zinc-700'}
                `}>
                  {notif.type === 'like' && <Heart className="w-2 h-2 text-white fill-white" />}
                  {notif.type === 'comment' && <MessageSquare className="w-2 h-2 text-white fill-white" />}
                  {notif.type === 'follow' && <UserPlus className="w-2 h-2 text-white" />}
                  {notif.type === 'live' && <Radio className="w-2 h-2 text-white" />}
                  {notif.type === 'friend_request' && <UserPlus className="w-2 h-2 text-white" />}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-bold">@{notif.user}</span> {notif.message}
                </p>
                <span className="text-xs text-white/40">{notif.time}</span>
              </div>
              {notif.type === 'friend_request' && (
                <button className="bg-pink-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold">Aceitar</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
