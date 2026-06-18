import { Link } from 'react-router-dom';
import SkipLink from '../components/layout/SkipLink';
import SiteBrand from '../components/layout/SiteBrand';
import MainNav from '../components/layout/MainNav';
import SiteFooter from '../components/layout/SiteFooter';
import PageMeta from '../components/seo/PageMeta';
import { ROUTES } from '../constants/routes';
import { SITE_URL } from '../constants/site';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PageMeta
        title="Página não encontrada"
        description="A página que você procurou não existe ou foi movida."
        canonical={`${SITE_URL}/404`}
        noindex
      />
      <SkipLink />
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
          <SiteBrand />
          <MainNav />
        </div>
      </header>

      <main id="main-content" className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <p className="text-6xl font-extrabold text-[#800020]/20 font-mono mb-4" aria-hidden="true">
            404
          </p>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Página não encontrada</h1>
          <p className="text-sm text-slate-600 leading-relaxed mb-8">
            O endereço pode estar incorreto ou a página foi removida. Use o menu ou volte para a calculadora principal.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={ROUTES.home}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#800020] text-white text-sm font-bold hover:bg-[#600018] transition-colors min-h-[2.75rem]"
            >
              Ir para a calculadora
            </Link>
            <Link
              to={ROUTES.blog}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-bold hover:border-[#800020]/30 transition-colors min-h-[2.75rem]"
            >
              Ver o blog
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
