import type { ToolDefinition } from '../../types';
export default { id:'life', number:'15', name:"Conway’s Game of Life", english:"Conway’s Game of Life", description:'セルを配置し、単純なルールから生まれる生命のパターンを観察。', categories:['実験','ネタ'], aliases:['ライフゲーム','生命','conway','simulation'], load:()=>import('./Tool.svelte') } satisfies ToolDefinition;
