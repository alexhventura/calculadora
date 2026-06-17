import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { SITE_DOMAIN } from '../../constants/site';

interface SiteBrandProps {
  tagline?: string;
}

export default function SiteBrand({ tagline = 'Finanças Inteligentes' }: SiteBrandProps) {
  return (
    <Link
      to={ROUTES.home}
      className="flex items-center gap-2.5"
      aria-label={`${SITE_DOMAIN} — Início`}
    >
      <div className="w-9 h-9 rounded-full bg-[#800020] flex items-center justify-center shadow-md shrink-0">
        <span className="text-white font-extrabold text-base">%</span>
      </div>
      <div className="min-w-0">
        <span className="font-extrabold text-xl tracking-tight text-slate-900">
          calculo<span className="text-[#800020]">juroscompostos</span>.com.br
        </span>
        <span className="text-[10px] font-semibold text-slate-500 block -mt-1 tracking-wider uppercase truncate">
          {tagline}
        </span>
      </div>
    </Link>
  );
}
