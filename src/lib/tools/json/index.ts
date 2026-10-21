import type { ToolDefinition } from '../../types';
export default { id:'json', number:'04', name:'JSON Formatter', english:'JSON Formatter / Validator', description:'JSONを整形・圧縮し、構文エラーを確認。', categories:['開発','テキスト'], aliases:['バリデーター','フォーマッター','検証','validate'], load:()=>import('./Tool.svelte') } satisfies ToolDefinition;
