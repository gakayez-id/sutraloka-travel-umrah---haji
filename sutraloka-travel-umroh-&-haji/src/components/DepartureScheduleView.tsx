import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Users, Plane, CheckCircle2, Lock } from 'lucide-react';
import { SUTRALOKA_DATA, JadwalKeberangkatanItem } from '../data/travelData';

interface DepartureScheduleViewProps {
  onConfirmSchedule?: (item: JadwalKeberangkatanItem) => void;
  onBack?: () => void;
  isGuest?: boolean;
  onLockedClick?: () => void;
}

export const DepartureScheduleView: React.FC<DepartureScheduleViewProps> = ({
  onConfirmSchedule,
  onBack,
  isGuest = false,
  onLockedClick
}) => {
  const [calendarMode, setCalendarMode] = useState<'MASEHI' | 'HIJRIYAH'>('MASEHI');
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  
  const months = [
    { name: 'September 2026', hijri: 'Rabiul Awwal 1448', days: 30, startDay: 2 },
    { name: 'Oktober 2026', hijri: 'Rabiul Akhir 1448', days: 31, startDay: 4 },
    { name: 'November 2026', hijri: 'Jumadil Ula 1448', days: 30, startDay: 0 },
    { name: 'Desember 2026', hijri: 'Jumadil Akhir 1448', days: 31, startDay: 2 },
  ];

  const currentMonth = months[currentMonthIndex];
  const [selectedDay, setSelectedDay] = useState<number>(3);
  const [confirmedSuccess, setConfirmedSuccess] = useState(false);

  const departures = SUTRALOKA_DATA.jadwal_detail;
  
  const selectedDeparture = departures.find((d) => {
    const dayStr = d.tanggal.split(' ')[0];
    const monthStr = d.tanggal.split(' ')[1];
    return parseInt(dayStr) === selectedDay && currentMonth.name.toLowerCase().includes(monthStr.toLowerCase());
  }) || departures[0];

  // Dots: Low orange, Moderate green, Full grey
  const getDayDotColor = (day: number) => {
    const match = departures.find((d) => {
      const dDay = parseInt(d.tanggal.split(' ')[0]);
      const dMonth = d.tanggal.split(' ')[1];
      return dDay === day && currentMonth.name.toLowerCase().includes(dMonth.toLowerCase());
    });
    if (!match) return null;
    if (match.sisaSeat <= 5) return 'bg-[#D4AF37]'; // Low / Sedang (Orange/Gold)
    if (match.sisaSeat <= 10) return 'bg-emerald-500'; // Moderate / Rendah (Green)
    return 'bg-slate-400'; // Full (Grey)
  };

  const handleConfirm = () => {
    if (isGuest) {
      if (onLockedClick) onLockedClick();
      return;
    }
    setConfirmedSuccess(true);
    if (onConfirmSchedule) {
      onConfirmSchedule(selectedDeparture);
    }
  };

  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < currentMonth.startDay; i++) {
    calendarCells.push(null);
  }
  for (let d = 1; d <= currentMonth.days; d++) {
    calendarCells.push(d);
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between pb-1">
        {onBack ? (
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#2A1A4A] hover:bg-slate-50 shadow-xs transition-colors"
            aria-label="Kembali"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-9" />
        )}

        <div className="text-center">
          <h2 className="text-base font-extrabold text-[#2A1A4A] font-heading">
            Jadwal Keberangkatan
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Pilih kalender & ketersediaan kuota
          </span>
        </div>

        <div className="w-9" />
      </div>

      {/* Masehi / Hijriyah Selector */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1 rounded-full bg-slate-100 border border-slate-200">
          <button
            onClick={() => setCalendarMode('MASEHI')}
            className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
              calendarMode === 'MASEHI'
                ? 'bg-[#2A1A4A] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#2A1A4A]'
            }`}
          >
            MASEHI
          </button>
          <button
            onClick={() => setCalendarMode('HIJRIYAH')}
            className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${
              calendarMode === 'HIJRIYAH'
                ? 'bg-[#2A1A4A] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#2A1A4A]'
            }`}
          >
            HIJRIYAH
          </button>
        </div>
      </div>

      {/* Calendar Card with faint Kaaba bg */}
      <div className="relative overflow-hidden rounded-[24px] bg-white border border-amber-100 p-4 shadow-sm space-y-3">
        {/* Faint Kaaba background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.04] pointer-events-none rounded-[24px]"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80')` }}
        />

        {/* Month Selector */}
        <div className="relative z-10 flex items-center justify-between px-1">
          <button
            onClick={() => setCurrentMonthIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentMonthIndex === 0}
            className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-[#2A1A4A] disabled:opacity-30 flex items-center justify-center transition-colors border border-slate-200"
            aria-label="Bulan Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="text-center">
            <span className="text-sm font-extrabold text-[#2A1A4A] font-heading block">
              {currentMonth.name}
            </span>
            <span className="text-[11px] text-[#2A1A4A] font-bold">
              {currentMonth.hijri}
            </span>
          </div>

          <button
            onClick={() => setCurrentMonthIndex((prev) => Math.min(months.length - 1, prev + 1))}
            disabled={currentMonthIndex === months.length - 1}
            className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-[#2A1A4A] disabled:opacity-30 flex items-center justify-center transition-colors border border-slate-200"
            aria-label="Bulan Berikutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Days of week */}
        <div className="relative z-10 grid grid-cols-7 gap-1 text-center pt-2">
          {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
            <span key={day} className="text-[11px] font-bold text-slate-400">
              {day}
            </span>
          ))}
        </div>

        {/* Days grid */}
        <div className="relative z-10 grid grid-cols-7 gap-1">
          {calendarCells.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="h-9" />;
            }
            const isSelected = day === selectedDay;
            const dotColor = getDayDotColor(day);

            return (
              <button
                key={`day-${day}`}
                onClick={() => setSelectedDay(day)}
                className={`relative h-9 rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-[#2A1A4A] text-white shadow-xs'
                    : 'hover:bg-slate-100 text-[#2A1A4A]'
                }`}
              >
                <span>{day}</span>
                {dotColor && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#D4AF37]' : dotColor} mt-0.5`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend: "Sisa 1-5 Sedang 6-10 Rendah >11 Penuh 0" */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 pt-3 mt-1 border-t border-slate-100 text-[10px] text-slate-500">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span>Sisa 1-5 (Sedang)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>6-10 (Rendah)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span>&gt;11 / Penuh 0</span>
          </div>
        </div>
      </div>

      {/* Hero card: Saudia plane photo + "JADWAL PILIHAN 3 September 2026 Tersedia (6 Kursi)" LEFT */}
      <div className="relative overflow-hidden rounded-[24px] bg-white border border-amber-100 shadow-sm flex flex-col justify-between text-left">
        {/* Photo top */}
        <div className="relative h-28 w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=700&q=80"
            alt="Pesawat Saudia Airlines"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-2 left-3 text-white">
            <span className="text-[10px] font-bold text-[#C8B5FF] uppercase tracking-wider block">
              JADWAL PILIHAN
            </span>
            <div className="text-sm font-black text-white font-heading">
              {selectedDay} {currentMonth.name} · Tersedia ({selectedDeparture.sisaSeat} Kursi)
            </div>
          </div>
        </div>

        {/* Flight & Package details */}
        <div className="p-4 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#2A1A4A] shrink-0" />
              <span className="truncate font-medium">{selectedDeparture.maskapai}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#2A1A4A] shrink-0" />
              <span className="truncate font-medium">{selectedDeparture.paketRef}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Button "Pilih Jadwal Ini" plum 52px CENTER sticky above bottom nav. Guest "Masuk untuk Pesan" lock CENTER */}
      <div className="pt-2 flex justify-center">
        {confirmedSuccess ? (
          <div className="w-full h-[52px] rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center gap-2 text-[#2A1A4A] text-sm font-bold shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
            <span>Jadwal Berhasil Dikonfirmasi!</span>
          </div>
        ) : isGuest ? (
          <button
            onClick={() => onLockedClick && onLockedClick()}
            className="w-full h-[52px] rounded-2xl bg-[#2A1A4A] hover:bg-[#3D256B] text-white font-bold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4 text-[#D4AF37]" />
            <span>Masuk untuk Pesan</span>
          </button>
        ) : (
          <button
            onClick={handleConfirm}
            className="w-full h-[52px] rounded-2xl bg-[#2A1A4A] hover:bg-[#3D256B] text-white font-bold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Pilih Jadwal Ini</span>
          </button>
        )}
      </div>

      {/* Other Departures List */}
      <div className="pt-2 text-left">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Rombongan Keberangkatan Lainnya (2026)
        </h4>
        <div className="space-y-2">
          {SUTRALOKA_DATA.jadwal_keberangkatan.slice(0, 5).map((tgl, i) => (
            <div
              key={i}
              onClick={() => {
                const dayNum = parseInt(tgl.split(' ')[0]);
                setSelectedDay(dayNum);
              }}
              className="flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-[#FFFBF7] border border-amber-100 text-xs text-[#2A1A4A] cursor-pointer shadow-xs transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#2A1A4A]" />
                <span className="font-bold text-[#2A1A4A]">{tgl}</span>
              </div>
              <span className="text-[11px] font-bold text-[#2A1A4A]">Pilih Tanggal</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
