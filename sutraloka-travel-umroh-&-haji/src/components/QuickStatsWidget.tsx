import React from 'react';
import { Award, Calendar, FileCheck, ArrowUpRight } from 'lucide-react';

interface QuickStatsWidgetProps {
  points?: number;
  departureDate?: string;
  permitStatus?: string;
  onNavigateTab?: (tab: string) => void;
}

export const QuickStatsWidget: React.FC<QuickStatsWidgetProps> = ({
  points = 450,
  departureDate = '15 Nov 2026',
  permitStatus = 'Disetujui',
  onNavigateTab
}) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      {/* Stat Card 1: Poin Sutra */}
      <div 
        onClick={() => onNavigateTab?.('profile')}
        className="bg-white rounded-xl border border-gray-100 p-2.5 shadow-sm hover:border-[#FF7A3D]/40 transition-all cursor-pointer flex flex-col justify-between"
      >
        <div className="flex items-center justify-between gap-1 mb-1">
          <div className="p-1 rounded-md bg-[#FFF9F5] text-[#FF7A3D]">
            <Award className="w-3.5 h-3.5" />
          </div>
          <ArrowUpRight className="w-3 h-3 text-gray-300" />
        </div>
        <div>
          <span className="text-[10px] font-semibold text-gray-400 block truncate">
            POIN SUTRA
          </span>
          <p className="text-sm font-bold text-[#150A35] truncate leading-tight mt-0.5">
            {points.toLocaleString('id-ID')}
          </p>
          <span className="text-[9px] font-medium text-[#FF7A3D] block truncate mt-0.5">
            Tier Gold
          </span>
        </div>
      </div>

      {/* Stat Card 2: Keberangkatan */}
      <div 
        onClick={() => onNavigateTab?.('jadwal')}
        className="bg-white rounded-xl border border-gray-100 p-2.5 shadow-sm hover:border-[#A577FF]/40 transition-all cursor-pointer flex flex-col justify-between"
      >
        <div className="flex items-center justify-between gap-1 mb-1">
          <div className="p-1 rounded-md bg-[#F5F7FC] text-[#A577FF]">
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <ArrowUpRight className="w-3 h-3 text-gray-300" />
        </div>
        <div>
          <span className="text-[10px] font-semibold text-gray-400 block truncate">
            BERANGKAT
          </span>
          <p className="text-xs font-bold text-[#150A35] truncate leading-tight mt-0.5">
            {departureDate}
          </p>
          <span className="text-[9px] font-medium text-emerald-600 block truncate mt-0.5">
            SUB - JED
          </span>
        </div>
      </div>

      {/* Stat Card 3: Permit Nusuk */}
      <div 
        onClick={() => onNavigateTab?.('jadwal')}
        className="bg-white rounded-xl border border-gray-100 p-2.5 shadow-sm hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between"
      >
        <div className="flex items-center justify-between gap-1 mb-1">
          <div className="p-1 rounded-md bg-emerald-50 text-emerald-600">
            <FileCheck className="w-3.5 h-3.5" />
          </div>
          <ArrowUpRight className="w-3 h-3 text-gray-300" />
        </div>
        <div>
          <span className="text-[10px] font-semibold text-gray-400 block truncate">
            PERMIT NUSUK
          </span>
          <p className="text-xs font-bold text-emerald-700 truncate leading-tight mt-0.5">
            {permitStatus}
          </p>
          <span className="text-[9px] font-medium text-gray-400 block truncate mt-0.5">
            Slot Raudhah OK
          </span>
        </div>
      </div>
    </div>
  );
};
