import type {ToolDefinition} from '../../types';
export default {id:'cron',number:'23',name:'Cron式生成・解説',english:'Cron Builder',description:'5項目のCron式を作成し、各フィールドの意味を確認。',categories:['Linux','開発'],aliases:['クーロン','crontab','スケジュール'],load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
