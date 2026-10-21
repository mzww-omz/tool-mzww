import type {ToolDefinition} from '../../types';
export default {id:'score',number:'36',name:'得点ボード',english:'Scoreboard',description:'2〜4チームの得点を加減算。Undoと全画面表示に対応。',categories:['生活','ネタ'],aliases:['スコア','得点','チーム'],load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
