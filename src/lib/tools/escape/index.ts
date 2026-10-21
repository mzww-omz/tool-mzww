import type {ToolDefinition} from '../../types';
export default {id:'escape',number:'29',name:'コード用エスケープ変換',english:'Code String Escape',description:'JSON文字列リテラルとJavaScript Unicodeエスケープを相互変換。',categories:['開発','テキスト'],aliases:['バックスラッシュ','string literal','unicode escape'],load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
