import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BaseGame } from './BaseGame';
import { GameConfig, GameElement } from '../../types/course';

interface Props {
  config: GameConfig;
  onComplete: (result: any) => void;
}

export function MemoryGame({ config, onComplete }: Props) {
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  const handleCardClick = (elementId: string) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(elementId)) return;
    if (matchedPairs.includes(elementId)) return;

    setFlippedCards([...flippedCards, elementId]);

    if (flippedCards.length === 1) {
      // Check for match
      const firstCard = config.elements.find(e => e.id === flippedCards[0]);
      const secondCard = config.elements.find(e => e.id === elementId);

      if (firstCard?.content.value === secondCard?.content.value) {
        setMatchedPairs([...matchedPairs, flippedCards[0], elementId]);
        setFlippedCards([]);
        engine.handleInteraction(elementId, 'match');
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <BaseGame config={config} onComplete={onComplete}>
      <div className="grid grid-cols-4 gap-4">
        {config.elements.map((element) => (
          <motion.div
            key={element.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="aspect-square"
          >
            <div
              className={`relative w-full h-full cursor-pointer ${
                flippedCards.includes(element.id) || matchedPairs.includes(element.id)
                  ? 'rotate-y-180'
                  : ''
              }`}
              onClick={() => handleCardClick(element.id)}
            >
              <AnimatePresence>
                {!(flippedCards.includes(element.id) || matchedPairs.includes(element.id)) && (
                  <motion.div
                    className="absolute inset-0 bg-accent rounded-lg flex items-center justify-center"
                    initial={{ rotateY: 0 }}
                    exit={{ rotateY: 180 }}
                  >
                    <span className="text-2xl">?</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {(flippedCards.includes(element.id) || matchedPairs.includes(element.id)) && (
                  <motion.div
                    className="absolute inset-0 bg-secondary rounded-lg flex items-center justify-center"
                    initial={{ rotateY: 180 }}
                    animate={{ rotateY: 0 }}
                  >
                    <span className="text-lg">{element.content.value}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </BaseGame>
  );
} 