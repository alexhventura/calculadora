import { HelpCircle } from 'lucide-react';

interface FieldHintProps {
  text: string;
  id?: string;
}

export default function FieldHint({ text, id }: FieldHintProps) {
  const hintId = id ?? `hint-${text.slice(0, 12).replace(/\s/g, '-')}`;
  return (
    <span className="relative inline-flex group/hint align-middle ml-1">
      <button
        type="button"
        className="inline-flex items-center justify-center w-4 h-4 rounded-full text-slate-400 hover:text-[#800020] focus:text-[#800020] focus:outline-hidden transition-colors"
        aria-describedby={hintId}
        aria-label="Ajuda"
      >
        <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
      <span
        id={hintId}
        role="tooltip"
        className="pointer-events-none absolute left-1/2 bottom-full mb-1.5 -translate-x-1/2 w-48 sm:w-56 px-2.5 py-2 rounded-lg bg-slate-800 text-white text-[10px] leading-snug font-normal opacity-0 invisible group-hover/hint:opacity-100 group-hover/hint:visible group-focus-within/hint:opacity-100 group-focus-within/hint:visible transition-opacity z-20 shadow-lg"
      >
        {text}
      </span>
    </span>
  );
}
