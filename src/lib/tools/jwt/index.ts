import type {ToolDefinition} from '../../types';
export default {id:'jwt',number:'28',name:'JWT内容表示',english:'JWT Inspector',description:'トークンのヘッダーとペイロードを端末内で表示。署名は検証しません。',categories:['開発'],aliases:['token','トークン','jws'],load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
