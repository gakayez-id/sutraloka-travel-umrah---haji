import React, { useState, useRef } from 'react';
import { RotateCcw, Volume2, VolumeX, Maximize2, ChevronRight } from 'lucide-react';
import { DHIKR_LIST } from './DigitalTasbihModal';
import { LockedCardOverlay } from './LockedCardOverlay';
import tasbihPrayerBg from '../assets/images/tasbih_prayer_dhikr_bg_1791563467672.jpg';

interface DigitalTasbihWidgetProps {
  onOpenFullTasbih: (dhikrId?: string) => void;
  isGuest?: boolean;
  onLockedClick?: () => void;
}

export const DigitalTasbihWidget: React.FC<DigitalTasbihWidgetProps> = ({
  onOpenFullTasbih,
  isGuest = false,
  onLockedClick
}) => {
  const [currentDhikrIndex, setCurrentDhikrIndex] = useState(0);
  const [count, setCount] = useState<number>(0);
  const [target, setTarget] = useState<number>(33);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isPressing, setIsPressing] = useState<boolean>(false);

  const dhikr = DHIKR_LIST[currentDhikrIndex];
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playClickSound = (isMilestone: boolean) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (isMilestone) {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      }
    } catch {
      // Audio playback best-effort
    }
  };

  const handleTap = () => {
    if (isGuest) {
      if (onLockedClick) onLockedClick();
      return;
    }

    setIsPressing(true);
    setTimeout(() => setIsPressing(false), 100);

    const nextCount = count + 1;
    setCount(nextCount);

    const saved = localStorage.getItem('sutraloka_tasbih_daily_total');
    const newTotal = (saved ? parseInt(saved, 10) : 0) + 1;
    localStorage.setItem('sutraloka_tasbih_daily_total', newTotal.toString());

    const isHit = target > 0 && nextCount % target === 0;
    playClickSound(isHit);

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(isHit ? [50, 40, 80] : 18);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCount(0);
  };

  const handleNextDhikr = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (currentDhikrIndex + 1) % DHIKR_LIST.length;
    setCurrentDhikrIndex(nextIdx);
    setTarget(DHIKR_LIST[nextIdx].defaultTarget);
    setCount(0);
  };

  const progress = Math.min(100, (count / target) * 100);

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-[#120726] border border-[#C8B5FF]/30 p-5 shadow-md">
      
      {/* Full-width authentic photo of person doing dhikr with prayer beads */}
      <img
        src={tasbihPrayerBg}
        alt="Jamaah berdzikir dengan tasbih"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none filter brightness-[0.75] contrast-[1.05]"
      />

      {/* Atmospheric dark gradient overlay for crystal clear contrast and legible controls */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[#2A1A4A]/30 mix-blend-multiply pointer-events-none" />

      {/* Header Row */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/15">
        <div className="text-left">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-extrabold text-white font-heading">
              Tasbih & Dzikir Harian
            </h3>
            <span className="text-[10px] font-bold text-amber-300 bg-white/15 px-2 py-0.5 rounded-full border border-white/20 backdrop-blur-xs">
              Interaktif
            </span>
          </div>
          <span className="text-xs text-white/75 font-medium block mt-0.5">
            Berdzikir kapan saja
          </span>
        </div>

        {/* Controls: Speaker + Expand Icon */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
              setSoundEnabled(!soundEnabled);
            }}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/20 shadow-xs backdrop-blur-md active:scale-95"
            title={soundEnabled ? "Suara aktif" : "Hening"}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4 text-white/50" />}
          </button>

          <button
            onClick={() => {
              if (isGuest && onLockedClick) {
                onLockedClick();
                return;
              }
              if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
              onOpenFullTasbih(dhikr.id);
            }}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/20 shadow-xs backdrop-blur-md active:scale-95"
            title="Layar Penuh"
            aria-label="Full screen Tasbih"
          >
            <Maximize2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="relative z-10 flex items-center justify-between gap-4 pt-3.5">
        
        {/* Left: Dhikr Info */}
        <div className="space-y-1.5 flex-1 min-w-0">
          <button
            onClick={handleNextDhikr}
            className="min-h-[28px] inline-flex items-center gap-1 text-[11px] font-bold text-white bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors border border-white/25 shadow-xs backdrop-blur-md active:scale-95"
            title="Ganti Lafadz Dzikir"
          >
            <span>{dhikr.latin}</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/80" />
          </button>

          <div className="text-xl sm:text-2xl font-bold text-amber-200 font-serif leading-tight truncate mt-1 drop-shadow-md">
            {dhikr.arabic}
          </div>
          <p className="text-xs text-white/80 truncate drop-shadow-xs">
            {dhikr.meaning}
          </p>

          {/* Progress Bar & Reset */}
          <div className="pt-1.5 flex items-center gap-3">
            <div className="flex-1 bg-white/20 h-2 rounded-full overflow-hidden border border-white/20">
              <div
                className="bg-gradient-to-r from-[#A577FF] to-amber-300 h-full rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
            <button
              onClick={handleReset}
              className="text-xs font-bold text-white/70 hover:text-white flex items-center gap-1 active:scale-95 transition-colors"
              title="Reset ke 0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Right: Big TAP circle button 80px */}
        <button
          onClick={handleTap}
          className={`w-20 h-20 min-w-[80px] min-h-[80px] rounded-full bg-gradient-to-br from-[#A577FF] to-[#633BB3] text-white shadow-xl shadow-black/40 border border-white/30 flex flex-col items-center justify-center p-2 text-center select-none active:scale-90 transition-all shrink-0 cursor-pointer ${
            isPressing ? 'scale-90 ring-4 ring-[#C8B5FF]/80' : 'hover:scale-105'
          }`}
          aria-label="Tap Dzikir"
        >
          <span className="text-xs font-black tracking-tight leading-none text-white drop-shadow-xs">
            {count} TAP
          </span>
          <span className="text-[10px] text-amber-300 font-bold mt-1">
            / {target}
          </span>
          <span className="text-[11px] text-white/90 font-serif leading-none mt-0.5 truncate max-w-[70px]">
            {dhikr.arabic}
          </span>
        </button>
      </div>

      {/* For Guest: Locked Overlay */}
      {isGuest && (
        <LockedCardOverlay 
          onUnlockClick={() => onLockedClick && onLockedClick()} 
          message="Masuk sebagai jamaah untuk membuka Tasbih Digital"
        />
      )}
    </div>
  );
};
