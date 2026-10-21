import type { ToolDefinition } from '../../types';
export default { id:'hash', number:'08', name:'Hash Calculator', english:'Hash Calculator', description:'テキストやファイルのSHAハッシュをブラウザ内で計算。', categories:['開発'], aliases:['ハッシュ','sha','チェックサム','digest'], load:()=>import('./Tool.svelte') } satisfies ToolDefinition;
