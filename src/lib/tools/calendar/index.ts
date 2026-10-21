import type {ToolDefinition} from '../../types';
export default {id:'calendar',number:'32',name:'カレンダー',english:'Local Calendar',description:'月・週表示で予定を登録・編集。端末内だけに保存。',categories:['生活'],aliases:['予定','暦','schedule'],persistent:true,load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
