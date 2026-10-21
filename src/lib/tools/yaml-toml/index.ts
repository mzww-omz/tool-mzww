import type {ToolDefinition} from '../../types';
export default {id:"yaml-toml",number:"42",name:"YAML / TOML整形",english:"YAML / TOML Formatter",categories:["データ", "開発"],aliases:["設定", "JSON", "構文検証"],description:"構文検証・整形・安全に変換できる範囲で相互変換。",load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
