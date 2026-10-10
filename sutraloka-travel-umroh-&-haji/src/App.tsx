import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  Headset, 
  Compass, 
  BookOpen, 
  Lock, 
  User, 
  KeyRound, 
  LogOut, 
  LogIn,
  ChevronDown,
  Eye,
  EyeOff,
  ChevronLeft,
  RotateCw,
  Navigation,
  ShieldCheck,
  Check,
  Plane,
  QrCode,
  ArrowRight
} from 'lucide-react';

import prophetMosqueBrightImg from './assets/images/prophet_mosque_medina_bright_1791562718181.jpg';
import { SutralokaBirdIcon } from './components/SutralokaBirdIcon';
import { SutralokaTextLogo } from './components/SutralokaTextLogo';
import { PrayerTimesWidget } from './components/PrayerTimesWidget';
import { DailyPrayerGoalsWidget } from './components/DailyPrayerGoalsWidget';
import { DigitalTasbihWidget } from './components/DigitalTasbihWidget';
import { DzikirHistoryChart } from './components/DzikirHistoryChart';
import { DigitalTasbihModal } from './components/DigitalTasbihModal';
import { PanduanManasikModal } from './components/PanduanManasikModal';
import { QuickServiceGrid } from './components/QuickServiceGrid';
import { PromoCarousel } from './components/PromoCarousel';
import { PaketUmrohSection } from './components/PaketUmrohSection';
import { TripChecklistSection } from './components/TripChecklistSection';
import { ArticleSection } from './components/ArticleSection';
import { DepartureScheduleView } from './components/DepartureScheduleView';
import { DigitalTicketView } from './components/DigitalTicketView';
import { PaketDetailModal } from './components/PaketDetailModal';
import { BottomNavigation, NavTab } from './components/BottomNavigation';
import { ProfileView } from './components/ProfileView';
import { EditAvatarModal } from './components/EditAvatarModal';
import { ArahKiblatModal } from './components/ArahKiblatModal';
import { CustomerServiceModal } from './components/CustomerServiceModal';
import { LoginModal } from './components/LoginModal';
import { LockedCardOverlay } from './components/LockedCardOverlay';
import { DoaHarianWidget } from './components/DoaHarianWidget';
import { HajjCountdownWidget } from './components/HajjCountdownWidget';
import { QuickStatsWidget } from './components/QuickStatsWidget';

import { PaketUmroh, JadwalKeberangkatanItem, SUTRALOKA_DATA } from './data/travelData';

export type AppRoute = '/login' | '/home' | '/kiblat' | '/jadwal' | '/paket' | '/tiket' | '/profil';

