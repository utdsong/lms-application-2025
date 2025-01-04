import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export function useGameAnimation() {
  const controls = useAnimation();
  const [particles, setParticles] = useState<any[]>([]);

  const playScoreAnimation = async (x: number, y: number, points: number) => {
    const id = Date.now();
    setParticles(current => [...current, { id, x, y, points }]);

    await controls.start({
      y: -50,
      opacity: 0,
      transition: { duration: 0.5 }
    });

    setParticles(current => current.filter(p => p.id !== id));
  };

  const playSuccessAnimation = async () => {
    await controls.start({
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5 }
    });
  };

  const playFailureAnimation = async () => {
    await controls.start({
      x: [-10, 10, -10, 10, 0],
      transition: { duration: 0.4 }
    });
  };

  return {
    controls,
    particles,
    playScoreAnimation,
    playSuccessAnimation,
    playFailureAnimation
  };
} 