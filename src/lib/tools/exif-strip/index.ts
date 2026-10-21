import type {ToolDefinition} from '../../types';
export default {id:"exif-strip",number:"48",name:"画像メタデータ削除",english:"Image EXIF / Metadata Remover",categories:["画像", "ファイル"],aliases:["EXIF", "位置情報", "PNG", "WebP"],description:"静止画像の付随メタデータを再エンコードせず削除。",load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
