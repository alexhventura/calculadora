import { ChevronDown, Settings2 } from 'lucide-react';
import type { ReactNode } from 'react';

interface CollapsibleAdvancedPanelProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  children: ReactNode;
  label?: string;
  panelId?: string;
}

export default function CollapsibleAdvancedPanel({
  isOpen,
  onToggle,
  children,
  label = 'Personalizar Simulação',
  panelId = 'personalizar-calculo',
}: CollapsibleAdvancedPanelProps) {
  return (
    <details
      id={panelId}
      open={isOpen}
      onToggle={(e) => onToggle((e.currentTarget as HTMLDetailsElement).open)}
      className="calc-advanced-panel group border border-slate-200/80 rounded-xl bg-white overflow-hidden transition-shadow duration-200 hover:shadow-sm"
    >
      <summary className="flex items-center justify-between gap-2 px-4 py-3 cursor-pointer list-none text-xs font-bold text-slate-700 hover:bg-slate-50/80 transition-colors duration-200 select-none min-h-[2.75rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020]">
        <span className="flex items-center gap-2">
          <Settings2 className="w-3.5 h-3.5 text-[#800020]" aria-hidden="true" />
          {label}
        </span>
        <ChevronDown
          className="w-4 h-4 text-slate-400 transition-transform duration-200 ease-out group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="px-4 pb-4 pt-2 flex flex-col gap-4 border-t border-slate-100">{children}</div>
    </details>
  );
}
