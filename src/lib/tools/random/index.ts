import type { ToolDefinition } from '../../types';
export default { id:'random', number:'14', name:'乱数ジェネレーター', english:'Random Number Generator', description:'指定した範囲の整数を、偏りのない暗号学的乱数で生成。', categories:['数学','ネタ'], aliases:['ランダム','サイコロ','random'], load:()=>import('./Tool.svelte') } satisfies ToolDefinition;
