import type { ReactNode } from 'react';

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#D6CCB8] p-0 sm:p-4 md:p-6 select-none">
      <div className="w-full h-screen sm:h-[844px] sm:max-w-[390px] sm:rounded-[44px] sm:border-[10px] sm:border-[#1A1A1A] bg-[#FAF7F0] shadow-2xl relative overflow-hidden flex flex-col sm:ring-1 sm:ring-white/20">
        {/* Dynamic Island / Notch on desktop */}
        <div className="hidden sm:flex absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1A1A1A] rounded-b-2xl z-50 items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#0A0A0A] mr-2" />
          <div className="w-2 h-2 rounded-full bg-[#1F2937]" />
        </div>

        {/* Content */}
        <div className="w-full h-full flex flex-col relative overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
