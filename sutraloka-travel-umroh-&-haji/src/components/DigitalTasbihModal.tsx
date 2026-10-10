import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Check, 
  ChevronRight, 
  Award, 
  Flame, 
  BarChart3, 
  TrendingUp, 
  CalendarDays 
} from 'lucide-react';
import { notifyDhikrMilestone } from '../utils/notification';

export interface DhikrItem {
  id: string;
  arabic: string;
  latin: string;
  meaning: string;
  defaultTarget: number;
  virtue: string;
}

export interface DailyDzikirRecord {
  dateKey: string;
  dayLabel: string;
  displayDate: string;
  count: number;
  isToday: boolean;
}

export const DHIKR_LIST: DhikrItem[] = [
  {
    id: 'subhanallah',
    arabic: 'سُبْحَانَ اللَّهِ',
    latin: 'Subhanallah',
    meaning: 'Maha Suci Allah',
    defaultTarget: 33,
    virtue: 'Menghapus dosa-dosa laksana buih di lautan & menanam pohon di surga.'
  },
  {
    id: 'alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    latin: 'Alhamdulillah',
    meaning: 'Segala Puji Bagi Allah',
    defaultTarget: 33,
    virtue: 'Memenuhi timbangan amal kebaikan pada hari kiamat.'
  },
  {
    id: 'allahu-akbar',
    arabic: 'اللَّهُ أَكْبَرُ',
    latin: 'Allahu Akbar',
    meaning: 'Allah Maha Besar',
    defaultTarget: 33,
    virtue: 'Kalimat pengagungan terbaik penenang kalbu dan pelindung diri.'
  },
  {
    id: 'la-ilaha-illallah',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
    latin: 'La ilaha illallah',
    meaning: 'Tiada Tuhan Selain Allah',
    defaultTarget: 33,
    virtue: 'Dzikir paling utama dan kunci pembuka pintu surga.'
  },
  {
    id: 'astaghfirullah',
    arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ',
    latin: 'Astaghfirullahal \'Adzim',
    meaning: 'Aku memohon ampun kepada Allah yang Maha Agung',
    defaultTarget: 100,
    virtue: 'Membuka pintu rezeki, melancarkan urusan, dan menghapus kesedihan.'
  },
  {
    id: 'shalawat',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ',
    latin: 'Allahumma Sholli \'Ala Sayyidina Muhammad',
    meaning: 'Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad',
    defaultTarget: 100,
    virtue: 'Mendapatkan syafaat Rasulullah SAW dan 10 rahmat dari Allah setiap 1 shalawat.'
  },
  {
    id: 'hauqalah',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    latin: 'La hawla wa la quwwata illa billah',
    meaning: 'Tiada daya dan kekuatan kecuali dengan pertolongan Allah',
    defaultTarget: 33,
    virtue: 'Salah satu simpanan perbendaharaan harta di surga (kanzun min kunuzil jannah).'
  }
];

interface DigitalTasbihModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDhikrId?: string;
  onCountUpdate?: (count: number, total: number) => void;
}

const getInitialHistory = (todayCount: number): DailyDzikirRecord[] => {
  const saved = localStorage.getItem('sutraloka_dzikir_history_v1');
  if (saved) {
    try {
      const parsed: DailyDzikirRecord[] = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length === 7) {
        parsed[parsed.length - 1].count = Math.max(parsed[parsed.length - 1].count, todayCount);
        return parsed;
      }
    } catch {
      // fallback
    }
  }

  const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const baseCounts = [132, 99, 165, 198, 145, 231];
  const result: DailyDzikirRecord[] = [];
  const now = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const isToday = i === 0;
    const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const dayLabel = days[d.getDay()];
    const displayDate = `${d.getDate()} ${months[d.getMonth()]}`;
    const count = isToday ? todayCount : (baseCounts[6 - i - 1] ?? 120);

    result.push({
      dateKey,
      dayLabel,
      displayDate,
      count,
      isToday
    });
  }

  localStorage.setItem('sutraloka_dzikir_history_v1', JSON.stringify(result));
  return result;
};

