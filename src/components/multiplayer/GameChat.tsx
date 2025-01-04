import { useState, useEffect, useRef } from 'react';
import { Send, Users } from 'lucide-react';
import { multiplayerService } from '../../services/multiplayerService';

interface Message {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: number;
}

export function GameChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    multiplayerService.onMessage((message) => {
      setMessages(prev => [...prev, message]);
    });

    // Auto-scroll to bottom when new messages arrive
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      multiplayerService.sendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-secondary rounded-lg p-4 h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">Game Chat</h3>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Users className="w-4 h-4" />
          <span>8 Online</span>
        </div>
      </div>

      <div 
        ref={chatRef}
        className="flex-1 overflow-y-auto space-y-2 mb-4"
      >
        {messages.map((message) => (
          <div key={message.id} className="flex gap-2">
            <span className="text-accent font-medium">{message.username}:</span>
            <span className="text-gray-300">{message.text}</span>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 bg-gray-700 rounded px-3 py-2"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-accent p-2 rounded hover:bg-accent/80"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
} 