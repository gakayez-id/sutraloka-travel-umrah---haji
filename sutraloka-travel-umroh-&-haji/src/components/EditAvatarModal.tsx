import React, { useState, useRef } from 'react';
import { X, Camera, Upload, Link, Check, Image as ImageIcon, Trash2, RotateCcw } from 'lucide-react';

interface EditAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: string | null;
  onSaveAvatar: (newAvatar: string | null) => void;
}

// 4 High-fidelity SVG Avatar Presets
export const AVATAR_PRESETS = [
  {
    id: 'preset-hasna-pilgrim',
    label: 'Pilgrim Hasna',
    subtitle: 'Ilustrasi Hijab & Ihram',
    // Elegant SVG data URL
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%238B5CF6"/><stop offset="100%" stop-color="%236D28D9"/></linearGradient><linearGradient id="skin" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23FED7AA"/><stop offset="100%" stop-color="%23FDBA74"/></linearGradient></defs><rect width="100" height="100" rx="30" fill="url(%23bg)"/><circle cx="50" cy="46" r="22" fill="url(%23skin)"/><path d="M28 46 C28 30 72 30 72 46 C72 65 60 76 50 76 C40 76 28 65 28 46 Z" fill="%23FFFFFF"/><ellipse cx="50" cy="48" rx="13" ry="15" fill="url(%23skin)"/><circle cx="45" cy="48" r="1.8" fill="%234C1D95"/><circle cx="55" cy="48" r="1.8" fill="%234C1D95"/><path d="M48 55 Q50 57 52 55" stroke="%23FB7185" stroke-width="1.8" stroke-linecap="round" fill="none"/><path d="M22 88 C25 72 75 72 78 88 Z" fill="%23EDE9FE"/></svg>`
  },
  {
    id: 'preset-kaaba-twilight',
    label: 'Kaaba Sanctuary',
    subtitle: 'Spiritual Night Sky',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="sky" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%231E1B4B"/><stop offset="100%" stop-color="%234C1D95"/></linearGradient></defs><rect width="100" height="100" rx="30" fill="url(%23sky)"/><circle cx="75" cy="24" r="8" fill="%23FDE68A"/><path d="M75 16 A 8 8 0 0 0 71 31 A 9 9 0 0 1 75 16 Z" fill="%234C1D95"/><rect x="34" y="44" width="32" height="34" rx="3" fill="%2318181B"/><rect x="34" y="50" width="32" height="4" fill="%23F59E0B"/><circle cx="50" cy="94" r="28" fill="%23E0E7FF" fill-opacity="0.15"/></svg>`
  },
  {
    id: 'preset-nabawi-dome',
    label: 'Green Dome',
    subtitle: 'Masjid Nabawi Madinah',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23065F46"/><stop offset="100%" stop-color="%23047857"/></linearGradient></defs><rect width="100" height="100" rx="30" fill="url(%23bg2)"/><path d="M50 22 C34 36 34 56 34 68 L66 68 C66 56 66 36 50 22 Z" fill="%2310B981"/><rect x="30" y="68" width="40" height="18" fill="%23F8FAFC"/><circle cx="50" cy="18" r="3" fill="%23FBBF24"/><rect x="49" y="14" width="2" height="5" fill="%23FBBF24"/></svg>`
  },
  {
    id: 'preset-sutraloka-wing',
    label: 'Sutraloka Emblem',
    subtitle: 'Brand Signature Wing',
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="wingGrad" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="%236D28D9"/><stop offset="50%" stop-color="%239333EA"/><stop offset="100%" stop-color="%23DC2626"/></linearGradient></defs><rect width="100" height="100" rx="30" fill="%23F5F3FF"/><path d="M24 24 C40 30 70 50 72 75 C72 85 58 90 45 82 C35 76 25 50 24 24 Z" fill="url(%23wingGrad)"/><path d="M55 58 C66 65 68 78 60 84" stroke="%23FDE68A" stroke-width="4" stroke-linecap="round" fill="none"/></svg>`
  }
];

export const EditAvatarModal: React.FC<EditAvatarModalProps> = ({
  isOpen,
  onClose,
  currentAvatar,
  onSaveAvatar
}) => {
  const [selectedPreview, setSelectedPreview] = useState<string | null>(currentAvatar);
  const [urlInput, setUrlInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Ukuran file maksimal 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSelectedPreview(reader.result);
      }
    };
    reader.onerror = () => {
      setErrorMsg('Gagal membaca gambar dari perangkat');
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = () => {
    setErrorMsg(null);
    if (!urlInput.trim()) {
      setErrorMsg('Masukkan URL gambar terlebih dahulu');
      return;
    }
    setSelectedPreview(urlInput.trim());
    setUrlInput('');
  };

  const handleSelectPreset = (presetUrl: string) => {
    setErrorMsg(null);
    setSelectedPreview(presetUrl);
  };

  const handleSave = () => {
    onSaveAvatar(selectedPreview);
    onClose();
  };

  const handleResetToMonogram = () => {
    setSelectedPreview(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-t-[32px] sm:rounded-[32px] bg-white dark:bg-[#1E1148] border border-slate-200/80 dark:border-[#A577FF]/20 flex flex-col max-h-[90vh] overflow-hidden shadow-2xl transition-colors">
        
        {/* Modal Header */}
        <div className="pt-4 px-5 pb-3 border-b border-slate-100 dark:border-[#A577FF]/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#A577FF]/10 dark:bg-[#150A35] text-[#A577FF] flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#150A35] dark:text-white font-heading">
                Edit Foto Profil
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">
                Pilih foto perangkat atau avatar preset
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#150A35] hover:bg-slate-200 dark:hover:bg-[#150A35]/80 text-[#150A35] dark:text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-5 bg-[#F5F7FC] dark:bg-[#150A35]">
          
          {/* Current / Selected Preview Hero */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative group">
              <div className="w-24 h-24 rounded-3xl bg-[#A577FF] p-1 shadow-md shadow-[#A577FF]/30 flex items-center justify-center">
                {selectedPreview ? (
                  <img
                    src={selectedPreview}
                    alt="Preview Avatar"
                    className="w-full h-full object-cover rounded-[22px] bg-white"
                  />
                ) : (
                  <div className="w-full h-full rounded-[22px] bg-white dark:bg-[#1E1148] flex items-center justify-center text-[#A577FF] font-black text-2xl font-heading">
                    HA
                  </div>
                )}
              </div>

              {/* Reset to Default Button */}
              {selectedPreview && (
                <button
                  onClick={handleResetToMonogram}
                  className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md transition-transform active:scale-90"
                  title="Hapus foto & kembali ke inisial"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="text-center mt-3">
              <span className="text-xs font-bold text-[#150A35] dark:text-white block">
                Hasna Aulia Farhana
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-400">
                {selectedPreview ? 'Foto Kustom Terpilih' : 'Inisial Monogram Default (HA)'}
              </span>

              {/* Explicit Reset to Initial (HA) Button */}
              {selectedPreview && (
                <button
                  type="button"
                  onClick={handleResetToMonogram}
                  className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40 hover:bg-rose-100 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset to Initial (HA)</span>
                </button>
              )}
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-500 font-semibold mt-2 text-center bg-rose-50 dark:bg-rose-950/50 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-800">
                {errorMsg}
              </p>
            )}
          </div>

          {/* Option A: File Upload */}
          <div className="p-4 rounded-3xl bg-white dark:bg-[#1E1148] border border-slate-200/80 dark:border-[#A577FF]/20 space-y-2.5 shadow-sm">
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-[#A577FF]" />
              <span className="text-xs font-extrabold text-[#150A35] dark:text-white font-heading">
                Upload Dari Perangkat
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Pilih foto format JPG, PNG, atau WEBP langsung dari galeri smartphone Anda.
            </p>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              id="avatar-file-upload-input"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 px-4 rounded-2xl bg-[#A577FF]/10 dark:bg-[#150A35] hover:bg-[#A577FF]/20 border border-[#A577FF]/30 text-[#A577FF] font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Pilih Gambar Dari Galeri</span>
            </button>
          </div>

          {/* Option B: Choose Preset Avatar */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#150A35] dark:text-white font-heading">
                Pilih Avatar Preset Sutraloka
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                4 Desain Islami
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {AVATAR_PRESETS.map((preset) => {
                const isSelected = selectedPreview === preset.url;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.url)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 relative ${
                      isSelected
                        ? 'bg-[#A577FF]/15 border-[#A577FF] ring-2 ring-[#A577FF]/40 shadow-sm'
                        : 'bg-white dark:bg-[#1E1148] border-slate-200/80 dark:border-[#A577FF]/20 hover:border-[#A577FF]/40 shadow-sm'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-10 h-10 rounded-xl object-cover shrink-0 shadow-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="block text-xs font-bold text-[#150A35] dark:text-white truncate">
                        {preset.label}
                      </span>
                      <span className="block text-[10px] text-slate-400 truncate mt-0.5">
                        {preset.subtitle}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#A577FF] text-white flex items-center justify-center shadow-sm">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Option C: Image URL Input */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#1E1148] border border-slate-200/80 dark:border-[#A577FF]/20 space-y-2 shadow-sm">
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Link className="w-3.5 h-3.5 text-slate-400" />
              <span>Gunakan Tautan URL Gambar</span>
            </span>
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://contoh.com/foto-anda.jpg"
                className="flex-1 bg-[#F5F7FC] dark:bg-[#150A35] border border-slate-200 dark:border-[#A577FF]/20 rounded-xl px-3 py-2 text-xs text-[#150A35] dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#A577FF]"
              />
              <button
                onClick={handleApplyUrl}
                className="px-3.5 py-2 rounded-xl bg-[#A577FF] hover:opacity-90 text-white font-bold text-xs whitespace-nowrap shadow-sm transition-colors"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-white dark:bg-[#1E1148] border-t border-slate-100 dark:border-[#A577FF]/20 flex items-center gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-2xl bg-slate-100 dark:bg-[#150A35] hover:bg-slate-200 dark:hover:bg-[#150A35]/80 text-[#150A35] dark:text-slate-200 font-bold text-xs transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3.5 rounded-2xl bg-[#A577FF] hover:opacity-90 text-white font-bold text-xs shadow-md shadow-[#A577FF]/30 transition-all"
          >
            Simpan Foto Profil
          </button>
        </div>
      </div>
    </div>
  );
};
