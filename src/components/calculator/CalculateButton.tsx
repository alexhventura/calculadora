import { Calculator } from 'lucide-react';

interface CalculateButtonProps {
  onClick: () => void;
  isRecalculate?: boolean;
  isStale?: boolean;
}

export default function CalculateButton({
  onClick,
  isRecalculate = false,
  isStale = false,
}: CalculateButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`calc-btn-primary w-full flex items-center justify-center gap-2 min-h-[3rem] rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020] ${
        isStale ? 'ring-2 ring-[#800020]/25' : ''
      }`}
    >
      <Calculator className="w-4 h-4" aria-hidden="true" />
      {isRecalculate ? 'Recalcular' : 'Calcular'}
    </button>
  );
}
