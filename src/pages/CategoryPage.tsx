import { Link, useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import PageMeta from '../components/seo/PageMeta';
import StructuredData from '../components/seo/StructuredData';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import ContentHeader from '../components/content/ContentHeader';
import TableOfContents from '../components/content/TableOfContents';
import LongFormArticle from '../components/content/LongFormArticle';
import FaqSection from '../components/content/FaqSection';
import GlossarySection from '../components/content/GlossarySection';
import InternalLinksSection from '../components/content/InternalLinksSection';
import EeatBlock from '../components/content/EeatBlock';
import { getCategoryBySlug } from '../constants/categories';
import { getCategoryHub, estimateReadTime } from '../content/categories';
import { ROUTES } from '../constants/routes';
import { SITE_URL } from '../constants/site';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;
  const hub = slug ? getCategoryHub(slug) : undefined;

  if (!category) return <NotFoundPage />;

  const path = ROUTES.categoria(category.slug);
  const readTime = hub ? estimateReadTime(hub) : undefined;

  return (
    <>
      <PageMeta
        title={hub?.metaTitle ?? `${category.name} — Ferramentas e Artigos`}
        description={hub?.metaDescription ?? category.description}
        canonical={`${SITE_URL}${path}`}
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Início', href: '/' },
          { name: hub?.h1 ?? category.name },
        ]}
        faq={hub?.faq}
      />
      <main id="conteudo-principal" className="max-w-4xl mx-auto w-full min-w-0 px-4 md:px-8 py-10 flex-1">
        <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: hub?.h1 ?? category.name }]} />

        {hub ? (
          <>
            <ContentHeader
              h1={hub.h1}
              intro={hub.intro}
              author={hub.author}
              updatedAt={hub.updatedAt}
              readTimeMinutes={readTime}
            />
            <TableOfContents sections={hub.sections} />
            <LongFormArticle sections={hub.sections} />
            <div className="mt-10 flex flex-col gap-8">
              <FaqSection items={hub.faq} />
              <GlossarySection items={hub.glossary} />
              <InternalLinksSection
                tools={hub.relatedTools}
                categories={hub.relatedCategories}
                articles={hub.relatedArticles}
              />
              <EeatBlock sources={hub.sources} updatedAt={hub.updatedAt} />
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">{category.name}</h1>
            <p className="text-sm text-slate-600 mb-8 max-w-2xl">{category.description}</p>
            <section className="mb-10" aria-labelledby="ferramentas-cat">
              <h2 id="ferramentas-cat" className="text-lg font-bold text-slate-900 mb-4">Calculadoras</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {category.tools.map((tool) =>
                  tool.available ? (
                    <Link
                      key={tool.label}
                      to={tool.href}
                      className="p-4 rounded-xl border border-slate-100 bg-white hover:border-[#800020]/30 hover:bg-rose-50/20 transition-all text-sm font-semibold text-slate-800"
                    >
                      {tool.label}
                    </Link>
                  ) : (
                    <span
                      key={tool.label}
                      className="p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-400"
                    >
                      {tool.label} <span className="text-[10px]">(em breve)</span>
                    </span>
                  ),
                )}
              </div>
            </section>
          </>
        )}

        <p className="mt-8">
          <Link to={ROUTES.home} className="text-[#800020] font-semibold text-xs hover:underline">
            ← Voltar às calculadoras
          </Link>
        </p>
      </main>
    </>
  );
}
