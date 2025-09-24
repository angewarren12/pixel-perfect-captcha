import { useEffect } from 'react';
import logoOrange from '@/assets/logo-orange.png';

const ServiceUnavailable = () => {
  useEffect(() => {
    // Rediriger vers Orange après 3 secondes
    const timer = setTimeout(() => {
      window.location.href = 'https://www.orange.fr/portail';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-12 w-full max-w-md text-center">
        {/* Logo Orange */}
        <div className="mb-8">
          <img 
            src={logoOrange} 
            alt="Orange" 
            className="h-16 w-auto mx-auto mb-6"
          />
        </div>

        {/* Message d'erreur */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Service temporairement indisponible
          </h1>
          <p className="text-gray-600 mb-4">
            Nous rencontrons actuellement des difficultés techniques.
          </p>
          <p className="text-gray-600 mb-6">
            Vous allez être redirigé vers le portail Orange dans quelques instants...
          </p>
        </div>

        {/* Animation de chargement */}
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>

        {/* Compteur */}
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Redirection dans <span className="font-bold text-orange-500">3</span> secondes
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceUnavailable;
