<script lang="ts">
 import {onMount,onDestroy,untrack} from 'svelte';import {elapsed,timerValue,durationText,type Timer} from './logic';import {createTone} from '../../tone';import type {ToolState} from '../../types';
 let {state:data=$bindable()}: {state:ToolState} = $props();untrack(()=>{data.timers??=[];data.kind??='countdown';data.seconds??=300;data.name??='';data.sound??=true;data.error??='';});let now=$state(Date.now());const tone=createTone();
 function add(){const seconds=Number(data.seconds);if(data.timers.length>=20||data.kind==='countdown'&&(!Number.isFinite(seconds)||seconds<=0||seconds>604800)){data.error='最大20件、カウントダウンは0超〜604,800秒（7日）にしてください。';return;}data.timers=[...data.timers,{id:crypto.randomUUID(),name:data.name.trim()||`タイマー ${data.timers.length+1}`,kind:data.kind,duration:data.kind==='countdown'?seconds*1000:0,accumulated:0,startedAt:null,alerted:false}];data.error='';}
 async function toggle(timer:Timer){
  if(timer.startedAt!==null){timer.accumulated=elapsed(timer,Date.now());timer.startedAt=null;return;}
  if(data.sound){try{await tone.enable();}catch(e){data.error=`音声を有効にできません。計測は続行します。${(e as Error).message}`;}}
  if(timer.kind==='countdown'&&timerValue(timer,Date.now())===0){timer.accumulated=0;timer.alerted=false;}
  timer.startedAt=Date.now();now=Date.now();
 }
 function update(){now=Date.now();for(const timer of data.timers as Timer[]){if(timer.kind==='countdown'&&timer.startedAt!==null&&timerValue(timer,now)===0){timer.accumulated=timer.duration;timer.startedAt=null;timer.alerted=true;if(data.sound&&!tone.beep())data.error='タイマーが終了しました。音声はブラウザによって停止されていました。';}}}
 onMount(()=>{update();const id=setInterval(update,100);const visibility=()=>{if(!document.hidden)update();};document.addEventListener('visibilitychange',visibility);return ()=>{clearInterval(id);document.removeEventListener('visibilitychange',visibility);};});onDestroy(()=>tone.close());
 async function testSound(){try{await tone.enable();tone.beep();data.error='';}catch(e){data.error=(e as Error).message;}}
</script>
<div class="form-grid three"><label>種類<select bind:value={data.kind}><option value="countdown">カウントダウン</option><option value="stopwatch">ストップウォッチ</option></select></label><label>秒数<input type="number" min="0.1" max="604800" step="any" bind:value={data.seconds} disabled={data.kind==='stopwatch'}/></label><label>名前<input bind:value={data.name} maxlength="80" placeholder="例: お茶"/></label></div>
<div class="action-row"><button class="primary" onclick={add}>タイマーを追加</button><label class="checkbox-label"><input type="checkbox" bind:checked={data.sound}/> 終了時に通知音</label><button onclick={testSound}>通知音をテスト</button></div>
{#if data.error}<p role="alert" class="error">{data.error}</p>{/if}
<div class="timer-list">{#each data.timers as timer (timer.id)}<section class="timer-row"><div><h2>{timer.name}</h2><span class="micro">{timer.kind==='countdown'?'COUNTDOWN':'STOPWATCH'}</span></div><output aria-label={`${timer.name}の時間`}>{durationText(timer.kind==='countdown'?Math.ceil(timerValue(timer,now)/1000)*1000:timerValue(timer,now))}</output><div class="inline-actions"><button onclick={()=>toggle(timer)}>{timer.startedAt!==null?'一時停止':'開始'}</button><button onclick={()=>{timer.startedAt=null;timer.accumulated=0;timer.alerted=false;}}>リセット</button><button onclick={()=>data.timers=data.timers.filter((t:Timer)=>t.id!==timer.id)} aria-label={`${timer.name}を削除`}>削除</button></div>{#if timer.alerted}<p role="status" class="timer-done">{timer.name}が終了しました。</p>{/if}</section>{:else}<p class="tool-note">タイマーを追加してください。</p>{/each}</div>
<p class="tool-note">端末の絶対時刻から算出するため、バックグラウンド中のタイマー間引きで累積誤差は発生しません。画面を切り替えても時刻計算は継続しますが、音声通知はこのツールが開いている間のみ。OSの休止・音量・ミュートにより通知が遅れる／聞こえないことがあります。ページを閉じると消えます。システム時計の変更は計測に影響します。</p>
