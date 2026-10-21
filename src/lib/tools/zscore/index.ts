import type {ToolDefinition} from '../../types';
export default {id:'zscore',number:'18',name:'偏差値計算機',english:'Deviation Score',description:'得点の偏差値と、複数得点の平均・標準偏差を計算。',categories:['数学'],aliases:['統計','標準偏差','z score','平均'],load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
