import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Plane, 
  QrCode
} from 'lucide-react';
import { SUTRALOKA_DATA } from '../data/travelData';
import { SutralokaHeaderBrand } from './SutralokaHeaderBrand';
import { LockedCardOverlay } from './LockedCardOverlay';

interface DigitalTicketViewProps {
  onBack?: () => void;
  isGuest?: boolean;
  onLockedClick?: () => void;
}

export const DigitalTicketView: React.FC<DigitalTicketViewProps> = ({ 
  onBack,
  isGuest = false,
  onLockedClick
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const ticket = SUTRALOKA_DATA.activeTicket;

  const handleDownload = () => {
    if (isGuest) {
      if (onLockedClick) onLockedClick();
      return;
    }
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-1">
        {onBack ? (
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#2A1A4A] hover:bg-slate-50 shadow-xs transition-colors"
            aria-label="Kembali"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-9" />
        )}

        <div className="text-center">
          <h2 className="text-base font-extrabold text-[#2A1A4A] font-heading">
            Tiket Saya
          </h2>
          <span className="text-[11px] font-mono text-[#2A1A4A] font-bold">
            SUB Juanda 03 Sep 2026 JED
          </span>
        </div>

        <button
          onClick={handleDownload}
          className="w-9 h-9 rounded-full bg-[#C8B5FF]/20 flex items-center justify-center text-[#2A1A4A] hover:bg-[#C8B5FF]/30 shadow-xs transition-colors"
          title="Unduh Tiket"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* Boarding Pass Ivory Texture Card */}
      <div className="relative overflow-hidden rounded-[24px] bg-[#FFFBF7] border border-amber-100 p-5 shadow-sm space-y-4 text-left transition-colors">
        
        {/* Subtle ivory paper texture */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.05] pointer-events-none rounded-[24px]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80')`
          }}
        />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-amber-100 pb-3">
          <SutralokaHeaderBrand size="sm" iconSize={32} />
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#D4AF37]/15 text-[#2A1A4A] border border-[#D4AF37]/30 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
            Akreditasi A
          </span>
        </div>

        {/* Passenger & Flight Info LEFT: "Tiket Saya SUB Juanda 03 Sep 2026 JED" */}
        <div className="relative z-10 flex items-start justify-between">
          <div className="text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Tiket Saya
            </span>
            <div className="text-base font-extrabold text-[#2A1A4A] font-heading mt-0.5">
              {ticket.passengerName}
            </div>
            <span className="text-xs text-slate-600 block mt-0.5">
              SUB Juanda 03 Sep 2026 JED · <strong className="font-mono text-[#2A1A4A]">{ticket.bookingCode}</strong>
            </span>
          </div>

          <div className="text-right">
            <span className="px-2.5 py-1 rounded-xl bg-[#2A1A4A] text-white text-xs font-bold font-mono block shadow-xs">
              Kursi: {ticket.seatNumber}
            </span>
            <span className="text-[10px] text-[#D4AF37] font-bold mt-1 block">
              ● {ticket.status}
            </span>
          </div>
        </div>

        {/* Program and Rawdah info */}
        <div className="relative z-10 p-3 rounded-2xl bg-white border border-amber-100 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] text-slate-400 font-medium block">Program Ibadah</span>
            <span className="font-bold text-[#2A1A4A]">{ticket.programName}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-medium block">Slot Nusuk Raudhah</span>
            <span className="font-bold text-[#2A1A4A] font-mono">{ticket.rawdahSlotTime}</span>
          </div>
        </div>

        {/* Flight Details Box */}
        <div className="relative z-10 p-3.5 rounded-2xl bg-[#F2EDFD]/50 border border-[#C8B5FF]/40 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#2A1A4A]">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#2A1A4A]" />
              <span>{ticket.flight}</span>
            </div>
            <span className="text-[11px] font-mono text-[#D4AF37] font-bold">{ticket.nusukStatus}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="text-left">
              <span className="text-xl font-black font-mono text-[#2A1A4A] block">SUB</span>
              <span className="text-[10px] text-slate-500">Surabaya (Juanda)</span>
              <span className="text-xs font-bold text-[#2A1A4A] block mt-0.5">{ticket.departureDate}</span>
            </div>

            <div className="flex-1 px-3 flex flex-col items-center">
              <span className="text-[9px] font-bold text-[#2A1A4A] bg-[#C8B5FF]/30 px-2 py-0.5 rounded-full mb-1">
                Langsung PP
              </span>
              <div className="w-full flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2A1A4A]" />
                <div className="flex-1 h-0.5 bg-[#2A1A4A]/30" />
                <Plane className="w-3.5 h-3.5 text-[#2A1A4A] rotate-90 mx-1" />
                <div className="flex-1 h-0.5 bg-[#2A1A4A]/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#2A1A4A]" />
              </div>
            </div>

            <div className="text-right">
              <span className="text-xl font-black font-mono text-[#2A1A4A] block">JED</span>
              <span className="text-[10px] text-slate-500">Jeddah (King Abdulaziz)</span>
              <span className="text-xs font-bold text-[#2A1A4A] block mt-0.5">Hotel {ticket.hotelMakkah}</span>
            </div>
          </div>
        </div>

        {/* QR Code Real + Gold Scan Line CENTER "SCAN DI BOARDING GATE" */}
        <div className="relative z-10 p-5 rounded-2xl bg-white border border-amber-100 text-center space-y-2.5">
          <div className="relative w-36 h-36 mx-auto bg-[#2A1A4A] p-2 rounded-2xl flex items-center justify-center shadow-md overflow-hidden">
            <div className="w-full h-full bg-white rounded-xl flex items-center justify-center p-2">
              <QrCode className="w-24 h-24 text-[#2A1A4A]" />
            </div>

            {/* Gold scan line animation */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_8px_#D4AF37] animate-pulse" />
          </div>

          <span className="text-xs font-mono font-black text-[#2A1A4A] tracking-wider block">
            SCAN DI BOARDING GATE
          </span>
          <span className="text-[10px] text-slate-400 block">
            Izin Slot Raudhah & E-Hajj Terintegrasi
          </span>
        </div>

        {/* Download Success Notice */}
        {downloadSuccess && (
          <div className="relative z-10 p-3 rounded-xl bg-amber-50 border border-amber-200 text-[#2A1A4A] text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            <span>E-Tiket PDF berhasil diunduh ke perangkat Anda</span>
          </div>
        )}

        {/* For Guest: Locked Overlay */}
        {isGuest && (
          <LockedCardOverlay 
            onUnlockClick={() => onLockedClick && onLockedClick()} 
            message="Masuk sebagai jamaah untuk membuka Tiket Saya & Scan Boarding Pass"
          />
        )}
      </div>
    </div>
  );
};
