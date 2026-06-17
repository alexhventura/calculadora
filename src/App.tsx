import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SiteLayout from './components/layout/SiteLayout';
import CalculatorPage from './pages/CalculatorPage';
import { ROUTES } from './constants/routes';
import type { ActiveTool } from './utils/calculations/toolCalculations';
import type { SeoVariant } from './content/tools';
import type { TaxaTipo } from './types';

const BlogListPage = lazy(() => import('./pages/BlogListPage'));
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const InstitutionalPage = lazy(() => import('./pages/InstitutionalPage'));
const CurrencyConverterPage = lazy(() => import('./pages/CurrencyConverterPage'));

function PageFallback() {
  return (
    <div className="flex-1 flex items-center justify-center py-20" aria-hidden="true">
      <div className="w-8 h-8 border-2 border-[#800020] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

interface CalcProps {
  tool?: ActiveTool;
  seoVariant?: SeoVariant;
  initialTaxaTipo?: TaxaTipo;
}

function Calc({ tool, seoVariant, initialTaxaTipo }: CalcProps) {
  return <CalculatorPage initialTool={tool} seoVariant={seoVariant} initialTaxaTipo={initialTaxaTipo} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<Calc tool="juros" />} />
        <Route path={ROUTES.jurosCompostos} element={<Calc tool="juros" />} />
        <Route path={ROUTES.calculadoraCdi} element={<Calc tool="juros" seoVariant="cdi" initialTaxaTipo="cdi" />} />
        <Route path={ROUTES.calculadoraIpca} element={<Calc tool="juros" seoVariant="ipca" />} />
        <Route path={ROUTES.cltPj} element={<Calc tool="clt-pj" />} />
        <Route path={ROUTES.aposentadoria} element={<Calc tool="aposentadoria" />} />
        <Route path={ROUTES.rescisao} element={<Calc tool="rescisao" />} />
        <Route
          path={ROUTES.conversorMoedas}
          element={
            <Suspense fallback={<PageFallback />}>
              <CurrencyConverterPage />
            </Suspense>
          }
        />
        <Route path="/calculadora/:slug" element={<Calc />} />

        <Route element={<SiteLayout />}>
          <Route
            path={ROUTES.blog}
            element={
              <Suspense fallback={<PageFallback />}>
                <BlogListPage />
              </Suspense>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <Suspense fallback={<PageFallback />}>
                <BlogArticlePage />
              </Suspense>
            }
          />
          <Route
            path="/categoria/:slug"
            element={
              <Suspense fallback={<PageFallback />}>
                <CategoryPage />
              </Suspense>
            }
          />
          <Route path={ROUTES.sobre} element={<Suspense fallback={<PageFallback />}><InstitutionalPage pageKey="sobre" /></Suspense>} />
          <Route path={ROUTES.privacidade} element={<Suspense fallback={<PageFallback />}><InstitutionalPage pageKey="privacidade" /></Suspense>} />
          <Route path={ROUTES.termos} element={<Suspense fallback={<PageFallback />}><InstitutionalPage pageKey="termos" /></Suspense>} />
          <Route path={ROUTES.cookies} element={<Suspense fallback={<PageFallback />}><InstitutionalPage pageKey="cookies" /></Suspense>} />
          <Route path={ROUTES.isencao} element={<Suspense fallback={<PageFallback />}><InstitutionalPage pageKey="isencao" /></Suspense>} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
