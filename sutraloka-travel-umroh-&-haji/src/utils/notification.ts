// Utility for Browser Push Notifications and Audio Chimes

export type NotificationStatus = 'granted' | 'denied' | 'default' | 'unsupported';

export const isPushSupported = (): boolean => {
  return typeof window !== 'undefined' && 'Notification' in window;
};

export const getPushPermissionState = (): NotificationStatus => {
  if (!isPushSupported()) return 'unsupported';
  return Notification.permission as NotificationStatus;
};

export const isPushEnabledInStorage = (): boolean => {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem('sutraloka_push_enabled');
  return stored === 'true';
};

export const setPushEnabledInStorage = (enabled: boolean): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('sutraloka_push_enabled', enabled ? 'true' : 'false');
};

// Play a pleasant gentle Islamic chime / alert sound via Web Audio API
export const playNotificationChime = (): void => {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 triad
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + idx * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.5);
    });
  } catch (err) {
    console.warn('Audio chime playback failed:', err);
  }
};

// Request push notification permission
export const requestPushPermission = async (): Promise<{
  granted: boolean;
  status: NotificationStatus;
  message: string;
}> => {
  if (!isPushSupported()) {
    return {
      granted: false,
      status: 'unsupported',
      message: 'Browser Anda belum mendukung web push notification.'
    };
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setPushEnabledInStorage(true);
      playNotificationChime();
      return {
        granted: true,
        status: 'granted',
        message: 'Izin notifikasi berhasil diaktifkan!'
      };
    } else if (permission === 'denied') {
      setPushEnabledInStorage(false);
      return {
        granted: false,
        status: 'denied',
        message: 'Izin notifikasi ditolak oleh pengaturan browser.'
      };
    } else {
      return {
        granted: false,
        status: 'default',
        message: 'Izin notifikasi belum diberikan.'
      };
    }
  } catch (err) {
    return {
      granted: false,
      status: 'denied',
      message: 'Gagal meminta izin notifikasi: ' + (err instanceof Error ? err.message : String(err))
    };
  }
};

// Send browser push notification with graceful fallback
export const sendBrowserNotification = (
  title: string,
  options?: {
    body?: string;
    icon?: string;
    badge?: string;
    tag?: string;
  }
): boolean => {
  // Always trigger subtle audio chime
  playNotificationChime();

  if (!isPushSupported()) {
    return false;
  }

  if (Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body: options?.body || 'Pemberitahuan dari Aplikasi Sutraloka Umroh',
        icon: options?.icon || 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=128&auto=format&fit=crop&q=80',
        tag: options?.tag || 'sutraloka-push'
      });
      return true;
    } catch (e) {
      console.warn('Could not trigger native browser Notification:', e);
      return false;
    }
  }

  return false;
};

// Specific helper: Prayer Time Notification
export const notifyPrayerTime = (
  prayerName: string,
  timeString: string,
  cityName: string = 'Makkah'
): boolean => {
  return sendBrowserNotification(`🕌 Waktu Sholat ${prayerName} Telah Tiba!`, {
    body: `Saatnya menunaikan sholat ${prayerName} untuk wilayah ${cityName} (${timeString}). Mari raih pahala berlimpah di tanah suci.`,
    tag: `prayer-${prayerName.toLowerCase()}`
  });
};

// Specific helper: Dhikr Target Complete Notification
export const notifyDhikrMilestone = (
  dhikrTitle: string,
  targetCount: number
): boolean => {
  return sendBrowserNotification(`Target Dzikir Selesai! Alhamdulillah`, {
    body: `Masya Allah, Anda telah menyelesaikan ${targetCount}x dzikir ${dhikrTitle}. Semoga menjadi amal jariyah dan penenang hati.`,
    tag: `dhikr-${Date.now()}`
  });
};

// Specific helper: All Prayers Checked Notification
export const notifyPrayerGoalCompleted = (): boolean => {
  return sendBrowserNotification(`Target Sholat 5 Waktu Tuntas!`, {
    body: `Alhamdulillah, seluruh sholat fardhu hari ini telah tertunaikan. Semoga istiqomah dalam ibadah.`,
    tag: `prayer-goal-complete`
  });
};
