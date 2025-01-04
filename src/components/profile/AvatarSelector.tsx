import { useState } from 'react';
import { Check } from 'lucide-react';

const AVATAR_STYLES = [
  'avataaars',
  'bottts',
  'pixel-art',
  'adventurer',
  'big-smile'
];

interface Props {
  currentAvatar: string;
  onSelect: (avatarUrl: string) => void;
}

export function AvatarSelector({ currentAvatar, onSelect }: Props) {
  const [selectedStyle, setSelectedStyle] = useState('avataaars');
  const [seed, setSeed] = useState('');

  const generateAvatarUrl = (style: string, seed: string) => {
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {AVATAR_STYLES.map((style) => (
          <button
            key={style}
            onClick={() => setSelectedStyle(style)}
            className={`p-4 rounded-lg border-2 ${
              selectedStyle === style 
                ? 'border-accent' 
                : 'border-transparent'
            }`}
          >
            <img
              src={generateAvatarUrl(style, seed || 'preview')}
              alt={style}
              className="w-20 h-20 mx-auto"
            />
            <p className="text-center mt-2 text-sm capitalize">
              {style.replace('-', ' ')}
            </p>
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">Customize your avatar</label>
        <input
          type="text"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          placeholder="Enter text to generate unique avatar"
          className="w-full p-2 bg-gray-700 rounded-lg"
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => onSelect(generateAvatarUrl(selectedStyle, seed))}
          className="flex items-center gap-2 px-6 py-2 bg-accent rounded-lg hover:bg-accent/80"
        >
          <Check className="w-4 h-4" />
          Select Avatar
        </button>
      </div>
    </div>
  );
} 