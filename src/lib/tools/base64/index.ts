import type { ToolDefinition } from '../../types';
export default { id:'base64', number:'05', name:'Base64 Encode / Decode', english:'Base64 Encode / Decode', description:'UTF-8テキストをBase64にエンコード・デコード。', categories:['開発','テキスト'], aliases:['エンコード','デコード','ベース64'], load:()=>import('./Tool.svelte') } satisfies ToolDefinition;
