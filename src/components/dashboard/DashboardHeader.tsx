import { Clock, Layout, Zap, Trophy } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function DashboardHeader() {
  const { user } = useAuth();

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-xl text-white/80 mb-8">Continue your learning journey</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5" />
              <span>Learning Time</span>
            </div>
            <p className="text-2xl font-bold">12.5 hrs</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Layout className="w-5 h-5" />
              <span>Completed</span>
            </div>
            <p className="text-2xl font-bold">3 Courses</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5" />
              <span>Total Points</span>
            </div>
            <p className="text-2xl font-bold">1250 XP</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5" />
              <span>Current Streak</span>
            </div>
            <p className="text-2xl font-bold">5 Days 🔥</p>
          </div>
        </div>
      </div>
    </div>
  );
} 