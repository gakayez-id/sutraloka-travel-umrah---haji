import React from 'react';
import { BookOpen, Building2, Ticket, ShieldCheck, HeartHandshake, CheckSquare } from 'lucide-react';

interface QuickServiceGridProps {
  onSelectService: (serviceKey: string) => void;
  isGuest?: boolean;
  onLockedClick?: () => void;
}

export const QuickServiceGrid: React.FC<QuickServiceGridProps> = ({
  onSelectService,
  isGuest = false,
  onLockedClick
}) => {
  // 3 narrow cards with sharp visible photos
  const narrowCards = [
    {
      id: 'hajj',
      title: 'Haji Khusus',
      subtitle: 'Reservasi Kuota',
      img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=400&q=80',
      requiresAuth: false
    },
    {
      id: 'umrah',
      title: 'Paket Umroh',
      subtitle: 'Katalog Pilihan',
      img: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=400&q=80',
      requiresAuth: false
    },
    {
      id: 'rawdah',
      title: 'Raudhah Suci',
      subtitle: 'Izin Slot Nusuk',
      img: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=400&q=80',
      requiresAuth: true
    }
  ];

  const handleCardClick = (id: string, requiresAuth: boolean) => {
    if (isGuest && requiresAuth) {
      if (onLockedClick) onLockedClick();
      return;
    }
    onSelectService(id);
  };

  return (
    <div className="space-y-3.5 text-left">
      {/* Header LEFT: "Layanan Pilihan Jamaah" 18px bold + "Akses cepat fitur bimbingan ibadah & perjalanan" 13px grey */}
      <div>
        <h2 className="text-[18px] font-black text-[#2A1A4A] font-heading leading-tight">
          Layanan Pilihan Jamaah
        </h2>
        <p className="text-[13px] text-slate-500 font-medium mt-0.5">
          Akses cepat fitur bimbingan ibadah & perjalanan
        </p>
      </div>

      {/* 3 cards horizontal scroll gap 12px width 140px height 160px rounded 24px with clear, sharp background photos */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 snap-x">
        {narrowCards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => handleCardClick(card.id, card.requiresAuth)}
            className="group relative overflow-hidden shrink-0 w-[140px] min-w-[140px] h-[160px] rounded-[24px] bg-[#1E0B3B] border border-violet-100/50 shadow-sm flex flex-col justify-end text-left snap-start transition-all duration-300 hover:shadow-lg active:scale-95"
          >
            {/* Sharp and clear architectural background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url('${card.img}')` }}
            />
            {/* Soft dark gradient at bottom for pristine text legibility without obscuring the image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

            {/* Text bottom LEFT 12px padding. Clean, NO ICON */}
            <div className="relative z-10 p-3">
              <div className="text-[14px] font-extrabold text-white font-heading leading-tight drop-shadow-md">
                {card.title}
              </div>
              <div className="text-[12px] text-amber-200 font-medium mt-0.5 drop-shadow-sm">
                {card.subtitle}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Pills "Panduan Manasik" book + "Tasbih Digital" clean center alignment without decorative sparkles */}
      <div className="flex items-center justify-center gap-2.5 overflow-x-auto no-scrollbar py-1">
        <button
          type="button"
          onClick={() => {
            if (isGuest) {
              onLockedClick?.();
              return;
            }
            onSelectService('manasik');
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#F5E6A3] shadow-xs text-[#2A1A4A] text-xs font-bold hover:bg-[#FFF7D6] transition-colors active:scale-95 shrink-0"
        >
          <BookOpen className="w-4 h-4 text-amber-700" />
          <span>Panduan Manasik</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (isGuest) {
              onLockedClick?.();
              return;
            }
            onSelectService('tasbih');
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#F5E6A3] shadow-xs text-[#2A1A4A] text-xs font-bold hover:bg-[#FFF7D6] transition-colors active:scale-95 shrink-0"
        >
          <span>Tasbih Digital</span>
        </button>
      </div>
    </div>
  );
};
