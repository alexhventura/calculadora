import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../components/seo/PageMeta';
import StructuredData from '../components/seo/StructuredData';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import ContentHeader from '../components/content/ContentHeader';
import EeatBlock from '../components/content/EeatBlock';
import { BLOG_ARTICLES } from '../content/blog/articles';
import { ROUTES } from '../constants/routes';
import { SITE_URL } from '../constants/site';
import { CATEGORY_HUB_SLUGS } from '../content/categories';

const BLOG_CATEGORIES = [...new Set(BLOG_ARTICLES.map((a) => a.category))].sort();

export default function BlogListPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      activeCategory
        ? BLOG_ARTICLES.filter((a) => a.category === activeCategory)
        : BLOG_ARTICLES,
    [activeCategory],
  );

  return (
    <>
      <PageMeta
        title="Blog de Educação Financeira | Investimentos, Aposentadoria e Finanças"
        description="Artigos originais sobre juros compostos, aposentadoria, investimentos, CLT vs PJ e finanças pessoais. Guias práticos com fontes oficiais."
        canonical={`${SITE_URL}${ROUTES.blog}`}
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Início', href: '/' },
          { name: 'Blog' },
        ]}
      />
      <main id="conteudo-principal" className="max-w-4xl mx-auto w-full min-w-0 px-4 md:px-8 py-10 flex-1">
        <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Blog' }]} />
        <ContentHeader
          h1="Blog de Educação Financeira"
          intro="Guias práticos e aprofundados sobre investimentos, aposentadoria, trabalho e finanças pessoais — escritos para complementar nossas calculadoras e fortalecer sua autonomia financeira."
          author="Equipe calculojuroscompostos.com"
          updatedAt="2026-06-15"
        />

        <nav className="flex flex-wrap gap-2 mb-6" aria-label="Filtrar por categoria">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
              activeCategory === null
                ? 'bg-[#800020] text-white border-[#800020]'
                : 'bg-white text-slate-600 border-slate-200 hover:border-[#800020]/30'
            }`}
          >
            Todos
          </button>
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                activeCategory === cat
                  ? 'bg-[#800020] text-white border-[#800020]'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-[#800020]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        <section className="mb-10" aria-labelledby="guias-hub">
          <h2 id="guias-hub" className="text-sm font-bold text-slate-900 mb-3">Guias completos por tema</h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_HUB_SLUGS.map((slug) => (
              <Link
                key={slug}
                to={ROUTES.categoria(slug)}
                className="text-xs font-semibold text-[#800020] hover:underline px-2 py-1 bg-rose-50/50 rounded-lg border border-rose-100"
              >
                {slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </Link>
            ))}
          </div>
        </section>

        <div className="grid gap-4">
          {filtered.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs hover:border-[#800020]/20 transition-colors"
            >
              <div className="flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                <span>{article.category}</span>
                <span>·</span>
                <time dateTime={article.updatedAt}>
                  {new Date(article.updatedAt).toLocaleDateString('pt-BR')}
                </time>
                <span>·</span>
                <span>{article.readTimeMinutes} min</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                <Link to={ROUTES.blogPost(article.slug)} className="hover:text-[#800020] transition-colors">
                  {article.title}
                </Link>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">{article.intro}</p>
              <Link
                to={ROUTES.blogPost(article.slug)}
                className="text-xs font-bold text-[#800020] hover:underline"
              >
                Ler artigo completo →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <EeatBlock updatedAt="2026-06-15" />
        </div>
      </main>
    </>
  );
}
