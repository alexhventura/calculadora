import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { SEO_CATEGORIES } from '../../constants/categories';
import { SITE_DOMAIN } from '../../constants/site';

interface SiteFooterProps {
  disclaimer?: string;
}

export default function SiteFooter({
  disclaimer = 'Conteúdo educativo. Não constitui recomendação de investimento ou assessoria profissional.',
}: SiteFooterProps) {
  return (
    <footer
      className="bg-slate-900 text-slate-300 py-10 px-6 md:px-12 border-t border-slate-800 text-xs text-center mt-auto"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-6">
        <Link to={ROUTES.home} className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-white font-bold text-xs">%</span>
          </div>
          <span className="font-bold text-sm text-slate-100 tracking-tight">
            calculo<span className="text-rose-400">juroscompostos</span>.com.br
          </span>
        </Link>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-slate-300 font-medium" aria-label="Links institucionais">
          <Link to={ROUTES.sobre} className="hover:text-white transition-colors">Sobre</Link>
          <Link to={ROUTES.termos} className="hover:text-white transition-colors">Termos de Uso</Link>
          <Link to={ROUTES.privacidade} className="hover:text-white transition-colors">Privacidade</Link>
          <Link to={ROUTES.cookies} className="hover:text-white transition-colors">Cookies</Link>
          <Link to={ROUTES.isencao} className="hover:text-white transition-colors">Isenção</Link>
          <Link to={ROUTES.blog} className="hover:text-white transition-colors">Blog</Link>
          <Link to={ROUTES.conversorMoedas} className="hover:text-white transition-colors">Conversor de Moedas</Link>
        </nav>

        <nav className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-[10px] text-slate-400" aria-label="Categorias de conteúdo">
          {SEO_CATEGORIES.map((cat, i) => (
            <span key={cat.slug} className="inline-flex items-center gap-3">
              {i > 0 && <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>}
              <Link to={ROUTES.categoria(cat.slug)} className="hover:text-white transition-colors">
                {cat.name}
              </Link>
            </span>
          ))}
        </nav>

        <p className="max-w-3xl text-[11px] text-slate-400 leading-relaxed font-sans">{disclaimer}</p>
        <div className="text-[10px] text-slate-500 font-mono">© 2026 {SITE_DOMAIN}</div>
      </div>
    </footer>
  );
}
