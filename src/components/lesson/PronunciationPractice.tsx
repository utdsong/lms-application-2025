import { useState, useRef } from 'react';
import { Mic, Play, Stop, VolumeUp } from 'lucide-react';

interface PronunciationProps {
  word: string;
  phonetic: string;
  audioUrl: string;
  examples: string[];
}

export function PronunciationPractice({
  word,
  phonetic,
  audioUrl,
  examples
}: PronunciationProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Recording logic
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  const playReference = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="bg-[#1d283a] rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{word}</h3>
          <p className="text-gray-400">{phonetic}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => audioRef.current?.play()}
            className="p-2 bg-blue-500 rounded-full hover:bg-blue-600"
          >
            <VolumeUp className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`p-2 rounded-full ${
              isRecording ? 'bg-red-500' : 'bg-green-500'
            }`}
          >
            {isRecording ? (
              <Stop className="w-4 h-4 text-white" />
            ) : (
              <Mic className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Examples */}
      <div className="mt-4">
        <h4 className="text-white font-medium mb-2">Practice Examples:</h4>
        <ul className="space-y-2">
          {examples.map((example, index) => (
            <li key={index} className="text-gray-300">{example}</li>
          ))}
        </ul>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="mt-4 p-3 bg-[#252f44] rounded-lg text-white">
          {feedback}
        </div>
      )}
    </div>
  );
} 