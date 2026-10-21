import type { ToolDefinition } from '../../types';
export default { id:'uuid', number:'07', name:'UUID Generator', english:'UUID Generator', description:'暗号学的乱数でUUID v4をまとめて生成。', categories:['開発'], aliases:['ユニークID','識別子','ジェネレーター'], load:()=>import('./Tool.svelte') } satisfies ToolDefinition;
