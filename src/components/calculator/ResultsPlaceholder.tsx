import { BarChart3 } from 'lucide-react';

interface ResultsPlaceholderProps {
  title?: string;
  description?: string;
}

export default function ResultsPlaceholder({
  title = 'Seu resultado aparece aqui',
  description = 'Preencha os campos essenciais e clique em Calcular para ver a simulação.',
}: ResultsPlaceholderProps) {
  return (
    <div
      className="calc-results-placeholder flex flex-col items-center justify-center text-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-12 sm:py-16 min-h-[200px]"
      aria-live="polite"
    >
      <div className="p-3 rounded-full bg-white border border-slate-100 shadow-xs">
        <BarChart3 className="w-6 h-6 text-[#800020]/70" aria-hidden="true" />
      </div>
      <div className="max-w-sm space-y-1.5">
        <h3 className="text-sm font-bold text-slate-800">{title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
