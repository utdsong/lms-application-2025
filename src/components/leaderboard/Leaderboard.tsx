import { Trophy, Medal } from 'lucide-react';

export function Leaderboard() {
  const leaders = [
    { id: 1, name: "Alex Turner", points: 2500, trend: "up" },
    { id: 2, name: "Lisa Park", points: 2350, trend: "down" },
    { id: 3, name: "James Miller", points: 2200, trend: "same" }
  ];

  return (
    <div className="bg-[#1B2333] rounded-xl p-6 shadow-lg shadow-blue-500/5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h2 className="font-bold text-white">Leaderboard</h2>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-white/10 rounded-full text-sm text-white shadow-lg shadow-blue-500/10">Global</button>
          <button className="px-3 py-1 rounded-full text-sm text-gray-400">Course</button>
        </div>
      </div>

      <div className="space-y-4">
        {leaders.map((leader, index) => (
          <div 
            key={leader.id} 
            className="flex items-center justify-between p-3 rounded-lg bg-[#1d283a] shadow-lg shadow-blue-500/5 hover:shadow-blue-500/10 transition-all"
          >
            <div className="flex items-center gap-3">
              <Medal className={`w-5 h-5 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-orange-500'}`} />
              <span className="text-white">{leader.name}</span>
            </div>
            <span className="text-gray-400">{leader.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
} 