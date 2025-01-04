import { useAuth } from '../../contexts/AuthContext';
import { Bell, Settings } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-secondary px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-medium">{user?.name}</span>
          <span className="text-sm text-gray-400">{user?.role}</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-700 rounded-lg">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg">
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
} 