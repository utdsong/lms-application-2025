import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, Award } from 'lucide-react';
import toast from 'react-hot-toast';

interface Challenge {
  id: number;
  title: string;
  description: string;
  points: number;
  progress: number;
  total: number;
  deadline: string;
}

export function DailyChallenge() {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadChallenge();
    const timer = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadChallenge = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/daily-challenge');
      if (!response.ok) throw new Error('Failed to load challenge');
      
      const data = await response.json();
      setChallenge(data);
      setError(null);
    } catch (error) {
      setError('Unable to load daily challenge');
      toast.error('Failed to load daily challenge');
    } finally {
      setLoading(false);
    }
  };

  const updateTimeLeft = () => {
    if (!challenge) return;

    const now = new Date();
    const deadline = new Date(challenge.deadline);
    const diff = deadline.getTime() - now.getTime();

    if (diff <= 0) {
      setTimeLeft('Expired');
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    setTimeLeft(`${hours}h ${minutes}m`);
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 animate-pulse">
        <div className="h-8 w-48 bg-white/20 rounded mb-4"></div>
        <div className="h-4 w-full bg-white/20 rounded"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
        <p className="text-red-400">{error}</p>
        <button 
          onClick={loadChallenge}
          className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!challenge) return null;

  const progress = (challenge.progress / challenge.total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6" />
          <h2 className="text-xl font-bold">Daily Challenge</h2>
        </div>
        <div className="flex items-center gap-2 text-white/80">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{timeLeft}</span>
        </div>
      </div>

      <p className="text-lg mb-4">{challenge.description}</p>

      <div className="bg-white/10 rounded-full h-2 mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="bg-white h-full rounded-full"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-300" />
          <span>{challenge.points} XP</span>
        </div>
        <div className="text-sm">
          {challenge.progress} / {challenge.total}
        </div>
      </div>
    </motion.div>
  );
} 