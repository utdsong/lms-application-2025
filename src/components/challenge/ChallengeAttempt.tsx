import { useState, useEffect } from 'react';
import { challengeService } from '../../services/challengeService';
import { Challenge } from '../../services/courseService';
import { ComboSystem } from '../game/ComboSystem';
import { multiplayerService } from '../../services/multiplayerService';

interface Props {
  challenge: Challenge;
  onComplete: (points: number) => void;
}

export function ChallengeAttempt({ challenge, onComplete }: Props) {
  const [timeLeft, setTimeLeft] = useState(challenge.time_limit);
  const [isActive, setIsActive] = useState(false);
  const [answer, setAnswer] = useState('');
  const [comboMultiplier, setComboMultiplier] = useState(1);

  useEffect(() => {
    let interval: number;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSubmit(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (challenge.challenge_type === 'battle') {
      multiplayerService.joinRoom(challenge.id);
      return () => multiplayerService.leaveRoom();
    }
  }, [challenge]);

  const startChallenge = () => {
    setIsActive(true);
  };

  const handleSubmit = async (success: boolean) => {
    try {
      const result = await challengeService.attemptChallenge(challenge.id, {
        completion_time: challenge.time_limit - timeLeft,
        success,
        combo_multiplier: comboMultiplier
      });
      
      if (success) {
        multiplayerService.updateProgress(100);
      }
      
      onComplete(result.points_earned);
    } catch (error) {
      console.error('Failed to submit challenge:', error);
    }
  };

  return (
    <div className="relative">
      <div className="bg-[#1B2333] p-6 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{challenge.title}</h3>
          <div className="text-xl font-mono">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>

        <p className="text-gray-400 mb-6">{challenge.description}</p>

        {!isActive ? (
          <button
            onClick={startChallenge}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Start Challenge
          </button>
        ) : (
          <div className="space-y-4">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full bg-gray-700 text-white p-3 rounded-lg"
              rows={4}
              placeholder="Enter your answer..."
            />
            <button
              onClick={() => handleSubmit(true)}
              className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
            >
              Submit Answer
            </button>
          </div>
        )}
      </div>
      <ComboSystem onComboChange={setComboMultiplier} />
    </div>
  );
} 