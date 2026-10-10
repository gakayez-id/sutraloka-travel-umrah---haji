import React, { useState } from 'react';
import { X, Send, Bot } from 'lucide-react';
import { SutralokaHeaderBrand } from './SutralokaHeaderBrand';

interface MasAabAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MasAabAssistantDrawer: React.FC<MasAabAssistantDrawerProps> = ({
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'Assalamu’alaikum Warahmatullah! Saya Mas Aab, asisten resmi Sutraloka Tour & Travel. Ada yang bisa saya bantu seputar paket umroh, jadwal keberangkatan, atau izin permit Raudhah?',
      time: 'Baru saja'
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickQuestions = [
    'Rekomendasi paket 13 hari',
    'Syarat vaksin umroh 2026',
    'Cara booking permit Raudhah',
    'Hotel bintang 5 Makkah'
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg = { sender: 'user' as const, text, time: 'Baru saja' };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    setTimeout(() => {
      let reply = 'Baik, tim konsultan Sutraloka siap membantu rincian tersebut. Anda juga bisa langsung memilih jadwal di tab Kalender atau menghubungi CS kami via WhatsApp.';
      
      const lower = text.toLowerCase();
      if (lower.includes('13 hari') || lower.includes('paket')) {
        reply = 'Paket 13 Hari Sutraloka (mulai Rp 35.000.000 - Rp 37.500.000) sudah include tiket Saudia/Garuda direct, hotel bintang 5/4 dekat Masjidil Haram, muthawwif bersertifikat, dan free city tour Thaif.';
      } else if (lower.includes('vaksin') || lower.includes('syarat')) {
        reply = 'Sesuai regulasi Kemenkes 2026, jamaah wajib vaksin Meningitis berlisensi resmi dan vaksin Influenza yang terdata di sistem internasional.';
      } else if (lower.includes('raudhah') || lower.includes('permit')) {
        reply = 'Slot permit Raudhah diatur via aplikasi resmi Nusuk dan terintegrasi langsung dengan E-Ticket QR Sutraloka di menu Permits.';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: reply, time: 'Baru saja' }]);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex flex-col h-[85vh] sm:h-[600px] overflow-hidden shadow-2xl transition-colors">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-[#A577FF]/20 bg-[#F5F7FC] dark:bg-[#150A35] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#A577FF] to-violet-600 p-0.5 shadow-sm">
              <div className="w-full h-full rounded-2xl bg-white dark:bg-[#1E1148] flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#A577FF]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-extrabold text-[#150A35] dark:text-white font-heading">
                  Mas Aab - Digital Concierge
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Sutra Tour & Travel Assistant
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/70 dark:bg-[#150A35] hover:bg-slate-200 dark:hover:bg-[#1E1148] flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors border border-transparent dark:border-[#A577FF]/20"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F5F7FC] dark:bg-[#150A35]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-3xl p-3.5 text-xs leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#A577FF] text-white rounded-br-none shadow-md shadow-[#A577FF]/30'
                    : 'bg-white dark:bg-[#1E1148] border border-slate-200/70 dark:border-[#A577FF]/20 text-[#150A35] dark:text-slate-200 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1">{msg.time}</span>
            </div>
          ))}

          {/* Quick Questions */}
          <div className="pt-2">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
              Pertanyaan Cepat:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-[#1E1148] hover:bg-[#A577FF]/10 text-[#150A35] dark:text-slate-200 border border-slate-200 dark:border-[#A577FF]/20 hover:border-[#A577FF]/40 transition-colors shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-100 dark:border-[#A577FF]/20 bg-white dark:bg-[#1E1148] flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
            placeholder="Tanyakan jadwal, biaya, atau fasilitas..."
            className="flex-1 bg-[#F5F7FC] dark:bg-[#150A35] border border-slate-200 dark:border-[#A577FF]/20 rounded-full px-4 py-3 text-xs text-[#150A35] dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#A577FF] focus:bg-white dark:focus:bg-[#150A35]"
          />
          <button
            onClick={() => handleSend(inputValue)}
            className="w-10 h-10 rounded-full bg-[#A577FF] hover:opacity-90 text-white flex items-center justify-center shadow-md transition-transform active:scale-95 shrink-0"
            aria-label="Kirim Pesan"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
