import type { HubContentBase } from '../types';
import { investimentosHub } from './investimentos';
import { financasPessoaisHub } from './financas-pessoais';
import { aposentadoriaHub } from './aposentadoria';
import { salarioCltHub } from './salario-clt';
import { empreendedorismoHub } from './empreendedorismo';

const CATEGORY_HUBS: Record<string, HubContentBase> = {
  investimentos: investimentosHub,
  'financas-pessoais': financasPessoaisHub,
  aposentadoria: aposentadoriaHub,
  'salario-clt': salarioCltHub,
  empreendedorismo: empreendedorismoHub,
};

export function getCategoryHub(slug: string): HubContentBase | undefined {
  return CATEGORY_HUBS[slug];
}

export const CATEGORY_HUB_SLUGS = Object.keys(CATEGORY_HUBS);

export function estimateReadTime(content: HubContentBase): number {
  const text = [
    content.intro,
    ...content.sections.flatMap((s) => [
      s.title,
      ...s.paragraphs,
      ...(s.list ?? []),
      ...(s.subsections?.flatMap((sub) => [sub.title, ...sub.paragraphs, ...(sub.list ?? [])]) ?? []),
    ]),
  ].join(' ');
  const words = text.split(/\s+/).length;
  return Math.max(8, Math.ceil(words / 200));
}
