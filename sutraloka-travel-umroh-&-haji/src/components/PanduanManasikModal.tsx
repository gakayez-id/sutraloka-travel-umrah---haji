import React, { useState, useEffect } from 'react';
import { 
  X, 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  ChevronLeft, 
  Bookmark, 
  Award, 
  Compass, 
  Heart,
  RotateCcw,
  Volume2
} from 'lucide-react';

export interface ManasikStep {
  id: string;
  stepNumber: number;
  title: string;
  category: 'Umrah' | 'Hajj';
  arabicDoa?: string;
  latinDoa?: string;
  artiDoa?: string;
  description: string;
  instructions: string[];
  tips: string;
}

export const MANASIK_GUIDE_DATA: ManasikStep[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    category: 'Umrah',
    title: "1. Niat & Berihram dari Miqat",
    arabicDoa: "لَبَّيْكَ اللَّهُمَّ عُمْرَةً",
    latinDoa: "Labbaikallahumma 'umratan",
    artiDoa: "Aku penuhi panggilan-Mu ya Allah untuk menunaikan ibadah umrah.",
    description: "Memulai rangkaian ibadah umrah dengan bersuci, memakai pakaian ihram, dan berniat ikhlas karena Allah di miqat yang ditentukan (seperti Yalamlam atau Dzulhulaifah/Bir Ali).",
    instructions: [
      "Mandi sunnah ihram, memotong kuku, dan merapikan kumis/rambut sebelum berihram.",
      "Mengenakan 2 helai kain ihram tidak berjahit bagi laki-laki; pakaian syar'i penutup aurat bagi perempuan.",
      "Sholat sunnah ihram 2 rakaat jika memungkinkan.",
      "Mengucapkan lafadz niat umrah saat melintasi batas miqat.",
      "Memperbanyak membaca talbiyah hingga tiba di pelataran Masjidil Haram."
    ],
    tips: "Hindari larangan ihram: memakai wewangian, memotong kuku/rambut, menutup kepala dengan topi (pria), dan bertengkar."
  },
  {
    id: 'step-2',
    stepNumber: 2,
    category: 'Umrah',
    title: "2. Masuk Masjidil Haram & Doa Melihat Ka'bah",
    arabicDoa: "اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً",
    latinDoa: "Allahumma zid hadzal baita tasyrifan wa ta'zhiman wa takriman wa mahabatan",
    artiDoa: "Ya Allah, tambahkanlah kemuliaan, keagungan, kehormatan, dan wibawa pada rumah (Ka'bah) ini.",
    description: "Memasuki Masjidil Haram dengan mendahulukan kaki kanan seraya berdoa, kemudian memandang Ka'bah dengan rasa khusyuk dan takjub.",
    instructions: [
      "Masuk melalui pintu yang ditentukan dengan mendahulukan kaki kanan.",
      "Membaca doa masuk masjid: 'Bismillahi wash-shalatu was-salamu 'ala Rasulillah...'.",
      "Mengangkat tangan dan memanjatkan doa saat pertama kali memandang Ka'bah (doa mustajab).",
      "Menuju sudut Hajar Aswad untuk bersiap memulai tawaf."
    ],
    tips: "Tetap tenang dan jaga fokus ibadah tanpa berdesakan berlebihan dengan rombongan."
  },
  {
    id: 'step-3',
    stepNumber: 3,
    category: 'Umrah',
    title: "3. Tawaf Mengelilingi Ka'bah (7 Putaran)",
    arabicDoa: "بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ",
    latinDoa: "Bismillahi Allahu Akbar",
    artiDoa: "Dengan nama Allah, dan Allah Maha Besar.",
    description: "Mengelilingi Ka'bah sebanyak 7 putaran berlawanan arah jarum jam, dimulai dan diakhiri sejajar dengan garis Hajar Aswad.",
    instructions: [
      "Posisi pundak kiri menghadap Ka'bah saat tawaf.",
      "Setiap melintasi Hajar Aswad, menghadap ke arahnya sambil melambaikan tangan kanan (istilam) dan membaca takbir.",
      "Disunnahkan berlari-lari kecil (raml) pada 3 putaran pertama bagi laki-laki.",
      "Membaca doa sapu jagad di antara Rukun Yamani dan Hajar Aswad: 'Rabbana atina fid-dunya hasanah...'.",
      "Menyelesaikan 7 putaran penuh dalam keadaan suci dari hadats."
    ],
    tips: "Berdzikir dan berdoa sesuai hajat pribadi, tidak harus terpaku pada hafalan teks panjang."
  },
  {
    id: 'step-4',
    stepNumber: 4,
    category: 'Umrah',
    title: "4. Sholat Sunnah Tawaf & Minum Air Zamzam",
    arabicDoa: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ",
    latinDoa: "Allahumma inni as-aluka 'ilman nafi'an wa rizqan wasi'an wa syifa-an min kulli da-in",
    artiDoa: "Ya Allah, aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang luas, dan kesembuhan dari segala penyakit.",
    description: "Melaksanakan sholat sunnah 2 rakaat di belakang Maqam Ibrahim (atau di mana pun di pelataran masjid) dan meminum air zamzam.",
    instructions: [
      "Sholat 2 rakaat: rakaat pertama membaca Surat Al-Kafirun, rakaat kedua Al-Ikhlas.",
      "Berdoa di belakang Maqam Ibrahim.",
      "Menuju tempat air zamzam, minum sambil berdiri dan menghadap kiblat dengan membaca doa zamzam."
    ],
    tips: "Basuhlah wajah dan kepala dengan air zamzam untuk menyegarkan badan sebelum menuju bukit Shafa."
  },
  {
    id: 'step-5',
    stepNumber: 5,
    category: 'Umrah',
    title: "5. Sa'i Antara Shafa & Marwah (7 Kali)",
    arabicDoa: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ",
    latinDoa: "Innash-shafa wal-marwata min sya'a-irillah",
    artiDoa: "Sesungguhnya Shafa dan Marwah adalah sebagian dari syiar-syiar Allah.",
    description: "Berjalan bolak-balik antara bukit Shafa dan bukit Marwah sebanyak 7 kali perjalanan, dimulai di Shafa dan berakhir di Marwah.",
    instructions: [
      "Mulai perjalanan ke-1 dari bukit Shafa menuju Marwah.",
      "Di atas Shafa, menghadap Ka'bah, bertakbir 3 kali, dan memanjatkan doa.",
      "Berlari-lari kecil bagi laki-laki di antara dua pilar lampu hijau.",
      "Perjalanan dari Shafa ke Marwah dihitung 1 kali; Marwah ke Shafa dihitung perjalanan ke-2.",
      "Perjalanan ke-7 berakhir sempurna di bukit Marwah."
    ],
    tips: "Gunakan jalur ber-AC dan kenakan sandal tawaf yang nyaman untuk menjaga telapak kaki tetap fit."
  },
  {
    id: 'step-6',
    stepNumber: 6,
    category: 'Umrah',
    title: "6. Tahallul (Cukur / Potong Rambut)",
    arabicDoa: "اللَّهُمَّ اجْعَلْ لِي بِكُلِّ شَعْرَةٍ نُورًا يَوْمَ الْقِيَامَةِ",
    latinDoa: "Allahummaj'al li bikulli sya'ratin nuran yaumal qiyamah",
    artiDoa: "Ya Allah, jadikanlah untukku pada setiap helai rambut ini cahaya di hari kiamat.",
    description: "Mencukur gundul (tahliq) atau memendekkan rambut (taqshir) minimal 3 helai sebagai penutup rangkaian ibadah umrah.",
    instructions: [
      "Bagi laki-laki lebih utama mencukur gundul (tahliq) atau memotong rata rambutnya.",
      "Bagi perempuan cukup memotong ujung rambut sepanjang satu ruas jari (± 2 cm).",
      "Setelah tahallul, seluruh larangan ihram kembali menjadi halal dan ibadah umrah selesai dengan sempurna."
    ],
    tips: "Alhamdulillah! Anda kini telah resmi menyelesaikan seluruh rukun umrah dengan sempurna."
  }
];

