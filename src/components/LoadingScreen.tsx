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
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Logo Orange animé */}
        <div className="mb-8">
          <img 
            src={logoOrange} 
            alt="Orange" 
            className="h-16 w-auto mx-auto animate-pulse"
          />
        </div>

        {/* Texte de chargement */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Vérification en cours...
        </h2>

        {/* Barre de progression */}
        <div className="w-64 mx-auto">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {progress}% terminé
          </p>
        </div>

        {/* Animation de points */}
        <div className="flex justify-center mt-6 space-x-1">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
