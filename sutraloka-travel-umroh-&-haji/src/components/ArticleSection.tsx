import React, { useState } from 'react';
import { Calendar, Clock, ChevronRight, X, BookOpen } from 'lucide-react';
import { SUTRALOKA_DATA, Artikel } from '../data/travelData';

const ARTICLE_THUMBNAILS = [
  'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=400&q=80'
];

export const ArticleSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Artikel | null>(null);
  const articles = SUTRALOKA_DATA.artikel;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-[#2A1A4A] font-heading">
            Berita & Edukasi Umroh
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Panduan manasik, regulasi Kemenag, dan tips ibadah
          </p>
        </div>
      </div>

      {/* Article Cards: Real Photos, Rounded 24px, Soft Shadow */}
      <div className="space-y-2.5">
        {articles.map((art, idx) => {
          const thumb = ARTICLE_THUMBNAILS[idx % ARTICLE_THUMBNAILS.length];
          return (
            <div
              key={idx}
              onClick={() => setSelectedArticle(art)}
              className="group p-3.5 rounded-[24px] bg-white border border-amber-100 hover:border-[#C8B5FF] transition-all duration-200 cursor-pointer shadow-sm flex items-center justify-between gap-3 active:scale-98"
            >
              {/* Real Photo Thumbnail */}
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-[18px] overflow-hidden shrink-0 border border-slate-100 shadow-xs">
                <img
                  src={thumb}
                  alt={art.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text Information */}
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span className="font-extrabold text-[#2A1A4A] bg-[#C8B5FF]/25 px-2 py-0.5 rounded-full">
                    {art.kategori || 'Tips Ibadah'}
                  </span>
                  <span>·</span>
                  <div className="flex items-center gap-0.5">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{art.tanggal}</span>
                  </div>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-[#2A1A4A] group-hover:text-[#3D256B] transition-colors line-clamp-2 leading-snug">
                  {art.judul}
                </h3>

                {art.ringkasan && (
                  <p className="text-[11px] text-slate-500 line-clamp-1 leading-relaxed">
                    {art.ringkasan}
                  </p>
                )}
              </div>

              <div className="w-7 h-7 rounded-full bg-[#FFFBF7] text-slate-400 group-hover:bg-[#C8B5FF]/20 group-hover:text-[#2A1A4A] flex items-center justify-center shrink-0 transition-colors border border-amber-100">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-t-[32px] sm:rounded-[24px] bg-[#FFFBF7] border border-amber-100 flex flex-col max-h-[85vh] overflow-hidden shadow-2xl transition-colors">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-amber-100 bg-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#C8B5FF]/30 text-[#2A1A4A]">
                  {selectedArticle.kategori || 'Artikel'}
                </span>
                <span className="text-xs text-slate-500">{selectedArticle.tanggal}</span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#2A1A4A] transition-colors"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 overflow-y-auto space-y-3.5 no-scrollbar bg-[#FFFBF7]">
              <h3 className="text-base font-extrabold text-[#2A1A4A] font-heading leading-snug">
                {selectedArticle.judul}
              </h3>

              {selectedArticle.ringkasan && (
                <div className="p-3.5 rounded-2xl bg-white border border-amber-100 text-xs font-medium text-[#2A1A4A] leading-relaxed shadow-xs">
                  {selectedArticle.ringkasan}
                </div>
              )}

              <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
                <p>
                  Ibadah Umroh dan Haji merupakan perjalanan spiritual agung yang memerlukan kesiapan fisik, mental, dan keikhlasan niat. Sutraloka Tour & Travel berkomitmen mendampingi jamaah mulai dari manasik komprehensif, bimbingan doa sesuai sunnah, hingga kepastian fasilitas hotel bintang 5 dekat pelataran masjid.
                </p>
                <p>
                  Pastikan kelengkapan berkas paspor dengan masa berlaku minimal 7 bulan, sertifikat vaksin internasional, dan pakaian ihram terbaik siap sebelum tanggal keberangkatan.
                </p>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="p-4 border-t border-amber-100 bg-white">
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-full py-3 rounded-2xl bg-[#2A1A4A] hover:bg-[#3D256B] text-white font-bold text-xs shadow-md transition-all active:scale-98"
              >
                Tutup Artikel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
