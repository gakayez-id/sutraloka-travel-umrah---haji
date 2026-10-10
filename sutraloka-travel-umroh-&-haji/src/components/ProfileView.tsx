import React from 'react';
import { 
  User, 
  ShieldCheck, 
  Award, 
  MapPin, 
  FileText, 
  ChevronRight, 
  Phone, 
  Camera, 
  BarChart3,
  BookOpen,
  LogOut,
  LogIn
} from 'lucide-react';
import { SutralokaHeaderBrand } from './SutralokaHeaderBrand';
import { DzikirHistoryChart } from './DzikirHistoryChart';
import { PushNotificationCard } from './PushNotificationCard';

interface ProfileViewProps {
  userAvatar: string | null;
  onOpenEditAvatar: () => void;
  onOpenTasbihModal: () => void;
  onOpenManasikModal?: () => void;
  onShowToast?: (msg: string) => void;
  isLoggedIn?: boolean;
  onToggleAuth?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userAvatar,
  onOpenEditAvatar,
  onOpenTasbihModal,
  onOpenManasikModal,
  onShowToast,
  isLoggedIn = true,
  onToggleAuth
}) => {
  return (
    <div className="space-y-4">
      {/* Top Profile Card in Bento style with Real Photo Accent */}
      <div className="p-5 rounded-[24px] bg-white border border-amber-100 shadow-sm transition-colors">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
              onOpenEditAvatar();
            }}
            className="relative group cursor-pointer shrink-0 select-none min-w-[64px] min-h-[64px]"
            title="Klik untuk mengubah foto profil"
            aria-label="Ubah foto profil"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#2A1A4A] via-[#3D256B] to-[#C8B5FF] p-0.5 shadow-md overflow-hidden transition-transform group-hover:scale-105 active:scale-95">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full bg-white"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-lg font-black text-[#2A1A4A] font-heading">
                  HA
                </div>
              )}
            </div>

            <div
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#2A1A4A] text-white flex items-center justify-center shadow-md border-2 border-white transition-transform group-hover:scale-110"
              aria-label="Edit Foto"
            >
              <Camera className="w-3 h-3 text-[#C8B5FF]" />
            </div>
          </button>

          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-black text-[#2A1A4A] font-heading truncate">
                {isLoggedIn ? 'Hasna Aulia Farhana' : 'Tamu Sutraloka'}
              </h3>
              {isLoggedIn ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#D4AF37] text-[#2A1A4A] shadow-xs shrink-0">
                  VIP
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 shrink-0">
                  Mode Tamu
                </span>
              )}
            </div>
            <p className="text-[12px] text-slate-500 font-medium truncate mt-0.5">
              {isLoggedIn ? 'hasna.aulia@gmail.com • 0812345678' : 'Silakan masuk untuk akses penuh'}
            </p>
            <div className="flex items-center justify-between gap-2 mt-2">
              <span className="text-[10px] font-extrabold text-[#2A1A4A] bg-[#C8B5FF]/30 px-2.5 py-0.5 rounded-full">
                ID Jamaah: STL-2026-9812
              </span>
              <span className="text-[10px] font-bold text-[#2A1A4A] bg-[#FFF7D6] px-2.5 py-0.5 rounded-full border border-[#F5E6A3]">
                Terverifikasi
              </span>
            </div>
          </div>
        </div>

        {/* Edit Avatar Action Trigger */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-left">
          <span className="text-xs text-slate-500 font-medium">
            Foto Profil Akun Jamaah
          </span>
          <button
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
              onOpenEditAvatar();
            }}
            className="px-3 py-1.5 text-xs font-bold text-[#2A1A4A] hover:bg-[#C8B5FF]/20 rounded-xl flex items-center gap-1 transition-colors active:scale-95"
          >
            <span>Ganti Foto &gt;</span>
          </button>
        </div>
      </div>

      {/* Dzikir History Chart */}
      <DzikirHistoryChart onOpenTasbihModal={onOpenTasbihModal} isGuest={!isLoggedIn} />

      {/* Quick Stats Grid Bento Cards */}
      {/* Bento Micro-Typography Stat Cards */}
      <div className="grid grid-cols-3 gap-2 w-full">
        <div className="p-2.5 rounded-xl bg-white border border-gray-100 text-center shadow-xs overflow-hidden">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-tight block truncate whitespace-nowrap">
            Poin Sutra
          </span>
          <span className="text-base font-bold text-[#150A35] font-mono mt-0.5 block truncate whitespace-nowrap">
            450
          </span>
          <span className="text-[9px] text-[#FF7A3D] font-bold block mt-0.5 truncate whitespace-nowrap">
            +50 Berkah
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-white border border-gray-100 text-center shadow-xs overflow-hidden">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-tight block truncate whitespace-nowrap">
            Berangkat
          </span>
          <span className="text-base font-bold text-[#150A35] font-mono mt-0.5 block truncate whitespace-nowrap">
            15 Nov
          </span>
          <span className="text-[9px] text-[#A577FF] font-bold block mt-0.5 truncate whitespace-nowrap">
            2026 SUB
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-white border border-gray-100 text-center shadow-xs overflow-hidden">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-tight block truncate whitespace-nowrap">
            Permit Nusuk
          </span>
          <span className="text-base font-bold text-emerald-600 font-mono mt-0.5 block truncate whitespace-nowrap">
            Aktif
          </span>
          <span className="text-[9px] text-gray-500 block mt-0.5 truncate whitespace-nowrap">
            Raudhah OK
          </span>
        </div>
      </div>

      {/* Push Notification Card */}
      <PushNotificationCard onShowToast={onShowToast} compact={false} />

      {/* Account Settings Menu */}
      <div className="space-y-2">
        {/* Toggle Login/Logout for quick testing */}
        {onToggleAuth && (
          <button
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
              onToggleAuth();
            }}
            className="w-full min-h-[56px] flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-amber-100 transition-colors cursor-pointer shadow-xs text-left active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2A1A4A]/10 flex items-center justify-center text-[#2A1A4A] shrink-0">
                {isLoggedIn ? <LogOut className="w-5 h-5 text-[#2A1A4A]" /> : <LogIn className="w-5 h-5 text-[#2A1A4A]" />}
              </div>
              <div>
                <span className="text-xs font-bold text-[#2A1A4A] block">
                  {isLoggedIn ? 'Keluar Akun (Beralih ke Mode Tamu)' : 'Masuk sebagai Hasna (VIP)'}
                </span>
                <span className="text-[11px] text-slate-500">
                  {isLoggedIn ? 'Uji coba tampilan Login Page (Guest) & Locked Cards' : 'Buka semua fitur ibadah & tiket digital'}
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-[#2A1A4A] px-2.5 py-1 rounded-lg bg-slate-100">
              {isLoggedIn ? 'Keluar' : 'Masuk'}
            </span>
          </button>
        )}

        {/* Panduan Manasik Trigger */}
        {onOpenManasikModal && (
          <button
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
              onOpenManasikModal();
            }}
            className="w-full min-h-[56px] flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-[#F2EDFD] border border-amber-100 transition-colors cursor-pointer shadow-xs text-left active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#2A1A4A] block">
                  Panduan Manasik Interaktif
                </span>
                <span className="text-[11px] text-slate-500">
                  Step-by-step rukun & doa umroh sesuai sunnah
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        )}

        {[
          { label: 'Ubah Foto Profil & Avatar', sub: 'Pilih dari galeri atau avatar preset', icon: Camera, action: onOpenEditAvatar },
          { label: 'Riwayat & Statistik Dzikir', sub: 'Buka Tasbih Digital & counter harian', icon: BarChart3, action: onOpenTasbihModal },
          { label: 'Riwayat Pemesanan Paket', sub: '1 Paket Aktif (Program 16 Hari)', icon: FileText, action: () => onShowToast?.('Menampilkan riwayat pemesanan') },
          { label: 'Program Kemitraan & Agen Sutra', sub: 'Peluang syiar & komisi berkah', icon: Award, action: () => onShowToast?.('Membuka info program kemitraan') },
          { label: 'Kantor Cabang Gresik & Surabaya', sub: 'Konsultasi tatap muka langsung', icon: MapPin, action: () => onShowToast?.('Kantor Cabang: Jl. Raya Gresik No. 88') },
          { label: 'Customer Service 24 Jam', sub: 'Layanan jamaah via WhatsApp', icon: Phone, action: () => {
            window.open('https://wa.me/6281234567890?text=Halo%20Sutraloka%20Care%2C%20saya%20butuh%20bantuan', '_blank');
          }}
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => {
                if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
                item.action?.();
              }}
              className="w-full min-h-[56px] flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-amber-100 transition-colors cursor-pointer shadow-xs text-left active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2A1A4A]/5 flex items-center justify-center text-[#2A1A4A] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#2A1A4A] block">{item.label}</span>
                  <span className="text-[11px] text-slate-500">{item.sub}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          );
        })}
      </div>

      {/* Branding Footer */}
      <div className="pt-3 text-center space-y-1.5 text-slate-400 text-xs">
        <SutralokaHeaderBrand size="sm" iconSize={28} className="justify-center" />
        <p className="text-[11px] text-slate-500">© 2026 PT. Sutra Tour & Travel. Hak cipta dilindungi.</p>
        <p className="text-[10px] text-slate-400">Aplikasi Mobile Sutraloka v2.0</p>
      </div>
    </div>
  );
};
