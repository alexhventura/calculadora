import { BookOpen, ChevronRight } from 'lucide-react';

interface HowToUseButtonProps {
  onClick: () => void;
  variant?: 'inline' | 'banner';
}

export default function HowToUseButton({ onClick, variant = 'inline' }: HowToUseButtonProps) {
  if (variant === 'banner') {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center justify-between gap-3 py-3 px-4 rounded-xl border border-[#800020]/20 bg-[#800020]/[0.04] text-slate-800 text-sm font-semibold hover:bg-[#800020]/[0.08] hover:border-[#800020]/35 transition-all min-h-[3rem] cursor-pointer text-left"
      >
        <span className="flex items-center gap-2.5 min-w-0">
          <BookOpen className="w-5 h-5 text-[#800020] shrink-0" aria-hidden="true" />
          <span>
            <span className="block text-[#800020] font-bold text-xs uppercase tracking-wide">Como usar</span>
            <span className="block text-xs text-slate-600 font-normal mt-0.5 leading-snug">
              Veja o passo a passo e a descrição de cada campo do formulário
            </span>
          </span>
        </span>
        <ChevronRight className="w-4 h-4 text-[#800020] shrink-0" aria-hidden="true" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 hover:border-[#800020]/30 hover:text-[#800020] transition-all min-h-[2.75rem] cursor-pointer"
    >
      <BookOpen className="w-4 h-4 shrink-0" aria-hidden="true" />
      Como usar
    </button>
  );
}
