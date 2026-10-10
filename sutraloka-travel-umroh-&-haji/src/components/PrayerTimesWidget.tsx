import React, { useState } from 'react';
import { Volume2, VolumeX, Compass, Bell, MapPin } from 'lucide-react';
import { AdzanNotificationSheet } from './AdzanNotificationSheet';

interface PrayerTimesWidgetProps {
  onShowToast?: (msg: string) => void;
  onOpenKiblat?: () => void;
}

export const PrayerTimesWidget: React.FC<PrayerTimesWidgetProps> = ({
  onShowToast,
  onOpenKiblat
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [selectedCity, setSelectedCity] = useState<'Mekkah' | 'Madinah' | 'Surabaya'>('Mekkah');
  const [isAdzanSheetOpen, setIsAdzanSheetOpen] = useState(false);

  const prayerSchedule = [
    { nama: 'Imsak', jam: '04:03', active: false },
    { nama: 'Fajr', jam: '04:13', active: true },
    { nama: 'Zuhr', jam: '11:29', active: false },
    { nama: 'Ashr', jam: '14:50', active: false },
    { nama: 'Maghrib', jam: '17:26', active: false },
    { nama: 'Isya', jam: '18:36', active: false }
  ];

  return (
    <>
      {/* Card Fajr • Mekkah: background REAL Kaaba night blur WebP max 150KB gradient plum 70% */}
      <div className="relative overflow-hidden rounded-[24px] shadow-lg shadow-[#2A1A4A]/15 border border-[#2A1A4A]/20 p-5 text-white">
        
        {/* Real photo Kaaba night blur WebP */}
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-[1.5px] scale-105 pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=75')`
          }}
        />

        {/* Gradient Plum 70% Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A1A4A]/85 via-[#2A1A4A]/70 to-[#2A1A4A]/90 pointer-events-none" />

        {/* Header LEFT: "Fajr • Mekkah" 18px bold white + "22 Rabiul Awwal 1448 H" 12px right */}
        <div className="relative z-10 flex items-center justify-between pb-2.5 border-b border-white/15">
          <div className="text-left">
            <h3 className="text-[18px] font-black text-white tracking-wide font-heading">
              Fajr • {selectedCity}
            </h3>
            {/* Pills "Ubah" + "Kiblat" border white transparent LEFT */}
            <div className="flex items-center gap-1.5 mt-1">
              <button
                onClick={() => {
                  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
                  const cities: ('Mekkah' | 'Madinah' | 'Surabaya')[] = ['Mekkah', 'Madinah', 'Surabaya'];
                  const next = cities[(cities.indexOf(selectedCity) + 1) % cities.length];
                  setSelectedCity(next);
                  if (onShowToast) onShowToast(`Kota diubah ke ${next}`);
                }}
                className="min-h-[26px] px-2.5 py-0.5 text-[10px] font-bold text-white hover:text-[#C8B5FF] bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/30 flex items-center gap-1 backdrop-blur-xs active:scale-95"
              >
                <MapPin className="w-3 h-3 text-[#C8B5FF]" />
                <span>Ubah</span>
              </button>

              <button
                onClick={() => {
                  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
                  if (onOpenKiblat) onOpenKiblat();
                }}
                className="min-h-[26px] px-2.5 py-0.5 text-[10px] font-bold text-white hover:text-[#C8B5FF] bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/30 flex items-center gap-1 backdrop-blur-xs active:scale-95"
                title="Arah Kiblat"
              >
                <Compass className="w-3 h-3 text-[#C8B5FF]" />
                <span>Kiblat</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[12px] text-purple-200/90 font-medium">
              22 Rabiul Awwal 1448 H
            </span>

            {/* Bell + Speaker top-right white transparent lavender icon */}
            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={() => {
                  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
                  setIsAdzanSheetOpen(true);
                }}
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-xs border border-white/20 text-[#C8B5FF] flex items-center justify-center transition-all active:scale-95 shadow-xs"
                title="Notifikasi Adzan"
                aria-label="Pengaturan Adzan"
              >
                <Bell className="w-4 h-4 text-[#C8B5FF]" />
              </button>

              <button
                onClick={() => {
                  const next = !isMuted;
                  setIsMuted(next);
                  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(30);
                  if (onShowToast) onShowToast(next ? 'Suara adzan dinonaktifkan' : 'Suara adzan diaktifkan');
                }}
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-xs border border-white/20 text-[#C8B5FF] flex items-center justify-center transition-all active:scale-95 shadow-xs"
                title={isMuted ? "Suara adzan nonaktif" : "Suara adzan aktif"}
                aria-label="Toggle Suara"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-slate-300" /> : <Volume2 className="w-4 h-4 text-[#C8B5FF]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Countdown LEFT: "HITUNG MUNDUR WAKTU SHOLAT" 11px + "1j 24mnt menuju Fajr" 32px bold white */}
        <div className="relative z-10 my-3 text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-200/80 block">
            HITUNG MUNDUR WAKTU SHOLAT
          </span>
          <div className="text-[32px] font-black text-white tracking-tight font-heading leading-tight mt-0.5">
            1j 24mnt menuju Fajr
          </div>
        </div>

        {/* Glass box CENTER: "WAKTU ADZAN 04:13 AST" 18px white */}
        <div className="relative z-10 my-2 mx-auto max-w-[280px] py-2 px-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-center shadow-inner">
          <span className="text-[18px] font-black text-white font-mono tracking-wide">
            WAKTU ADZAN 04:13 AST
          </span>
        </div>

        {/* Bottom pills CENTER: Imsak 04:03, Fajr 04:13 active lavender solid, Zuhr 11:29, Ashr 14:50, Maghrib 17:26, Isya 18:36 */}
        <div className="relative z-10 grid grid-cols-6 gap-1.5 pt-2 text-center">
          {prayerSchedule.map((item) => {
            const isActive = item.active;
            return (
              <button
                key={item.nama}
                onClick={() => {
                  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
                  setIsAdzanSheetOpen(true);
                }}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-[#C8B5FF] text-[#2A1A4A] font-extrabold shadow-md shadow-[#C8B5FF]/30 ring-2 ring-white/60 scale-[1.03]'
                    : 'bg-white/10 hover:bg-white/20 text-purple-100 border border-white/15 backdrop-blur-xs'
                }`}
              >
                <span className={`text-[10px] font-bold ${isActive ? 'text-[#2A1A4A]' : 'text-purple-200'}`}>
                  {item.nama}
                </span>

                <div className="my-1 flex items-center justify-center">
                  {isActive ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2A1A4A]" />
                  ) : (
                    <div className="w-1 h-1 rounded-full bg-white/40" />
                  )}
                </div>

                <span className={`text-[11px] font-black font-mono tabular-nums ${isActive ? 'text-[#2A1A4A]' : 'text-white'}`}>
                  {item.jam}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Adzan Notification Bottom Sheet */}
      <AdzanNotificationSheet
        isOpen={isAdzanSheetOpen}
        onClose={() => setIsAdzanSheetOpen(false)}
        onShowToast={onShowToast}
      />
    </>
  );
};
