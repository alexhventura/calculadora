import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { InternalLink } from '../../content/types';

interface InternalLinksSectionProps {
  tools?: InternalLink[];
  categories?: InternalLink[];
  articles?: InternalLink[];
  title?: string;
}

export default function InternalLinksSection({
  tools = [],
  categories = [],
  articles = [],
  title = 'Continue explorando',
}: InternalLinksSectionProps) {
  const hasContent = tools.length > 0 || categories.length > 0 || articles.length > 0;
  if (!hasContent) return null;

  return (
    <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs" aria-labelledby="links-internos">
      <h2 id="links-internos" className="text-lg font-extrabold text-slate-900 mb-4">
        {title}
      </h2>

      {tools.length > 0 && (
        <div className="mb-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Calculadoras</h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {tools.map((tool) => (
              <Link
                key={tool.href + tool.label}
                to={tool.href}
                className="group flex flex-col gap-0.5 p-3 rounded-xl border border-slate-100 hover:border-[#800020]/30 hover:bg-rose-50/30 transition-all"
              >
                <span className="font-bold text-sm text-slate-900 group-hover:text-[#800020] flex items-center gap-1">
                  {tool.label}
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                </span>
                {tool.description && (
                  <span className="text-xs text-slate-500 leading-snug">{tool.description}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {categories.length > 0 && (
        <div className="mb-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Guias relacionados</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                to={cat.href}
                className="text-xs font-semibold text-[#800020] hover:underline px-2 py-1 bg-rose-50/50 rounded-lg border border-rose-100"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {articles.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Artigos do blog</h3>
          <ul className="space-y-2">
            {articles.map((a) => (
              <li key={a.href}>
                <Link to={a.href} className="text-sm font-semibold text-[#800020] hover:underline">
                  {a.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
