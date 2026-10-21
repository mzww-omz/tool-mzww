import type {ToolDefinition} from '../../types';
export default {id:'bmi',number:'17',name:'BMI計算機',english:'BMI Calculator',description:'身長・体重からBMIを中立的な数値で表示。',categories:['数学','生活'],aliases:['体格指数','身長','体重'],load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
