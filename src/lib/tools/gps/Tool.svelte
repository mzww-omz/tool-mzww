<script lang="ts">
 import {onDestroy,untrack} from 'svelte';import {distance,speed,acceptFix,manualSpeed,type Fix} from './logic';import {durationText} from '../timer/logic';import CopyButton from '../../components/CopyButton.svelte';import type {ToolState} from '../../types';
 let {state:data=$bindable()}=$props<{state:ToolState}>();untrack(()=>{data.unit??='km/h';data.mode??='gps';data.meters??=0;data.elapsed??=0;data.maximum??=0;data.manualMeters??=100;data.seconds??=10;data.output??='';data.error??='';});
 let running=$state(false),current=$state(0),now=$state(Date.now()),accuracy=$state<number|null>(null),status=$state('停止中');let watch:number|undefined,last:Fix|undefined,started=0,tick:ReturnType<typeof setInterval>|undefined;
 let elapsed=$derived(data.elapsed+(running?now-started:0));let average=$derived(elapsed>0?data.meters/(elapsed/1000):0);
 function stop(){if(watch!==undefined)navigator.geolocation.clearWatch(watch);watch=undefined;if(tick)clearInterval(tick);if(running)data.elapsed+=Math.max(0,Date.now()-started);running=false;last=undefined;current=0;status='停止中';}
 function position(position:GeolocationPosition){
  if(!running)return;const c=position.coords;const fix:Fix={lat:c.latitude,lon:c.longitude,accuracy:c.accuracy,time:position.timestamp,speed:c.speed};accuracy=fix.accuracy;
  if(!acceptFix(fix)){status='精度が不足しています（50m以下を待機）';current=0;return;}
  data.error='';
  if(!last||fix.time-last.time>30000){last=fix;status='測位中（次の位置を待機）';return;}
  if(!acceptFix(fix,last)){status='時間間隔または不自然な移動を除外';return;}
  const meters=distance(last,fix),seconds=(fix.time-last.time)/1000,threshold=Math.max(3,(fix.accuracy+last.accuracy)/2);
  const moving=meters>threshold;let instant=moving?meters/seconds:0;
  if(c.speed!==null&&Number.isFinite(c.speed)&&c.speed>=0&&c.speed<=100)instant=c.speed;
  if(moving){data.meters+=meters;last=fix;}
  current=current*.6+instant*.4;data.maximum=Math.max(data.maximum,current);status='測定中';
 }
 function start(){
  if(running)return;data.error='';if(!globalThis.isSecureContext||!navigator.geolocation){data.error='HTTPSと位置情報対応ブラウザが必要です。手動計算を利用できます。';return;}
  started=Date.now();now=started;running=true;status='位置情報の許可・測位を待機中…';
  try{watch=navigator.geolocation.watchPosition(position,error=>{if(error.code===1){stop();data.error='位置情報の利用が拒否されました。ブラウザ設定を確認するか手動計算を利用してください。';}else{current=0;status='位置情報の再取得を待機中';data.error=error.code===3?'位置情報がタイムアウトしました。再取得を待つか、停止して手動計算を利用してください。':'位置情報を取得できません。再取得を待つか、停止して手動計算を利用してください。';}},{enableHighAccuracy:true,maximumAge:0,timeout:15000});tick=setInterval(()=>now=Date.now(),250);}catch(e){stop();data.error=(e as Error).message;}
 }
 function reset(){stop();data.meters=0;data.elapsed=0;data.maximum=0;accuracy=null;data.error='';data.output='';}
 function manual(){try{data.output=`速度: ${speed(manualSpeed(Number(data.manualMeters),Number(data.seconds)),data.unit).toFixed(3)} ${data.unit}`;data.error='';}catch(e){data.error=(e as Error).message;}}
 onDestroy(stop);
</script>
<div class="form-grid"><label>モード<select bind:value={data.mode} onchange={stop}><option value="gps">GPSリアルタイム測定</option><option value="manual">距離 ÷ 時間（手動）</option></select></label><label>速度の単位<select bind:value={data.unit}><option>km/h</option><option>mph</option><option>m/s</option></select></label></div>
{#if data.mode==='gps'}
<div class="speed-readout"><strong>{speed(current,data.unit).toFixed(1)}</strong><span>{data.unit}</span><p role="status">{status}{accuracy!==null?` / 精度 ±${Math.round(accuracy)}m`:''}</p></div>
<dl class="readouts"><div><dt>平均速度</dt><dd>{speed(average,data.unit).toFixed(1)} {data.unit}</dd></div><div><dt>最高速度</dt><dd>{speed(data.maximum,data.unit).toFixed(1)} {data.unit}</dd></div><div><dt>移動距離</dt><dd>{data.meters.toFixed(1)} m</dd></div><div><dt>経過時間</dt><dd>{durationText(elapsed)}</dd></div></dl>
<div class="action-row"><button class="primary" disabled={running} onclick={start}>測定開始</button><button disabled={!running} onclick={stop}>停止</button><button onclick={reset}>リセット</button><CopyButton text={`距離: ${data.meters.toFixed(1)}m\n経過: ${durationText(elapsed)}\n平均: ${speed(average,data.unit).toFixed(2)} ${data.unit}\n最高: ${speed(data.maximum,data.unit).toFixed(2)} ${data.unit}`}/></div>
{:else}<div class="form-grid"><label>距離 / m<input type="number" min="0" step="any" bind:value={data.manualMeters}/></label><label>時間 / 秒<input type="number" min="0.001" step="any" bind:value={data.seconds}/></label></div><div class="action-row"><button class="primary" onclick={manual}>速度を計算</button><button onclick={reset}>リセット</button></div>{#if data.output}<output class="key-output">{data.output}</output><CopyButton text={data.output}/>{/if}{/if}
{#if data.error}<p role="alert" class="error">{data.error}</p>{/if}
<p class="tool-note">位置情報は開始操作後だけ取得します。座標は直前の1点のみメモリ保持し、停止・画面切替で破棄。経路履歴は保存しません。50mを超える誤差、1秒未満の間隔、100m/s超の飛びを除外し、精度に応じた移動閾値と平滑化を使用します。GPS誤差で低速の移動を過少計測する場合があります。画面切替で停止。安全計器ではありません。運転・走行中に画面を操作しないでください。</p>
