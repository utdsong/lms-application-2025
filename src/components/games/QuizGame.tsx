import { useState } from 'react';
import { motion } from 'framer-motion';
import { BaseGame } from './BaseGame';
import { GameConfig } from '../../types/course';

interface Props {
  config: GameConfig;
  onComplete: (result: any) => void;
}

export function QuizGame({ config, onComplete }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const handleAnswerSelect = (answerId: string) => {
    const question = config.elements[currentQuestion];
    setSelectedAnswers([...selectedAnswers, answerId]);

    // Check if answer is correct
    if (answerId === question.content.correctAnswer) {
      engine.handleInteraction(question.id, 'correct_answer');
    }

    // Move to next question or complete if last
    if (currentQuestion < config.elements.length - 1) {
      setTimeout(() => setCurrentQuestion(curr => curr + 1), 1000);
    } else {
      engine.handleInteraction('quiz', 'complete');
    }
  };

  const question = config.elements[currentQuestion];

  return (
    <BaseGame config={config} onComplete={onComplete}>
      <div className="space-y-6">
        <div className="text-xl font-medium">{question.content.question}</div>
        
        <div className="grid grid-cols-2 gap-4">
          {question.content.answers.map((answer) => (
            <motion.button
              key={answer.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswerSelect(answer.id)}
              disabled={selectedAnswers.includes(answer.id)}
              className={`p-4 rounded-lg text-left transition-colors ${
                selectedAnswers.includes(answer.id)
                  ? answer.id === question.content.correctAnswer
                    ? 'bg-green-500'
                    : 'bg-red-500'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              {answer.text}
            </motion.button>
          ))}
        </div>

        <div className="mt-8">
          <div className="w-full bg-gray-700 h-2 rounded-full">
            <motion.div
              className="bg-accent h-full rounded-full"
              initial={{ width: '0%' }}
              animate={{ 
                width: `${((currentQuestion + 1) / config.elements.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </BaseGame>
  );
} 