interface PanduanManasikModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast?: (msg: string) => void;
}

export const PanduanManasikModal: React.FC<PanduanManasikModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sutraloka_manasik_progress');
      return saved ? JSON.parse(saved) : ['step-1'];
    } catch {
      return ['step-1'];
    }
  });

  useEffect(() => {
    localStorage.setItem('sutraloka_manasik_progress', JSON.stringify(completedSteps));
  }, [completedSteps]);

  if (!isOpen) return null;

  const currentStep = MANASIK_GUIDE_DATA[activeStepIndex];
  const isCurrentCompleted = completedSteps.includes(currentStep.id);
  const totalSteps = MANASIK_GUIDE_DATA.length;
  const progressPercent = Math.round((completedSteps.length / totalSteps) * 100);

  const toggleStepCompleted = (stepId: string) => {
    setCompletedSteps((prev) => {
      const isAlready = prev.includes(stepId);
      const next = isAlready ? prev.filter((id) => id !== stepId) : [...prev, stepId];
      if (!isAlready && typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(25);
      }
      if (onShowToast) {
        onShowToast(!isAlready ? 'Rukun Manasik ditandai selesai!' : 'Status rukun diperbarui');
      }
      return next;
    });
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset progres membaca panduan manasik?')) {
      setCompletedSteps([]);
      setActiveStepIndex(0);
      if (onShowToast) onShowToast('Progres manasik di-reset');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-t-[32px] sm:rounded-[32px] bg-white dark:bg-[#1E1148] border border-slate-200/80 dark:border-[#A577FF]/20 flex flex-col max-h-[92vh] overflow-hidden shadow-2xl transition-colors">
        
        {/* Modal Top Header */}
        <div className="p-4 bg-white dark:bg-[#1E1148] border-b border-slate-100 dark:border-[#A577FF]/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#A577FF] p-0.5 shadow-sm">
              <div className="w-full h-full rounded-2xl bg-white dark:bg-[#150A35] flex items-center justify-center text-[#A577FF]">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-extrabold text-[#150A35] dark:text-white font-heading">
                  Panduan Manasik Umroh
                </h3>
                <span className="text-[10px] font-bold text-[#A577FF] bg-[#A577FF]/10 dark:bg-[#150A35] px-2 py-0.5 rounded-full">
                  Step-by-Step
                </span>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-400">
                Tata cara ibadah resmi sesuai sunnah
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#150A35] hover:bg-slate-200 dark:hover:bg-[#150A35]/80 text-[#150A35] dark:text-slate-300 flex items-center justify-center transition-colors"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar & Indicators */}
        <div className="px-5 pt-3 pb-2 bg-[#A577FF]/10 dark:bg-[#150A35] border-b border-[#A577FF]/20">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#150A35] dark:text-slate-300 font-semibold text-[11px]">
              Progres Manasik: <strong className="text-[#A577FF]">{completedSteps.length} dari {totalSteps} Rukun</strong>
            </span>
            <span className="text-xs font-mono font-bold text-[#A577FF]">
              {progressPercent}%
            </span>
          </div>

          {/* Step Dots Bar */}
          <div className="flex items-center gap-1.5">
            {MANASIK_GUIDE_DATA.map((step, idx) => {
              const isDone = completedSteps.includes(step.id);
              const isCurrent = idx === activeStepIndex;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`flex-1 h-2 rounded-full transition-all ${
                    isCurrent
                      ? 'bg-[#A577FF] ring-2 ring-[#A577FF]/40'
                      : isDone
                      ? 'bg-emerald-500'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                  title={step.title}
                />
              );
            })}
          </div>
        </div>

        {/* Scrollable Step Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4 bg-[#F5F7FC] dark:bg-[#150A35]">
          
          {/* Step Header Card */}
          <div className="p-4 rounded-3xl bg-white dark:bg-[#1E1148] border border-slate-200/80 dark:border-[#A577FF]/20 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A577FF] bg-[#A577FF]/10 dark:bg-[#150A35] px-2.5 py-1 rounded-xl">
                Rukun ke-{currentStep.stepNumber} dari {totalSteps}
              </span>

              <button
                onClick={() => toggleStepCompleted(currentStep.id)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  isCurrentCompleted
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-slate-100 text-slate-600 dark:bg-[#150A35] dark:text-slate-300 hover:bg-[#A577FF]/10 hover:text-[#A577FF]'
                }`}
              >
                <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrentCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{isCurrentCompleted ? 'Sudah Dipelajari' : 'Tandai Selesai'}</span>
              </button>
            </div>

            <h4 className="text-base font-extrabold text-[#150A35] dark:text-white font-heading">
              {currentStep.title}
            </h4>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentStep.description}
            </p>
          </div>

          {/* Doa & Lafadz Card */}
          {currentStep.arabicDoa && (
            <div className="p-4 rounded-3xl bg-white dark:bg-[#1E1148] border border-[#A577FF]/20 space-y-2.5 text-center shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A577FF] block">
                Lafadz Bacaan & Doa
              </span>

              <div className="text-xl sm:text-2xl font-serif font-bold text-[#150A35] dark:text-white leading-relaxed select-none">
                {currentStep.arabicDoa}
              </div>

              {currentStep.latinDoa && (
                <div className="text-xs font-semibold text-[#A577FF] italic">
                  "{currentStep.latinDoa}"
                </div>
              )}

              {currentStep.artiDoa && (
                <p className="text-[11px] text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-[#A577FF]/20 pt-2">
                  Artinya: {currentStep.artiDoa}
                </p>
              )}
            </div>
          )}

          {/* Instructions List */}
          <div className="p-4 rounded-3xl bg-white dark:bg-[#1E1148] border border-slate-200/80 dark:border-[#A577FF]/20 shadow-sm space-y-2.5">
            <span className="text-xs font-extrabold text-[#150A35] dark:text-white font-heading block">
              Langkah & Tata Cara Praktis:
            </span>

            <div className="space-y-2">
              {currentStep.instructions.map((inst, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-[#A577FF]/10 text-[#A577FF] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <span>{inst}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Card */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
            <BookOpen className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="block text-amber-950 dark:text-amber-100 font-bold">Catatan Muthawwif:</strong>
              {currentStep.tips}
            </div>
          </div>
        </div>

        {/* Modal Bottom Navigation Buttons */}
        <div className="p-4 bg-white dark:bg-[#1E1148] border-t border-slate-100 dark:border-[#A577FF]/20 flex items-center justify-between gap-3">
          <button
            onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeStepIndex === 0}
            className="flex-1 py-3 px-3 rounded-2xl bg-slate-100 dark:bg-[#150A35] hover:bg-slate-200 dark:hover:bg-[#150A35]/80 disabled:opacity-40 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          {activeStepIndex < totalSteps - 1 ? (
            <button
              onClick={() => {
                if (!isCurrentCompleted) {
                  toggleStepCompleted(currentStep.id);
                }
                setActiveStepIndex((prev) => Math.min(totalSteps - 1, prev + 1));
              }}
              className="flex-1 py-3 px-3 rounded-2xl bg-[#A577FF] hover:opacity-90 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-[#A577FF]/30 transition-all"
            >
              <span>Lanjut Langkah Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                if (!isCurrentCompleted) {
                  toggleStepCompleted(currentStep.id);
                }
                onClose();
              }}
              className="flex-1 py-3 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Selesai Panduan</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
