import type {ToolDefinition} from '../../types';
export default {id:'shuttle',number:'35',name:'20mシャトルラン',english:'20m Shuttle Run',description:'出典付きの参考ペースと合成ビープ音で進行を補助。いつでも中断可能。',categories:['生活','実験'],aliases:['beep test','往復持久走','運動'],load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
