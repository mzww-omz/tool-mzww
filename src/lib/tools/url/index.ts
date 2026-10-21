import type { ToolDefinition } from '../../types';
export default { id:'url', number:'06', name:'URL Encode / Decode', english:'URL Encode / Decode', description:'URLの構成要素をパーセントエンコード・デコード。', categories:['開発','テキスト'], aliases:['エンコード','デコード','パーセント'], load:()=>import('./Tool.svelte') } satisfies ToolDefinition;
