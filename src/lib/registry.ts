import type { ToolDefinition } from './types';
const modules = import.meta.glob<{default:ToolDefinition}>('./tools/*/index.ts', { eager:true });
export const tools = Object.values(modules).map(m=>m.default).sort((a,b)=>Number(a.number)-Number(b.number));
export const categories = [...new Set(tools.flatMap(t=>t.categories))];
export function matches(tool:ToolDefinition, query:string) {
 const haystack = [tool.name,tool.english,...tool.aliases,...tool.categories].join(' ').normalize('NFKC').toLowerCase();
 return query.normalize('NFKC').toLowerCase().trim().split(/\s+/).every(word=>haystack.includes(word));
}
