import React from 'react';

interface SutralokaBirdIconProps {
  className?: string;
  size?: number; // width in pixels
  animated?: boolean;
}

export const SutralokaBirdIcon: React.FC<SutralokaBirdIconProps> = ({
  className = '',
  size = 40,
  animated = true
}) => {
  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${
        animated ? 'animate-bird-float' : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_4px_8px_rgba(109,40,217,0.2)]"
      >
        <defs>
          {/* Main 3D Purple/Violet Wing Gradient */}
          <linearGradient id="birdWing3D" x1="20" y1="130" x2="110" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#431407" stopOpacity="0.1" />
            <stop offset="10%" stopColor="#4C1D95" />
            <stop offset="45%" stopColor="#6D28D9" />
            <stop offset="80%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>

          {/* Wing Specular Highlight */}
          <linearGradient id="wingSpecular" x1="50" y1="40" x2="80" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>

          {/* Top Red Crest Gradient */}
          <linearGradient id="crestRed" x1="15" y1="25" x2="85" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#B91C1C" />
            <stop offset="40%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>

          {/* Cream / Peach Tail Feather Gradient */}
          <linearGradient id="tailCream" x1="100" y1="120" x2="145" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6D28D9" />
            <stop offset="25%" stopColor="#C084FC" />
            <stop offset="60%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </linearGradient>

          {/* White Accent Stripe */}
          <linearGradient id="whiteStripe" x1="20" y1="35" x2="80" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Ground Contact Shadow */}
          <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="78" cy="144" rx="46" ry="7" fill="url(#groundShadow)" className="animate-bird-shadow" />

        {/* Red Feather Crest (Top Tip) */}
        <path
          d="M18 26 C 28 28, 55 38, 86 64 C 74 61, 48 48, 28 35 Z"
          fill="url(#crestRed)"
        />

        {/* Clean Curved White/Silver Divider Stripe */}
        <path
          d="M28 35 C 48 48, 74 61, 86 64 C 80 65, 52 53, 33 42 Z"
          fill="url(#whiteStripe)"
        />

        {/* Main 3D Purple Wing Feather Swoop */}
        <path
          d="M18 26 C 36 34, 48 55, 60 82 C 70 106, 82 128, 105 132 C 118 134, 126 128, 120 118 C 108 98, 82 58, 86 64 C 52 53, 33 42, 18 26 Z"
          fill="url(#birdWing3D)"
        />

        {/* Specular Light Reflection along the Wing Edge */}
        <path
          d="M32 44 C 44 56, 56 78, 66 102 C 68 100, 58 74, 46 56 Z"
          fill="url(#wingSpecular)"
        />

        {/* Tail Feather Rising Curve (Cream / Peach with Purple Root) */}
        <path
          d="M102 128 C 110 129, 116 122, 118 108 C 122 88, 134 76, 146 72 C 144 80, 138 98, 134 116 C 130 128, 120 134, 108 132 Z"
          fill="url(#tailCream)"
        />

        {/* Inner Soft Glow Curve on the Tail */}
        <path
          d="M118 108 C 124 94, 132 82, 142 75 C 138 88, 132 104, 126 118 Z"
          fill="#FFFBEB"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};
