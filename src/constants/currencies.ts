/** Metadados das moedas para exibição e busca */
export interface CurrencyInfo {
  code: string;
  name: string;
  /** fiat | crypto | metal */
  type: 'fiat' | 'crypto' | 'metal';
}

/** Moedas obsoletas (pré-euro etc.) — excluídas da lista */
export const OBSOLETE_CODES = new Set([
  'ATS', 'BEF', 'CYP', 'DEM', 'EEK', 'ESP', 'FIM', 'FRF', 'GRD', 'IEP', 'ITL',
  'LTL', 'LUF', 'LVL', 'MTL', 'NLG', 'PTE', 'ROL', 'SDD', 'SRG', 'SIT', 'SKK',
  'SPL', 'TMM', 'TRL', 'VAL', 'VEB', 'VEF', 'ZMK', 'ZWD', 'AZM', 'GHC', 'MGF',
  'MRO', 'MZM', 'STD', 'ZWL',
]);

/** Nomes em português para as moedas mais comuns */
export const CURRENCY_NAMES: Record<string, string> = {
  BRL: 'Real Brasileiro',
  USD: 'Dólar Americano',
  EUR: 'Euro',
  GBP: 'Libra Esterlina',
  JPY: 'Iene Japonês',
  CAD: 'Dólar Canadense',
  AUD: 'Dólar Australiano',
  CHF: 'Franco Suíço',
  ARS: 'Peso Argentino',
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
  CNY: 'Yuan Chinês',
  INR: 'Rúpia Indiana',
  MXN: 'Peso Mexicano',
  CLP: 'Peso Chileno',
  COP: 'Peso Colombiano',
  PEN: 'Sol Peruano',
  UYU: 'Peso Uruguaio',
  PYG: 'Guarani Paraguaio',
  BOB: 'Boliviano',
  VEF: 'Bolívar Venezuelano',
  VES: 'Bolívar Soberano',
  KRW: 'Won Sul-Coreano',
  SGD: 'Dólar de Singapura',
  HKD: 'Dólar de Hong Kong',
  TWD: 'Dólar Taiwanês',
  THB: 'Baht Tailandês',
  SEK: 'Coroa Sueca',
  NOK: 'Coroa Norueguesa',
  DKK: 'Coroa Dinamarquesa',
  PLN: 'Zloty Polonês',
  CZK: 'Coroa Tcheca',
  HUF: 'Forint Húngaro',
  RON: 'Leu Romeno',
  BGN: 'Lev Búlgaro',
  HRK: 'Kuna Croata',
  RUB: 'Rublo Russo',
  UAH: 'Hryvnia Ucraniana',
  TRY: 'Lira Turca',
  ILS: 'Shekel Israelense',
  AED: 'Dirham dos Emirados',
  SAR: 'Riyal Saudita',
  QAR: 'Riyal do Catar',
  KWD: 'Dinar do Kuwait',
  EGP: 'Libra Egípcia',
  ZAR: 'Rand Sul-Africano',
  NGN: 'Naira Nigeriana',
  KES: 'Xelim Queniano',
  MAD: 'Dirham Marroquino',
  PHP: 'Peso Filipino',
  IDR: 'Rupia Indonésia',
  MYR: 'Ringgit Malaio',
  VND: 'Dong Vietnamita',
  PKR: 'Rúpia Paquistanesa',
  BDT: 'Taka de Bangladesh',
  NZD: 'Dólar Neozelandês',
  XAU: 'Ouro (onça troy)',
  XAG: 'Prata (onça troy)',
  XDR: 'Direitos Especiais de Saque',
  SOL: 'Solana',
  XRP: 'Ripple',
  DOGE: 'Dogecoin',
  ADA: 'Cardano',
  DOT: 'Polkadot',
  LTC: 'Litecoin',
  BNB: 'Binance Coin',
  USDT: 'Tether',
  USDC: 'USD Coin',
};

const CRYPTO_CODES = new Set([
  'BTC', 'ETH', 'SOL', 'XRP', 'DOGE', 'ADA', 'DOT', 'LTC', 'BNB', 'USDT', 'USDC',
  'BCH', 'AVAX', 'LINK', 'MATIC', 'POL', 'SHIB', 'TRX', 'XLM', 'ATOM', 'UNI',
  'ETC', 'XMR', 'NEAR', 'APT', 'ARB', 'OP', 'FIL', 'ICP', 'HBAR', 'VET', 'ALGO',
  'MANA', 'SAND', 'AAVE', 'MKR', 'CRO', 'LDO', 'INJ', 'RUNE', 'STX', 'IMX',
  'PEPE', 'TON', 'SUI', 'SEI', 'TIA', 'WIF', 'BONK',
]);

const METAL_CODES = new Set(['XAU', 'XAG', 'XPT', 'XPD', 'PAXG', 'XAUT']);

export function getCurrencyName(code: string): string {
  return CURRENCY_NAMES[code] ?? code;
}

export function getCurrencyType(code: string): CurrencyInfo['type'] {
  if (METAL_CODES.has(code)) return 'metal';
  if (CRYPTO_CODES.has(code)) return 'crypto';
  return 'fiat';
}

export function buildCurrencyInfo(code: string): CurrencyInfo {
  return {
    code,
    name: getCurrencyName(code),
    type: getCurrencyType(code),
  };
}

/** Códigos padrão exibidos no mini-placar e selecionados inicialmente */
export const DEFAULT_FROM = 'USD';
export const DEFAULT_TO = 'BRL';

export const PLACAR_CODES = ['USD', 'EUR', 'BTC'] as const;
