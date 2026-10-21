import type {ToolDefinition} from '../../types';
export default {id:"pdf-pages",number:"49",name:"PDFページ整理",english:"PDF Page Organizer",categories:["ファイル"],aliases:["ページ", "結合", "回転", "抽出"],description:"複数PDFのページを選び並べ替え・回転して保存。",load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
