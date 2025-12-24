import { useLocation } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';

const pageTitles: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Dashboard',
    description: 'Overview of your personal growth journey',
  },
  '/finance': {
    title: 'Finance',
    description: 'Track your income and expenses',
  },
  '/workouts': {
    title: 'Workouts',
    description: 'Log and track your exercise routines',
  },
  '/nutrition': {
    title: 'Nutrition',
    description: 'Monitor your food intake and macros',
  },
  '/settings': {
    title: 'Settings',
    description: 'Manage your account and preferences',
  },
};

const Header = () => {
  const location = useLocation();
  const pageInfo = pageTitles[location.pathname] || {
    title: 'Kaizen',
    description: 'Personal self-improvement',
  };

  return (
    <header className="sticky top-0 z-30 px-8 py-6">
      <div className="flex items-center justify-between">
        {/* Page title */}
        <div>
          <h1 className="text-2xl font-display font-bold text-white">{pageInfo.title}</h1>
          <p className="text-sm text-white/50 mt-1">{pageInfo.description}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button className="p-3 glass-card rounded-xl text-white/60 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button className="p-3 glass-card rounded-xl text-white/60 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent-rose rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
