import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100
        return prev + 2
      })
    }, 30)

    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-cyan-600/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative text-center z-10 w-full max-w-md">
        <div className="mb-8 sm:mb-8 sm:mb-12 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-500/40 border-r-cyan-500/40 animate-spin-slow" 
                 style={{ width: '120px', height: '120px', left: '-10px', top: '-10px' }}></div>
            
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-b-cyan-400/60 border-l-cyan-400/60 animate-spin-medium" 
                 style={{ width: '110px', height: '110px', left: '-5px', top: '-5px' }}></div>
            
            <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-cyan-500 border-r-cyan-500 animate-spin" 
                 style={{ width: '120px', height: '120px' }}></div>
            
            <div className="flex items-center justify-center w-[120px] h-[120px] relative">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
              <img 
                src="/logo.png" 
                alt="Lumen Network" 
                className="lumen-logo w-16 h-16 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 tracking-[0.15em] sm:tracking-[0.2em] animate-fade-in">
            LUMEN NETWORK
          </h1>
          
          <p className="text-xs sm:text-sm text-cyan-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] animate-fade-in-delayed">
            Decentralized Internet Stack
          </p>
          
          <div className="mt-6 sm:mt-8 w-48 sm:w-64 mx-auto">
            <div className="h-1 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 mt-2 font-mono">{progress}%</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-medium {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-delayed {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 1s;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-spin-medium {
          animation: spin-medium 4s linear infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animate-fade-in-delayed {
          animation: fade-in-delayed 1s ease-out 0.3s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
