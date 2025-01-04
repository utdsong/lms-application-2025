import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizSectionProps {
  quiz: {
    title: string;
    description: string;
    questions: QuizQuestion[];
  };
  onComplete: () => void;
}

export function QuizSection({ quiz, onComplete }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    if (answerIndex === quiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      onComplete();
    }
  };

  const question = quiz.questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">{quiz.title}</h2>
        <p className="text-gray-400">{quiz.description}</p>
      </div>

      <div className="bg-[#252f44] rounded-lg p-6">
        <p className="text-lg text-white mb-4">{question.question}</p>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showExplanation}
              className={`w-full p-4 rounded-lg text-left transition-colors
                ${selectedAnswer === index 
                  ? index === question.correctAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-[#1B2333] text-gray-300 hover:bg-[#2a3547]'}`}
            >
              {option}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-6 p-4 bg-[#1B2333] rounded-lg">
            <div className="flex items-start gap-2">
              {selectedAnswer === question.correctAnswer ? (
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 mt-1" />
              )}
              <div>
                <p className="text-white font-medium">
                  {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-gray-400 mt-1">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {showExplanation && (
          <button
            onClick={handleNext}
            className="mt-6 w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
          </button>
        )}
      </div>

      <div className="flex justify-between text-gray-400">
        <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
        <span>Score: {score}/{quiz.questions.length}</span>
      </div>
    </div>
  );
} 