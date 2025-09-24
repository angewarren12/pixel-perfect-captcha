const OrangeFooter = () => {
  const footerLinks = [
    'Informations légales',
    'Plan de site',
    'Données personnelles',
    'Accessibilité : non conforme',
    'Tarifs et Contrats',
    'Politique des cookies'
  ];

  const bottomLinks = [
    'Gestion cookies',
    'Livraisons',
    'Retours',
    'Publicité',
    'Signaler un contenu'
  ];

  return (
    <footer className="bg-footer text-white py-6 px-6 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-4">
          {footerLinks.map((link, index) => (
            <a
              key={index}
              href="#"
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-4">
          {bottomLinks.map((link, index) => (
            <a
              key={index}
              href="#"
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="text-right text-white/60 text-sm">
          © Orange 2025
        </div>
      </div>
    </footer>
  );
};

export default OrangeFooter;