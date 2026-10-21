import type {ToolDefinition} from '../../types';
export default {id:'notes',number:'20',name:'メモ',english:'Local Notes',description:'複数のメモを端末内に自動保存。検索とJSONの入出力に対応。',categories:['生活','テキスト'],aliases:['ノート','memo','notepad'],persistent:true,load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
