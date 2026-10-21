import type {ToolDefinition} from '../../types';
export default {id:'shell',number:'24',name:'Shell文字列エスケープ',english:'POSIX Shell Quote',description:'文字列をPOSIXシェルの1引数として安全にクォート。',categories:['Linux','開発'],aliases:['bash','sh','引用符','quote'],load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
