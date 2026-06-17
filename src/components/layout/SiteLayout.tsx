import { Link, Outlet } from 'react-router-dom';
import SkipLink from './SkipLink';
import SiteBrand from './SiteBrand';
import MainNav from './MainNav';
import SiteFooter from './SiteFooter';

export default function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased text-slate-950 overflow-x-hidden">
      <SkipLink />
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 py-4 px-6 md:px-12 shadow-xs" role="banner">
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <SiteBrand />
          <MainNav />
        </div>
      </header>
      <Outlet />
      <SiteFooter />
    </div>
  );
}
