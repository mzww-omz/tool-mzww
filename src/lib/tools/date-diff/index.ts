import type {ToolDefinition} from '../../types';
export default {id:"date-diff",number:"52",name:"日付差計算",english:"Date Difference Calculator",categories:["生活", "日時"],aliases:["日数", "閏年", "期間"],description:"UTCの日付でDSTによるずれなく日数と暦の差を計算。",load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
