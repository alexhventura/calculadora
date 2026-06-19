import { ChevronDown, HelpCircle } from 'lucide-react';
import type { ToolGuideContent } from '../../config/toolGuides';
import ToolQuickGuide from './ToolQuickGuide';

interface QuickGuideCollapsibleProps {
  guide: ToolGuideContent;
}

export default function QuickGuideCollapsible({ guide }: QuickGuideCollapsibleProps) {
  return (
    <details className="calc-quick-guide group rounded-xl border border-slate-200/60 bg-white/60 overflow-hidden">
      <summary className="flex items-center justify-between gap-2 px-3.5 py-2.5 cursor-pointer list-none text-[11px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors select-none min-h-[2.5rem]">
        <span className="flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          Guia rápido desta calculadora
        </span>
        <ChevronDown
          className="w-3.5 h-3.5 text-slate-400 transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="px-1 pb-1 border-t border-slate-100">
        <ToolQuickGuide guide={guide} />
      </div>
    </details>
  );
}
