import type {ToolDefinition} from '../../types';
export default {id:"csv-tsv",number:"43",name:"CSV / TSV変換",english:"CSV / TSV Converter",categories:["データ", "開発"],aliases:["表", "カンマ", "タブ"],description:"引用符・改行を保持してCSVとTSVを相互変換。",load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
