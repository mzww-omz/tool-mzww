import type {ToolDefinition} from '../../types';
export default {id:"electricity",number:"53",name:"電気代計算",english:"Electricity Cost Calculator",categories:["生活", "計算"],aliases:["kWh", "消費電力", "家電"],description:"複数機器の1日・月・年の消費電力量と費用を概算。",load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
