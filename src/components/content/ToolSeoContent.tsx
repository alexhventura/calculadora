import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ToolSeoContent as ToolSeoContentType } from '../../content/types';
import FaqSection from './FaqSection';
import EeatBlock from './EeatBlock';

interface ToolSeoContentProps {
  content: ToolSeoContentType;
}

export default function ToolSeoContent({ content }: ToolSeoContentProps) {
  return (
    <article className="w-full flex flex-col gap-8 mt-4 border-t border-slate-100 pt-10">
      <header>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">{content.intro}</p>
      </header>

      {content.sections.map((section) => (
        <section key={section.id} id={section.id} className="flex flex-col gap-3">
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">{section.title}</h2>
          {section.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              {p}
            </p>
          ))}
          {section.list && (
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1 max-w-3xl">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <FaqSection items={content.faq} />
      <EeatBlock sources={content.sources} />
      <InternalLinks tools={content.relatedTools} />
    </article>
  );
}

function InternalLinks({
  tools,
}: {
  tools: { label: string; href: string; description: string }[];
}) {
  return (
    <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs" aria-labelledby="links-relacionados">
      <h2 id="links-relacionados" className="text-lg font-extrabold text-slate-900 mb-4">
        Ferramentas relacionadas
      </h2>
      <div className="grid sm:grid-cols-3 gap-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            to={tool.href}
            className="group flex flex-col gap-1 p-4 rounded-xl border border-slate-100 hover:border-[#800020]/30 hover:bg-rose-50/30 transition-all"
          >
            <span className="font-bold text-sm text-slate-900 group-hover:text-[#800020] flex items-center gap-1">
              {tool.label}
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </span>
            <span className="text-xs text-slate-500 leading-snug">{tool.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
