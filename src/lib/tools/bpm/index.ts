import type {ToolDefinition} from '../../types';
export default {id:"bpm",number:"54",name:"BPMタッパー",english:"BPM Tapper",categories:["音楽", "計測"],aliases:["テンポ", "タップ", "Space"],description:"タップ間隔から外れ値を除いてテンポを計測。",load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
