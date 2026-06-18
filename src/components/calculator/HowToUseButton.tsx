import { BookOpen } from 'lucide-react';

interface HowToUseButtonProps {
  onClick: () => void;
}

export default function HowToUseButton({ onClick }: HowToUseButtonProps) {
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
