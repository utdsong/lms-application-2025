import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Gift, Crown } from 'lucide-react';

interface Reward {
  id: string;
  type: 'powerup' | 'points' | 'achievement' | 'special';
  title: string;
  description: string;
  icon: React.ElementType;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  claimed: boolean;
}

export function RewardSystem() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [showReward, setShowReward] = useState(false);
  const [currentReward, setCurrentReward] = useState<Reward | null>(null);

  const addReward = (reward: Reward) => {
    setRewards(prev => [...prev, reward]);
    setCurrentReward(reward);
    setShowReward(true);
    setTimeout(() => setShowReward(false), 3000);
  };

  const claimReward = (rewardId: string) => {
    setRewards(prev => 
      prev.map(r => r.id === rewardId ? { ...r, claimed: true } : r)
    );
  };

  return (
    <div>
      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rewards.map(reward => (
          <div
            key={reward.id}
            className={`bg-secondary p-4 rounded-lg ${
              reward.claimed ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <reward.icon className={`w-8 h-8 ${
                reward.rarity === 'legendary' ? 'text-yellow-500' :
                reward.rarity === 'epic' ? 'text-purple-500' :
                reward.rarity === 'rare' ? 'text-blue-500' :
                'text-gray-400'
              }`} />
              <div>
                <h3 className="font-bold">{reward.title}</h3>
                <p className="text-sm text-gray-400">{reward.description}</p>
              </div>
            </div>
            {!reward.claimed && (
              <button
                onClick={() => claimReward(reward.id)}
                className="mt-3 w-full bg-accent hover:bg-accent/80 p-2 rounded"
              >
                Claim
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Reward Popup */}
      <AnimatePresence>
        {showReward && currentReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50"
          >
            <div className="bg-secondary p-6 rounded-xl text-center">
              <Gift className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <h2 className="text-2xl font-bold mb-2">New Reward!</h2>
              <p className="text-gray-400">{currentReward.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 