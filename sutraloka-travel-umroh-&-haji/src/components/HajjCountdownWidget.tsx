import React, { useState } from 'react';
import { Calendar, Plane, CheckCircle2, Clock, MapPin } from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export const HajjCountdownWidget: React.FC = () => {
  // Target date: 15 November 2026 (approx 37 days from current time)
  const targetDate = new Date('2026-11-15T08:00:00');
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: '1', label: 'Paspor Aktif Min. 7 Bulan', checked: true },
    { id: '2', label: 'Vaksin Meningitis & Polio', checked: true },
    { id: '3', label: 'Manasik Intensif Tahap 1', checked: true },
    { id: '4', label: 'Pelunasan & Dokumen Visa', checked: true },
    { id: '5', label: 'Penyerahan Koper Bagasi', checked: false },
    { id: '6', label: 'Briefing Keberangkatan SUB', checked: false }
  ]);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const completedCount = checklist.filter((i) => i.checked).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  // Calculate days remaining dynamically
  const now = new Date();
  const diffTime = Math.max(0, targetDate.getTime() - now.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return (
    <div className="bg-gradient-to-br from-white via-[#FFF9F5] to-[#F5F7FC] rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Subtle Kaaba / Crescent SVG Watermark */}
      <div className="absolute right-2 bottom-2 opacity-5 pointer-events-none">
        <svg width="90" height="90" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>

      {/* Top Badge & Flight info */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FF7A3D]/15 text-[#D44E10] border border-[#FF7A3D]/30">
          <Calendar className="w-3 h-3 text-[#FF7A3D]" />
          Jadwal Keberangkatan
        </span>
        <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-500">
          <Plane className="w-3 h-3 text-[#FF7A3D]" />
          <span>SV-3887 • SUB ➔ JED</span>
        </div>
      </div>

      {/* Countdown Digits Row */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-orange-100/80 shadow-inner mb-3">
        <div className="flex items-center justify-between text-center">
          <div className="flex-1">
            <span className="text-2xl font-black text-[#150A35] tracking-tight">{diffDays}</span>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Hari</p>
          </div>
          <div className="text-gray-300 font-light text-xl">:</div>
          <div className="flex-1">
            <span className="text-2xl font-black text-[#150A35] tracking-tight">{diffHours}</span>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Jam</p>
          </div>
          <div className="text-gray-300 font-light text-xl">:</div>
          <div className="flex-1">
            <span className="text-2xl font-black text-[#FF7A3D] tracking-tight">45</span>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Menit</p>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
          <span className="text-gray-500 flex items-center gap-1 font-medium">
            <Clock className="w-3 h-3 text-[#A577FF]" />
            15 Nov 2026 • 09:30 WIB
          </span>
          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
            Pasti Berangkat
          </span>
        </div>
      </div>

      {/* Progress & Checklist Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#150A35]">
            Kesiapan Dokumen & Manasik
          </span>
          <span className="font-semibold text-[#A577FF]">
            {completedCount}/{checklist.length} ({progressPercent}%)
          </span>
        </div>

        {/* Progress Bar with Lavender & Warm Orange */}
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#A577FF] to-[#FF7A3D] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Checklist items list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
          {checklist.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleCheck(item.id)}
              className={`flex items-center gap-2 p-1.5 rounded-lg text-left text-[11px] transition-colors border ${
                item.checked
                  ? 'bg-emerald-50/70 border-emerald-200/60 text-emerald-900'
                  : 'bg-white/60 border-gray-200/60 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <CheckCircle2
                className={`w-3.5 h-3.5 shrink-0 ${
                  item.checked ? 'text-emerald-600 fill-emerald-100' : 'text-gray-300'
                }`}
              />
              <span className={`truncate ${item.checked ? 'line-through text-gray-500' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
