import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Star, Fire } from 'lucide-react';

interface Props {
  onComboChange: (multiplier: number) => void;
}

export function ComboSystem({ onComboChange }: Props) {
  const [combo, setCombo] = useState(0);
  const [lastActionTime, setLastActionTime] = useState(0);
  const [showComboBreak, setShowComboBreak] = useState(false);

  useEffect(() => {
    const comboTimeout = setTimeout(() => {
      if (Date.now() - lastActionTime > 5000 && combo > 0) {
        setShowComboBreak(true);
        setCombo(0);
      }
    }, 5000);

    return () => clearTimeout(comboTimeout);
  }, [combo, lastActionTime]);

  const addToCombo = () => {
    setLastActionTime(Date.now());
    setCombo(c => c + 1);
    onComboChange(getComboMultiplier(combo + 1));
  };

  const getComboMultiplier = (comboCount: number) => {
    if (comboCount >= 10) return 3;
    if (comboCount >= 5) return 2;
    if (comboCount >= 3) return 1.5;
    return 1;
  };

  return (
    <div className="fixed top-4 right-4">
      <div className="flex items-center gap-2 bg-secondary p-3 rounded-lg">
        <Fire className={`w-6 h-6 ${combo > 0 ? 'text-orange-500' : 'text-gray-500'}`} />
        <span className="text-2xl font-bold">{combo}x</span>
      </div>

      <AnimatePresence>
        {showComboBreak && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-2 bg-red-500/20 text-red-300 p-2 rounded text-sm"
          >
            Combo Break!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 