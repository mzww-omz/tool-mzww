import type {ToolDefinition} from '../../types';
export default {id:"clamp",number:"41",name:"CSS clamp()生成",english:"Fluid CSS clamp Generator",categories:["Web", "開発"],aliases:["fluid", "レスポンシブ", "タイポグラフィ"],description:"viewportと文字サイズの範囲から流動サイズを生成。",load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