export const DigitalTasbihModal: React.FC<DigitalTasbihModalProps> = ({
  isOpen,
  onClose,
  initialDhikrId = 'subhanallah',
  onCountUpdate
}) => {
  const [selectedDhikr, setSelectedDhikr] = useState<DhikrItem>(
    DHIKR_LIST.find((d) => d.id === initialDhikrId) || DHIKR_LIST[0]
  );
  const [count, setCount] = useState<number>(0);
  const [target, setTarget] = useState<number>(selectedDhikr.defaultTarget);
  const [totalDailyCount, setTotalDailyCount] = useState<number>(() => {
    const saved = localStorage.getItem('sutraloka_tasbih_daily_total');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [history, setHistory] = useState<DailyDzikirRecord[]>(() => {
    const savedTotal = localStorage.getItem('sutraloka_tasbih_daily_total');
    const initialTotal = savedTotal ? parseInt(savedTotal, 10) : 0;
    return getInitialHistory(initialTotal);
  });
  const [hoveredDayIndex, setHoveredDayIndex] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [vibrateEnabled, setVibrateEnabled] = useState<boolean>(true);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [isPressing, setIsPressing] = useState<boolean>(false);

  // Web Audio Context reference for synthetic bead click sound
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (initialDhikrId) {
      const found = DHIKR_LIST.find((d) => d.id === initialDhikrId);
      if (found) {
        setSelectedDhikr(found);
        setTarget(found.defaultTarget);
      }
    }
  }, [initialDhikrId]);

  // Play subtle wood/bead click sound
  const playBeadSound = (isMilestone: boolean = false) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (isMilestone) {
        // High harmonic bell for completing target
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } else {
        // Subtle soft wooden bead tap
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch {
      // Ignore web audio permission restrictions
    }
  };

  const handleIncrement = () => {
    setIsPressing(true);
    setTimeout(() => setIsPressing(false), 120);

    const nextCount = count + 1;
    const nextTotal = totalDailyCount + 1;

    setCount(nextCount);
    setTotalDailyCount(nextTotal);
    localStorage.setItem('sutraloka_tasbih_daily_total', nextTotal.toString());

    setHistory((prev) => {
      const updated = prev.map((item) =>
        item.isToday ? { ...item, count: nextTotal } : item
      );
      localStorage.setItem('sutraloka_dzikir_history_v1', JSON.stringify(updated));
      return updated;
    });

    if (onCountUpdate) {
      onCountUpdate(nextCount, nextTotal);
    }

    // Check target hit
    const isTargetHit = target > 0 && nextCount % target === 0;

    if (isTargetHit) {
      playBeadSound(true);
      if (vibrateEnabled && typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([60, 50, 100]);
      }
      setShowCelebration(true);
      notifyDhikrMilestone(selectedDhikr.latin, target);
    } else {
      playBeadSound(false);
      if (vibrateEnabled && typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(20);
      }
    }
  };

  const handleReset = () => {
    setCount(0);
    setShowCelebration(false);
  };

  const handleSelectDhikr = (item: DhikrItem) => {
    setSelectedDhikr(item);
    setTarget(item.defaultTarget);
    setCount(0);
    setShowCelebration(false);
  };

  const progressPercent = target > 0 ? Math.min(100, (count / target) * 100) : 0;
  const maxHistoryCount = Math.max(...history.map((d) => d.count), 150);
  const totalWeeklyCount = history.reduce((acc, curr) => acc + curr.count, 0);
  const dailyAverage = Math.round(totalWeeklyCount / (history.length || 1));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-t-[32px] sm:rounded-[32px] bg-[#F8F9FD] dark:bg-slate-950 border border-violet-100 dark:border-slate-800 flex flex-col max-h-[92vh] overflow-hidden shadow-2xl transition-colors">
        
        {/* Grab Handle & Header */}
        <div className="pt-3 px-5 pb-3 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-violet-600 to-purple-600 p-0.5 shadow-sm">
              <div className="w-full h-full rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-violet-700 dark:text-violet-300">
                <RotateCcw className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-heading">
                Tasbih Digital
              </h3>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                Sutraloka Dzikir Counter
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                soundEnabled 
                  ? 'bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
              }`}
              title={soundEnabled ? 'Suara tasbih aktif' : 'Hening'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4">
          
          {/* Daily Total Stat Card */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-between shadow-wasl-sm transition-colors">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                  Total Dzikir Hari Ini
                </span>
                <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100 font-mono">
                  {totalDailyCount.toLocaleString('id-ID')} Kali
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {[33, 99, 100].map((t) => (
                <button
                  key={t}
                  onClick={() => setTarget(t)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                    target === t
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700'
                  }`}
                >
                  {t}x
                </button>
              ))}
            </div>
          </div>

          {/* Active Dhikr Card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-violet-100 dark:border-slate-800 shadow-wasl-sm text-center relative overflow-hidden transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-100/40 dark:bg-violet-950/20 rounded-full -mr-10 -mt-10 pointer-events-none" />

            {/* Arabic Calligraphy */}
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-serif leading-relaxed tracking-wide my-2 select-none">
              {selectedDhikr.arabic}
            </div>

            {/* Latin & Meaning */}
            <div className="space-y-0.5">
              <h4 className="text-sm font-extrabold text-violet-700 dark:text-violet-300 font-heading">
                {selectedDhikr.latin}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                "{selectedDhikr.meaning}"
              </p>
            </div>

            {/* Target Progress Bar */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                <span>Target: {target}x</span>
                <span className="font-bold text-violet-700 dark:text-violet-300">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-600 to-purple-600 rounded-full transition-all duration-150"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Big Interactive Bead Tap Area */}
          <div className="flex flex-col items-center justify-center py-2">
            <button
              onClick={handleIncrement}
              className={`relative w-48 h-48 sm:w-52 sm:h-52 rounded-full bg-gradient-to-b from-violet-600 via-purple-600 to-indigo-700 text-white shadow-wasl-purple flex flex-col items-center justify-center select-none cursor-pointer transition-all active:scale-95 group focus:outline-none ${
                isPressing ? 'scale-95 ring-8 ring-violet-200 dark:ring-violet-800' : 'hover:scale-[1.02]'
              }`}
              style={{
                boxShadow: '0 16px 36px -4px rgba(124, 58, 237, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.4)'
              }}
            >
              {/* Outer soft concentric ripple rings */}
              <div className="absolute inset-2 rounded-full border border-white/20 pointer-events-none" />
              <div className="absolute inset-5 rounded-full border border-white/10 pointer-events-none" />

              {/* Big Count Display */}
              <span className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white drop-shadow-md">
                {count}
              </span>

              <span className="text-xs font-extrabold uppercase tracking-wider text-violet-200 mt-1">
                Ketuk Untuk Dzikir
              </span>

              <span className="text-[10px] text-white/70 mt-1 font-mono">
                {target > 0 ? `${count} / ${target}` : `${count} Kali`}
              </span>
            </button>

            {/* Bottom Controls: Reset & Quick Clear */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span>Reset Hitungan</span>
              </button>
            </div>
          </div>

          {/* Celebration Toast if Target Hit */}
          {showCelebration && (
            <div className="p-4 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 animate-in slide-in-from-top-2 duration-200 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div className="flex-1">
                <h5 className="text-xs font-extrabold text-emerald-900 dark:text-emerald-100">
                  Alhamdulillah! Target {target}x Tercapai
                </h5>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-300 mt-0.5">
                  Lanjutkan dzikir berikutnya atau ulangi putaran tasbih ini.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => {
                      setCount(0);
                      setShowCelebration(false);
                    }}
                    className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold"
                  >
                    Ulangi Putaran
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DZIKIR HISTORY CHART SECTION */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-violet-100 dark:border-slate-800 shadow-wasl-sm space-y-3.5 transition-colors">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 flex items-center justify-center">
                  <BarChart3 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white font-heading">
                    Dzikir History Chart
                  </h4>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">
                    Progres dzikir 7 hari terakhir
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block uppercase font-bold tracking-wider">
                  Total Pekan Ini
                </span>
                <span className="text-xs font-extrabold text-violet-700 dark:text-violet-300 font-mono">
                  {totalWeeklyCount.toLocaleString('id-ID')} Kali
                </span>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="pt-2 pb-1">
              <div className="h-28 flex items-end justify-between gap-1.5 sm:gap-2 px-1">
                {history.map((item, idx) => {
                  const heightPercent = Math.max(8, Math.round((item.count / maxHistoryCount) * 100));
                  const isHovered = hoveredDayIndex === idx;

                  return (
                    <div
                      key={item.dateKey}
                      onMouseEnter={() => setHoveredDayIndex(idx)}
                      onClick={() => setHoveredDayIndex(idx)}
                      className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer"
                    >
                      {/* Count Label */}
                      <span
                        className={`text-[10px] font-bold font-mono transition-colors mb-1 ${
                          item.isToday
                            ? 'text-violet-700 dark:text-violet-300 font-extrabold'
                            : isHovered
                            ? 'text-slate-800 dark:text-slate-100'
                            : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                        }`}
                      >
                        {item.count}
                      </span>

                      {/* Bar Pillar */}
                      <div className="w-full max-w-[32px] bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-0.5 flex items-end justify-center h-20">
                        <div
                          className={`w-full rounded-xl transition-all duration-300 ${
                            item.isToday
                              ? 'bg-gradient-to-t from-violet-600 via-purple-600 to-indigo-600 shadow-sm shadow-violet-500/30'
                              : isHovered
                              ? 'bg-violet-300 dark:bg-violet-700'
                              : item.count > 0
                              ? 'bg-violet-100 dark:bg-violet-950 group-hover:bg-violet-200 dark:group-hover:bg-violet-900'
                              : 'bg-slate-200 dark:bg-slate-700'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>

                      {/* Day Label */}
                      <div className="flex flex-col items-center mt-1.5">
                        <span
                          className={`text-[10px] font-bold transition-colors ${
                            item.isToday
                              ? 'text-violet-700 dark:text-violet-300 font-extrabold'
                              : isHovered
                              ? 'text-slate-800 dark:text-slate-100'
                              : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                          }`}
                        >
                          {item.dayLabel}
                        </span>
                        {item.isToday && (
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-600 mt-0.5" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Insight Footer */}
            <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 shrink-0" />
                <span className="truncate">
                  {hoveredDayIndex !== null ? (
                    <>
                      <strong className="text-slate-800 dark:text-slate-200">
                        {history[hoveredDayIndex].dayLabel}, {history[hoveredDayIndex].displayDate}:
                      </strong>{' '}
                      <span className="text-violet-700 dark:text-violet-300 font-bold font-mono">
                        {history[hoveredDayIndex].count} Dzikir
                      </span>
                    </>
                  ) : (
                    <>
                      Hari Ini:{' '}
                      <span className="text-violet-700 dark:text-violet-300 font-bold font-mono">
                        {history[history.length - 1]?.count || totalDailyCount} Dzikir
                      </span>
                    </>
                  )}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 font-medium shrink-0">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                <span>
                  Rata-rata: <strong className="text-slate-700 dark:text-slate-300 font-mono">{dailyAverage}/hari</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Dhikr Selector List */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-extrabold text-slate-900 dark:text-white font-heading block">
              Pilihan Lafadz Dzikir & Doa
            </span>

            <div className="grid grid-cols-1 gap-2">
              {DHIKR_LIST.map((item) => {
                const isCurrent = item.id === selectedDhikr.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectDhikr(item)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isCurrent
                        ? 'bg-violet-50/80 dark:bg-violet-950/40 border-violet-300 dark:border-violet-700 text-violet-900 dark:text-violet-200 shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-violet-200 hover:bg-violet-50/30 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-heading truncate">
                          {item.latin}
                        </span>
                        <span className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">
                          {item.defaultTarget}x
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                        {item.meaning}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-base font-serif font-bold text-slate-800 dark:text-slate-100 block">
                        {item.arabic}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Keutamaan Dzikir Card */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-950 dark:text-amber-100">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Keutamaan Dzikir Ini</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-800 dark:text-amber-300">
              {selectedDhikr.virtue}
            </p>
          </div>
        </div>

        {/* Bottom Done Button */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-wasl-purple transition-all"
          >
            Selesai Berdzikir
          </button>
        </div>
      </div>
    </div>
  );
};
