import { useState } from 'react';
import { Check } from 'lucide-react';

interface CaptchaSelectorProps {
  items: string[];
  currentItem: string;
  completedItems: string[];
}

const CaptchaSelector = ({ items, currentItem, completedItems }: CaptchaSelectorProps) => {
  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const isCompleted = completedItems.includes(item);
        const isCurrent = currentItem === item;
        
        return (
          <div
            key={item}
            className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
              isCurrent ? 'bg-captcha-hover' : ''
            } ${isCompleted ? 'opacity-50' : ''}`}
          >
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 transition-all duration-200 ${
                isCompleted
                  ? 'bg-captcha-selected border-captcha-selected text-white'
                  : isCurrent
                  ? 'bg-captcha-selected border-captcha-selected text-white'
                  : 'border-captcha-unselected'
              }`}
            >
              {isCompleted && <Check size={14} />}
              {!isCompleted && (
                <span className={`text-sm font-medium ${
                  isCurrent ? 'text-white' : 'text-captcha-unselected'
                }`}>
                  {index + 1}
                </span>
              )}
            </div>
            <span className={`font-medium ${
              isCompleted 
                ? 'text-muted-foreground line-through' 
                : isCurrent 
                ? 'text-foreground' 
                : 'text-muted-foreground'
            }`}>
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CaptchaSelector;