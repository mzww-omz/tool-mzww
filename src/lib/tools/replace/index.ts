import type { ToolDefinition } from '../../types';
export default { id:'replace', number:'03', name:'テキスト一括置換', english:'Find & Replace', description:'一致する文字列をまとめて置換。正規表現なしで安全に処理。', categories:['テキスト'], aliases:['置き換え','replacement','検索'], load:()=>import('./Tool.svelte') } satisfies ToolDefinition;
