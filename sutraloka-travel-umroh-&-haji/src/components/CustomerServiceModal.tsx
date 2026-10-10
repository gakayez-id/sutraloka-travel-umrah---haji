import React from 'react';
import { Headset, Phone, MessageCircle, Clock, ShieldCheck, X } from 'lucide-react';

interface CustomerServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast?: (msg: string) => void;
}

export const CustomerServiceModal: React.FC<CustomerServiceModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  if (!isOpen) return null;

  const handleWhatsApp = () => {
    const text = encodeURIComponent('Assalamu’alaikum CS Sutraloka, saya ingin konsultasi mengenai paket umroh dan bimbingan ibadah.');
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
    if (onShowToast) onShowToast('Menghubungi Customer Service Sutraloka via WhatsApp');
  };

  const handleCall = () => {
    window.open('tel:08001234567', '_self');
    if (onShowToast) onShowToast('Menghubungi Hotline 24 Jam Sutraloka');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-t-[32px] sm:rounded-[24px] bg-[#FFFBF7] border border-amber-100 shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-amber-100/80 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#2A1A4A] text-[#C8B5FF] flex items-center justify-center shadow-md">
              <Headset className="w-5 h-5 text-[#C8B5FF]" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#2A1A4A] font-heading">
                Layanan Jamaah 24 Jam
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                Sutra Tour & Travel Care Center
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

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-amber-100 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37]">
              <Clock className="w-4 h-4" />
              <span>Respon Cepat & Pendampingan Penuh</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tim Konsultan Umroh & Muthawwif kami siap membantu Anda mulai dari pendaftaran paket, manasik, dokumen visa, hingga penjemputan di Tanah Suci.
            </p>
          </div>

          {/* Action Cards */}
          <div className="space-y-2.5">
            <button
              onClick={handleWhatsApp}
              className="w-full p-4 rounded-2xl bg-[#2A1A4A] text-white flex items-center justify-between shadow-md hover:bg-[#3D256B] transition-all active:scale-98"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#C8B5FF]">
                  <MessageCircle className="w-5 h-5 text-[#C8B5FF]" />
                </div>
                <div>
                  <div className="text-xs font-extrabold tracking-wide">
                    Chat WhatsApp Customer Service
                  </div>
                  <div className="text-[11px] text-purple-200">
                    +62 812-3456-7890 (Online 24/7)
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-[#D4AF37]">
                Chat &rarr;
              </span>
            </button>

            <button
              onClick={handleCall}
              className="w-full p-4 rounded-2xl bg-white border border-[#C8B5FF]/50 text-[#2A1A4A] flex items-center justify-between shadow-sm hover:bg-[#C8B5FF]/10 transition-all active:scale-98"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-[#2A1A4A]/5 flex items-center justify-center text-[#2A1A4A]">
                  <Phone className="w-5 h-5 text-[#2A1A4A]" />
                </div>
                <div>
                  <div className="text-xs font-extrabold tracking-wide">
                    Telepon Langsung (Bebas Pulsa)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    0800-1-SUTRA (0800 1 78872)
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-[#2A1A4A]">
                Panggil &rarr;
              </span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Izin Resmi Kemenag No. U.491/2020 · Akreditasi A</span>
          </div>
        </div>

      </div>
    </div>
  );
};
