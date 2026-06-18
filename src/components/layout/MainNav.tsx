import { Link, useLocation } from 'react-router-dom';
import { ROUTES, toolPath } from '../../constants/routes';

type NavPage = 'calculadoras' | 'conversor' | 'outras';

interface MainNavProps {
  current?: NavPage;
}

const linkClass = 'hover:text-[#800020] transition-colors';
const activeClass = 'text-[#800020] font-bold';

const OUTRAS_TOOL_PATHS = new Set([
  ROUTES.cltPj,
  ROUTES.aposentadoria,
  ROUTES.rescisao,
  ROUTES.calculadoraCdi,
  ROUTES.calculadoraIpca,
  toolPath('clt-pj'),
  toolPath('aposentadoria'),
  toolPath('rescisao'),
]);

export default function MainNav({ current }: MainNavProps) {
  const location = useLocation();

  const isCalculadoras =
    current === 'calculadoras' ||
    (current === undefined &&
      (location.pathname === ROUTES.home));

  const isOutras =
    current === 'outras' ||
    (current === undefined && OUTRAS_TOOL_PATHS.has(location.pathname));

  const outrasHref =
    location.pathname === ROUTES.home ||
    OUTRAS_TOOL_PATHS.has(location.pathname)
      ? '#bento-selector'
      : `${ROUTES.home}#bento-selector`;

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-600"
      aria-label="Navegação principal"
    >
      <Link
        to={ROUTES.home}
        className={isCalculadoras ? activeClass : linkClass}
        aria-current={isCalculadoras ? 'page' : undefined}
      >
        Juros Compostos
      </Link>
      <Link
        to={outrasHref}
        className={isOutras ? activeClass : linkClass}
        aria-current={isOutras ? 'page' : undefined}
      >
        Outras calculadoras
      </Link>
      <Link
        to={ROUTES.conversorMoedas}
        className={current === 'conversor' ? activeClass : linkClass}
        aria-current={current === 'conversor' ? 'page' : undefined}
      >
        Conversor de Moedas
      </Link>
    </nav>
  );
}
