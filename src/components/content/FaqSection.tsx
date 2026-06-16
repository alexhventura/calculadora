import type { FaqItem } from '../../content/types';

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
}

export default function FaqSection({ items, title = 'Perguntas frequentes' }: FaqSectionProps) {
  return (
    <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-lg font-extrabold text-slate-900 mb-4">
        {title}
      </h2>
      <div className="space-y-4">
        {items.map((item) => (
          <details
            key={item.question}
            className="group border border-slate-100 rounded-xl p-4 open:bg-slate-50/50 transition-colors"
          >
            <summary className="font-semibold text-sm text-slate-800 cursor-pointer list-none flex justify-between items-center gap-2 py-1 min-h-[2.75rem] sm:min-h-0">
              {item.question}
              <span className="text-slate-400 text-lg group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
            </summary>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
