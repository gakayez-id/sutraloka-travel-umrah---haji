import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, ChevronRight, ChevronLeft, Bookmark, Share2, Check } from 'lucide-react';

interface DoaItem {
  id: string;
  category: string;
  title: string;
  arabic: string;
  latin: string;
  arti: string;
  reference: string;
}

const DOA_LIST: DoaItem[] = [
  {
    id: 'thawaf',
    category: 'Doa Tawaf',
    title: 'Doa Ketika Melihat Ka\'bah & Putaran Tawaf',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin: 'Rabbana atina fid-dunya hasanah wa fil-akhirati hasanah wa qina \'adzaban-nar',
    arti: 'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.',
    reference: 'QS. Al-Baqarah: 201 • Rukun Yamani ke Hajar Aswad'
  },
  {
    id: 'sai',
    category: 'Doa Sa\'i',
    title: 'Doa Mendaki Bukit Shafa & Marwah',
    arabic: 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ ۖ أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ',
    latin: 'Innash-shafa wal-marwata min sya\'a-irillah, abda-u bima bada-allahu bih',
    arti: 'Sesungguhnya Shafa dan Marwah adalah sebagian dari syi\'ar Allah. Aku memulai dengan apa yang Allah mulai dengannya.',
    reference: 'HR. Muslim no. 1218'
  },
  {
    id: 'masuk-haram',
    category: 'Doa Masjidil Haram',
    title: 'Doa Masuk Masjidil Haram',
    arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    latin: 'Allahummaf-tah lii abwaaba rahmatik',
    arti: 'Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.',
    reference: 'HR. Muslim & Abu Dawud'
  },
  {
    id: 'melihat-kabah',
    category: 'Doa Ka\'bah',
    title: 'Doa Pertama Kali Memandang Ka\'bah',
    arabic: 'اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً',
    latin: 'Allahumma zid hadzal-baita tasyriifan wa ta\'zhiiman wa takriiman wa mahaabah',
    arti: 'Ya Allah, tambahkanlah kemuliaan, keagungan, kehormatan, dan kehebatan pada Rumah (Ka\'bah) ini.',
    reference: 'Sunan Sa\'id bin Manshur & Mushannaf'
  }
];

export const DoaHarianWidget: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const currentDoa = DOA_LIST[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DOA_LIST.length);
    setIsSaved(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + DOA_LIST.length) % DOA_LIST.length);
    setIsSaved(false);
  };

  const playSynthesizedChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = audioContextRef.current || new AudioCtx();
      audioContextRef.current = ctx;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      setIsPlayingAudio(true);

      // Play soft spiritual bell / chime overtone
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.18);

        gain.gain.setValueAtTime(0, now + i * 0.18);
        gain.gain.linearRampToValueAtTime(0.15, now + i * 0.18 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.18 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.18);
        osc.stop(now + i * 0.18 + 1.3);
      });

      setTimeout(() => {
        setIsPlayingAudio(false);
      }, 1600);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${currentDoa.title}\n\n${currentDoa.arabic}\n\nArtinya: "${currentDoa.arti}"\n(${currentDoa.reference})\n\n— Sutraloka Umrah & Hajj`);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Background Accent Subtle Glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-[#A577FF]/10 to-[#FF7A3D]/10 blur-xl pointer-events-none" />

      {/* Header Row */}
      <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#A577FF]/15 text-[#633BB3] border border-[#A577FF]/30">
            Doa Manasik
          </span>
          <span className="text-[11px] font-medium text-gray-500">
            {currentIndex + 1} dari {DOA_LIST.length}
          </span>
        </div>

        {/* Audio & Actions */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={playSynthesizedChime}
            aria-label="Dengarkan Lantunan Nada Doa"
            className={`p-1.5 rounded-full transition-colors flex items-center gap-1 text-xs ${
              isPlayingAudio
                ? 'bg-[#FF7A3D] text-white shadow-sm animate-pulse'
                : 'bg-gray-100 text-gray-600 hover:bg-[#FF7A3D]/15 hover:text-[#FF7A3D]'
            }`}
            title="Dengarkan Nada Suara"
          >
            {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="text-[10px] font-medium pr-0.5">{isPlayingAudio ? 'Melantun...' : 'Audio'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            aria-label="Simpan Doa Favorit"
            className={`p-1.5 rounded-full transition-colors ${
              isSaved ? 'bg-amber-100 text-amber-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleShare}
            aria-label="Salin Teks Doa"
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors relative"
          >
            {copiedNotification ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold text-[#150A35] mb-2 leading-snug">
        {currentDoa.title}
      </h3>

      {/* Arabic Script Card */}
      <div className="bg-[#FFF9F5] border border-[#FF7A3D]/20 rounded-xl p-3.5 mb-2.5 text-right shadow-inner">
        <p className="font-serif text-lg leading-relaxed text-[#150A35] font-semibold tracking-wide select-all" dir="rtl">
          {currentDoa.arabic}
        </p>
      </div>

      {/* Transliteration Latin */}
      <p className="text-[11px] italic text-[#633BB3] mb-1.5 leading-relaxed font-medium">
        "{currentDoa.latin}"
      </p>

      {/* Translation Arti */}
      <p className="text-[11.5px] text-gray-700 mb-2 leading-relaxed">
        <span className="font-semibold text-gray-900">Artinya: </span>
        {currentDoa.arti}
      </p>

      {/* Reference Citation & Next/Prev Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2 text-[10px] text-gray-400">
        <span className="truncate max-w-[170px]" title={currentDoa.reference}>
          {currentDoa.reference}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Doa Sebelumnya"
            className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Doa Selanjutnya"
            className="p-1 rounded-md bg-[#FF7A3D] hover:bg-[#FF6B00] text-white transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
