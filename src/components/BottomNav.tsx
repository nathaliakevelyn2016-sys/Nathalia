import { Home, Search, PlusCircle, Heart, MessageCircle, User } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TabType = 'feed' | 'explore' | 'create' | 'match' | 'inbox' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { id: 'feed', icon: Home, label: 'Feed', style: "textDecorationLine: underline" },
    { id: 'explore', icon: Search, label: 'Club', style: "fontWeight: bold; textDecorationLine: underline" },
    { id: 'create', icon: PlusCircle, label: '', style: "textDecorationLine: underline" },
    { id: 'match', icon: Heart, label: 'Desejos', style: "textDecorationLine: underline" },
    { id: 'inbox', icon: MessageCircle, label: 'Privado', style: "textDecorationLine: underline" },
    { id: 'profile', icon: User, label: 'Meu Perfil', style: "textDecorationLine: underline; fontFamily: Arial" },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex items-center justify-around pb-safe h-16 z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as TabType)}
          style={tab.style.split(';').reduce((acc, curr) => {
            const [k, v] = curr.split(':');
            if (k && v) acc[k.trim()] = v.trim();
            return acc;
          }, {} as any)}
          className={cn(
            "flex flex-col items-center justify-center flex-1 h-full transition-colors",
            activeTab === tab.id ? "text-red-600" : "text-white/40"
          )}
        >
          <tab.icon className={cn("w-6 h-6", tab.id === 'create' && "w-10 h-10 text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]")} />
          {tab.label && <span className="text-[10px] mt-1">{tab.label}</span>}
        </button>
      ))}
    </div>
  );
}
