import React, { useState, useEffect } from 'react';
import { Lock, Phone, X, ShieldCheck, ArrowRight, Delete } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [phoneNumber, setPhoneNumber] = useState('0812345678');
  const [pin, setPin] = useState('123456');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setErrorMsg('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleKeypadPress = (val: string) => {
    if (pin.length < 6) {
      const nextPin = pin + val;
      setPin(nextPin);
      setErrorMsg('');
    }
  };

  const handleBackspace = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
      setErrorMsg('');
    }
  };

  const handleClearPin = () => {
    setPin('');
    setErrorMsg('');
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pin.length < 6) {
      setErrorMsg('Masukkan 6-digit PIN keamanan jamaah');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(phoneNumber || 'Hasna');
      onClose();
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm p-0 animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-Up Bottom Sheet Card */}
      <div 
        className="relative z-10 w-full max-w-md bg-[#150A35]/95 backdrop-blur-xl text-white rounded-t-3xl border-t border-white/20 p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[92vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Drag Handle Bar */}
        <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mb-4" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FF7A3D]/20 border border-[#FF7A3D]/30 flex items-center justify-center text-[#FF7A3D]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-heading">
                Masuk Akun Jamaah
              </h2>
              <span className="text-xs text-slate-300 font-medium">
                Sutra Tour & Travel (Sutraloka)
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors active:scale-95"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Field 1: Phone Number / Username Input */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-slate-300 block">
              Nomor WhatsApp / Username Jamaah
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Contoh: 0812345678"
                className="w-full pl-10 pr-4 py-3 bg-white/10 text-white placeholder-slate-400 border border-white/20 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FF7A3D] focus:border-[#FF7A3D] transition-colors"
                required
              />
            </div>
          </div>

          {/* Field 2: 6-Digit PIN/Password Input with Visual Bullet Indicators */}
          <div className="space-y-2 text-center pt-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 block">
                6-Digit PIN Keamanan
              </label>
              <button
                type="button"
                onClick={handleClearPin}
                className="text-[11px] text-[#A577FF] hover:text-[#C8B5FF] font-medium"
              >
                Hapus Semua
              </button>
            </div>

            {/* 6 Visual Bullet / Dot Indicators */}
            <div className="flex gap-3 justify-center my-4 py-1">
              {[0, 1, 2, 3, 4, 5].map((index) => {
                const isFilled = index < pin.length;
                return (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                      isFilled
                        ? 'bg-[#FF7A3D] border-[#FF7A3D] scale-110 shadow-[0_0_10px_rgba(255,122,61,0.6)]'
                        : 'bg-white/10 border-white/30'
                    }`}
                  />
                );
              })}
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400 font-medium animate-in fade-in">
                {errorMsg}
              </p>
            )}

            {/* Interactive Numeric Keypad */}
            <div className="grid grid-cols-3 gap-2 max-w-[280px] mx-auto pt-1">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => handleKeypadPress(digit)}
                  className="h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-base transition-all active:scale-95 flex items-center justify-center border border-white/10"
                >
                  {digit}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPin('123456')}
                className="h-11 rounded-xl bg-white/5 hover:bg-white/15 text-[11px] text-[#A577FF] font-semibold transition-all active:scale-95 flex items-center justify-center border border-white/10 px-1"
                title="Gunakan PIN Demo"
              >
                Demo PIN
              </button>
              <button
                type="button"
                onClick={() => handleKeypadPress('0')}
                className="h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-base transition-all active:scale-95 flex items-center justify-center border border-white/10"
              >
                0
              </button>
              <button
                type="button"
                onClick={handleBackspace}
                className="h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all active:scale-95 flex items-center justify-center border border-white/10"
                aria-label="Hapus Digit Terakhir"
              >
                <Delete className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Action Button: "Masuk Sekarang" styled in Sutraloka Warm Orange */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FF7A3D] text-white hover:bg-[#FF6B00] rounded-xl font-bold py-3.5 shadow-lg shadow-[#FF7A3D]/25 transition-all active:scale-98 flex items-center justify-center gap-2 text-sm"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Masuk Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Security badge footer */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 text-[11px] text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-[#A577FF]" />
          <span>Keamanan data jamaah terenkripsi resmi Kemenag RI</span>
        </div>
      </div>
    </div>
  );
};
