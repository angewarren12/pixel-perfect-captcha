import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import logoOrange from '@/assets/logo-orange.png';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'admin321') {
      setError('');
      onLogin();
    } else {
      setError('Mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Logo Orange */}
        <div className="text-center mb-8">
          <img 
            src={logoOrange} 
            alt="Orange" 
            className="h-16 w-auto mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Administration Orange
          </h1>
          <p className="text-gray-600">
            Accès sécurisé à l'interface d'administration
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mot de passe administrateur
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez le mot de passe"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          {/* Bouton de connexion */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
          >
            <Lock size={20} />
            Se connecter
          </button>
        </form>

        {/* Note de sécurité */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>Note :</strong> Cette interface est réservée aux administrateurs autorisés.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
