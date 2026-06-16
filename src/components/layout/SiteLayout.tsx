import { Link, Outlet } from 'react-router-dom';
import SkipLink from './SkipLink';
import { ROUTES } from '../../constants/routes';
import { SITE_TAGLINE } from '../../constants/site';

export default function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased text-slate-950 overflow-x-hidden">
      <SkipLink />
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 py-4 px-6 md:px-12 shadow-xs" role="banner">
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link to={ROUTES.home} className="flex items-center gap-2.5" aria-label="calculojuroscompostos.com — Início">
            <div className="w-9 h-9 rounded-full bg-[#800020] flex items-center justify-center shadow-md">
              <span className="text-white font-extrabold text-base">%</span>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                calculo<span className="text-[#800020]">juroscompostos</span>.com
              </span>
              <span className="text-[10px] font-semibold text-slate-400 block -mt-1 tracking-wider uppercase">{SITE_TAGLINE}</span>
            </div>
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600" aria-label="Navegação principal">
            <Link to={ROUTES.home} className="hover:text-[#800020] transition-colors">Calculadoras</Link>
            <Link to={ROUTES.blog} className="hover:text-[#800020] transition-colors">Blog</Link>
            <Link to={ROUTES.sobre} className="hover:text-[#800020] transition-colors">Sobre</Link>
            <Link to={ROUTES.contato} className="hover:text-[#800020] transition-colors">Contato</Link>
          </nav>
        </div>
      </header>
      <Outlet />
      <footer className="bg-slate-900 text-slate-400 py-10 px-6 md:px-12 border-t border-slate-800 text-xs text-center mt-auto" role="contentinfo">
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-6">
          <Link to={ROUTES.home} className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-white font-bold text-xs">%</span>
            </div>
            <span className="font-bold text-sm text-slate-100 tracking-tight">
              calculo<span className="text-[#bf1e44]">juroscompostos</span>.com
            </span>
          </Link>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-slate-500 font-medium" aria-label="Links institucionais">
            <Link to={ROUTES.sobre} className="hover:text-white transition-colors">Sobre</Link>
            <Link to={ROUTES.contato} className="hover:text-white transition-colors">Contato</Link>
            <Link to={ROUTES.termos} className="hover:text-white transition-colors">Termos de Uso</Link>
            <Link to={ROUTES.privacidade} className="hover:text-white transition-colors">Privacidade</Link>
            <Link to={ROUTES.cookies} className="hover:text-white transition-colors">Cookies</Link>
            <Link to={ROUTES.isencao} className="hover:text-white transition-colors">Isenção</Link>
          </nav>
          <p className="max-w-3xl text-[11px] text-slate-500 leading-relaxed font-sans">
            Conteúdo educativo. Não constitui recomendação de investimento ou assessoria profissional.
          </p>
          <div className="text-[10px] text-slate-600 font-mono">© 2026 calculojuroscompostos.com</div>
        </div>
      </footer>
    </div>
  );
}
