import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, 
  BookOpen, 
  GamepadIcon, 
  Trophy, 
  User,
  Settings,
  BarChart
} from 'lucide-react';

export function Sidebar() {
  const { user } = useAuth();

  const links = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/courses', icon: BookOpen, label: 'Courses' },
    { to: '/games', icon: GamepadIcon, label: 'Games' },
    { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  const adminLinks = [
    { to: '/admin', icon: BarChart, label: 'Admin Dashboard' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-secondary h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold">Learning Platform</h1>
      </div>

      <nav className="flex-1 px-4">
        <div className="space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-accent text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`
              }
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </NavLink>
          ))}
        </div>

        {user?.role === 'admin' && (
          <>
            <div className="my-4 border-t border-gray-700" />
            <div className="space-y-1">
              {adminLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      isActive ? 'bg-accent text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`
                  }
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </NavLink>
              ))}
            </div>
          </>
        )}
      </nav>
    </div>
  );
} 