import type {ToolDefinition} from '../../types';
export default {id:"tailwind",number:"39",name:"Tailwindプレイグラウンド",english:"Tailwind CSS v4 Playground",categories:["Web", "開発"],aliases:["HTML", "CSS", "クラス"],description:"ブラウザ内コンパイラで任意クラスを実際のCSSへ変換。",load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
