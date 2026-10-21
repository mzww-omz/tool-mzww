import type {ToolDefinition} from '../../types';
export default {id:'timer',number:'33',name:'タイマー',english:'Timers / Stopwatch',description:'複数のカウントダウンとストップウォッチ。絶対時刻に基づいて計測。',categories:['生活'],aliases:['countdown','ストップウォッチ','時間'],load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
