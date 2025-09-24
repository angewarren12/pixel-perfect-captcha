import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import OrangeHeader from '@/components/OrangeHeader';
import OrangeFooter from '@/components/OrangeFooter';
import CaptchaSelector from '@/components/CaptchaSelector';
import CaptchaGrid from '@/components/CaptchaGrid';
import { Button } from '@/components/ui/button';

const CaptchaPage = () => {
  const captchaItems = ['Tortue', 'Café', 'Oiseau', 'Lion', 'Chat', 'Chaussure'];
  const [selectedItem, setSelectedItem] = useState<string>('Tortue');
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  const handleItemSelect = (item: string) => {
    setSelectedItem(item);
  };

  const handleImageClick = (index: number) => {
    setSelectedImages(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      }
      return [...prev, index];
    });
  };

  const handleNewGame = () => {
    setSelectedImages([]);
    setSelectedItem('Tortue');
  };

  const handleContinue = () => {
    // Logic for validation would go here
    console.log('Continuing with selected images:', selectedImages);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <OrangeHeader />
      
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Avant d'aller plus loin...
          </h1>
          <p className="text-lg text-foreground mb-2">
            Vérifions ensemble que vous n'êtes pas un robot.
          </p>
          <p className="text-sm text-muted-foreground">
            Cliquez sur les images* dans l'ordre indiqué.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
          <div className="order-2 md:order-1">
            <CaptchaSelector
              items={captchaItems}
              selectedItem={selectedItem}
              onItemSelect={handleItemSelect}
            />
          </div>

          <div className="order-1 md:order-2 space-y-6">
            <CaptchaGrid
              onImageClick={handleImageClick}
              selectedImages={selectedImages}
            />
            
            <div className="flex justify-center">
              <Button
                variant="refresh"
                onClick={handleNewGame}
                className="flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Nouveau jeu d'images
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button
            variant="orange"
            size="lg"
            onClick={handleContinue}
            className="px-8 py-3"
          >
            Continuer
          </Button>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            * Certaines images ont été générées par une intelligence artificielle.
          </p>
        </div>
      </main>

      <OrangeFooter />
    </div>
  );
};

export default CaptchaPage;