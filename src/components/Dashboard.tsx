import { useEffect, useState } from 'react';
import { Trophy, Star, Flame } from "lucide-react";
import { CourseCard } from "./CourseCard";
import { useAuth } from "../contexts/AuthContext";
import { courseService, Course } from "../services/courseService";
import { initializeWebSocket } from "../services/websocketService";
import { Leaderboard } from './leaderboard/Leaderboard';
import { ChallengeAttempt } from './challenge/ChallengeAttempt';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      initializeWebSocket(user.id);
      loadCourses();
    }
  }, [user]);

  const loadCourses = async () => {
    try {
      const data = await courseService.getAllCourses();
      setCourses(data);
    } catch (err) {
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleChallengeComplete = (points: number) => {
    // Refresh user data or update points locally
    loadCourses();
  };

  if (loading) {
    return <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Your existing dashboard UI */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-2xl font-bold">Learning Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">
              Welcome, {user?.username} | {user?.current_rank}
            </span>
            <button 
              onClick={logout}
              className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Your existing stats cards */}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Active Courses</h2>
                <a href="#" className="text-blue-600 hover:text-blue-700">View All</a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    title={course.title}
                    progress={75} // Calculate this based on completed challenges
                    nextChallenge={course.challenges[0]?.title || 'No challenges yet'}
                    image="https://placeholder.com/500x300"
                    xp={course.challenges[0]?.points_value || 0}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
} 