import type {ToolDefinition} from '../../types';
export default {id:"pixel-test",number:"55",name:"デッドピクセルテスト",english:"Dead Pixel Screen Test",categories:["画面", "計測"],aliases:["全画面", "液晶", "ドット抜け"],description:"単色表示を手動で切り替えて画面を目視確認。",load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
