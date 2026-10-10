import React from 'react';

interface SutralokaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  withGlow?: boolean;
}

export const SutralokaLogo: React.FC<SutralokaLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  withGlow = false
}) => {
  // Dimension presets
  const sizeMap = {
    sm: { height: 28, emblemSize: 26, textClass: 'text-base', subClass: 'text-[8px]' },
    md: { height: 38, emblemSize: 36, textClass: 'text-xl', subClass: 'text-[9px]' },
    lg: { height: 48, emblemSize: 46, textClass: 'text-2xl', subClass: 'text-[11px]' },
    xl: { height: 60, emblemSize: 58, textClass: 'text-3xl', subClass: 'text-xs' }
  };

  const current = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Stylized Sutraloka Ribbon / Wing Emblem */}
      <div className={`relative flex items-center justify-center shrink-0 ${withGlow ? 'drop-shadow-[0_0_12px_rgba(192,38,211,0.45)]' : ''}`}>
        <svg
          width={current.emblemSize}
          height={current.emblemSize * 1.1}
          viewBox="0 0 100 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:scale-105"
        >
          <defs>
            {/* Primary Violet-Magenta Gradient */}
            <linearGradient id="sutraEmblemGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4C1D95" />
              <stop offset="35%" stopColor="#7C3AED" />
              <stop offset="70%" stopColor="#C026D3" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
            
            {/* Inner Curl Glow (Warm Pearl Accent) */}
            <linearGradient id="sutraCurlGrad" x1="0%" y1="100%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="60%" stopColor="#F5D0FE" />
              <stop offset="100%" stopColor="#FEF3C7" />
            </linearGradient>

            {/* Top Red Tip */}
            <linearGradient id="sutraTipGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>
          </defs>

          {/* Wing / Ribbon Main Swoosh */}
          <path
            d="M18 10 C 35 15, 65 30, 72 65 C 76 85, 60 102, 42 105 C 28 107, 14 98, 12 85 C 8 60, 26 38, 20 12 Z"
            fill="url(#sutraEmblemGrad)"
          />

          {/* Accent Ribbon Tip */}
          <path
            d="M18 10 C 26 12, 35 18, 40 24 C 32 20, 24 16, 17 11 Z"
            fill="url(#sutraTipGrad)"
          />

          {/* Secondary Feather Inner Winglet */}
          <path
            d="M45 42 C 60 52, 65 78, 55 94 C 50 91, 56 70, 48 58 C 42 50, 43 45, 45 42 Z"
            fill="url(#sutraCurlGrad)"
          />

          {/* Inner Pearl Highlight */}
          <path
            d="M58 60 C 66 68, 70 82, 63 94 C 61 90, 66 76, 60 67 Z"
            fill="#FEF08A"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* Typography Lockup */}
      <div className="flex flex-col leading-none">
        {/* Colorful 'sutraloka' Wordmark */}
        <div className={`font-bold tracking-tight font-sans flex items-center ${current.textClass}`}>
          <span className="text-violet-400">sut</span>
          <span className="text-purple-300">ra</span>
          <span className="text-rose-400">lo</span>
          <span className="text-amber-400">ka</span>
        </div>

        {/* Subtitle 'sutra tour & travel' */}
        {showSubtitle && (
          <div className={`font-semibold tracking-[0.16em] uppercase text-white/90 mt-0.5 ${current.subClass}`}>
            sutra tour & travel
          </div>
        )}
      </div>
    </div>
  );
};
