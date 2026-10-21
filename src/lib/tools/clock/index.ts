import type {ToolDefinition} from '../../types';
export default {id:'clock',number:'34',name:'時計',english:'World Clock',description:'デジタル・アナログ・世界時計。IANAタイムゾーンを指定。',categories:['生活'],aliases:['世界時計','時差','timezone'],load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
