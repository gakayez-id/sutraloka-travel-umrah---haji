import React from 'react';
import { Lock } from 'lucide-react';

interface LockedCardOverlayProps {
  onUnlockClick: () => void;
  message?: string;
}

export const LockedCardOverlay: React.FC<LockedCardOverlayProps> = ({
  onUnlockClick,
  message = "Masuk sebagai jamaah untuk membuka"
}) => {
  return (
    <div 
      onClick={(e) => {
        e.stopPropagation();
        onUnlockClick();
      }}
      className="absolute inset-0 z-20 backdrop-blur-[6px] bg-white/60 rounded-[24px] flex flex-col items-center justify-center p-4 text-center cursor-pointer group transition-all duration-300 hover:bg-white/50"
    >
      {/* Gold Lock Icon */}
      <div className="w-12 h-12 rounded-2xl bg-white/95 border-2 border-[#D4AF37] shadow-lg flex items-center justify-center text-[#D4AF37] mb-2.5 group-hover:scale-110 transition-transform">
        <Lock className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37]/20 stroke-[2.2]" />
      </div>

      {/* Lock Message */}
      <p className="text-xs font-bold text-[#2A1A4A] max-w-[210px] leading-snug mb-3">
        {message}
      </p>

      {/* Button Masuk Sekarang */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onUnlockClick();
        }}
        className="px-4 py-2 rounded-xl bg-[#2A1A4A] hover:bg-[#3D256B] text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5"
      >
        <span>Masuk Sekarang</span>
      </button>
    </div>
  );
};
