import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { BookOpen, Music, BarChart, Settings, Menu, X } from 'lucide-react';

const sidebarItems = [
  { icon: BookOpen, label: 'Course Management', path: '/admin' },
  { icon: BookOpen, label: 'Tutorial Steps', path: '/admin/tutorials' },
  { icon: Music, label: 'Sound Management', path: '/admin/sounds' },
  { icon: BarChart, label: 'Analytics', path: '/admin/analytics' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0B1120]">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1B2333] transform transition-transform duration-200 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4">
          <h1 className="text-xl font-bold text-white mb-8">Admin Panel</h1>
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-500/10 text-blue-500'
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-200 ${sidebarOpen ? 'pl-64' : 'pl-0'}`}>
        <div className="p-8">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg lg:hidden"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
          <Outlet />
        </div>
      </div>
    </div>
  );
} 