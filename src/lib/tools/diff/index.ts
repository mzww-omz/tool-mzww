import type { ToolDefinition } from '../../types';
export default { id:'diff', number:'02', name:'テキスト差分比較', english:'Text Diff', description:'2つのテキストを行単位で比較し、追加・削除を確認。', categories:['テキスト','開発'], aliases:['比較','difference','差分','diff checker'], load:()=>import('./Tool.svelte') } satisfies ToolDefinition;
