import type {ToolDefinition} from '../../types';
export default {id:"discount",number:"51",name:"割引計算",english:"Discount Calculator",categories:["生活", "計算"],aliases:["セール", "税込", "連続割引"],description:"割引額・連続割引と税込の最終価格を計算。",load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
