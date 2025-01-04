import { motion, AnimatePresence } from 'framer-motion';
import { Fire, Zap, Star } from 'lucide-react';

interface Props {
  combo: number;
  multiplier: number;
}

export function ComboEffect({ combo, multiplier }: Props) {
  const getComboIcon = () => {
    if (combo >= 10) return Star;
    if (combo >= 5) return Zap;
    return Fire;
  };

  const Icon = getComboIcon();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ 
          scale: [1.2, 1],
          opacity: 1,
          rotate: [0, 360]
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          times: [0, 1]
        }}
        className="absolute top-0 right-0 -mt-4 -mr-4"
      >
        <div className="relative">
          <Icon className={`w-12 h-12 ${
            combo >= 10 ? 'text-yellow-500' :
            combo >= 5 ? 'text-blue-500' :
            'text-orange-500'
          }`} />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-full bg-current opacity-25"
          />
        </div>
        <motion.span
          initial={{ y: 0 }}
          animate={{ y: -20, opacity: [1, 0] }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 font-bold text-xl"
        >
          {multiplier}x
        </motion.span>
      </motion.div>
    </AnimatePresence>
  );
} 