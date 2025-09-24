import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import OrangeHeader from '@/components/OrangeHeader';
import OrangeFooter from '@/components/OrangeFooter';
import CaptchaSelector from '@/components/CaptchaSelector';
import CaptchaGrid from '@/components/CaptchaGrid';
import { Button } from '@/components/ui/button';

const CaptchaPage = () => {
  const captchaItems = ['Tortue', 'Café', 'Oiseau', 'Lion', 'Chat', 'Chaussure'];
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [validatedImages, setValidatedImages] = useState<number[]>([]);

  const currentItem = captchaItems.find(item => !completedItems.includes(item)) || '';
  const isCompleted = completedItems.length === captchaItems.length;

  // Mapping des items aux images dans la grille
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

  const handleImageClick = (index: number) => {
    if (isCompleted || validatedImages.includes(index)) return;
    
    // Vérifier si l'image correspond à l'item actuel
    const expectedIndex = itemToImageIndex[currentItem];
    if (index === expectedIndex) {
      setValidatedImages(prev => [...prev, index]);
      setCompletedItems(prev => [...prev, currentItem]);
    }
  };

  const handleNewGame = () => {
    setCompletedItems([]);
    setValidatedImages([]);
  };

  const handleContinue = () => {
    if (isCompleted) {
      console.log('Captcha completed successfully!');
    }
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
              currentItem={currentItem}
              completedItems={completedItems}
            />
          </div>

          <div className="order-1 md:order-2 space-y-6">
            <CaptchaGrid
              onImageClick={handleImageClick}
              validatedImages={validatedImages}
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
            disabled={!isCompleted}
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