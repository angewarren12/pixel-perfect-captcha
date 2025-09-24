import { useEffect, useState } from 'react';
import logoOrange from '@/assets/logo-orange.png';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 5; // Plus rapide pour éviter les timeouts
      });
    }, 100); // Intervalle plus long pour éviter les problèmes

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <img
          src={logoOrange}
          alt="Orange"
          className="h-20 w-auto mx-auto mb-6 animate-pulse"
        />
        <h1 className="text-2xl font-bold text-black mb-4">Vérification en cours...</h1>
        <div className="w-64 bg-gray-200 rounded-full h-2.5 mx-auto">
          <div
            className="bg-orange-500 h-2.5 rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
