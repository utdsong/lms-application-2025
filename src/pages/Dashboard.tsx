import { useState, useEffect } from 'react';
import { Play, Book, Trophy, Clock, ChevronRight, Star, Target, Zap } from 'lucide-react';
import { Course } from '../types/course';
import { motion } from 'framer-motion';
import { Leaderboard } from '../components/Leaderboard';
import { DailyChallenge } from '../components/DailyChallenge';

export function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [progress, setProgress] = useState<any>({});
  const [stats, setStats] = useState({
    learningTime: '12.5 hrs',
    completedCourses: 3,
    totalPoints: 1250,
    currentStreak: 5
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [coursesRes, progressRes] = await Promise.all([
        fetch('/api/courses'),
        fetch('/api/user/progress')
      ]);
      
      const coursesData = await coursesRes.json();
      const progressData = await progressRes.json();
      
      setCourses(coursesData);
      setProgress(progressData);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white p-8">
      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4">Welcome back!</h1>
        <p className="text-lg opacity-90 mb-8">Continue your learning journey</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard
            icon={<Clock className="w-5 h-5 text-blue-300" />}
            label="Learning Time"
            value={stats.learningTime}
          />
          <StatsCard
            icon={<Book className="w-5 h-5 text-green-300" />}
            label="Completed"
            value={`${stats.completedCourses} Courses`}
          />
          <StatsCard
            icon={<Zap className="w-5 h-5 text-yellow-300" />}
            label="Total Points"
            value={`${stats.totalPoints} XP`}
          />
          <StatsCard
            icon={<Trophy className="w-5 h-5 text-orange-300" />}
            label="Current Streak"
            value={`${stats.currentStreak} Days 🔥`}
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column - Courses & Achievements */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Your Courses Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Your Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course, index) => {
                const courseProgress = progress[course.id] || 0;
                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    className="bg-[#1B2333] rounded-xl overflow-hidden"
                  >
                    {course.thumbnail && (
                      <div className="relative">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="w-full h-48 object-cover"
                        />
                        {courseProgress > 0 && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                            In Progress
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                      <p className="text-gray-400 mb-4">{course.description}</p>
                      
                      {/* Animated progress bar */}
                      <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                        <motion.div 
                          className="bg-blue-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${courseProgress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">
                          {courseProgress}% Complete
                        </span>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                        >
                          {courseProgress === 0 ? 'Start' : 'Continue'}
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Recent Achievements Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Recent Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Achievement cards with animations */}
              <motion.div 
                className="bg-[#1B2333] p-6 rounded-xl text-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="bg-yellow-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Trophy className="w-8 h-8 text-yellow-500" />
                </motion.div>
                <h3 className="font-bold mb-1">First Lesson</h3>
                <p className="text-sm text-gray-400">Completed your first lesson</p>
              </motion.div>

              {/* Add more achievement cards here */}
            </div>
          </section>

          {/* Daily Challenge Section */}
          <section>
            <DailyChallenge />
          </section>
        </div>

        {/* Right Column - Leaderboard */}
        <div className="col-span-12 lg:col-span-4">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}

// Stats Card Component
function StatsCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <motion.div 
      className="bg-white/10 rounded-xl p-4"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-white/80">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </motion.div>
  );
} 