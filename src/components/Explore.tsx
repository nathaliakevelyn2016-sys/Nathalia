import { Search as SearchIcon } from 'lucide-react';

const TRENDING = [
  { id: '1', image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=300&h=400&fit=crop', views: '1.2M' },
  { id: '2', image: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?w=300&h=400&fit=crop', views: '800K' },
  { id: '3', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop', views: '2.4M' },
  { id: '4', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=400&fit=crop', views: '500K' },
  { id: '5', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=400&fit=crop', views: '1.1M' },
  { id: '6', image: 'https://images.unsplash.com/photo-1525547718571-03b0576e515a?w=300&h=400&fit=crop', views: '90K' },
];

export default function Explore() {
  return (
    <div className="min-h-screen bg-black text-white pt-4 pb-20 px-4">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <SearchIcon className="w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Procurar conteúdo ou usuários"
          className="w-full bg-white/10 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-white/30"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-8">
        {['Para você', 'Tendências', 'Jogos', 'Esportes', 'Moda'].map((cat) => (
          <button key={cat} className="whitespace-nowrap px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium">
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-1 px-1">
        {TRENDING.map((item) => (
          <div key={item.id} className="aspect-[3/4] relative overflow-hidden bg-gray-800">
            <img src={item.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute bottom-1 left-2 flex items-center gap-1">
              <div className="w-3 h-3 border-t-2 border-r-2 border-white rotate-45" />
              <span className="text-[10px] font-bold">{item.views}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
