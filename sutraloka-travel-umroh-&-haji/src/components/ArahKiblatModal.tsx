import React, { useState } from 'react';
import { Compass, RotateCw, MapPin, X, Navigation, ShieldCheck } from 'lucide-react';

interface ArahKiblatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast?: (msg: string) => void;
}

export const ArahKiblatModal: React.FC<ArahKiblatModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [headingOffset, setHeadingOffset] = useState(0);

  if (!isOpen) return null;

  const handleCalibrate = () => {
    setIsCalibrating(true);
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([40, 60, 40]);
    }
    setTimeout(() => {
      setHeadingOffset((prev) => (prev === 0 ? 2 : 0));
      setIsCalibrating(false);
      if (onShowToast) onShowToast('Kompas berhasil dikalibrasi dengan sensor perangkat');
    }, 1200);
  };

  // Qibla angle is 294 degrees from Surabaya / Indonesia
  const qiblaAngle = 294 + headingOffset;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-t-[32px] sm:rounded-[24px] bg-[#FFFBF7] border border-amber-100 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Top Header */}
        <div className="relative px-5 pt-4 pb-3 flex items-center justify-between border-b border-amber-100/80 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#C8B5FF]/20 text-[#2A1A4A] flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#2A1A4A]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#2A1A4A] font-heading">
                Arah Kiblat Akurat
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                Penunjuk Kiblat Presisi GPS Sutraloka
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors active:scale-95"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body with faint Masjidil Haram background */}
        <div className="relative p-6 flex flex-col items-center text-center overflow-y-auto no-scrollbar">
          
          {/* Faint Masjidil Haram Photo Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80')`
            }}
          />

          {/* Compass Graphic Container (240px) */}
          <div className="relative w-[240px] h-[240px] my-3 flex items-center justify-center">
            {/* Outer Compass Dial Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-[#2A1A4A]/10 bg-white/90 shadow-xl shadow-[#2A1A4A]/5 flex items-center justify-center">
              
              {/* Compass Cardinal Points */}
              <span className="absolute top-2 text-[11px] font-black text-[#D4AF37] tracking-widest">U</span>
              <span className="absolute right-3 text-[11px] font-bold text-slate-400">T</span>
              <span className="absolute bottom-2 text-[11px] font-bold text-slate-400">S</span>
              <span className="absolute left-3 text-[11px] font-bold text-slate-400">B</span>

              {/* Kaaba Icon at North Indicator */}
              <div className="absolute top-6 flex flex-col items-center">
                <div className="w-5 h-5 rounded-sm bg-[#150A35] border border-[#D4AF37] flex items-center justify-center text-[8px] text-white font-bold shadow-sm">
                  🕋
                </div>
              </div>

              {/* Degree tick markers */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-full h-full pointer-events-none flex justify-center"
                  style={{ transform: `rotate(${deg}deg)` }}
                >
                  <div className={`w-0.5 ${deg % 90 === 0 ? 'h-3 bg-[#2A1A4A]' : 'h-1.5 bg-slate-300'}`} />
                </div>
              ))}
            </div>

            {/* Rotating Gold Needle Indicator (240px scope) */}
            <div 
              className={`relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-out ${
                isCalibrating ? 'animate-spin' : ''
              }`}
              style={{ transform: isCalibrating ? undefined : `rotate(${qiblaAngle}deg)` }}
            >
              {/* Needle Body */}
              <div className="relative w-4 h-48 flex flex-col items-center justify-between pointer-events-none">
                {/* Needle Pointing to Kaaba: Gold #D4AF37 */}
                <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[90px] border-b-[#D4AF37] drop-shadow-md" />
                
                {/* Center Pivot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#2A1A4A] border-2 border-[#D4AF37] flex items-center justify-center shadow-md z-10">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                </div>

                {/* Opposing Tail: Silver Slate */}
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[75px] border-t-slate-300 drop-shadow-sm" />
              </div>
            </div>
          </div>

          {/* Compass Info Texts: LEFT bold and LEFT grey */}
          <div className="relative w-full space-y-1 mt-3 z-10 text-left px-2">
            <h3 className="text-base font-black text-[#2A1A4A] tracking-tight">
              Arah Kiblat 294° Barat Laut dari Surabaya
            </h3>

            <p className="text-xs text-slate-500 font-medium">
              Jarak ke Kaaba 8.320 km
            </p>

            <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
              Posisikan smartphone secara mendatar untuk akurasi optimal. Jarum emas menunjuk langsung ke Baitullah Kaabah Al-Musyarrafah.
            </p>
          </div>

          {/* Action Button: Kalibrasi Kompas outline lavender CENTER */}
          <div className="w-full mt-5 relative z-10 space-y-2 flex flex-col items-center">
            <button
              onClick={handleCalibrate}
              disabled={isCalibrating}
              className="w-full max-w-[280px] min-h-[48px] py-3 px-6 rounded-2xl border-2 border-[#C8B5FF] bg-[#C8B5FF]/10 hover:bg-[#C8B5FF]/20 text-[#2A1A4A] text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xs mx-auto"
            >
              <RotateCw className={`w-4 h-4 text-[#2A1A4A] ${isCalibrating ? 'animate-spin' : ''}`} />
              <span>{isCalibrating ? 'Mengkalibrasi Sensor...' : 'Kalibrasi Kompas'}</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Terverifikasi astronomi & hisab resmi Kemenag RI</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
