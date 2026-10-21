import type {ToolDefinition} from '../../types';
export default {id:'unicode',number:'26',name:'Unicode解析',english:'Unicode Inspector',description:'文字ごとのコードポイント・UTF-16・UTF-8を表示。',categories:['開発','テキスト'],aliases:['コードポイント','サロゲート','codepoint'],load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
