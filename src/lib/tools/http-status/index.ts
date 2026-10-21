import type {ToolDefinition} from '../../types';
export default {id:"http-status",number:"46",name:"HTTPステータス辞典",english:"HTTP Status Dictionary",categories:["Web", "開発"],aliases:["レスポンス", "404", "エラー", "HTTP"],description:"正式に割り当てられた主要コードを分類・検索。",load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
