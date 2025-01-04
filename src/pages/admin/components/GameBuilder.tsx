import { useState } from 'react';
import { Plus, Edit, Trash, Sparkles, Gamepad } from 'lucide-react';
import { AIContentGenerator } from './AIContentGenerator';
import toast from 'react-hot-toast';

interface GameChallenge {
  id: string;
  title: string;
  type: 'quiz' | 'code' | 'puzzle';
  content: any;
  points: number;
}

export function GameBuilder({ course, onUpdate }) {
  const [challenges, setChallenges] = useState<GameChallenge[]>([]);
  const [showAIHelper, setShowAIHelper] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState<GameChallenge | null>(null);

  const handleAIGenerated = async (content: string) => {
    try {
      // Parse AI response into challenge format
      const challenge = {
        title: 'AI Generated Challenge',
        type: 'quiz',
        content: JSON.parse(content), // Expecting formatted quiz questions
        points: 100,
      };

      const response = await fetch(`/api/admin/courses/${course.id}/challenges`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(challenge)
      });

      if (!response.ok) throw new Error('Failed to save challenge');

      const savedChallenge = await response.json();
      setChallenges([...challenges, savedChallenge]);
      toast.success('Challenge created successfully');
      onUpdate?.();
    } catch (error) {
      console.error('Failed to create challenge:', error);
      toast.error('Failed to create challenge');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Game Challenges</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAIHelper(true)}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Generate Challenge
          </button>
          <button
            onClick={() => setEditingChallenge({})}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Challenge
          </button>
        </div>
      </div>

      {/* Challenge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-[#1B2333] p-4 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <Gamepad className="w-5 h-5 text-purple-400" />
              <h3 className="font-medium text-white">{challenge.title}</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              {challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)} Challenge
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                {challenge.points} points
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingChallenge(challenge)}
                  className="p-2 hover:bg-gray-700 rounded-lg"
                >
                  <Edit className="w-4 h-4 text-blue-400" />
                </button>
                <button
                  onClick={() => handleDeleteChallenge(challenge.id)}
                  className="p-2 hover:bg-gray-700 rounded-lg"
                >
                  <Trash className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Helper Modal */}
      {showAIHelper && (
        <AIContentGenerator
          onGenerate={handleAIGenerated}
          onClose={() => setShowAIHelper(false)}
        />
      )}
    </div>
  );
} 