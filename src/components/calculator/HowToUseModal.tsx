import { X, BookOpen } from 'lucide-react';
import type { HowToUseContent } from '../../config/howToUse';

interface HowToUseModalProps {
  open: boolean;
  onClose: () => void;
  content: HowToUseContent;
}

export default function HowToUseModal({ open, onClose, content }: HowToUseModalProps) {
  if (!open) return null;

  const simples = content.campos.filter((c) => c.modo === 'simples');
  const avancados = content.campos.filter((c) => c.modo === 'avancado');

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-to-use-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
        aria-label="Fechar"
        onClick={onClose}
      />
      <div className="relative w-full sm:max-w-lg max-h-[92vh] sm:max-h-[85vh] bg-white rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col overflow-hidden">
        <header className="flex items-start justify-between gap-3 px-5 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-start gap-2.5 min-w-0">
            <BookOpen className="w-5 h-5 text-[#800020] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 id="how-to-use-title" className="font-bold text-base text-slate-900 leading-snug">
                {content.titulo}
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{content.introducao}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Fechar instruções"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-5">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Passo a passo</h3>
            <ol className="list-decimal pl-4 space-y-1.5 text-sm text-slate-700 leading-relaxed">
              {content.passos.map((p) => (
                <li key={p.slice(0, 40)}>{p}</li>
              ))}
            </ol>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Campos principais</h3>
            <ul className="space-y-3">
              {simples.map((c) => (
                <li key={c.nome} className="text-sm border-b border-slate-50 pb-2 last:border-0">
                  <span className="font-semibold text-slate-900 block">{c.nome}</span>
                  <span className="text-slate-600 leading-snug">{c.descricao}</span>
                  {c.dica && <span className="text-[11px] text-slate-500 block mt-0.5">Dica: {c.dica}</span>}
                </li>
              ))}
            </ul>
          </section>

          {avancados.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Modo completo / personalizar
              </h3>
              <ul className="space-y-3">
                {avancados.map((c) => (
                  <li key={c.nome} className="text-sm border-b border-slate-50 pb-2 last:border-0">
                    <span className="font-semibold text-slate-900 block">{c.nome}</span>
                    <span className="text-slate-600 leading-snug">{c.descricao}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <footer className="px-5 py-3 border-t border-slate-100 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#800020] text-white text-sm font-bold hover:bg-[#600018] transition-colors min-h-[2.75rem]"
          >
            Entendi, começar a calcular
          </button>
        </footer>
      </div>
    </div>
  );
}
