import { Home, Grid, ShoppingCart, User } from 'lucide-react';
import useStore from '../../store/useStore';

interface BottomNavProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function BottomNav({ onNavigate, currentPage }: BottomNavProps) {
  const { darkMode, cartCount } = useStore();
  const count = cartCount();

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'products', label: 'Products', icon: Grid },
    { id: 'cart', label: 'Cart', icon: ShoppingCart },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-50 border-t ${
      darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    } safe-area-pb`}>
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentPage === tab.id || (tab.id === 'profile' && (currentPage === 'profile' || currentPage === 'orders'));
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`relative flex flex-col items-center gap-0.5 px-5 py-1.5 rounded-xl transition-all ${
                isActive
                  ? 'text-violet-600'
                  : darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              {isActive && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-violet-600 rounded-full" />
              )}
              <div className={`relative p-1 rounded-xl transition-colors ${isActive ? 'bg-violet-50 dark:bg-violet-900/20' : ''}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                {tab.id === 'cart' && count > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-violet-600 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'text-violet-600' : ''}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
