import type { ToolDefinition } from '../../types';
export default { id:'image', number:'13', name:'画像リサイズ・形式変換', english:'Image Resizer / Converter', description:'画像をリサイズしてPNG・JPEG・WebPで保存。アップロード不要。', categories:['画像'], aliases:['resize','convert','圧縮','リサイズ','写真'], load:()=>import('./Tool.svelte') } satisfies ToolDefinition;
