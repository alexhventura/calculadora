import { useState, useEffect } from 'react';
import {
  FALLBACK_SELIC,
  FALLBACK_IPCA,
} from '../utils/finance';

export type RatesStatus = 'success' | 'fallback' | 'loading';

const BCB_SELIC_URL =
  'https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json';
const BCB_IPCA_URL =
  'https://api.bcb.gov.br/dados/serie/bcdata.sgs.13522/dados/ultimos/1?formato=json';

function parseApiRate(value: unknown): number | null {
  const parsed = parseFloat(String(value));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export function useEconomicRates() {
  const [loadingRates, setLoadingRates] = useState(true);
  const [ratesStatus, setRatesStatus] = useState<RatesStatus>('loading');
  const [selicRate, setSelicRate] = useState(FALLBACK_SELIC);
  const [ipcaRate, setIpcaRate] = useState(FALLBACK_IPCA);

  useEffect(() => {
    let cancelled = false;

    async function carregarTaxasVigentes() {
      setLoadingRates(true);
      setRatesStatus('loading');

      let selicTemp = FALLBACK_SELIC;
      let ipcaTemp = FALLBACK_IPCA;
      let apiRatesSuccess = false;

      try {
        const resBCBSelic = await fetch(BCB_SELIC_URL);
        if (resBCBSelic.ok) {
          const dadosSelic = await resBCBSelic.json();
          if (dadosSelic?.[0]?.valor) {
            const parsed = parseApiRate(dadosSelic[0].valor);
            if (parsed !== null) {
              selicTemp = parsed;
              apiRatesSuccess = true;
            }
          }
        }
      } catch {
        if (import.meta.env.DEV) {
          console.warn('[rates] Falha ao carregar Selic do BCB. Usando fallback.');
        }
      }

      try {
        const resBCBIPCA = await fetch(BCB_IPCA_URL);
        if (resBCBIPCA.ok) {
          const dadosIPCA = await resBCBIPCA.json();
          if (dadosIPCA?.[0]?.valor) {
            const parsed = parseApiRate(dadosIPCA[0].valor);
            if (parsed !== null) ipcaTemp = parsed;
          }
        }
      } catch {
        if (import.meta.env.DEV) {
          console.warn('[rates] Falha ao carregar IPCA do BCB. Usando fallback.');
        }
      }

      if (cancelled) return;

      setSelicRate(selicTemp);
      setIpcaRate(ipcaTemp);
      setRatesStatus(apiRatesSuccess ? 'success' : 'fallback');
      setLoadingRates(false);
    }

    carregarTaxasVigentes();
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    loadingRates,
    ratesStatus,
    selicRate,
    ipcaRate,
  };
}
