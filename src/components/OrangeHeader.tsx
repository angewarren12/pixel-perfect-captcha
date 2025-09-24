import logoOrange from '../assets/logo-orange.png';

const OrangeHeader = () => {
  return (
    <header className="bg-header w-full py-4 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center">
          <img 
            src={logoOrange} 
            alt="Orange" 
            className="h-8 w-auto"
          />
        </div>
      </div>
    </header>
  );
};

export default OrangeHeader;