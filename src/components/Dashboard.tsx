import { useEffect, useState } from 'react';
import { Trophy, Star, Flame } from "lucide-react";
import { CourseCard } from "./CourseCard";
import { useAuth } from "../contexts/AuthContext";
import { courseService, Course } from "../services/courseService";
import { initializeWebSocket } from "../services/websocketService";
import { Leaderboard } from './leaderboard/Leaderboard';
import { ChallengeAttempt } from './challenge/ChallengeAttempt';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { RecentAchievements } from './dashboard/RecentAchievements';

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
        <DashboardHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Your Courses</h2>
            {/* Course list component here */}
          </div>
          
          <div className="space-y-6">
            <RecentAchievements />
            <Leaderboard />
          </div>
        </div>
        
        {/* Daily Challenge section */}
      </div>
    </div>
  );
} 