import React, { useState, useEffect, useRef } from 'react';
import { 
  Plane, 
  Hotel, 
  Users, 
  Utensils, 
  Luggage, 
  ShieldCheck, 
  Star, 
  Calendar, 
  ChevronRight, 
  Search, 
  X, 
  Clock, 
  ArrowUpDown, 
  MessageCircle, 
  History, 
  Trash2,
  CalendarCheck
} from 'lucide-react';
import { PaketUmroh, SUTRALOKA_DATA } from '../data/travelData';

interface PaketUmrohSectionProps {
  onSelectPaket: (paket: PaketUmroh) => void;
  selectedFilterService?: string;
}

const PACKAGE_IMAGES = [
  'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=700&q=80'
];

export const PaketUmrohSection: React.FC<PaketUmrohSectionProps> = ({
  onSelectPaket
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('Semua');
  const [sortOrder, setSortOrder] = useState<'default' | 'lowest' | 'highest'>('default');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sutraloka_recent_searches');
      return saved ? JSON.parse(saved) : ['Surabaya (Juanda)', 'Pullman Zamzam', '16 Hari', 'Hotel Bintang 5'];
    } catch {
      return ['Surabaya (Juanda)', 'Pullman Zamzam', '16 Hari'];
    }
  });

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveSearchQuery = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 6);
      localStorage.setItem('sutraloka_recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSelectRecentSearch = (item: string) => {
    setSearchQuery(item);
    setIsSearchFocused(false);
    saveSearchQuery(item);
  };

  const handleRemoveRecentItem = (e: React.MouseEvent, itemToRemove: string) => {
    e.stopPropagation();
    setRecentSearches((prev) => {
      const updated = prev.filter((item) => item !== itemToRemove);
      localStorage.setItem('sutraloka_recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearAllRecent = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.removeItem('sutraloka_recent_searches');
  };

  const filterChips = [
    { id: 'Semua', label: 'Semua Paket' },
    { id: 'Maskapai', label: 'Maskapai Direct' },
    { id: 'Hotel', label: 'Hotel Bintang 5' },
    { id: 'Durasi', label: 'Durasi 16 Hari' }
  ];

  const getIncludeIcon = (item: string) => {
    if (item.toLowerCase().includes('tiket') || item.toLowerCase().includes('pesawat')) {
      return <Plane className="w-3 h-3 text-[#2A1A4A]" />;
    }
    if (item.toLowerCase().includes('hotel')) {
      return <Hotel className="w-3 h-3 text-[#D4AF37]" />;
    }
    if (item.toLowerCase().includes('makan')) {
      return <Utensils className="w-3 h-3 text-amber-600" />;
    }
    if (item.toLowerCase().includes('visa') || item.toLowerCase().includes('asuransi')) {
      return <ShieldCheck className="w-3 h-3 text-[#2A1A4A]" />;
    }
    return <Luggage className="w-3 h-3 text-slate-500" />;
  };

  const getWhatsAppBookingUrl = (paket: PaketUmroh) => {
    const text = encodeURIComponent(
      `Assalamu'alaikum Admin Sutraloka, saya tertarik dengan informasi dan booking ${paket.program} (${paket.harga_display}). Mohon info jadwal dan ketersediaan kursinya.`
    );
    return `https://wa.me/6281234567890?text=${text}`;
  };

  const filteredPackages: PaketUmroh[] = SUTRALOKA_DATA.paket_umroh.filter((pkg: PaketUmroh) => {
    const matchesSearch = 
      searchQuery === '' ||
      pkg.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (pkg.hotelMakkah && pkg.hotelMakkah.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (pkg.maskapai && pkg.maskapai.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pkg.include.some((inc: string) => inc.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (pkg.badge && pkg.badge.toLowerCase().includes(searchQuery.toLowerCase()));

    let matchesFilter = true;
    if (selectedFilter === 'Maskapai') matchesFilter = (pkg.maskapai || '').toLowerCase().includes('saudia') || (pkg.maskapai || '').toLowerCase().includes('garuda');
    if (selectedFilter === 'Hotel') matchesFilter = pkg.hotelBintang === 5;
    if (selectedFilter === 'Durasi') matchesFilter = pkg.durasi_angka === 16;

    return matchesSearch && matchesFilter;
  }).sort((a: PaketUmroh, b: PaketUmroh) => {
    if (sortOrder === 'lowest') return a.harga - b.harga;
    if (sortOrder === 'highest') return b.harga - a.harga;
    return 0;
  });

  return (
    <div className="space-y-4 text-left">
      {/* Title & Subtitle */}
      <div>
        <h2 className="text-[18px] font-black text-[#2A1A4A] font-heading leading-tight">
          Paket Umroh & Haji Pilihan Terbaik
        </h2>
        <p className="text-[13px] text-slate-500 font-medium mt-0.5">
          Berakhir di Madinah • Hotel Bintang 5 • Penerbangan Langsung
        </p>
      </div>

      {/* Steps Indicator: Keberangkatan → Jumlah Jamaah → Tanggal (Reference Screen 1) */}
      <div className="p-3 rounded-2xl bg-white border border-amber-100 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2A1A4A]">
          <span className="w-5 h-5 rounded-full bg-[#2A1A4A] text-white flex items-center justify-center text-[10px]">1</span>
          <span>Keberangkatan</span>
        </div>
        <span className="text-slate-300 font-bold">→</span>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px]">2</span>
          <span>Jumlah Jamaah</span>
        </div>
        <span className="text-slate-300 font-bold">→</span>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px]">3</span>
          <span>Tanggal</span>
        </div>
      </div>

      {/* SEARCH BAR: "Mau berangkat dari mana?" LEFT */}
      <div ref={searchContainerRef} className="relative">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsSearchFocused(false);
            saveSearchQuery(searchQuery);
          }}
          className="relative flex items-center"
        >
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Search className="w-4 h-4" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="Mau berangkat dari mana?"
            className="w-full pl-10 pr-20 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-[#2A1A4A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C8B5FF] focus:border-[#2A1A4A] shadow-xs transition-all"
          />

          <div className="absolute right-2.5 flex items-center gap-1.5">
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors"
                title="Hapus pencarian"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-[#2A1A4A] hover:bg-[#3D256B] text-white text-[11px] font-bold shadow-xs transition-all"
            >
              Cari
            </button>
          </div>
        </form>

        {/* Recent Searches Dropdown */}
        {isSearchFocused && recentSearches.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 animate-in fade-in slide-in-from-top-1">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-[11px] font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-[#2A1A4A]" />
                <span>Pencarian Terakhir</span>
              </div>
              <button
                type="button"
                onClick={handleClearAllRecent}
                className="text-slate-400 hover:text-rose-600 text-[10px] flex items-center gap-0.5"
              >
                <Trash2 className="w-3 h-3" />
                <span>Hapus Semua</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {recentSearches.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectRecentSearch(item)}
                  className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFBF7] hover:bg-[#F2EDFD] text-[#2A1A4A] text-xs cursor-pointer border border-amber-100 transition-colors"
                >
                  <Clock className="w-3 h-3 text-slate-400 group-hover:text-[#2A1A4A]" />
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={(e) => handleRemoveRecentItem(e, item)}
                    className="w-4 h-4 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center ml-0.5"
                    title="Hapus item"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FILTER CHIPS: "Maskapai Hotel Durasi" & Sort */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 flex-1">
          {filterChips.map((chip) => {
            const isActive = selectedFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setSelectedFilter(chip.id)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 active:scale-95 ${
                  isActive
                    ? 'bg-[#2A1A4A] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {/* Price Sort Dropdown */}
        <div className="relative shrink-0">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'default' | 'lowest' | 'highest')}
            className="appearance-none pl-5 pr-6 py-1.5 rounded-full bg-white border border-slate-200 text-[11px] font-bold text-[#2A1A4A] focus:outline-none focus:ring-2 focus:ring-[#C8B5FF] cursor-pointer shadow-xs"
            title="Urutkan Harga"
          >
            <option value="default">Rekomendasi</option>
            <option value="lowest">Harga Terendah</option>
            <option value="highest">Harga Tertinggi</option>
          </select>
          <ArrowUpDown className="w-3 h-3 text-[#2A1A4A] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* PACKAGE CARDS LIST (PULLMAN ZAMZAM PHOTO TOP, BADGE "16 HARI", "PALING POPULER" GOLD) */}
      {filteredPackages.length === 0 ? (
        <div className="p-8 rounded-[24px] bg-white border border-amber-100 text-center space-y-2 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#FFFBF7] text-[#2A1A4A] flex items-center justify-center mx-auto">
            <Search className="w-6 h-6 text-slate-400" />
          </div>
          <h4 className="text-sm font-bold text-[#2A1A4A]">Tidak ada paket yang sesuai</h4>
          <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian atau filter.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedFilter('Semua');
              setSortOrder('default');
            }}
            className="px-4 py-2 rounded-xl bg-[#2A1A4A] text-white text-xs font-bold shadow-xs hover:bg-[#3D256B] transition-colors"
          >
            Tampilkan Semua Paket
          </button>
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 -mx-4 px-4 snap-x">
          {filteredPackages.map((pkg, idx) => {
            const cardImg = PACKAGE_IMAGES[idx % PACKAGE_IMAGES.length];
            return (
              <div
                key={pkg.id}
                className="group relative w-76 shrink-0 snap-start rounded-[24px] bg-white border border-amber-100 overflow-hidden transition-all duration-200 hover:shadow-lg shadow-md flex flex-col justify-between"
              >
                {/* Photo top WebP lazy srcset max 150KB */}
                <div className="relative h-34 w-full overflow-hidden bg-slate-100">
                  <img
                    src={cardImg}
                    srcSet={`${cardImg}&w=400 400w, ${cardImg}&w=800 800w`}
                    sizes="(max-width: 600px) 400px, 800px"
                    loading="lazy"
                    decoding="async"
                    alt={pkg.program}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Badge "16 HARI" white on photo top-left, "Paling Populer" gold top-right */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-xl bg-white text-[#2A1A4A] font-extrabold font-heading text-xs shadow-xs">
                      {pkg.program}
                    </span>

                    <div className="flex items-center gap-1">
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-[#D4AF37] text-[#2A1A4A] shadow-xs">
                        {pkg.badge || 'Paling Populer'}
                      </span>
                    </div>
                  </div>

                  {/* Bottom of Photo: Hotel & Airline info */}
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white font-medium">
                    {pkg.maskapai && (
                      <span className="flex items-center gap-1 truncate max-w-[140px]">
                        <Plane className="w-3 h-3 text-[#C8B5FF]" />
                        <span className="truncate">{pkg.maskapai}</span>
                      </span>
                    )}
                    {pkg.hotelMakkah && (
                      <span className="flex items-center gap-1 truncate max-w-[130px]">
                        <Hotel className="w-3 h-3 text-[#D4AF37]" />
                        <span className="truncate">{pkg.hotelMakkah}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between text-left">
                  <div>
                    {/* Title LEFT "Paket Umroh - Berakhir di Madinah" */}
                    <h3 className="text-sm font-black text-[#2A1A4A] font-heading leading-snug">
                      Paket Umroh - Berakhir di Madinah
                    </h3>

                    {/* Price LEFT "Mulai Rp38.050.000" + "Sisa 6 kursi" gold LEFT */}
                    <div className="my-1.5">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                        Mulai Dari
                      </span>
                      <div className="text-xl font-black text-[#2A1A4A] tracking-tight font-heading">
                        {pkg.harga_display}
                      </div>
                      <span className="text-xs text-[#D4AF37] font-extrabold block mt-0.5">
                        Sisa {pkg.sisaSeat ?? 6} kursi
                      </span>
                    </div>

                    {/* Facilities Include */}
                    <div className="pt-2">
                      <div className="grid grid-cols-2 gap-1">
                        {pkg.include.slice(0, 4).map((inc, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1 text-[10px] font-medium text-[#2A1A4A] bg-[#FFFBF7] px-2 py-1 rounded-lg border border-amber-100 truncate"
                            title={inc}
                          >
                            {getIncludeIcon(inc)}
                            <span className="truncate">{inc.replace(' (3x Sehari)', '')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Buttons CENTER: "Rincian" plum solid + "Tanya Admin" outline lavender */}
                  <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <a
                        href={getWhatsAppBookingUrl(pkg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-2 rounded-2xl bg-[#FF7A3D] hover:bg-[#FF6B00] text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md transition-all active:scale-95"
                        title="Hubungi Admin Sutraloka via WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-white" />
                        <span className="truncate">Tanya Admin</span>
                      </a>

                      <button
                        onClick={() => onSelectPaket(pkg)}
                        className="py-2.5 px-2 rounded-2xl bg-[#2A1A4A] hover:bg-[#3D256B] text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md transition-all active:scale-95"
                      >
                        <span>Rincian</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#C8B5FF]" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
