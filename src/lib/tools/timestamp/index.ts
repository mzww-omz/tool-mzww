import type { ToolDefinition } from '../../types';
export default { id:'timestamp', number:'09', name:'UNIX Timestamp Converter', english:'UNIX Timestamp Converter', description:'UNIX秒・ミリ秒と日時を相互変換。UTCとローカル時刻を表示。', categories:['開発','数学'], aliases:['タイムスタンプ','日時','時刻','epoch'], load:()=>import('./Tool.svelte') } satisfies ToolDefinition;
