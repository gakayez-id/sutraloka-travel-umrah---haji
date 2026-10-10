import React from 'react';
import { X, Plane, Hotel, Star, Calendar, MessageCircle, CheckCircle2 } from 'lucide-react';
import { PaketUmroh } from '../data/travelData';
import { SutralokaHeaderBrand } from './SutralokaHeaderBrand';

interface PaketDetailModalProps {
  paket: PaketUmroh | null;
  onClose: () => void;
  onBookSchedule: (paket: PaketUmroh) => void;
}

export const PaketDetailModal: React.FC<PaketDetailModalProps> = ({
  paket,
  onClose,
  onBookSchedule
}) => {
  if (!paket) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-white dark:bg-[#1E1148] border border-slate-200/80 dark:border-[#A577FF]/20 p-5 max-h-[90vh] overflow-y-auto no-scrollbar space-y-4 shadow-2xl transition-colors">
        {/* Grab Handle */}
        <div className="w-10 h-1 bg-slate-200 dark:bg-[#150A35] rounded-full mx-auto sm:hidden" />

        {/* Top Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-[#A577FF]/15 text-[#150A35] dark:text-[#A577FF] font-bold font-heading text-xs">
              PROGRAM {paket.program}
            </span>
            {paket.badge && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                {paket.badge}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#150A35] hover:bg-slate-200 dark:hover:bg-[#1E1148] flex items-center justify-center text-slate-600 dark:text-slate-300"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title & Price */}
        <div>
          <h2 className="text-xl font-extrabold text-[#150A35] dark:text-white font-heading">
            Paket Umroh Sutraloka {paket.program}
          </h2>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-[#A577FF] font-heading">
              {paket.harga_display}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">/ orang (All-In)</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            * {paket.catatan}
          </p>
        </div>

        {/* Highlight Note */}
        {paket.highlight && (
          <div className="p-3.5 rounded-2xl bg-[#A577FF]/10 dark:bg-[#150A35] border border-[#A577FF]/20 text-xs text-[#150A35] dark:text-slate-200 font-medium">
            {paket.highlight}
          </div>
        )}

        {/* Hotel & Flight Card */}
        <div className="rounded-3xl bg-[#F5F7FC] dark:bg-[#150A35] border border-slate-200/60 dark:border-[#A577FF]/20 p-4 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
            Akomodasi & Penerbangan
          </span>

          <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-start gap-2.5">
              <Plane className="w-4 h-4 text-[#A577FF] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#150A35] dark:text-white">Maskapai Penerbangan:</span>
                <p className="text-slate-600 dark:text-slate-400">{paket.maskapai || 'Direct Flight Surabaya / Jakarta ke Jeddah / Madinah'}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Hotel className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#150A35] dark:text-white">Hotel Makkah:</span>
                  {paket.hotelBintang && (
                    <span className="text-amber-600 font-bold">({paket.hotelBintang}★)</span>
                  )}
                </div>
                <p className="text-slate-600 dark:text-slate-400">{paket.hotelMakkah || 'Hotel Ring 1 Dekat Pelataran Masjidil Haram'}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Hotel className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#150A35] dark:text-white">Hotel Madinah:</span>
                  {paket.hotelBintang && (
                    <span className="text-amber-600 font-bold">({paket.hotelBintang}★)</span>
                  )}
                </div>
                <p className="text-slate-600 dark:text-slate-400">{paket.hotelMadinah || 'Hotel Dekat Masjid Nabawi'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fasilitas Include */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
            Fasilitas Sudah Termasuk (Include)
          </span>
          <div className="grid grid-cols-2 gap-2">
            {paket.include.map((inc, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2.5 rounded-2xl bg-[#F5F7FC] dark:bg-[#150A35] border border-slate-200/60 dark:border-[#A577FF]/20 text-xs text-[#150A35] dark:text-slate-300"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">{inc}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-[#F5F7FC] dark:bg-[#150A35] border border-slate-200/60 dark:border-[#A577FF]/20 text-xs text-[#150A35] dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">Handling & Visa Umroh</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-[#F5F7FC] dark:bg-[#150A35] border border-slate-200/60 dark:border-[#A577FF]/20 text-xs text-[#150A35] dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">Air Zamzam Resmi</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#A577FF]/20">
          <button
            onClick={() => onBookSchedule(paket)}
            className="w-full py-4 px-4 rounded-2xl bg-[#A577FF] hover:opacity-90 text-white font-bold text-sm shadow-wasl-purple flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4" />
            <span>Pilih Jadwal Keberangkatan Paket Ini</span>
          </button>

          <a
            href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo Sutra Travel, saya berminat dengan Paket Umroh ${paket.program} - ${paket.harga_display}. Mohon info seat tersedia dan jadwal keberangkatannya.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
            <span>Book via WhatsApp / Tanya Admin</span>
          </a>
        </div>
      </div>
    </div>
  );
};
