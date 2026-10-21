import type { ToolDefinition } from '../../types';
export default { id:'radix', number:'10', name:'進数変換', english:'Number Base Converter', description:'2〜36進数の整数を精度を失わずに変換。', categories:['数学','開発'], aliases:['binary','hex','decimal','2進数','16進数','基数'], load:()=>import('./Tool.svelte') } satisfies ToolDefinition;
