import type { ToolDefinition } from '../../types';
export default { id:'counter', number:'01', name:'文字数・行数カウンター', english:'Character Counter', description:'テキストの文字数、行数、単語数をリアルタイムでカウント。', categories:['テキスト'], aliases:['文字数','文字カウント','word count','文字数カウンター'], load:()=>import('./Tool.svelte') } satisfies ToolDefinition;
