import type {ToolDefinition} from '../../types';
export default {id:"markdown",number:"44",name:"Markdownプレビュー",english:"Markdown Preview",categories:["テキスト", "Web"],aliases:["マークダウン", "HTML", "文書"],description:"表・コード・見出しを安全にプレビュー、HTML保存。",load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
