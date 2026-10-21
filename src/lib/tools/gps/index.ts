import type {ToolDefinition} from '../../types';
export default {id:'gps',number:'21',name:'GPSスピードメーター',english:'GPS Speedometer',description:'位置情報から速度・距離を計測。距離と時間からの手動計算も。',categories:['生活','実験'],aliases:['移動速度','speed','スピード'],load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