export default function App() {
  // ROUTE HANDLING: /login (IMMERSIVE WELCOME & GUEST) vs /home (LOGGED IN HASNA / BROWSE)
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname as AppRoute;
      if (['/login', '/home', '/kiblat', '/jadwal', '/paket', '/tiket', '/profil'].includes(path)) {
        return path;
      }
    }
    const savedLoggedIn = localStorage.getItem('sutraloka_logged_in');
    return savedLoggedIn === 'true' ? '/home' : '/login';
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('sutraloka_logged_in');
    return saved === 'true';
  });

  const [isGuestMode, setIsGuestMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('sutraloka_guest_mode');
    return saved === 'true';
  });

  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [showPassword, setShowPassword] = useState(false);
  const [guestUsername, setGuestUsername] = useState('hasna.sutraloka');
  const [guestPassword, setGuestPassword] = useState('Hasna2026!');

  const [selectedPaket, setSelectedPaket] = useState<PaketUmroh | null>(null);
  const [isTasbihModalOpen, setIsTasbihModalOpen] = useState<boolean>(false);
  const [isManasikModalOpen, setIsManasikModalOpen] = useState<boolean>(false);
  const [isKiblatOpen, setIsKiblatOpen] = useState<boolean>(false);
  const [isCSOpen, setIsCSOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [selectedDhikrId, setSelectedDhikrId] = useState<string>('subhanallah');
  
  const [userAvatar, setUserAvatar] = useState<string | null>(() => {
    return localStorage.getItem('sutraloka_user_avatar');
  });
  const [isEditAvatarOpen, setIsEditAvatarOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Compass calibration state for /kiblat
  const [isCalibratingKiblat, setIsCalibratingKiblat] = useState(false);

  const loginFormRef = useRef<HTMLDivElement>(null);

  // Sync route with window.history
  const navigate = (newRoute: AppRoute) => {
    setCurrentRoute(newRoute);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', newRoute);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as AppRoute;
      if (['/login', '/home', '/kiblat', '/jadwal', '/paket', '/tiket', '/profil'].includes(path)) {
        setCurrentRoute(path);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = (user?: string) => {
    setIsLoggedIn(true);
    setIsGuestMode(false);
    localStorage.setItem('sutraloka_logged_in', 'true');
    localStorage.setItem('sutraloka_guest_mode', 'false');
    navigate('/home');
    showToast(`Selamat datang, ${user || 'Hasna'}! Akses ibadah dan tiket aktif.`);
  };

  const handleExploreGuest = () => {
    setIsGuestMode(true);
    localStorage.setItem('sutraloka_guest_mode', 'true');
    navigate('/home');
    showToast('Menjelajah sebagai Tamu. Masuk jamaah kapan saja untuk fitur penuh.');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsGuestMode(false);
    localStorage.setItem('sutraloka_logged_in', 'false');
    localStorage.setItem('sutraloka_guest_mode', 'false');
    navigate('/login');
    showToast('Kembali ke Halaman Selamat Datang Sutraloka');
  };

  const handleSaveAvatar = (newAvatar: string | null) => {
    setUserAvatar(newAvatar);
    if (newAvatar) {
      localStorage.setItem('sutraloka_user_avatar', newAvatar);
      showToast('Foto profil berhasil diperbarui!');
    } else {
      localStorage.removeItem('sutraloka_user_avatar');
      showToast('Foto profil dikembalikan ke inisial');
    }
  };

  const handleSelectService = (serviceId: string) => {
    if (serviceId === 'tasbih') {
      setIsTasbihModalOpen(true);
    } else if (serviceId === 'manasik') {
      setIsManasikModalOpen(true);
    } else if (serviceId === 'checklist') {
      navigate('/home');
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById('sutraloka-checklist-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (serviceId === 'rawdah' || serviceId === 'tiket') {
      navigate('/tiket');
      setActiveTab('tiket');
    } else if (serviceId === 'hajj' || serviceId === 'umrah' || serviceId === 'all-in') {
      navigate('/paket');
      setActiveTab('paket');
    } else {
      navigate('/paket');
      setActiveTab('paket');
    }
  };

  const handleConfirmSchedule = (schedule: JadwalKeberangkatanItem) => {
    showToast(`Jadwal ${schedule.tanggal} berhasil dikonfirmasi!`);
    setTimeout(() => {
      navigate('/tiket');
      setActiveTab('tiket');
    }, 900);
  };

  const scrollToLoginForm = () => {
    setIsLoginModalOpen(true);
  };

  const handleCalibrateCompass = () => {
    setIsCalibratingKiblat(true);
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([40, 60, 40]);
    }
    setTimeout(() => {
      setIsCalibratingKiblat(false);
      showToast('Kompas berhasil dikalibrasi!');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FC] text-[#150A35] flex justify-center antialiased selection:bg-[#FF7A3D]/20 selection:text-[#150A35]">
      {/* Mobile Frame Container: Full-Bleed Top Viewport (No dev header!) */}
      <div className="w-full max-w-md min-h-screen bg-[#FFF9F5] text-[#150A35] flex flex-col relative shadow-2xl shadow-[#150A35]/10">
        
        {/* =========================================================================
            ROUTE 1 - /login: IMMERSIVE FULL-SCREEN HERO LANDING SECTION
            Using bright Prophet's Mosque (Masjid Nabawi) Medina background
           ========================================================================= */}
        {currentRoute === '/login' && (
          <div className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-black select-none font-sans">
            {/* Full-bleed high-res bright Prophet's Mosque in Medina photo */}
            <img
              src={prophetMosqueBrightImg}
              alt="Masjid Nabawi Madinah Suasana Terang"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.03]"
            />

            {/* Premium Soft Multi-layer Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none h-36" />

            {/* Header & Logo: Unboxed / transparent logo, center-aligned, with floating motion on bird, NO "Akun Hasna" button */}
            <header className="relative z-20 pt-8 px-6 flex items-center justify-center">
              <div className="flex items-center gap-2.5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
                <SutralokaBirdIcon size={38} animated={true} />
                <SutralokaTextLogo size="md" showSubtitle={true} subtitleColor="text-white/90" className="drop-shadow-md" />
              </div>
            </header>

            {/* Bottom Content Area: Typography & Action Buttons */}
            <div className="relative z-20 px-6 pb-10 pt-16 flex flex-col items-center text-center font-sans">
              {/* Note: "IBADAH TENANG, FASILITAS BINTANG 5" badge/button removed per instruction */}

              {/* Headline */}
              <h1 className="text-[28px] sm:text-[32px] font-extrabold text-white leading-tight drop-shadow-lg max-w-xs mb-2.5 font-sans tracking-tight">
                Paket Umroh & Haji Pilihan Terbaik
              </h1>

              {/* Sub-headline */}
              <p className="text-[13px] text-white/95 font-medium leading-relaxed max-w-xs drop-shadow-md mb-6 font-sans">
                Berakhir di Madinah • Hotel Bintang 5 • Penerbangan Langsung
              </p>

              {/* Dual Action Buttons Layout */}
              <div className="w-full space-y-3 max-w-sm">
                {/* Primary Button: Fully rounded pill shape (rounded-full), soft violet color, NO arrow icon */}
                <button
                  type="button"
                  onClick={handleExploreGuest}
                  className="w-full h-[52px] rounded-full bg-[#A577FF] hover:bg-[#9664FF] active:scale-[0.98] text-white text-base font-bold shadow-xl shadow-[#A577FF]/40 transition-all flex items-center justify-center border border-white/20 font-sans cursor-pointer"
                >
                  <span>Jelajahi Sekarang</span>
                </button>

                {/* Secondary Button: Fully rounded (rounded-full), text "Login" (no lock icon, no "Jamaah") */}
                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="w-full h-[50px] rounded-full bg-white/15 hover:bg-white/25 active:scale-[0.98] text-white text-base font-bold backdrop-blur-md border border-white/30 transition-all flex items-center justify-center shadow-lg font-sans cursor-pointer"
                >
                  <span>Login</span>
                </button>
              </div>

              {/* Footer Text */}
              <p className="text-[11px] text-white/75 font-medium mt-4 text-center px-2 leading-relaxed drop-shadow-sm font-sans">
                SK DEPAG NO 127 Tahun 2020 • Anggota afiliasi AMPHURI (Asosiasi Muslim Penyelenggara Haji dan Umrah Republik Indonesia)
              </p>
            </div>
          </div>
        )}

        {/* =========================================================================
            ROUTE 2 - /home: LOGGED IN (HASNA) / GUEST BROWSE DASHBOARD
           ========================================================================= */}
        {currentRoute === '/home' && (
          <div className="space-y-4 pb-28 animate-in fade-in duration-300">
            
            {/* TOP BAR: Thin white semi-blur scrollable (NOT STICKY!) */}
            <header className="px-4 pt-4 pb-2 bg-white/70 backdrop-blur-md">
              <div className="flex items-center justify-between">
                {/* Left Logo */}
                <div 
                  onClick={() => navigate('/home')}
                  className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform"
                >
                  <SutralokaBirdIcon size={34} animated={true} />
                  <SutralokaTextLogo size="md" showSubtitle={true} />
                </div>

                {/* Right utility icons: compass outline, bell with yellow dot, CS headset circle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/kiblat')}
                    className="w-9 h-9 rounded-full bg-white border border-[#A577FF]/40 text-[#633BB3] hover:bg-[#A577FF]/10 flex items-center justify-center transition-colors shadow-2xs"
                    title="Arah Kiblat"
                    aria-label="Arah Kiblat"
                  >
                    <Compass className="w-4 h-4 stroke-[1.8]" />
                  </button>

                  <button
                    onClick={() => showToast('Semua notifikasi pengingat ibadah aktif')}
                    className="relative w-9 h-9 rounded-full bg-white border border-gray-200 text-[#150A35] hover:bg-gray-50 flex items-center justify-center transition-colors shadow-2xs"
                    title="Notifikasi"
                    aria-label="Notifikasi"
                  >
                    <Bell className="w-4 h-4 stroke-[1.8]" />
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-white animate-pulse" />
                  </button>

                  <button
                    onClick={() => setIsCSOpen(true)}
                    className="w-10 h-10 rounded-full bg-[#150A35] text-white hover:bg-[#251259] flex items-center justify-center shadow-md transition-colors"
                    title="Bantuan Jamaah"
                    aria-label="Bantuan Jamaah"
                  >
                    <Headset className="w-4 h-4 text-[#FF7A3D]" />
                  </button>
                </div>
              </div>

              {/* GREETING ROW */}
              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-100">
                <div 
                  onClick={() => {
                    if (isLoggedIn) setIsEditAvatarOpen(true);
                    else setIsLoginModalOpen(true);
                  }}
                  className="flex items-center gap-2.5 text-left cursor-pointer group"
                >
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full ring-2 ring-[#A577FF] ring-offset-2 overflow-hidden bg-gradient-to-br from-[#FF7A3D]/20 to-[#A577FF]/20 flex items-center justify-center text-[#150A35] font-extrabold text-sm shadow-xs group-hover:scale-105 transition-transform">
                      {userAvatar ? (
                        <img src={userAvatar} alt="Foto Jamaah" className="w-full h-full object-cover" />
                      ) : (
                        <span>{isLoggedIn ? 'HN' : 'TM'}</span>
                      )}
                    </div>
                    {isLoggedIn && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    )}
                  </div>

                  <div>
                    <h2 className="text-[15px] font-extrabold text-[#150A35] leading-tight flex items-center gap-1">
                      {isLoggedIn ? 'Selamat pagi, Hasna 👋' : 'Selamat Datang, Jamaah 👋'}
                    </h2>
                    <p className="text-[11px] text-gray-500 font-medium">
                      {isLoggedIn ? '0812345678 • 450 Sutra Points' : 'Mode Tamu • Akses Katalog & Jadwal'}
                    </p>
                  </div>
                </div>

                {/* Badges / Actions */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsManasikModalOpen(true)}
                    className="min-h-[30px] px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 text-[11px] font-bold hover:bg-amber-100 transition-colors flex items-center gap-1 shadow-xs"
                    title="Panduan Manasik"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                    <span>Manasik</span>
                  </button>

                  {isLoggedIn ? (
                    <>
                      <button
                        onClick={() => {
                          navigate('/profil');
                          setActiveTab('profil');
                        }}
                        className="min-h-[30px] px-2.5 py-1 rounded-full bg-[#FF7A3D]/15 text-[#D44E10] border border-[#FF7A3D]/40 text-[11px] font-black hover:bg-[#FF7A3D]/25 transition-colors"
                      >
                        VIP Gold
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-7 h-7 rounded-full bg-gray-100 hover:bg-rose-50 text-gray-500 hover:text-rose-600 flex items-center justify-center transition-colors ml-0.5"
                        title="Keluar Akun"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="min-h-[30px] px-3 py-1 rounded-full bg-[#150A35] text-white text-[11px] font-bold hover:bg-[#251259] transition-all flex items-center gap-1 shadow-sm"
                    >
                      <LogIn className="w-3 h-3 text-[#FF7A3D]" />
                      <span>Masuk</span>
                    </button>
                  )}
                </div>
              </div>
            </header>

            {/* MAIN DASHBOARD CONTENT (BENTO GRID 2.0) */}
            <main className="px-4 space-y-4">
              
              {/* CARD FAJR • MEKKAH (Real Kaaba night blur WebP max 150KB + gradient plum 70%) */}
              <PrayerTimesWidget 
                onShowToast={showToast} 
                onOpenKiblat={() => navigate('/kiblat')}
              />

              {/* QUICK STATS WIDGET (Bento Micro-Typography) */}
              <QuickStatsWidget 
                points={isLoggedIn ? 450 : 0} 
                departureDate={isLoggedIn ? '15 Nov 2026' : 'Pilih Jadwal'}
                permitStatus={isLoggedIn ? 'Disetujui' : 'Perlu Login'}
                onNavigateTab={(tab) => {
                  if (tab === 'jadwal') navigate('/jadwal');
                  else if (tab === 'profile') navigate('/profil');
                }}
              />

              {/* NEW WIDGET A: DOA HARIAN IBADAH (Tawaf, Sa'i, dsb with audio chime & Arabic script) */}
              <DoaHarianWidget />

              {/* NEW WIDGET B: HAJJ & UMRAH COUNTDOWN & PREPARATION CHECKLIST */}
              <HajjCountdownWidget />

              {/* CARD SHOLAT ISYA & TAHAJJUD */}
              <DailyPrayerGoalsWidget />

              {/* CARD RIWAYAT DZIKIR 7 HARI */}
              <DzikirHistoryChart 
                onOpenTasbihModal={() => setIsTasbihModalOpen(true)} 
                isGuest={!isLoggedIn}
                onLockedClick={() => setIsLoginModalOpen(true)}
              />

              {/* SECTION LAYANAN PILIHAN JAMAAH */}
              <QuickServiceGrid 
                onSelectService={handleSelectService}
              />

              {/* PENAWARAN SPESIAL PROMO CAROUSEL */}
              <PromoCarousel 
                onOpenPromo={(title) => showToast(`Membuka promo: ${title}`)} 
                onSelectPromo={(promo) => {
                  showToast(`Klaim Promo "${promo.title}" berhasil diaktifkan!`);
                }}
              />

              {/* TASBIH & DZIKIR HARIAN */}
              <DigitalTasbihWidget
                onOpenFullTasbih={(dhikrId) => {
                  if (dhikrId) setSelectedDhikrId(dhikrId);
                  setIsTasbihModalOpen(true);
                }}
                isGuest={!isLoggedIn}
                onLockedClick={() => setIsLoginModalOpen(true)}
              />

              {/* KATALOG 13 PAKET UMROH & HAJI */}
              <PaketUmrohSection onSelectPaket={(pkg) => setSelectedPaket(pkg)} />

              {/* TRIP CHECKLIST SECTION */}
              <div id="sutraloka-checklist-section">
                <TripChecklistSection />
              </div>

              {/* BERITA & EDUKASI UMROH */}
              <ArticleSection />
            </main>
          </div>
        )}

        {/* =========================================================================
            ROUTE 3 - /kiblat (PAGE ARAH KIBLAT)
           ========================================================================= */}
        {currentRoute === '/kiblat' && (
          <div className="p-4 space-y-4 pb-28 animate-in fade-in duration-300 text-left">
            {/* Top Navigation */}
            <div className="flex items-center justify-between pb-2">
              <button
                onClick={() => navigate('/home')}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#150A35] hover:bg-slate-50 shadow-xs transition-colors"
                aria-label="Kembali"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="text-center">
                <h2 className="text-base font-extrabold text-[#150A35] font-heading">
                  Arah Kiblat
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  Penunjuk Presisi Baitullah Ka'bah
                </span>
              </div>

              <div className="w-10" />
            </div>

            {/* Compass 240px Card with faint Haram photo */}
            <div className="relative overflow-hidden rounded-[24px] bg-white border border-gray-100 p-6 shadow-sm flex flex-col items-center text-center">
              {/* Faint Masjidil Haram photo background */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-[0.08] pointer-events-none rounded-[24px]"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80')`
                }}
              />

              {/* Heading */}
              <div className="relative z-10 mb-4">
                <span className="text-[11px] font-bold text-[#FF7A3D] uppercase tracking-wider block">
                  Kompas Kiblat Terintegrasi
                </span>
                <p className="text-xl font-black text-[#150A35] mt-0.5 font-heading">
                  294° Barat Laut
                </p>
                <span className="text-xs text-slate-500">
                  Arah Kiblat dari Lokasi Anda (Surabaya, ID)
                </span>
              </div>

              {/* Interactive Compass Dial */}
              <div className="relative w-60 h-60 my-3 flex items-center justify-center">
                <div 
                  className={`relative w-full h-full rounded-full border-4 border-slate-100 bg-[#FFF9F5] shadow-inner flex items-center justify-center transition-transform duration-700 ease-out ${
                    isCalibratingKiblat ? 'rotate-[360deg]' : ''
                  }`}
                >
                  {/* Compass markings */}
                  <div className="absolute top-2 font-black text-xs text-rose-600">U</div>
                  <div className="absolute bottom-2 font-bold text-xs text-slate-400">S</div>
                  <div className="absolute left-2 font-bold text-xs text-slate-400">B</div>
                  <div className="absolute right-2 font-bold text-xs text-slate-400">T</div>

                  {/* Gold Needle pointing Kaaba */}
                  <div className="relative w-4 h-48 flex flex-col items-center justify-center pointer-events-none transform -rotate-[66deg] transition-transform duration-500">
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[90px] border-b-[#FF7A3D] drop-shadow-md" />
                    <div className="w-5 h-5 rounded-full bg-[#150A35] border-2 border-white my-[-10px] z-10 shadow-sm" />
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[70px] border-t-slate-300" />
                  </div>

                  {/* Kaaba Center Marker */}
                  <div className="absolute w-8 h-8 rounded-lg bg-[#150A35] border-2 border-[#FF7A3D] flex items-center justify-center text-white text-[9px] font-black shadow-md z-20">
                    🕋
                  </div>
                </div>
              </div>

              {/* Distance and Location details */}
              <div className="relative z-10 grid grid-cols-2 gap-3 w-full mt-3 text-left">
                <div className="p-3 rounded-2xl bg-[#FFF9F5] border border-orange-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Jarak ke Ka'bah</span>
                  <span className="text-sm font-extrabold text-[#150A35]">8.320 km</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#FFF9F5] border border-orange-100">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Deklinasi Magnetik</span>
                  <span className="text-sm font-extrabold text-[#150A35]">+0.8° Presisi</span>
                </div>
              </div>

              {/* Calibration Button */}
              <button
                type="button"
                onClick={handleCalibrateCompass}
                disabled={isCalibratingKiblat}
                className="relative z-10 mt-5 w-full py-3 px-4 rounded-2xl border-2 border-[#A577FF] bg-white hover:bg-[#A577FF]/10 text-[#150A35] font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-60"
              >
                <RotateCw className={`w-4 h-4 text-[#A577FF] ${isCalibratingKiblat ? 'animate-spin' : ''}`} />
                <span>{isCalibratingKiblat ? 'Mengkalibrasi Sensor...' : 'Kalibrasi Kompas'}</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            ROUTE 4, 5, 6, 7 - OTHER APP VIEWS
           ========================================================================= */}
        {currentRoute === '/jadwal' && (
          <div className="p-4 pb-28 animate-in fade-in duration-300">
            <DepartureScheduleView
              onBack={() => navigate('/home')}
              onConfirmSchedule={handleConfirmSchedule}
            />
          </div>
        )}

        {currentRoute === '/paket' && (
          <div className="p-4 pb-28 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-3 text-left">
              <div>
                <h2 className="text-lg font-black text-[#150A35] font-heading">
                  Katalog Paket Sutraloka
                </h2>
                <p className="text-xs text-slate-500">
                  13 Pilihan Paket Umroh & Haji Khusus Resmi Kemenag
                </p>
              </div>
            </div>
            <PaketUmrohSection onSelectPaket={(pkg) => setSelectedPaket(pkg)} />
          </div>
        )}

        {currentRoute === '/tiket' && (
          <div className="p-4 pb-28 animate-in fade-in duration-300">
            <DigitalTicketView
              onBack={() => navigate('/home')}
              isGuest={!isLoggedIn}
              onLockedClick={() => setIsLoginModalOpen(true)}
            />
          </div>
        )}

        {currentRoute === '/profil' && (
          <div className="p-4 pb-28 animate-in fade-in duration-300">
            <ProfileView
              userAvatar={userAvatar}
              onOpenEditAvatar={() => setIsEditAvatarOpen(true)}
              onOpenTasbihModal={() => setIsTasbihModalOpen(true)}
              onOpenManasikModal={() => setIsManasikModalOpen(true)}
              onShowToast={showToast}
              isLoggedIn={isLoggedIn}
              onToggleAuth={() => {
                if (isLoggedIn) handleLogout();
                else setIsLoginModalOpen(true);
              }}
            />
          </div>
        )}

        {/* =========================================================================
            CONDITIONAL BOTTOM NAVIGATION:
            Only rendered on application views (/home, /jadwal, /paket, /tiket, /profil).
            HIDDEN completely on /login welcome screen for true immersive edge-to-edge layout!
           ========================================================================= */}
        {currentRoute !== '/login' && (
          <BottomNavigation
            activeTab={
              currentRoute === '/home' ? 'home' :
              currentRoute === '/jadwal' ? 'jadwal' :
              currentRoute === '/paket' ? 'paket' :
              currentRoute === '/tiket' ? 'tiket' :
              currentRoute === '/profil' ? 'profil' : 'home'
            }
            onChangeTab={(tab) => {
              if (tab === 'home') navigate('/home');
              else if (tab === 'jadwal') navigate('/jadwal');
              else if (tab === 'paket') navigate('/paket');
              else if (tab === 'tiket') navigate('/tiket');
              else if (tab === 'profil') navigate('/profil');
            }}
          />
        )}

        {/* GLOBAL MODALS */}
        <ArahKiblatModal
          isOpen={isKiblatOpen}
          onClose={() => setIsKiblatOpen(false)}
          onShowToast={showToast}
        />

        <CustomerServiceModal
          isOpen={isCSOpen}
          onClose={() => setIsCSOpen(false)}
          onShowToast={showToast}
        />

        {/* Interactive Bottom Sheet Login Modal */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={(u) => handleLogin(u)}
        />

        <PaketDetailModal
          paket={selectedPaket}
          onClose={() => setSelectedPaket(null)}
          onBookSchedule={(pkg) => {
            setSelectedPaket(null);
            navigate('/jadwal');
          }}
        />

        <DigitalTasbihModal
          isOpen={isTasbihModalOpen}
          onClose={() => setIsTasbihModalOpen(false)}
          initialDhikrId={selectedDhikrId}
        />

        <PanduanManasikModal
          isOpen={isManasikModalOpen}
          onClose={() => setIsManasikModalOpen(false)}
          onShowToast={showToast}
        />

        <EditAvatarModal
          isOpen={isEditAvatarOpen}
          onClose={() => setIsEditAvatarOpen(false)}
          currentAvatar={userAvatar}
          onSaveAvatar={handleSaveAvatar}
        />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-[#150A35] text-white text-xs font-semibold shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 whitespace-nowrap border border-[#FF7A3D]/40">
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
}
