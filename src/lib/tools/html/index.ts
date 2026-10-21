import type {ToolDefinition} from '../../types';
export default {id:'html',number:'27',name:'HTMLエンティティ変換',english:'HTML Entities',description:'HTMLの特殊文字と文字参照を、実行せずに変換。',categories:['開発','テキスト'],aliases:['実体参照','entity','escape html'],load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
