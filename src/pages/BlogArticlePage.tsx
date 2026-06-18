import { Link, useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import PageMeta from '../components/seo/PageMeta';
import StructuredData from '../components/seo/StructuredData';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import FaqSection from '../components/content/FaqSection';
import EeatBlock from '../components/content/EeatBlock';
import TableOfContents from '../components/content/TableOfContents';
import LongFormArticle from '../components/content/LongFormArticle';
import { getBlogArticle } from '../content/blog/articles';
import { ROUTES } from '../constants/routes';
import { SITE_URL } from '../constants/site';

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getBlogArticle(slug) : undefined;

  if (!article) return <NotFoundPage />;

  const url = `${SITE_URL}${ROUTES.blogPost(article.slug)}`;

  return (
    <>
      <PageMeta
        title={article.title}
        description={article.metaDescription}
        canonical={url}
        ogType="article"
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Início', href: '/' },
          { name: 'Blog', href: ROUTES.blog },
          { name: article.title },
        ]}
        faq={article.faq}
        article={{
          title: article.title,
          description: article.metaDescription,
          url,
          publishedAt: article.publishedAt,
          updatedAt: article.updatedAt,
          author: article.author,
        }}
      />
      <main id="conteudo-principal" className="max-w-3xl mx-auto w-full min-w-0 px-4 md:px-8 py-10 flex-1">
        <Breadcrumbs
          items={[
            { label: 'Início', href: '/' },
            { label: 'Blog', href: ROUTES.blog },
            { label: article.title },
          ]}
        />
        <header className="mb-6">
          <div className="flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
            <span>{article.category}</span>
            <span>·</span>
            <time dateTime={article.updatedAt}>
              Atualizado em {new Date(article.updatedAt).toLocaleDateString('pt-BR')}
            </time>
            <span>·</span>
            <span>{article.readTimeMinutes} min</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {article.title}
          </h1>
          <p className="mt-3 text-base text-slate-700 font-medium leading-relaxed">{article.intro}</p>
          <p className="mt-2 text-xs text-slate-500">Por {article.author}</p>
        </header>
        <TableOfContents sections={article.sections} />
        <LongFormArticle sections={article.sections} />
        {article.faq.length > 0 && (
          <div className="mt-10">
            <FaqSection items={article.faq} />
          </div>
        )}
        <div className="mt-8">
          <EeatBlock updatedAt={article.updatedAt} />
        </div>
        <p className="mt-6">
          <Link to={ROUTES.blog} className="text-[#800020] font-semibold text-xs hover:underline">
            ← Voltar ao blog
          </Link>
        </p>
      </main>
    </>
  );
}
