import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,
  Dumbbell,
  Utensils,
  Settings,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../stores';
import { Avatar } from '../ui';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  disabled?: boolean;
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: 'Finance',
    href: '/finance',
    icon: <Wallet className="w-5 h-5" />,
  },
  {
    name: 'Workouts',
    href: '/workouts',
    icon: <Dumbbell className="w-5 h-5" />,
    badge: 'Soon',
  },
  {
    name: 'Nutrition',
    href: '/nutrition',
    icon: <Utensils className="w-5 h-5" />,
    badge: 'Soon',
  },
];

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass-card rounded-none border-r border-glass-border flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-glass-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold gradient-text">Kaizen</h1>
            <p className="text-xs text-white/50">Personal Growth</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-accent-cyan/20 to-accent-violet/20 text-white border border-accent-cyan/30'
                  : 'text-white/60 hover:text-white hover:bg-glass-white'
              )}
            >
              <span className={cn(isActive && 'text-accent-cyan')}>{item.icon}</span>
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-accent-violet/30 text-accent-violet border border-accent-violet/40">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-glass-border space-y-2">
        <NavLink
          to="/settings"
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
            location.pathname === '/settings'
              ? 'bg-gradient-to-r from-accent-cyan/20 to-accent-violet/20 text-white border border-accent-cyan/30'
              : 'text-white/60 hover:text-white hover:bg-glass-white'
          )}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>

        {/* User profile */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-glass-light">
          <Avatar name={user?.name || 'User'} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-white/50 truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-white/50 hover:text-accent-rose transition-colors rounded-lg hover:bg-glass-white"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
