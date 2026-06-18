import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

interface AdvancedSectionProps {
  children: ReactNode;
  defaultOpen?: boolean;
  id?: string;
}

export default function AdvancedSection({ children, defaultOpen = false, id }: AdvancedSectionProps) {
  return (
    <details
      id={id}
      open={defaultOpen}
      className="group border border-dashed border-slate-200 rounded-xl bg-slate-50/50 overflow-hidden"
    >
      <summary className="flex items-center justify-between gap-2 px-3 py-2.5 cursor-pointer list-none text-xs font-bold text-slate-700 hover:bg-slate-100/60 transition-colors select-none min-h-[2.75rem]">
        <span>Configurações avançadas</span>
        <ChevronDown className="w-4 h-4 text-slate-500 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="px-3 pb-3 pt-1 flex flex-col gap-3 border-t border-slate-100">{children}</div>
    </details>
  );
}
