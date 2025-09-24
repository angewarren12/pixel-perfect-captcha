import { useState } from 'react';
import { Check } from 'lucide-react';

interface CaptchaSelectorProps {
  items: string[];
  selectedItem: string | null;
  onItemSelect: (item: string) => void;
}

const CaptchaSelector = ({ items, selectedItem, onItemSelect }: CaptchaSelectorProps) => {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={item}
          className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-captcha-hover ${
            selectedItem === item ? 'bg-captcha-hover' : ''
          }`}
          onClick={() => onItemSelect(item)}
        >
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 transition-all duration-200 ${
              selectedItem === item
                ? 'bg-captcha-selected border-captcha-selected text-white'
                : 'border-captcha-unselected'
            }`}
          >
            {selectedItem === item && <Check size={14} />}
            {selectedItem !== item && (
              <span className="text-captcha-unselected text-sm font-medium">
                {index + 1}
              </span>
            )}
          </div>
          <span className={`font-medium ${selectedItem === item ? 'text-foreground' : 'text-muted-foreground'}`}>
            {item}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CaptchaSelector;