import type { ActiveTool } from '../../utils/calculations/toolCalculations';
import type { ToolSeoContent } from '../types';
import { jurosCompostosContent } from './juros-compostos';
import { calculadoraCdiContent } from './calculadora-cdi';
import { calculadoraIpcaContent } from './calculadora-ipca';
import { cltVsPjContent } from './clt-vs-pj';
import { aposentadoriaContent } from './aposentadoria';
import { rescisaoContent } from './rescisao';

export type SeoVariant = 'cdi' | 'ipca';

const TOOL_CONTENT_MAP: Record<ActiveTool, ToolSeoContent> = {
  juros: jurosCompostosContent,
  'clt-pj': cltVsPjContent,
  aposentadoria: aposentadoriaContent,
  rescisao: rescisaoContent,
};

const VARIANT_CONTENT_MAP: Record<SeoVariant, ToolSeoContent> = {
  cdi: calculadoraCdiContent,
  ipca: calculadoraIpcaContent,
};

export function getToolContent(tool: ActiveTool, variant?: SeoVariant): ToolSeoContent {
  if (variant) return VARIANT_CONTENT_MAP[variant];
  return TOOL_CONTENT_MAP[tool];
}

export const ALL_TOOL_CONTENT = Object.values(TOOL_CONTENT_MAP);
