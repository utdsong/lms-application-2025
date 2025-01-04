import { useState } from 'react';
import { Save, User } from 'lucide-react';
import { AvatarSelector } from './AvatarSelector';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export function ProfileSettings() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    avatar: user?.avatar || '',
    email: user?.email || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Profile Settings</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-gray-700 rounded-lg"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-4">
          <img
            src={formData.avatar || 'default-avatar.png'}
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
          {isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-gray-700 rounded-lg"
            >
              Change Avatar
            </button>
          )}
        </div>

        {isEditing && (
          <AvatarSelector
            currentAvatar={formData.avatar}
            onSelect={(avatarUrl) => 
              setFormData(prev => ({ ...prev, avatar: avatarUrl }))
            }
          />
        )}

        {/* Other profile fields */}
        <button
          type="submit"
          className="w-full py-2 bg-accent rounded-lg"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
} 