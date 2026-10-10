import React, { useState, useEffect } from 'react';
import { 
  X, 
  Bell, 
  BellRing, 
  CheckCircle2, 
  Clock, 
  Volume2, 
  VolumeX, 
  Compass, 
  ShieldCheck,
  Check,
  Send
} from 'lucide-react';
import { PushNotificationCard } from './PushNotificationCard';
import { sendBrowserNotification, playNotificationChime } from '../utils/notification';

interface PrayerReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (message: string) => void;
}

interface ReminderConfig {
  subuh: boolean;
  syuruq: boolean;
  dzuhur: boolean;
  ashar: boolean;
  maghrib: boolean;
  isya: boolean;
  offsetMinutes: number; // 0, 10, 15
  sound: 'adhan_makkah' | 'adhan_madinah' | 'gentle_beep' | 'silent';
}

const DEFAULT_CONFIG: ReminderConfig = {
  subuh: true,
  syuruq: false,
  dzuhur: true,
  ashar: true,
  maghrib: true,
  isya: true,
  offsetMinutes: 10,
  sound: 'adhan_makkah'
};

export const PrayerReminderModal: React.FC<PrayerReminderModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [config, setConfig] = useState<ReminderConfig>(() => {
    try {
      const saved = localStorage.getItem('sutraloka_prayer_reminders');
      return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
    } catch {
      return DEFAULT_CONFIG;
    }
  });

  const [testPlaying, setTestPlaying] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('sutraloka_prayer_reminders', JSON.stringify(config));
  }, [config]);

  if (!isOpen) return null;

  const togglePrayer = (key: keyof Omit<ReminderConfig, 'offsetMinutes' | 'sound'>) => {
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const prayersList: { key: keyof Omit<ReminderConfig, 'offsetMinutes' | 'sound'>; name: string; time: string }[] = [
    { key: 'subuh', name: 'Subuh (Fajr)', time: '04:13 AST' },
    { key: 'syuruq', name: 'Syuruq (Terbit)', time: '05:32 AST' },
    { key: 'dzuhur', name: 'Dzuhur (Zuhr)', time: '11:29 AST' },
    { key: 'ashar', name: 'Ashar (Asr)', time: '14:50 AST' },
    { key: 'maghrib', name: 'Maghrib', time: '17:26 AST' },
    { key: 'isya', name: 'Isya (Isha)', time: '18:36 AST' }
  ];

  const handleTestSound = () => {
    setTestPlaying(true);
    playNotificationChime();

    // Also trigger notification test
    sendBrowserNotification('🕌 Uji Suara Pengingat Sholat Sutraloka', {
      body: 'Nada adzan dan peringatan waktu ibadah aktif dengan sempurna.'
    });

    setTimeout(() => {
      setTestPlaying(false);
    }, 1500);
  };

  const handleSaveAndClose = () => {
    setSaveSuccess(true);
    const activeCount = Object.entries(config).filter(([k, v]) => k !== 'offsetMinutes' && k !== 'sound' && v === true).length;
    const msg = `Pengingat sholat aktif (${activeCount} waktu, ${config.offsetMinutes === 0 ? 'Tepat Waktu' : `${config.offsetMinutes} Menit Sebelum`})`;
    
    sendBrowserNotification('🕌 Pengingat Sholat Disimpan', {
      body: msg
    });

    if (onSave) {
      onSave(msg);
    }
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-white dark:bg-[#1E1148] p-5 max-h-[90vh] overflow-y-auto no-scrollbar space-y-4 shadow-2xl border border-slate-200/80 dark:border-[#A577FF]/20 transition-colors">
        {/* Grab Handle */}
        <div className="w-10 h-1 bg-slate-200 dark:bg-[#150A35] rounded-full mx-auto sm:hidden" />

        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#A577FF]/15 dark:bg-[#150A35] flex items-center justify-center text-[#A577FF]">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#150A35] dark:text-white font-heading">
                Pengingat Waktu Sholat
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Notifikasi adzan & alarm waktu ibadah tanah suci
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#150A35] hover:bg-slate-200 dark:hover:bg-[#1E1148] flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Push Notification Integration Card */}
        <PushNotificationCard compact={false} />

        {/* Info Card */}
        <div className="p-3 rounded-2xl bg-[#A577FF]/10 dark:bg-[#150A35] border border-[#A577FF]/20 text-xs text-[#150A35] dark:text-slate-200 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#A577FF] shrink-0" />
          <span>Pengingat disinkronkan otomatis dengan zona waktu Makkah (AST).</span>
        </div>

        {/* 6 Prayers Toggle Rows */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 block mb-1">
            Waktu Sholat yang Diingatkan
          </label>
          {prayersList.map((prayer) => {
            const isEnabled = config[prayer.key];
            return (
              <div
                key={prayer.key}
                onClick={() => togglePrayer(prayer.key)}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                  isEnabled
                    ? 'bg-[#A577FF]/10 dark:bg-[#150A35] border-[#A577FF]/30 text-[#150A35] dark:text-white'
                    : 'bg-white dark:bg-[#1E1148] border-slate-200/60 dark:border-[#A577FF]/20 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                      isEnabled
                        ? 'bg-[#A577FF] text-white shadow-sm shadow-[#A577FF]/25'
                        : 'bg-slate-100 dark:bg-[#150A35] text-slate-400'
                    }`}
                  >
                    <Bell className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block">{prayer.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{prayer.time}</span>
                  </div>
                </div>

                {/* Switch indicator */}
                <div
                  className={`w-10 h-5 rounded-full transition-colors p-0.5 flex items-center ${
                    isEnabled ? 'bg-[#A577FF] justify-end' : 'bg-slate-200 dark:bg-[#150A35] justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Advance Offset Selector */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
            Waktu Peringatan Awal
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: 0, label: 'Tepat Waktu' },
              { val: 10, label: '10 Mnt Sebelum' },
              { val: 15, label: '15 Mnt Sebelum' }
            ].map((offset) => (
              <button
                key={offset.val}
                type="button"
                onClick={() => setConfig((prev) => ({ ...prev, offsetMinutes: offset.val }))}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all border ${
                  config.offsetMinutes === offset.val
                    ? 'bg-[#A577FF] text-white border-[#A577FF] shadow-sm'
                    : 'bg-[#F5F7FC] dark:bg-[#150A35] border-slate-200/80 dark:border-[#A577FF]/20 text-[#150A35] dark:text-slate-300 hover:border-[#A577FF]/30'
                }`}
              >
                {offset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Audio / Tone Selection */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
              Nada & Suara Pengingat
            </label>
            <button
              onClick={handleTestSound}
              className="text-[11px] font-bold text-[#A577FF] hover:opacity-80 flex items-center gap-1"
            >
              <Volume2 className="w-3 h-3" />
              <span>{testPlaying ? 'Memutar...' : 'Uji Suara'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'adhan_makkah', label: 'Adzan Makkah' },
              { id: 'adhan_madinah', label: 'Adzan Madinah' },
              { id: 'gentle_beep', label: 'Nada Lembut' },
              { id: 'silent', label: 'Senyap (Getar Saja)' }
            ].map((snd) => (
              <button
                key={snd.id}
                type="button"
                onClick={() => setConfig((prev) => ({ ...prev, sound: snd.id as ReminderConfig['sound'] }))}
                className={`py-2 px-3 rounded-xl text-xs font-semibold text-left transition-all border flex items-center justify-between ${
                  config.sound === snd.id
                    ? 'bg-[#A577FF]/15 dark:bg-[#150A35] border-[#A577FF] text-[#150A35] dark:text-white font-bold'
                    : 'bg-white dark:bg-[#1E1148] border-slate-200/80 dark:border-[#A577FF]/20 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>{snd.label}</span>
                {config.sound === snd.id && <Check className="w-3.5 h-3.5 text-[#A577FF]" />}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Save Button */}
        <div className="pt-2">
          <button
            onClick={handleSaveAndClose}
            className="w-full py-3.5 rounded-2xl bg-[#A577FF] hover:opacity-90 text-white font-bold text-sm shadow-wasl-purple flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{saveSuccess ? 'Tersimpan!' : 'Simpan Pengaturan Pengingat'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
