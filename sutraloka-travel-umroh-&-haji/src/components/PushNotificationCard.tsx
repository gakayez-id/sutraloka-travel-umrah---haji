import React, { useState, useEffect } from 'react';
import { Bell, BellRing, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { 
  getPushPermissionState, 
  requestPushPermission, 
  sendBrowserNotification,
  isPushEnabledInStorage,
  setPushEnabledInStorage,
  NotificationStatus 
} from '../utils/notification';

interface PushNotificationCardProps {
  onShowToast?: (msg: string) => void;
  compact?: boolean;
}

export const PushNotificationCard: React.FC<PushNotificationCardProps> = ({ 
  onShowToast,
  compact = false 
}) => {
  const [permission, setPermission] = useState<NotificationStatus>('default');
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  useEffect(() => {
    const currentPerm = getPushPermissionState();
    setPermission(currentPerm);
    setIsEnabled(currentPerm === 'granted' && isPushEnabledInStorage());
  }, []);

  const handleToggle = async () => {
    if (permission === 'granted') {
      const nextState = !isEnabled;
      setIsEnabled(nextState);
      setPushEnabledInStorage(nextState);
      if (nextState) {
        onShowToast?.('Notifikasi browser diaktifkan');
        sendBrowserNotification('🕌 Sutraloka Push Notification Aktif', {
          body: 'Notifikasi pengingat sholat dan target ibadah Anda kini telah aktif.'
        });
      } else {
        onShowToast?.('Notifikasi browser dinonaktifkan');
      }
      return;
    }

    // Need to request permission
    setIsRequesting(true);
    const result = await requestPushPermission();
    setIsRequesting(false);
    setPermission(result.status);

    if (result.granted) {
      setIsEnabled(true);
      onShowToast?.(result.message);
      sendBrowserNotification('🕌 Selamat Datang di Sutraloka', {
        body: 'Notifikasi waktu adzan dan panduan manasik kini siap mendampingi ibadah Anda.'
      });
    } else {
      setIsEnabled(false);
      onShowToast?.(result.message);
    }
  };

  const handleSendTestNotification = () => {
    if (permission !== 'granted') {
      handleToggle();
      return;
    }
    const success = sendBrowserNotification('🕌 Uji Coba Notifikasi Sholat Sutraloka', {
      body: 'Waktu Ashar Makkah (14:50 AST) telah tiba. Hayya \'alash-shalaah! Semoga ibadah Anda mabrur.'
    });
    if (success) {
      onShowToast?.('Uji coba notifikasi berhasil dikirim!');
    } else {
      onShowToast?.('Notifikasi dikirim melalui audio chime.');
    }
  };

  if (compact) {
    return (
      <div className="p-3 rounded-2xl bg-[#A577FF]/10 dark:bg-[#150A35] border border-[#A577FF]/20 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#A577FF]/15 dark:bg-[#150A35] flex items-center justify-center text-[#A577FF]">
            <BellRing className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#150A35] dark:text-white">Push Notification</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                isEnabled 
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' 
                  : 'bg-slate-200 dark:bg-[#150A35] text-slate-600 dark:text-slate-400'
              }`}>
                {isEnabled ? 'Aktif' : 'Nonaktif'}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Pengingat adzan & dzikir</span>
          </div>
        </div>

        <button
          onClick={handleToggle}
          disabled={isRequesting}
          className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
            isEnabled
              ? 'bg-[#A577FF] text-white shadow-sm'
              : 'bg-white dark:bg-[#1E1148] text-[#A577FF] border border-[#A577FF]/30'
          }`}
        >
          {isEnabled ? 'Aktif' : 'Nyalakan'}
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-3xl bg-white dark:bg-[#1E1148] border border-slate-200/80 dark:border-[#A577FF]/20 shadow-sm space-y-3 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
            isEnabled 
              ? 'bg-[#A577FF]/15 dark:bg-[#150A35] text-[#A577FF]' 
              : 'bg-slate-100 dark:bg-[#150A35] text-slate-500 dark:text-slate-400'
          }`}>
            <BellRing className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-extrabold text-[#150A35] dark:text-white font-heading">
                Browser Push Notifications
              </h4>
              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                isEnabled 
                  ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                  : permission === 'denied'
                  ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                  : 'bg-slate-100 dark:bg-[#150A35] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#A577FF]/20'
              }`}>
                {isEnabled ? 'Aktif' : permission === 'denied' ? 'Ditolak' : 'Belum Aktif'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Pengingat adzan Makkah & target istiqomah langsung ke layar
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={handleToggle}
          disabled={isRequesting}
          className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center shrink-0 ${
            isEnabled ? 'bg-[#A577FF] justify-end' : 'bg-slate-300 dark:bg-[#150A35] justify-start'
          }`}
          title="Toggle Notifikasi"
          aria-label="Toggle Push Notification"
        >
          <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform" />
        </button>
      </div>

      {permission === 'denied' && (
        <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-center gap-2 text-[11px] text-amber-800 dark:text-amber-200">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Izin notifikasi diblokir browser. Buka setelan browser untuk mengaktifkan kembali.</span>
        </div>
      )}

      {/* Action Buttons: Test Notification */}
      <div className="pt-1 flex items-center justify-between gap-2">
        <span className="text-[10px] text-slate-400 dark:text-slate-400 font-medium">
          Dukungan: Chrome, Safari, Edge, Firefox
        </span>

        <button
          onClick={handleSendTestNotification}
          className="px-3 py-1.5 rounded-xl bg-[#A577FF]/10 dark:bg-[#150A35] hover:bg-[#A577FF]/20 text-[#A577FF] border border-[#A577FF]/20 text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95"
        >
          <Send className="w-3 h-3" />
          <span>Uji Notifikasi</span>
        </button>
      </div>
    </div>
  );
};
