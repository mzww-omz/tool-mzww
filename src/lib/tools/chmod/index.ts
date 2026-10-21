import type {ToolDefinition} from '../../types';
export default {id:'chmod',number:'22',name:'chmod計算機',english:'chmod Calculator',description:'読み取り・書き込み・実行権限を8進数と記号に変換。',categories:['Linux','開発'],aliases:['パーミッション','permission','権限'],load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
