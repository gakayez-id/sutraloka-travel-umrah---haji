import React from 'react';

interface SutralokaTextLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  subtitleColor?: string;
}

export const SutralokaTextLogo: React.FC<SutralokaTextLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  subtitleColor = 'text-slate-400'
}) => {
  const sizeStyles = {
    sm: { mainText: 'text-lg', subText: 'text-[8px] tracking-[0.24em]' },
    md: { mainText: 'text-2xl', subText: 'text-[9px] tracking-[0.22em]' },
    lg: { mainText: 'text-3xl', subText: 'text-[11px] tracking-[0.24em]' },
    xl: { mainText: 'text-4xl', subText: 'text-[12px] tracking-[0.26em]' }
  };

  const style = sizeStyles[size];

  return (
    <div className={`inline-flex flex-col leading-none select-none ${className}`}>
      {/* Colorful 'sutraloka' Wordmark matching logosutraloka01.png */}
      <div className={`font-bold tracking-tight font-sans flex items-center ${style.mainText}`}>
        <span className="text-[#8B5CF6]">sut</span>
        <span className="text-[#A855F7]">ra</span>
        <span className="text-[#E06277]">lo</span>
        <span className="text-[#F97316]">ka</span>
      </div>

      {/* Sub-text Branding: SUTRA TOUR & TRAVEL */}
      {showSubtitle && (
        <span className={`font-extrabold uppercase mt-1 ${subtitleColor} ${style.subText}`}>
          Sutra Tour & Travel
        </span>
      )}
    </div>
  );
};
