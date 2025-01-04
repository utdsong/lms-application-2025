import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Star, Shield } from 'lucide-react';
import { courseService, Course } from '../../services/courseService';
import { ChallengeAttempt } from '../challenge/ChallengeAttempt';
import { PowerUpBar } from '../game/PowerUpBar';
import { ProgressTracker } from './ProgressTracker';

export default function CourseView() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  const loadCourse = async () => {
    try {
      if (!courseId) return;
      const data = await courseService.getCourseDetails(courseId);
      setCourse(data);
    } catch (error) {
      console.error('Failed to load course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChallengeComplete = (points: number) => {
    if (points > 0) {
      setStreak(s => s + 1);
    } else {
      setLives(l => l - 1);
      setStreak(0);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-primary text-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-primary text-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span>{course.points_multiplier}x Points</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-500" />
              <span>Streak: {streak}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-500" />
              <span>Lives: {lives}</span>
            </div>
          </div>
        </div>

        {/* Course Info */}
        <div className="bg-secondary rounded-xl p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-400 mb-6">{course.description}</p>
          <ProgressTracker course={course} />
        </div>

        {/* Power-ups */}
        <PowerUpBar onUsePowerUp={(type) => console.log('Used power-up:', type)} />

        {/* Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {course.challenges.map((challenge) => (
            <ChallengeAttempt
              key={challenge.id}
              challenge={challenge}
              onComplete={handleChallengeComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 