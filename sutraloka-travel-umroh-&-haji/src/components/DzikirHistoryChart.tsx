import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { LockedCardOverlay } from './LockedCardOverlay';

interface DzikirHistoryChartProps {
  className?: string;
  onOpenTasbihModal?: () => void;
  isGuest?: boolean;
  onLockedClick?: () => void;
}

export const DzikirHistoryChart: React.FC<DzikirHistoryChartProps> = ({
  className = '',
  onOpenTasbihModal,
  isGuest = false,
  onLockedClick
}) => {
  // 7 days data: Jum, Sab, Min, Sen, Sel, Rab, Kam (Total = 859)
  const chartData = [
    { day: 'Jum', count: 120, isToday: false },
    { day: 'Sab', count: 132, isToday: false },
    { day: 'Min', count: 99, isToday: false },
    { day: 'Sen', count: 165, isToday: false },
    { day: 'Sel', count: 198, isToday: false },
    { day: 'Rab', count: 145, isToday: false },
    { day: 'Kam', count: 0, isToday: true } // Today (Kam) handle
  ];

  const totalWeekly = 859;
  const maxBar = 200;

  return (
    <div className={`relative overflow-hidden p-5 rounded-[24px] bg-white border border-amber-100 shadow-sm space-y-4 ${className}`}>
      
      {/* Real photo subtle background accent */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.03] pointer-events-none rounded-[24px]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80')`
        }}
      />

      {/* Header Row: icon circle #F3F0FF + title LEFT + sub 12px grey + pill lavender + TOTAL 7 HARI 859 Kali 20px RIGHT */}
      <div className="relative z-10 flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-start gap-3 text-left">
          {/* Icon chart 40px circle #F3F0FF */}
          <div className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-[#F3F0FF] flex items-center justify-center text-[#2A1A4A] shrink-0 mt-0.5">
            <BarChart3 className="w-5 h-5 text-[#2A1A4A]" />
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-[16px] font-black text-[#2A1A4A] font-heading leading-tight">
                Riwayat Dzikir 7 Hari
              </h4>
              {/* Middle pill "7 Hari Terakhir" lavender LEFT */}
              <span className="text-[10px] font-extrabold text-[#2A1A4A] bg-[#C8B5FF]/30 px-2 py-0.5 rounded-full">
                7 Hari Terakhir
              </span>
            </div>
            <p className="text-[12px] text-slate-500 font-medium">
              Pantau istiqomah dzikir harian Anda
            </p>
          </div>
        </div>

        {/* Right: TOTAL 7 HARI 859 Kali 20px bold RIGHT */}
        <div className="text-right shrink-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            TOTAL 7 HARI
          </span>
          <span className="text-[20px] font-black text-[#2A1A4A] font-mono leading-none block mt-0.5">
            {totalWeekly} <span className="text-xs font-bold font-sans">Kali</span>
          </span>
        </div>
      </div>

      {/* Chart Canvas: equal flex justify-between gap 8px */}
      <div className="relative z-10 pt-2 pb-1">
        <div className="flex items-end justify-between gap-2 px-1">
          {chartData.map((item) => {
            const heightPercent = item.count === 0 ? 12 : Math.round((item.count / maxBar) * 100);

            return (
              <div
                key={item.day}
                className="flex-1 flex flex-col items-center justify-end group select-none"
              >
                {/* Numbers CENTER above bar */}
                <span
                  className={`text-[10px] font-black font-mono text-center transition-colors mb-1.5 ${
                    item.isToday
                      ? 'text-[#2A1A4A]'
                      : 'text-slate-500'
                  }`}
                >
                  {item.count}
                </span>

                {/* Bars capsule 48px track white, fill #D6C7FF, today Kam dark plum handle */}
                <div className="w-full max-w-[36px] bg-white rounded-full p-0.5 flex items-end justify-center h-28 border border-slate-200/80 shadow-2xs">
                  <div
                    className={`w-full rounded-full transition-all duration-300 ${
                      item.isToday
                        ? 'bg-[#2A1A4A] ring-2 ring-[#C8B5FF]'
                        : 'bg-[#D6C7FF] group-hover:bg-[#C8B5FF]'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                {/* Labels CENTER below bar */}
                <span
                  className={`text-[11px] font-bold text-center mt-2 ${
                    item.isToday ? 'text-[#2A1A4A] underline font-black' : 'text-slate-500'
                  }`}
                >
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* For Guest: Locked Overlay */}
      {isGuest && (
        <LockedCardOverlay 
          onUnlockClick={() => onLockedClick && onLockedClick()} 
          message="Masuk sebagai jamaah untuk membuka Riwayat Dzikir 859 Kali"
        />
      )}
    </div>
  );
};
