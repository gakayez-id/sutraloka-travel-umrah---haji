import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, RotateCcw, Check } from 'lucide-react';
import { notifyPrayerGoalCompleted } from '../utils/notification';
import { LockedCardOverlay } from './LockedCardOverlay';

export interface PrayerGoalItem {
  id: string;
  name: string;
  time: string;
  type: 'fardhu' | 'sunnah';
  is5Waktu: boolean;
  completed: boolean;
}

const DEFAULT_PRAYER_GOALS: PrayerGoalItem[] = [
  { id: 'subuh', name: 'Sholat Subuh', time: '04:13', type: 'fardhu', is5Waktu: true, completed: false },
  { id: 'dhuha', name: 'Sholat Dhuha', time: '07:30', type: 'sunnah', is5Waktu: false, completed: false },
  { id: 'dzuhur', name: 'Sholat Dzuhur', time: '11:29', type: 'fardhu', is5Waktu: true, completed: false },
  { id: 'ashar', name: 'Sholat Ashar', time: '14:50', type: 'fardhu', is5Waktu: true, completed: false },
  { id: 'maghrib', name: 'Sholat Maghrib', time: '17:26', type: 'fardhu', is5Waktu: true, completed: false },
  { id: 'isya', name: 'Sholat Isya', time: '18:36', type: 'fardhu', is5Waktu: true, completed: false },
  { id: 'tahajjud', name: 'Tahajjud & Witir', time: '03:15', type: 'sunnah', is5Waktu: false, completed: false },
];

interface DailyPrayerGoalsWidgetProps {
  isGuest?: boolean;
  onLockedClick?: () => void;
}

export const DailyPrayerGoalsWidget: React.FC<DailyPrayerGoalsWidgetProps> = ({
  isGuest = false,
  onLockedClick
}) => {
  const getTodayKey = () => {
    const today = new Date();
    return `sutraloka_prayer_goals_${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  };

  const [goals, setGoals] = useState<PrayerGoalItem[]>(() => {
    const saved = localStorage.getItem(getTodayKey());
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_PRAYER_GOALS;
      }
    }
    return DEFAULT_PRAYER_GOALS;
  });

  const [filterType, setFilterType] = useState<'Semua' | '5 Waktu' | 'Fardhu' | 'Sunnah'>('Semua');

  useEffect(() => {
    localStorage.setItem(getTodayKey(), JSON.stringify(goals));
  }, [goals]);

  const toggleGoal = (id: string) => {
    if (isGuest) {
      if (onLockedClick) onLockedClick();
      return;
    }

    setGoals((prev) => {
      const updated = prev.map((g) => {
        if (g.id === id) {
          const next = !g.completed;
          if (next && typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(25);
          }
          return { ...g, completed: next };
        }
        return g;
      });

      const fardhuRemaining = updated.filter((g) => g.type === 'fardhu' && !g.completed).length;
      if (fardhuRemaining === 0) {
        notifyPrayerGoalCompleted();
      }

      return updated;
    });
  };

  const resetTodayGoals = () => {
    const reset = goals.map((g) => ({ ...g, completed: false }));
    setGoals(reset);
  };

  const completedCount = goals.filter((g) => g.completed).length;
  const totalCount = goals.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const filteredGoals = goals.filter((g) => {
    if (filterType === '5 Waktu') return g.is5Waktu;
    if (filterType === 'Fardhu') return g.type === 'fardhu';
    if (filterType === 'Sunnah') return g.type === 'sunnah';
    return true;
  });

  // SVG Ring Progress Calculations
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-white border border-amber-100/80 p-5 shadow-sm space-y-4">
      
      {/* Real photo subtle background accent */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.04] pointer-events-none rounded-[24px]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80')`
        }}
      />

      {/* Header Row */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          {/* Ring Progress SVG */}
          <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
            <svg className="w-14 h-14 -rotate-90 transform" viewBox="0 0 60 60">
              <circle
                cx="30"
                cy="30"
                r={radius}
                className="stroke-slate-100"
                strokeWidth="5"
                fill="transparent"
              />
              <circle
                cx="30"
                cy="30"
                r={radius}
                className="stroke-[#2A1A4A] transition-all duration-500 ease-out"
                strokeWidth="5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-[11px] font-black text-[#2A1A4A] font-mono">
              {progressPercent}%
            </span>
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-[#2A1A4A] font-heading">
              Progres Ibadah
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {completedCount} dari {totalCount} sholat selesai
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
            resetTodayGoals();
          }}
          className="text-xs font-bold text-slate-400 hover:text-[#2A1A4A] flex items-center gap-1 active:scale-95"
          title="Reset checklist hari ini"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Filter Chips: "Semua", "5 Waktu", "Fardhu", "Sunnah" */}
      <div className="relative z-10 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {(['Semua', '5 Waktu', 'Fardhu', 'Sunnah'] as const).map((type) => {
          const isActive = filterType === type;
          return (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 active:scale-95 ${
                isActive
                  ? 'bg-[#2A1A4A] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>

      {/* Prayer Goal Checklist Rows */}
      <div className="relative z-10 space-y-1.5">
        {filteredGoals.map((goal) => {
          const isDone = goal.completed;
          return (
            <button
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className={`w-full min-h-[46px] p-2.5 rounded-2xl flex items-center justify-between transition-all border text-left active:scale-98 ${
                isDone
                  ? 'bg-[#F2EDFD] border-[#C8B5FF]/50 shadow-xs'
                  : 'bg-[#FFFBF7] hover:bg-white border-slate-100 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 min-w-[24px] min-h-[24px] rounded-lg flex items-center justify-center transition-colors ${
                  isDone ? 'bg-[#2A1A4A] text-white' : 'border-2 border-slate-300 bg-white text-transparent'
                }`}>
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>

                <div className="text-left">
                  <div className={`text-xs font-bold ${isDone ? 'line-through text-slate-400' : 'text-[#2A1A4A]'}`}>
                    {goal.name} Waktu: {goal.time} • {goal.type === 'fardhu' ? 'Wajib' : 'Sunnah'}
                  </div>
                </div>
              </div>

              {isDone && (
                <span className="text-[10px] font-bold text-[#D4AF37] px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200">
                  Tertunaikan
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* For Guest: Locked Overlay */}
      {isGuest && (
        <LockedCardOverlay 
          onUnlockClick={() => onLockedClick && onLockedClick()} 
          message="Masuk sebagai jamaah untuk mencatat Progres Ibadah"
        />
      )}
    </div>
  );
};
