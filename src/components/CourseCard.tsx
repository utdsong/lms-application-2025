interface CourseCardProps {
  title: string
  progress: number
  nextChallenge: string
  image: string
  xp?: number
}

export function CourseCard({ title, progress, nextChallenge, image, xp }: CourseCardProps) {
  return (
    <div className="bg-[#1B2333] rounded-xl overflow-hidden">
      <div className="aspect-video relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4 space-y-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        
        <div>
          <p className="text-sm text-gray-400 mb-1">Progress</p>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-400">Next Challenge:</p>
          <p className="text-white">{nextChallenge}</p>
          {xp && (
            <p className="text-blue-400 text-sm mt-1">{xp} XP</p>
          )}
        </div>

        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Continue Course
        </button>
      </div>
    </div>
  )
} 