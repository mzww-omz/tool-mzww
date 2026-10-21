import type {ToolDefinition} from '../../types';
export default {id:'keyboard',number:'31',name:'キーボード故障チェック',english:'Keyboard Tester',description:'物理キーの押下状態、同時押し、event.key / codeを確認。入力は保存しません。',categories:['実験','開発'],aliases:['key test','キー','故障'],load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
