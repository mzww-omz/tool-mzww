import type { ToolDefinition } from '../../types';
export default { id:'color', number:'12', name:'カラーコード変換', english:'Color Converter', description:'HEX・RGB・HSLを相互変換。色をプレビュー。', categories:['画像','開発'], aliases:['色','colour','hex','rgb','hsl'], load:()=>import('./Tool.svelte') } satisfies ToolDefinition;
