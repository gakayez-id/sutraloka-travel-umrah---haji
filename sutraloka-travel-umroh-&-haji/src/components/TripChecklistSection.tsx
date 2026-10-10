import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Square, 
  CheckCircle2, 
  Plus, 
  RotateCcw, 
  Trash2, 
  FileText, 
  Shirt, 
  HeartPulse, 
  BookOpen, 
  Luggage,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { LockedCardOverlay } from './LockedCardOverlay';

export interface ChecklistItem {
  id: string;
  category: 'dokumen' | 'pakaian' | 'ibadah' | 'kesehatan' | 'perlengkapan';
  title: string;
  description?: string;
  packed: boolean;
  isCustom?: boolean;
}

interface TripChecklistSectionProps {
  isGuest?: boolean;
  onLockedClick?: () => void;
}

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  // Dokumen
  { id: 'doc-1', category: 'dokumen', title: 'Paspor Asli (Masa berlaku min. 7 bulan)', description: 'Simpan di tas dokumen khusus', packed: true },
  { id: 'doc-2', category: 'dokumen', title: 'Buku Kuning Vaksin Meningitis (ICV)', description: 'Wajib dari Kantor Kesehatan Pelabuhan', packed: true },
  { id: 'doc-3', category: 'dokumen', title: 'Visa Umroh / Barcode Nusuk Sutraloka', description: 'Dicetak & simpan di smartphone', packed: true },
  { id: 'doc-4', category: 'dokumen', title: 'Pasfoto Berwarna 4x6 (Background Putih)', description: 'Cadangan 4 lembar', packed: false },
  { id: 'doc-5', category: 'dokumen', title: 'Fotokopi KTP, KK, & Buku Nikah', description: 'Untuk legalitas pendamping', packed: false },

  // Pakaian & Ihram
  { id: 'pak-1', category: 'pakaian', title: 'Kain Ihram (2 Set)', description: 'Untuk laki-laki, bahan katun menyerap keringat', packed: false },
  { id: 'pak-2', category: 'pakaian', title: 'Sabuk Ihram Tanpa Jahitan', description: 'Dilengkapi kantong dompet rahasia', packed: false },
  { id: 'pak-3', category: 'pakaian', title: 'Pakaian Gamis / Koko Putih (3-4 Set)', description: 'Bahan adem dan longgar', packed: false },
  { id: 'pak-4', category: 'pakaian', title: 'Sandal Jepit Nyaman & Sepatu Tawaf', description: 'Untuk berjalan di pelataran marmer', packed: false },
  { id: 'pak-5', category: 'pakaian', title: 'Jaket / Cardigan Tipis', description: 'Untuk di dalam pesawat & AC Masjidil Haram', packed: false },

  // Ibadah
  { id: 'iba-1', category: 'ibadah', title: 'Buku Doa Manasik & Dzikir Sutraloka', description: 'Bawa saat tawaf dan sa\'i', packed: true },
  { id: 'iba-2', category: 'ibadah', title: 'Tasbih Digital / Tasbih Jari', description: 'Tersedia juga fitur Tasbih di aplikasi ini', packed: true },
  { id: 'iba-3', category: 'ibadah', title: 'Sajadah Tipis Lipat', description: 'Praktis untuk sholat di pelataran luar', packed: false },
  { id: 'iba-4', category: 'ibadah', title: 'Semprotan Air Wudhu / Face Mist', description: 'Menghidrasi kulit saat cuaca terik', packed: false },

  // Kesehatan & Obat
  { id: 'kes-1', category: 'kesehatan', title: 'Obat Pribadi & Salinan Resep Dokter', description: 'Bawa di tas jinjing cabin', packed: false },
  { id: 'kes-2', category: 'kesehatan', title: 'Pelembab Bibir (Lip Balm) & Handbody Non-Parfum', description: 'Mencegah bibir pecah-pecah di tanah suci', packed: false },
  { id: 'kes-3', category: 'kesehatan', title: 'Masker Medis & Semprotan Hidung Steril', description: 'Pencegah debu dan virus', packed: false },
  { id: 'kes-4', category: 'kesehatan', title: 'Vitamin C, Madu & Tolak Angin', description: 'Menjaga stamina selama ziarah', packed: false },

  // Perlengkapan Harian
  { id: 'har-1', category: 'perlengkapan', title: 'Tas Paspor Selempang Kecil Sutraloka', description: 'Selalu dikalungkan saat bepergian', packed: true },
  { id: 'har-2', category: 'perlengkapan', title: 'Universal Travel Adapter Colokan Kaki 3 (Saudi)', description: 'Tipe G colokan UK/Saudi', packed: false },
  { id: 'har-3', category: 'perlengkapan', title: 'Gunting Kecil untuk Tahallul', description: 'Wajib masuk koper bagasi (check-in baggage)', packed: false },
  { id: 'har-4', category: 'perlengkapan', title: 'Kantong Sandal Khusus Masjid', description: 'Membawa sandal masuk ke dalam masjid', packed: false }
];

