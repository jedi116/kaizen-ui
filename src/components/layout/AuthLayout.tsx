import { Outlet, Navigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useAuthStore } from '../../stores';

const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-dark-900 bg-gradient-mesh flex items-center justify-center p-4">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-violet/20 rounded-full blur-[100px] animate-pulse-slow animate-delay-500" />

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-violet mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold gradient-text">Kaizen</h1>
          <p className="text-white/50 mt-2">Your personal growth companion</p>
        </div>

        {/* Auth form container */}
        <div className="glass-card">
          <Outlet />
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-white/40 mt-6">
          Continuous improvement, one step at a time
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
