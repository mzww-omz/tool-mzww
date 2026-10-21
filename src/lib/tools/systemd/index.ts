import type {ToolDefinition} from '../../types';
export default {id:'systemd',number:'25',name:'systemd Unit生成',english:'systemd Unit Builder',description:'実行ファイルと引数からシンプルなservice Unitを生成。',categories:['Linux','開発'],aliases:['service','サービス','unit'],load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
