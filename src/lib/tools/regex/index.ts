import type {ToolDefinition} from '../../types';
export default {id:'regex',number:'30',name:'正規表現クリエイター',english:'Regex Creator',description:'GUIと手入力で正規表現を作り、隔離Workerでマッチを確認。',categories:['開発','テキスト'],aliases:['regexp','regular expression','正規表現'],load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
