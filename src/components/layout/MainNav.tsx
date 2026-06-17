import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

type NavPage = 'calculadoras' | 'conversor' | 'blog' | 'sobre';

interface MainNavProps {
  current?: NavPage;
}

const linkClass = 'hover:text-[#800020] transition-colors';
const activeClass = 'text-[#800020] font-bold';

export default function MainNav({ current }: MainNavProps) {
  const location = useLocation();

  const isCalculadoras =
    current === 'calculadoras' ||
    (current === undefined &&
      location.pathname !== ROUTES.conversorMoedas &&
      !location.pathname.startsWith(ROUTES.blog) &&
      !location.pathname.startsWith('/categoria') &&
      !location.pathname.startsWith('/sobre') &&
      !location.pathname.includes('politica') &&
      !location.pathname.includes('termos') &&
      !location.pathname.includes('isencao'));

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-600"
      aria-label="Navegação principal"
    >
      <Link to={ROUTES.home} className={isCalculadoras ? activeClass : linkClass} aria-current={isCalculadoras ? 'page' : undefined}>
        Calculadoras
      </Link>
      <Link
        to={ROUTES.conversorMoedas}
        className={current === 'conversor' ? activeClass : linkClass}
        aria-current={current === 'conversor' ? 'page' : undefined}
      >
        Conversor de Moedas
      </Link>
      <Link
        to={ROUTES.blog}
        className={current === 'blog' ? activeClass : linkClass}
        aria-current={current === 'blog' ? 'page' : undefined}
      >
        Blog
      </Link>
      <Link
        to={ROUTES.sobre}
        className={current === 'sobre' ? activeClass : linkClass}
        aria-current={current === 'sobre' ? 'page' : undefined}
      >
        Sobre
      </Link>
    </nav>
  );
}