export const TripChecklistSection: React.FC<TripChecklistSectionProps> = ({
  isGuest = false,
  onLockedClick
}) => {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('sutraloka_trip_checklist');
      return saved ? JSON.parse(saved) : DEFAULT_CHECKLIST;
    } catch {
      return DEFAULT_CHECKLIST;
    }
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<ChecklistItem['category']>('perlengkapan');
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('sutraloka_trip_checklist', JSON.stringify(items));
  }, [items]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = !item.packed;
          if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(20);
          }
          return { ...item, packed: next };
        }
        return item;
      })
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      category: newCategory,
      title: newTitle.trim(),
      description: 'Barang tambahan pribadi',
      packed: false,
      isCustom: true
    };

    setItems((prev) => [newItem, ...prev]);
    setNewTitle('');
    setIsAddingNew(false);
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleResetChecklist = () => {
    if (window.confirm('Reset checklist ke daftar rekomendasi default?')) {
      setItems(DEFAULT_CHECKLIST);
    }
  };

  const handleToggleAll = (packAll: boolean) => {
    setItems((prev) =>
      prev.map((i) => {
        if (activeCategory === 'all' || i.category === activeCategory) {
          return { ...i, packed: packAll };
        }
        return i;
      })
    );
  };

  // Progress metrics
  const totalCount = items.length;
  const packedCount = items.filter((i) => i.packed).length;
  const percentComplete = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

  // Filter items
  const filteredItems = items.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const getCategoryIcon = (cat: ChecklistItem['category']) => {
    switch (cat) {
      case 'dokumen': return <FileText className="w-3.5 h-3.5 text-blue-600" />;
      case 'pakaian': return <Shirt className="w-3.5 h-3.5 text-purple-600" />;
      case 'ibadah': return <BookOpen className="w-3.5 h-3.5 text-amber-600" />;
      case 'kesehatan': return <HeartPulse className="w-3.5 h-3.5 text-rose-600" />;
      default: return <Luggage className="w-3.5 h-3.5 text-[#2A1A4A]" />;
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-white border border-amber-100 p-4 sm:p-5 shadow-sm space-y-4">
      {/* Real photo subtle background accent */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.03] pointer-events-none rounded-[24px]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80')`
        }}
      />
      {/* Top Header & Expand/Collapse */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-2xl bg-[#A577FF]/15 dark:bg-[#150A35] flex items-center justify-center text-[#A577FF]">
              <CheckSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#150A35] dark:text-white font-heading">
                Checklist Perlengkapan Umroh
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tracking barang bawaan & dokumen perjalanan
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-8 h-8 rounded-full bg-slate-50 dark:bg-[#150A35] hover:bg-[#A577FF]/10 text-slate-500 dark:text-slate-300 flex items-center justify-center transition-colors border border-slate-200/60 dark:border-[#A577FF]/30"
          title={isCollapsed ? "Buka Checklist" : "Tutup Checklist"}
        >
          {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {/* Progress Card */}
      <div className="p-3.5 rounded-2xl bg-[#A577FF]/10 dark:bg-[#150A35] border border-[#A577FF]/20 dark:border-[#A577FF]/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#150A35] dark:text-slate-100">
            Kesiapan Koper & Berkas
          </span>
          <span className="text-xs font-mono font-black text-[#A577FF]">
            {packedCount} dari {totalCount} siap ({percentComplete}%)
          </span>
        </div>

        {/* Real-time Visual Progress Bar */}
        <div className="w-full h-2.5 bg-white dark:bg-[#1E1148] rounded-full overflow-hidden border border-slate-200/70 dark:border-[#A577FF]/20">
          <div
            className="h-full bg-gradient-to-r from-[#A577FF] via-purple-600 to-indigo-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${percentComplete}%` }}
          />
        </div>

        {percentComplete === 100 && (
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 p-2 rounded-xl border border-emerald-200 dark:border-emerald-800/60 animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Maa syaa Allah! Semua perlengkapan sudah siap untuk keberangkatan.</span>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <>
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'dokumen', label: 'Dokumen' },
              { id: 'pakaian', label: 'Pakaian & Ihram' },
              { id: 'ibadah', label: 'Ibadah' },
              { id: 'kesehatan', label: 'Kesehatan' },
              { id: 'perlengkapan', label: 'Harian' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                  activeCategory === tab.id
                    ? 'bg-[#A577FF] text-white shadow-sm shadow-[#A577FF]/25'
                    : 'bg-[#A577FF]/10 dark:bg-[#150A35] text-[#150A35] dark:text-slate-300 hover:bg-[#A577FF]/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Action Tools Bar */}
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-[#A577FF]/20">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleAll(true)}
                className="text-[#A577FF] font-semibold hover:underline text-[11px]"
              >
                Centang Semua
              </button>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <button
                onClick={() => handleToggleAll(false)}
                className="text-slate-500 dark:text-slate-400 font-semibold hover:underline text-[11px]"
              >
                Kosongkan
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddingNew(!isAddingNew)}
                className="px-2.5 py-1 rounded-xl bg-[#A577FF]/10 dark:bg-[#150A35] text-[#A577FF] font-bold hover:bg-[#A577FF]/20 text-[11px] flex items-center gap-1 border border-[#A577FF]/20"
              >
                <Plus className="w-3 h-3" />
                <span>Tambah Barang</span>
              </button>

              <button
                onClick={handleResetChecklist}
                className="text-slate-400 hover:text-rose-500 p-1"
                title="Reset ke Default"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Add Custom Item Form */}
          {isAddingNew && (
            <form onSubmit={handleAddItem} className="p-3 bg-[#A577FF]/10 dark:bg-[#150A35] rounded-2xl border border-[#A577FF]/20 space-y-2.5 animate-in fade-in">
              <div className="text-xs font-bold text-[#150A35] dark:text-slate-200">
                Tambah Barang Baru ke Checklist:
              </div>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Contoh: Sandal cadangan, Powerbank 10.000 mAh..."
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E1148] border border-slate-200 dark:border-[#A577FF]/30 text-xs font-medium text-[#150A35] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#A577FF]/30"
                autoFocus
              />
              <div className="flex items-center justify-between gap-2">
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as ChecklistItem['category'])}
                  className="px-2 py-1.5 rounded-xl bg-white dark:bg-[#1E1148] border border-slate-200 dark:border-[#A577FF]/30 text-xs text-[#150A35] dark:text-slate-200 focus:outline-none"
                >
                  <option value="dokumen">Dokumen</option>
                  <option value="pakaian">Pakaian & Ihram</option>
                  <option value="ibadah">Ibadah</option>
                  <option value="kesehatan">Kesehatan</option>
                  <option value="perlengkapan">Perlengkapan Harian</option>
                </select>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#1E1148] text-slate-600 dark:text-slate-300 text-xs font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-[#A577FF] text-white text-xs font-bold hover:opacity-90"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Checklist Items Interactive Rows */}
          <div className="space-y-1.5 max-h-80 overflow-y-auto no-scrollbar pr-0.5">
            {filteredItems.map((item) => {
              const isChecked = item.packed;
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`group flex items-start justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-slate-500'
                      : 'bg-white dark:bg-[#150A35]/80 hover:bg-[#A577FF]/5 dark:hover:bg-[#150A35] border-slate-200/70 dark:border-[#A577FF]/20 text-[#150A35] dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <button
                      type="button"
                      className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                        isChecked
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'border-2 border-slate-300 dark:border-slate-600 group-hover:border-[#A577FF]'
                      }`}
                    >
                      {isChecked ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-bold leading-snug ${
                          isChecked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-[#150A35] dark:text-white'
                        }`}>
                          {item.title}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 truncate">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <div className="p-1 rounded-lg bg-[#F5F7FC] dark:bg-[#150A35] text-slate-400 border border-slate-200/50 dark:border-[#A577FF]/20" title={item.category}>
                      {getCategoryIcon(item.category)}
                    </div>

                    {item.isCustom && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteItem(item.id);
                        }}
                        className="text-slate-300 hover:text-rose-500 p-1 transition-colors"
                        title="Hapus barang custom"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* For Guest: Locked Overlay */}
      {isGuest && (
        <LockedCardOverlay 
          onUnlockClick={() => onLockedClick && onLockedClick()} 
          message="Masuk sebagai jamaah untuk mengakses Checklist Perlengkapan"
        />
      )}
    </div>
  );
};
