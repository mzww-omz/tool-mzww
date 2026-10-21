import type { ToolDefinition } from '../../types';
export default { id:'units', number:'11', name:'単位変換', english:'Unit Converter', description:'長さ・重さ・温度・面積・データ量の単位を変換。', categories:['数学'], aliases:['unit','換算','メートル','温度'], load:()=>import('./Tool.svelte') } satisfies ToolDefinition;
