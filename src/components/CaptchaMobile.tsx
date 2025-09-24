import { useState } from 'react';
import { X, RotateCcw } from 'lucide-react';
import logoOrange from '../assets/logo-orange.png';
import turtleImg from '@/assets/captcha-turtle.jpg';
import coffeeImg from '@/assets/captcha-coffee.jpg';
import birdImg from '@/assets/captcha-bird.jpg';
import lionImg from '@/assets/captcha-lion.jpg';
import catImg from '@/assets/captcha-cat.jpg';
import shoeImg from '@/assets/captcha-shoe.jpg';
import flowerImg from '@/assets/captcha-flower.jpg';
import carImg from '@/assets/captcha-car.jpg';
import bicycleImg from '@/assets/captcha-bicycle.jpg';

interface CaptchaMobileProps {
  onComplete: () => void;
}

const CaptchaMobile = ({ onComplete }: CaptchaMobileProps) => {
  // Utiliser exactement les mêmes items que la version web
  const captchaSequence = ['Tortue', 'Café', 'Oiseau', 'Lion', 'Chat', 'Chaussure'];
  
  // Mapping des items aux images (identique à la version web)
  const itemToImageIndex: { [key: string]: number } = {
    'Chaussure': 0,
    'Tortue': 1,
    'Vélo': 2,
    'Lion': 3,
    'Chat': 4,
    'Oiseau': 5,
    'Café': 6,
    'Fleur': 7,
    'Voiture': 8,
  };

  // Utiliser exactement les mêmes images que la version web
  const images = [
    { src: shoeImg, alt: 'Chaussure' },
    { src: turtleImg, alt: 'Tortue' },
    { src: bicycleImg, alt: 'Vélo' },
    { src: lionImg, alt: 'Lion' },
    { src: catImg, alt: 'Chat' },
    { src: birdImg, alt: 'Oiseau' },
    { src: coffeeImg, alt: 'Café' },
    { src: flowerImg, alt: 'Fleur' },
    { src: carImg, alt: 'Voiture' },
  ];

  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const currentItem = captchaSequence[currentStep];
  const progress = (selectedImages.length / captchaSequence.length) * 100;
  const isCompleted = selectedImages.length === captchaSequence.length;

  const handleImageClick = (index: number) => {
    if (isCompleted || selectedImages.includes(index)) return;
    
    const expectedIndex = itemToImageIndex[currentItem];
    if (index === expectedIndex) {
      setSelectedImages(prev => [...prev, index]);
      setCurrentStep(prev => prev + 1);
      
      if (selectedImages.length + 1 === captchaSequence.length) {
        setTimeout(() => onComplete(), 500);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const imageIndex = selectedImages.indexOf(index);
    if (imageIndex !== -1) {
      const newSelectedImages = selectedImages.slice(0, imageIndex);
      setSelectedImages(newSelectedImages);
      setCurrentStep(imageIndex);
    }
  };

  const handleNewGame = () => {
    setSelectedImages([]);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header avec logo Orange */}
      <div className="bg-black px-4 py-3">
        <div className="flex items-center">
          <img 
            src={logoOrange} 
            alt="Orange" 
            className="h-8 w-auto"
          />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="px-4 py-6">
        {/* Titre et instructions */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-black mb-2">
            Avant d'aller plus loin...
          </h1>
          <p className="text-base font-semibold text-black mb-1">
            Vérifions ensemble que vous n'êtes pas un robot.
          </p>
          <p className="text-sm font-semibold text-black">
            Cliquez sur les images dans l'ordre indiqué.
          </p>
        </div>

        {/* Barre de progression */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Vignettes des images sélectionnées */}
        <div className="flex items-center gap-2 mb-4">
          {selectedImages.map((imageIndex, index) => (
            <div key={index} className="relative">
              <img
                src={images[imageIndex].src}
                alt={images[imageIndex].alt}
                className="w-12 h-12 rounded object-cover border-2 border-orange-500"
              />
              <button
                onClick={() => handleRemoveImage(imageIndex)}
                className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-xs"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          {!isCompleted && (
            <div className="w-12 h-12 rounded border-2 border-gray-300 flex items-center justify-center bg-gray-100">
              <span className="text-gray-500 text-lg">?</span>
            </div>
          )}
        </div>

        {/* Question actuelle */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-black">
            {currentStep + 1}/{captchaSequence.length} {currentItem} ?
          </h2>
          <button
            onClick={handleNewGame}
            className="text-sm text-gray-600 underline"
          >
            Effacer
          </button>
        </div>

        {/* Grille d'images */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageClick(index)}
              disabled={selectedImages.includes(index)}
              className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-200 ${
                selectedImages.includes(index)
                  ? 'opacity-50 scale-95'
                  : 'hover:scale-105 active:scale-95'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full h-full object-cover ${
                  selectedImages.includes(index) ? 'grayscale' : ''
                }`}
              />
              {selectedImages.includes(index) && (
                <div className="absolute inset-0 bg-orange-500/20 flex items-center justify-center">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    ✓
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Bouton nouveau jeu */}
        <div className="flex justify-center">
          <button
            onClick={handleNewGame}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <RotateCcw size={16} />
            Nouveau jeu d'images
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaptchaMobile;
