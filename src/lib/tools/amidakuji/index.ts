import type {ToolDefinition} from '../../types';
export default {id:"amidakuji",number:"56",name:"あみだくじ",english:"Amidakuji Ladder Lottery",categories:["娯楽"],aliases:["抽選", "くじ", "ランダム"],description:"ランダムな対応をあみだの経路で表示。",load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
