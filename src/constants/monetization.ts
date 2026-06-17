/** Provedores de monetização suportados pela arquitetura de slots */
export type MonetizationProvider =
  | 'adsense'
  | 'gam'
  | 'amazon'
  | 'mercadolivre'
  | 'hotmart'
  | 'affiliate'
  | 'custom';

export type AdSlotKey = 'top' | 'sidebar' | 'inline' | 'footer';

export type AdSlotFormat = '728x90' | '300x250' | '300x600' | 'horizontal-flexible';

export interface AdSlotDefinition {
  /** Identificador estável do slot no layout */
  key: AdSlotKey;
  /** Formato físico reservado para integração futura */
  format: AdSlotFormat;
  /** Habilita/desabilita slot individualmente (requer monetização global ativa) */
  enabled: boolean;
  /** ID do slot no provedor (ex.: data-ad-slot do AdSense) */
  slotId: string;
  /** Rótulo interno para documentação e analytics */
  label: string;
}

const envFlag = (value: string | undefined) => value === 'true' || value === '1';

/**
 * Controle centralizado de monetização.
 * Padrão: desativado — nenhum slot é renderizado no DOM.
 *
 * Ativação futura (exemplo):
 *   VITE_MONETIZATION_ENABLED=true
 *   VITE_MONETIZATION_PROVIDER=adsense
 *   VITE_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXX
 *   VITE_AD_SLOT_TOP=1234567890
 *   VITE_AD_SLOT_SIDEBAR=...
 *   VITE_AD_SLOT_INLINE=...
 *   VITE_AD_SLOT_FOOTER=...
 */
export const MONETIZATION_CONFIG = {
  enabled: envFlag(import.meta.env.VITE_MONETIZATION_ENABLED),
  provider: (import.meta.env.VITE_MONETIZATION_PROVIDER ?? 'adsense') as MonetizationProvider,
  adsenseClientId: import.meta.env.VITE_ADSENSE_CLIENT_ID ?? '',
  gamNetworkCode: import.meta.env.VITE_GAM_NETWORK_CODE ?? '',
  slots: {
    top: {
      key: 'top',
      format: '728x90',
      enabled: envFlag(import.meta.env.VITE_AD_SLOT_TOP_ENABLED ?? 'true'),
      slotId: import.meta.env.VITE_AD_SLOT_TOP ?? '',
      label: 'Banner superior — leaderboard 728×90',
    },
    sidebar: {
      key: 'sidebar',
      format: '300x250',
      enabled: envFlag(import.meta.env.VITE_AD_SLOT_SIDEBAR_ENABLED ?? 'true'),
      slotId: import.meta.env.VITE_AD_SLOT_SIDEBAR ?? '',
      label: 'Sidebar — retângulo médio 300×250',
    },
    inline: {
      key: 'inline',
      format: 'horizontal-flexible',
      enabled: envFlag(import.meta.env.VITE_AD_SLOT_INLINE_ENABLED ?? 'true'),
      slotId: import.meta.env.VITE_AD_SLOT_INLINE ?? '',
      label: 'Banner inline — responsivo entre blocos de conteúdo',
    },
    footer: {
      key: 'footer',
      format: '728x90',
      enabled: envFlag(import.meta.env.VITE_AD_SLOT_FOOTER_ENABLED ?? 'true'),
      slotId: import.meta.env.VITE_AD_SLOT_FOOTER ?? '',
      label: 'Banner inferior — leaderboard 728×90',
    },
  } satisfies Record<AdSlotKey, AdSlotDefinition>,
} as const;

/** Monetização global ligada e com credenciais mínimas do provedor configuradas */
export function isMonetizationActive(): boolean {
  if (!MONETIZATION_CONFIG.enabled) return false;

  switch (MONETIZATION_CONFIG.provider) {
    case 'adsense':
      return MONETIZATION_CONFIG.adsenseClientId.length > 0;
    case 'gam':
      return MONETIZATION_CONFIG.gamNetworkCode.length > 0;
    case 'amazon':
    case 'mercadolivre':
    case 'hotmart':
    case 'affiliate':
    case 'custom':
      return true;
    default:
      return false;
  }
}

/** Slot específico ativo: flag global + slot habilitado + ID configurado */
export function isAdSlotActive(key: AdSlotKey): boolean {
  if (!isMonetizationActive()) return false;
  const slot = MONETIZATION_CONFIG.slots[key];
  return slot.enabled && slot.slotId.length > 0;
}

export function getAdSlot(key: AdSlotKey): AdSlotDefinition {
  return MONETIZATION_CONFIG.slots[key];
}
