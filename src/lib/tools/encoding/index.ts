import type {ToolDefinition} from '../../types';
export default {id:'encoding',number:'16',name:'文字化け生成・解読',english:'Encoding / Mojibake',description:'実際のバイト列で文字コード変換・文字化け生成・復元候補を確認。',categories:['テキスト','開発'],aliases:['Shift_JIS','UTF-8','文字コード','mojibake'],load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
