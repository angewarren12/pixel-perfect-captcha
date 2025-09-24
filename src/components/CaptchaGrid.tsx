import { useState } from 'react';
import turtleImg from '@/assets/captcha-turtle.jpg';
import coffeeImg from '@/assets/captcha-coffee.jpg';
import birdImg from '@/assets/captcha-bird.jpg';
import lionImg from '@/assets/captcha-lion.jpg';
import catImg from '@/assets/captcha-cat.jpg';
import shoeImg from '@/assets/captcha-shoe.jpg';
import flowerImg from '@/assets/captcha-flower.jpg';
import carImg from '@/assets/captcha-car.jpg';
import bicycleImg from '@/assets/captcha-bicycle.jpg';

interface CaptchaGridProps {
  onImageClick: (index: number) => void;
  validatedImages: number[];
}

const CaptchaGrid = ({ onImageClick, validatedImages }: CaptchaGridProps) => {
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

  return (
    <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
      {images.map((image, index) => (
        <div
          key={index}
          className={`relative aspect-square border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
            validatedImages.includes(index)
              ? 'border-orange-brand shadow-lg opacity-50'
              : 'border-border hover:border-orange-brand/50'
          }`}
          onClick={() => onImageClick(index)}
        >
          <img
            src={image.src}
            alt={image.alt}
            className={`w-full h-full object-cover ${
              validatedImages.includes(index) ? 'grayscale' : ''
            }`}
          />
          {validatedImages.includes(index) && (
            <div className="absolute inset-0 bg-orange-brand/20 flex items-center justify-center">
              <div className="bg-orange-brand text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                ✓
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CaptchaGrid;