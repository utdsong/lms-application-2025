import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundService } from '../../services/soundService';

export function SoundToggle() {
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    const muted = soundService.toggleMute();
    setIsMuted(muted);
    soundService.playSound('click');
  };

  return (
    <button
      onClick={toggleSound}
      className="p-2 rounded-full hover:bg-white/5"
    >
      {isMuted ? (
        <VolumeX className="w-6 h-6 text-gray-400" />
      ) : (
        <Volume2 className="w-6 h-6 text-accent" />
      )}
    </button>
  );
} 