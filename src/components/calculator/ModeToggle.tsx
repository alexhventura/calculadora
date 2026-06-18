import type { CalculatorMode } from '../../types/calculator';

interface ModeToggleProps {
  mode: CalculatorMode;
  onChange: (mode: CalculatorMode) => void;
  toolLabel?: string;
}

export default function ModeToggle({ mode, onChange, toolLabel }: ModeToggleProps) {
  return (
    <div
      className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80"
      role="group"
      aria-label={toolLabel ? `Modo de cálculo — ${toolLabel}` : 'Modo de cálculo'}
    >
      <button
        type="button"
        onClick={() => onChange('simple')}
        className={`flex-1 text-[10px] sm:text-xs py-2 px-2 font-bold rounded-lg transition-all cursor-pointer min-h-[2.25rem] ${
          mode === 'simple'
            ? 'bg-white text-[#800020] shadow-xs border border-slate-200/60'
            : 'text-slate-600 hover:text-slate-800'
        }`}
        aria-pressed={mode === 'simple'}
      >
        Modo Simples
      </button>
      <button
        type="button"
        onClick={() => onChange('advanced')}
        className={`flex-1 text-[10px] sm:text-xs py-2 px-2 font-bold rounded-lg transition-all cursor-pointer min-h-[2.25rem] ${
          mode === 'advanced'
            ? 'bg-white text-[#800020] shadow-xs border border-slate-200/60'
            : 'text-slate-600 hover:text-slate-800'
        }`}
        aria-pressed={mode === 'advanced'}
      >
        Modo Avançado
      </button>
    </div>
  );
}
