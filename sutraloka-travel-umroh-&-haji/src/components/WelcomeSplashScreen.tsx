import React, { useState } from 'react';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { SutralokaLogo } from './SutralokaLogo';
import prophetMosqueBrightImg from '../assets/images/prophet_mosque_medina_bright_1791562718181.jpg';

interface WelcomeSplashScreenProps {
  onEnterApp: () => void;
}

export const WelcomeSplashScreen: React.FC<WelcomeSplashScreenProps> = ({ onEnterApp }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "Paket Umroh & Haji Pilihan Terbaik",
      subtitle: "Berakhir di Madinah • Hotel Bintang 5 • Penerbangan Langsung."
    },
    {
      title: "Kemudahan Ibadah di Tanah Suci",
      subtitle: "Jadwal sholat terakurat di Makkah & Madinah, pemesanan tiket Raudhah Nusuk instan, serta akomodasi hotel bintang 5 ring 1 terdekat."
    },
    {
      title: "Legalitas Resmi & Terpercaya",
      subtitle: "SK DEPAG NO 127 Tahun 2020 • Anggota afiliasi AMPHURI (Asosiasi Muslim Penyelenggara Haji dan Umrah Republik Indonesia)."
    }
  ];

  const current = slides[activeSlide];

  return (
    <div className="relative h-full min-h-[640px] flex flex-col justify-between overflow-hidden bg-neutral-950 text-white p-6 select-none font-sans">
      {/* Background Cinematic Bright Prophet Mosque Photo */}
      <img
        src={prophetMosqueBrightImg}
        alt="Masjid Nabawi Medina Daylight"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95"
      />
      
      {/* Soft Gradient Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />

      {/* Top Header: Unboxed Transparent Sutraloka Brand */}
      <div className="relative z-10 flex items-center justify-center pt-4">
        <div className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
          <SutralokaLogo size="md" showSubtitle={true} withGlow={true} />
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 space-y-5 pb-4 font-sans">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight drop-shadow-lg font-sans">
            {current.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-sm drop-shadow font-sans">
            {current.subtitle}
          </p>
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center gap-1.5 pt-1">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-1.5 rounded-full transition-all ${
                activeSlide === idx ? 'w-8 bg-[#A577FF]' : 'w-2 bg-white/40'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Action Buttons: Fully rounded soft violet */}
        <div className="space-y-2.5 pt-2 font-sans">
          <button
            onClick={onEnterApp}
            className="w-full py-3.5 px-4 rounded-full bg-[#A577FF] hover:bg-[#9664FF] text-white font-bold text-sm tracking-wide transition-all shadow-xl shadow-[#A577FF]/40 active:scale-95 text-center font-sans"
          >
            Jelajahi Sekarang
          </button>
          <button
            onClick={onEnterApp}
            className="w-full py-3 px-4 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-sm tracking-wide transition-all backdrop-blur-md active:scale-95 text-center font-sans"
          >
            Login
          </button>
        </div>

        <p className="text-[10px] text-white/70 text-center leading-relaxed">
          SK DEPAG NO 127 Tahun 2020 • Anggota afiliasi AMPHURI
        </p>
      </div>
    </div>
  );
};
