import type {ToolDefinition} from '../../types';
export default {id:"unit-price",number:"50",name:"単価比較",english:"Unit Price Comparison",categories:["生活", "計算"],aliases:["買い物", "最安", "100g"],description:"重さ・容量・個数をそろえて商品の単価を比較。",load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
