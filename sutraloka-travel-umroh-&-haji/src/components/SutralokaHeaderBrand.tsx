import React from 'react';
import { SutralokaBirdIcon } from './SutralokaBirdIcon';
import { SutralokaTextLogo } from './SutralokaTextLogo';

interface SutralokaHeaderBrandProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  iconSize?: number;
}

export const SutralokaHeaderBrand: React.FC<SutralokaHeaderBrandProps> = ({
  className = '',
  size = 'md',
  iconSize = 38
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Animated Bird Icon (logosutraloka02.png) */}
      <SutralokaBirdIcon size={iconSize} animated={true} />

      {/* Sutraloka Text + Subtitle (logosutraloka01.png) */}
      <SutralokaTextLogo size={size} showSubtitle={true} />
    </div>
  );
};
