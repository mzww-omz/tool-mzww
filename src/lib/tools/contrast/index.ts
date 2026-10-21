import type {ToolDefinition} from '../../types';
export default {id:"contrast",number:"40",name:"コントラスト検証",english:"WCAG Contrast Checker",categories:["Web", "カラー"],aliases:["アクセシビリティ", "AA", "AAA", "WCAG"],description:"前景と背景のコントラスト比とWCAG 2.2判定。",load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
