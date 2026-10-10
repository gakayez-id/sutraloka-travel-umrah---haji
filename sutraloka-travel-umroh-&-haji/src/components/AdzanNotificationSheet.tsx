import React, { useState, useEffect } from 'react';
import { Bell, Volume2, Smartphone, Check, X, ShieldCheck } from 'lucide-react';

interface AdzanNotificationSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast?: (msg: string) => void;
}

export const AdzanNotificationSheet: React.FC<AdzanNotificationSheetProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [prayerTimes, setPrayerTimes] = useState(() => {
    const saved = localStorage.getItem('sutraloka_adzan_toggles');
    return saved
      ? JSON.parse(saved)
      : {
          Imsak: false,
          Fajr: true,
          Zuhr: true,
          Ashr: true,
          Maghrib: true,
          Isya: true
        };
  });

  const [timingOption, setTimingOption] = useState<'exact' | 'before5'>('exact');
  const [adzanVoice, setAdzanVoice] = useState<'mekkah' | 'madinah'>('mekkah');
  const [vibrateOption, setVibrateOption] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermissionGranted(Notification.permission === 'granted');
    }
  }, []);

  if (!isOpen) return null;

  const togglePrayer = (name: string) => {
    const updated = { ...prayerTimes, [name]: !prayerTimes[name] };
    setPrayerTimes(updated);
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
  };

  const handleSave = async () => {
    localStorage.setItem('sutraloka_adzan_toggles', JSON.stringify(prayerTimes));
    localStorage.setItem('sutraloka_adzan_timing', timingOption);
    localStorage.setItem('sutraloka_adzan_voice', adzanVoice);
    localStorage.setItem('sutraloka_adzan_vibrate', String(vibrateOption));

    // Request Notification permission
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        if (perm === 'granted') {
          setPermissionGranted(true);
          new Notification('Waktu Fajr tiba 04:13 AST - 22 Rabiul Awwal 1448 H', {
            body: 'Hayya ‘alas-shalaah. Telah masuk waktu Sholat Fajr di Mekkah Al-Mukarramah.',
            icon: '/favicon.ico'
          });
        }
      } catch {
        // notification fallback
      }
    }

    if (onShowToast) {
      onShowToast('Pengaturan Notifikasi Adzan berhasil disimpan!');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 backdrop-blur-sm p-0 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-t-[32px] bg-[#FFFBF7] border-t border-amber-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-4 duration-300">
        
        {/* Drag handle */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-12 h-1.5 rounded-full bg-slate-300" />
        </div>

        {/* Header: Title CENTER */}
        <div className="px-5 py-3 border-b border-amber-100/80 bg-white flex items-center justify-between">
          <div className="w-8" />
          <h2 className="text-base font-extrabold text-[#2A1A4A] font-heading text-center">
            Notifikasi Adzan
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors active:scale-95"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-5 overflow-y-auto space-y-4 no-scrollbar">
          
          {/* List LEFT toggles per time */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Pengingat Waktu Sholat (5 Waktu & Imsak)
            </span>

            {[
              { name: 'Imsak', time: '04:03 AST' },
              { name: 'Fajr', time: '04:13 AST' },
              { name: 'Zuhr', time: '11:29 AST' },
              { name: 'Ashr', time: '14:50 AST' },
              { name: 'Maghrib', time: '17:26 AST' },
              { name: 'Isya', time: '18:36 AST' }
            ].map((p) => {
              const active = prayerTimes[p.name];
              return (
                <div
                  key={p.name}
                  onClick={() => togglePrayer(p.name)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white border border-amber-100 hover:border-[#C8B5FF] transition-all cursor-pointer shadow-2xs select-none"
                >
                  <div className="text-left">
                    <span className="text-xs font-bold text-[#2A1A4A] block">
                      {p.name}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {p.time}
                    </span>
                  </div>

                  {/* Switch: Lavender active, grey off */}
                  <div
                    className={`w-12 h-6 rounded-full transition-colors flex items-center px-0.5 ${
                      active ? 'bg-[#C8B5FF] justify-end' : 'bg-slate-200 justify-start'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#2A1A4A] shadow-xs flex items-center justify-center">
                      {active && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Options: Waktu Pengingat */}
          <div className="p-4 rounded-2xl bg-white border border-amber-100 space-y-2.5 shadow-2xs text-left">
            <span className="text-xs font-extrabold text-[#2A1A4A] block">
              Waktu Peringatan
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTimingOption('exact')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                  timingOption === 'exact'
                    ? 'bg-[#2A1A4A] text-white border-[#2A1A4A] shadow-xs'
                    : 'bg-[#FFFBF7] text-slate-600 border-slate-200'
                }`}
              >
                Saat Adzan
              </button>
              <button
                type="button"
                onClick={() => setTimingOption('before5')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                  timingOption === 'before5'
                    ? 'bg-[#2A1A4A] text-white border-[#2A1A4A] shadow-xs'
                    : 'bg-[#FFFBF7] text-slate-600 border-slate-200'
                }`}
              >
                5 Menit Sebelum Adzan
              </button>
            </div>
          </div>

          {/* Options: Suara Adzan Mekkah / Madinah */}
          <div className="p-4 rounded-2xl bg-white border border-amber-100 space-y-2.5 shadow-2xs text-left">
            <span className="text-xs font-extrabold text-[#2A1A4A] block flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Pilihan Suara Muadzin</span>
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAdzanVoice('mekkah')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                  adzanVoice === 'mekkah'
                    ? 'bg-[#2A1A4A] text-white border-[#2A1A4A] shadow-xs'
                    : 'bg-[#FFFBF7] text-slate-600 border-slate-200'
                }`}
              >
                Adzan Mekkah
              </button>
              <button
                type="button"
                onClick={() => setAdzanVoice('madinah')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                  adzanVoice === 'madinah'
                    ? 'bg-[#2A1A4A] text-white border-[#2A1A4A] shadow-xs'
                    : 'bg-[#FFFBF7] text-slate-600 border-slate-200'
                }`}
              >
                Adzan Madinah
              </button>
            </div>
          </div>

          {/* Options: Getar */}
          <div className="p-4 rounded-2xl bg-white border border-amber-100 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#2A1A4A] flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#2A1A4A] block">
                  Getar Perangkat
                </span>
                <span className="text-[11px] text-slate-400">
                  Getar saat adzan berkumandang
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setVibrateOption(!vibrateOption)}
              className={`w-12 h-6 rounded-full transition-colors flex items-center px-0.5 ${
                vibrateOption ? 'bg-[#C8B5FF] justify-end' : 'bg-slate-200 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-[#2A1A4A] shadow-xs" />
            </button>
          </div>
        </div>

        {/* Footer: Save plum CENTER */}
        <div className="p-4 border-t border-amber-100 bg-white flex flex-col items-center gap-2">
          <button
            onClick={handleSave}
            className="w-full h-12 rounded-2xl bg-[#2A1A4A] hover:bg-[#3D256B] text-white font-bold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <Bell className="w-4 h-4 text-[#D4AF37]" />
            <span>Simpan Pengaturan</span>
          </button>

          <span className="text-[10px] text-slate-400 font-medium">
            Notifikasi menggunakan Web Push API & sinkronisasi AST Mekkah
          </span>
        </div>

      </div>
    </div>
  );
};
