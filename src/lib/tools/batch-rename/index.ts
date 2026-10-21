import type {ToolDefinition} from '../../types';
export default {id:"batch-rename",number:"47",name:"ファイル一括リネーム",english:"Batch File Rename",categories:["ファイル"],aliases:["ZIP", "連番", "ファイル名"],description:"変更名をプレビューして元データをZIPにまとめる。",load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
