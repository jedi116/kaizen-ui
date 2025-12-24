import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores';
import Sidebar from './Sidebar';
import Header from './Header';

const AppLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-dark-900 bg-gradient-mesh">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="ml-64 min-h-screen">
        <Header />
        <div className="px-8 pb-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
