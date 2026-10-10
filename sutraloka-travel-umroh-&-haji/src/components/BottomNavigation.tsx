import React from 'react';
import { Home, Calendar, QrCode, Compass, User } from 'lucide-react';

export type NavTab = 'home' | 'jadwal' | 'paket' | 'tiket' | 'profil';

interface BottomNavigationProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  onOpenAssistant?: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onChangeTab
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <nav
        aria-label="Navigasi Sutraloka"
        className="pointer-events-auto w-full max-w-md h-[72px] bg-white/95 backdrop-blur-xl border-t border-slate-200/80 px-4 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
      >
        {/* Tab 1: Beranda */}
        <button
          onClick={() => {
            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
            onChangeTab('home');
          }}
          className={`flex-1 flex flex-col items-center justify-center transition-all active:scale-95 ${
            activeTab === 'home' ? 'text-[#FF7A3D]' : 'text-slate-400 hover:text-slate-600'
          }`}
          aria-label="Beranda"
        >
          <div className={`p-1 rounded-xl transition-colors ${activeTab === 'home' ? 'bg-[#FF7A3D]/15 text-[#FF7A3D]' : ''}`}>
            <Home className="w-6 h-6 stroke-[1.8]" />
          </div>
          <span className={`text-[11px] font-bold text-center mt-0.5 ${activeTab === 'home' ? 'text-[#FF7A3D]' : 'text-slate-500'}`}>
            Beranda
          </span>
        </button>

        {/* Tab 2: Jadwal */}
        <button
          onClick={() => {
            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
            onChangeTab('jadwal');
          }}
          className={`flex-1 flex flex-col items-center justify-center transition-all active:scale-95 ${
            activeTab === 'jadwal' ? 'text-[#FF7A3D]' : 'text-slate-400 hover:text-slate-600'
          }`}
          aria-label="Jadwal"
        >
          <div className={`p-1 rounded-xl transition-colors ${activeTab === 'jadwal' ? 'bg-[#FF7A3D]/15 text-[#FF7A3D]' : ''}`}>
            <Calendar className="w-6 h-6 stroke-[1.8]" />
          </div>
          <span className={`text-[11px] font-bold text-center mt-0.5 ${activeTab === 'jadwal' ? 'text-[#FF7A3D]' : 'text-slate-500'}`}>
            Jadwal
          </span>
        </button>

        {/* Center Button: 48px Warm Orange & Gold Shadow */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <button
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(25);
              onChangeTab('tiket');
            }}
            className="relative -top-2 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-gradient-to-tr from-[#FF7A3D] to-[#FF935E] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(255,122,61,0.45)] hover:scale-105 active:scale-95 transition-transform border-2 border-white"
            aria-label="Scan QR Tiket"
          >
            <QrCode className="w-5 h-5 text-white stroke-[2.2]" />
            {activeTab === 'tiket' && (
              <span className="absolute -bottom-1 w-2 h-2 rounded-full bg-[#150A35] ring-2 ring-white" />
            )}
          </button>
        </div>

        {/* Tab 4: Paket */}
        <button
          onClick={() => {
            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
            onChangeTab('paket');
          }}
          className={`flex-1 flex flex-col items-center justify-center transition-all active:scale-95 ${
            activeTab === 'paket' ? 'text-[#FF7A3D]' : 'text-slate-400 hover:text-slate-600'
          }`}
          aria-label="Paket"
        >
          <div className={`p-1 rounded-xl transition-colors ${activeTab === 'paket' ? 'bg-[#FF7A3D]/15 text-[#FF7A3D]' : ''}`}>
            <Compass className="w-6 h-6 stroke-[1.8]" />
          </div>
          <span className={`text-[11px] font-bold text-center mt-0.5 ${activeTab === 'paket' ? 'text-[#FF7A3D]' : 'text-slate-500'}`}>
            Paket
          </span>
        </button>

        {/* Tab 5: Profil */}
        <button
          onClick={() => {
            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
            onChangeTab('profil');
          }}
          className={`flex-1 flex flex-col items-center justify-center transition-all active:scale-95 ${
            activeTab === 'profil' ? 'text-[#FF7A3D]' : 'text-slate-400 hover:text-slate-600'
          }`}
          aria-label="Profil"
        >
          <div className={`p-1 rounded-xl transition-colors ${activeTab === 'profil' ? 'bg-[#FF7A3D]/15 text-[#FF7A3D]' : ''}`}>
            <User className="w-6 h-6 stroke-[1.8]" />
          </div>
          <span className={`text-[11px] font-bold text-center mt-0.5 ${activeTab === 'profil' ? 'text-[#FF7A3D]' : 'text-slate-500'}`}>
            Profil
          </span>
        </button>
      </nav>
    </div>
  );
};
