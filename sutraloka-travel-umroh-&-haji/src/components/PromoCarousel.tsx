import React, { useState } from 'react';
import { Gift } from 'lucide-react';

export interface PromoItem {
  badge: string;
  pill: string;
  title: string;
  sub: string;
  img: string;
}

interface PromoCarouselProps {
  onOpenPromo: (promoTitle: string) => void;
  onSelectPromo?: (promo: PromoItem) => void;
}

export const PromoCarousel: React.FC<PromoCarouselProps> = ({ onOpenPromo, onSelectPromo }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const promos = [
    {
      badge: "MILAD SPESIAL",
      pill: "Undian Akhir Tahun",
      title: "HADIAH UMROH MILAD SUTRALOKA!",
      sub: "Dapatkan kesempatan memenangkan grand prize mobil mewah & kupon umroh gratis untuk setiap pendaftaran.",
      img: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80"
    },
    {
      badge: "10.10 FESTIVAL",
      pill: "Terbatas 50 Seat",
      title: "10.10 FESTIVAL PROMO BERKAH",
      sub: "Diskon hingga Rp3.500.000 untuk pendaftaran paket keberangkatan musim dingin 2026 direct flight.",
      img: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const current = promos[activeSlide];

  return (
    <div className="space-y-3 text-left">
      {/* Header LEFT: "Penawaran Spesial" + pill "Promo Eksklusif" beige + dots */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-[18px] font-black text-[#2A1A4A] font-heading">
            Penawaran Spesial
          </h3>
          <span className="text-[11px] font-extrabold bg-[#FFF7D6] text-[#2A1A4A] border border-[#F5E6A3] px-2.5 py-0.5 rounded-full">
            Promo Eksklusif
          </span>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {promos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                activeSlide === idx ? 'w-5 bg-[#2A1A4A]' : 'w-2 bg-slate-300'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Card dark purple Kaaba door photo LEFT text "MILAD SPESIAL" yellow badge + "Undian Akhir Tahun" dark pill + "HADIAH UMROH MILAD SUTRALOKA!" 20px bold white LEFT */}
      <div
        onClick={() => onOpenPromo(current.title)}
        className="group relative overflow-hidden rounded-[24px] bg-[#2A1A4A] shadow-md border border-amber-100 p-5 cursor-pointer text-white min-h-[160px] flex flex-col justify-between transition-all duration-300 hover:shadow-lg"
      >
        {/* Kaaba door / night photo background with dark purple overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center filter brightness-50 contrast-125 group-hover:scale-105 transition-transform duration-700"
          style={{ backgroundImage: `url('${current.img}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A1A4A]/95 via-[#2A1A4A]/80 to-[#2A1A4A]/70 pointer-events-none" />

        {/* Top badges: "MILAD SPESIAL" yellow badge + "Undian Akhir Tahun" dark pill */}
        <div className="relative z-10 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-[#D4AF37] text-[#2A1A4A] shadow-xs">
            {current.badge}
          </span>
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[#150A35]/80 text-purple-200 border border-white/20 backdrop-blur-xs">
            {current.pill}
          </span>
        </div>

        {/* Text LEFT: "HADIAH UMROH MILAD SUTRALOKA!" 20px bold white */}
        <div className="relative z-10 space-y-1 my-2 text-left">
          <h4 className="text-[20px] font-black text-white font-heading leading-tight group-hover:text-[#C8B5FF] transition-colors">
            {current.title}
          </h4>
          <p className="text-xs text-purple-100/90 leading-snug line-clamp-2 max-w-sm">
            {current.sub}
          </p>
        </div>

        {/* Footer with Klaim Promo CTA Button */}
        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/15 text-xs">
          <span className="text-[11px] font-bold text-[#D4AF37] flex items-center gap-1">
            <Gift className="w-3.5 h-3.5" />
            <span>Kupon Undian Aktif</span>
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectPromo?.(current);
            }}
            className="px-3 py-1.5 rounded-lg bg-[#FF7A3D] hover:bg-[#FF6B00] active:scale-95 text-white font-bold text-[11px] shadow-sm transition-all"
          >
            Klaim Promo
          </button>
        </div>
      </div>
    </div>
  );
};
