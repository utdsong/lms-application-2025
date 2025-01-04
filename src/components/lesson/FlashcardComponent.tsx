import { useState, useRef } from 'react';
import { VolumeUp, Type, Lightbulb } from 'lucide-react';

interface FlashcardProps {
  question: string;
  answer: string;
  hint?: string;
  audio?: string;
  specialCharacters?: string[];
  onComplete: () => void;
}

export function FlashcardComponent({
  question,
  answer,
  hint,
  audio,
  specialCharacters,
  onComplete
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [inputMode, setInputMode] = useState(false);
  const [userInput, setUserInput] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const insertSpecialCharacter = (char: string) => {
    setUserInput(prev => prev + char);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className={`relative h-64 ${isFlipped ? 'flip' : ''}`}>
        {/* Front Side */}
        <div className="absolute w-full h-full bg-[#1B2333] rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white">{question}</h3>
            {audio && (
              <button 
                onClick={playAudio}
                className="p-2 bg-blue-500 rounded-full hover:bg-blue-600"
              >
                <VolumeUp className="w-4 h-4 text-white" />
              </button>
            )}
          </div>

          {inputMode ? (
            <div className="space-y-4">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full p-3 bg-[#252f44] rounded-lg text-white"
                placeholder="Type your answer..."
              />
              {specialCharacters && (
                <div className="flex flex-wrap gap-2">
                  {specialCharacters.map(char => (
                    <button
                      key={char}
                      onClick={() => insertSpecialCharacter(char)}
                      className="px-3 py-1 bg-[#252f44] rounded-lg text-white hover:bg-[#2a3547]"
                    >
                      {char}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsFlipped(true)}
              className="mt-auto w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Show Answer
            </button>
          )}

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setInputMode(!inputMode)}
              className="p-2 text-gray-400 hover:text-white"
            >
              <Type className="w-4 h-4" />
            </button>
            {hint && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="p-2 text-gray-400 hover:text-white"
              >
                <Lightbulb className="w-4 h-4" />
              </button>
            )}
          </div>

          {showHint && (
            <div className="mt-4 p-3 bg-[#252f44] rounded-lg text-gray-300">
              💡 {hint}
            </div>
          )}
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full bg-[#1B2333] rounded-xl p-6 flex flex-col back">
          <h3 className="text-xl font-bold text-white mb-4">Answer:</h3>
          <p className="text-2xl text-center text-white flex-1 flex items-center justify-center">
            {answer}
          </p>
          <button
            onClick={() => {
              setIsFlipped(false);
              onComplete();
            }}
            className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Got It!
          </button>
        </div>
      </div>

      {audio && (
        <audio ref={audioRef} src={audio} className="hidden" />
      )}
    </div>
  );
} 