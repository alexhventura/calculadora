/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MONETIZATION_ENABLED?: string;
  readonly VITE_MONETIZATION_PROVIDER?: string;
  readonly VITE_ADSENSE_CLIENT_ID?: string;
  readonly VITE_GAM_NETWORK_CODE?: string;
  readonly VITE_AD_SLOT_TOP?: string;
  readonly VITE_AD_SLOT_SIDEBAR?: string;
  readonly VITE_AD_SLOT_INLINE?: string;
  readonly VITE_AD_SLOT_FOOTER?: string;
  readonly VITE_AD_SLOT_TOP_ENABLED?: string;
  readonly VITE_AD_SLOT_SIDEBAR_ENABLED?: string;
  readonly VITE_AD_SLOT_INLINE_ENABLED?: string;
  readonly VITE_AD_SLOT_FOOTER_ENABLED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
