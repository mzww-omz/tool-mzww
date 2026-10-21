<script lang="ts">
 import {onDestroy,onMount,untrack} from 'svelte';import {shuttlePlan,shuttleAt,source} from './logic';import {durationText} from '../timer/logic';import {createTone} from '../../tone';import CopyButton from '../../components/CopyButton.svelte';import type {ToolState} from '../../types';
 let {state:data=$bindable()}=$props<{state:ToolState}>();untrack(()=>{data.elapsed??=0;data.ended??=false;data.error??='';});
 const plan=shuttlePlan(),tone=createTone();let running=$state(false),starting=$state(false),elapsed=$state(0),timer:ReturnType<typeof setInterval>|undefined,started=0,scheduled=0,request=0;
 let progress=$derived(shuttleAt(plan,elapsed));
 function pause(){request++;starting=false;if(running){data.elapsed+=Math.max(0,performance.now()-started);elapsed=data.elapsed;}running=false;if(timer)clearInterval(timer);timer=undefined;tone.silence();}
 function update(){if(!running)return;elapsed=data.elapsed+performance.now()-started;const state=shuttleAt(plan,elapsed);if(state.finished){data.elapsed=plan[plan.length-1].at;elapsed=data.elapsed;running=false;if(timer)clearInterval(timer);timer=undefined;data.ended=true;return;}
  if(scheduled<plan.length&&plan[scheduled].at-elapsed < -500){pause();data.error='進行が遅延したため一時停止しました。安全を確認して再開してください。';return;}
  while(scheduled<plan.length&&plan[scheduled].at-elapsed<=200){if(!tone.beep(plan[scheduled].shuttle===1?1100:880,plan[scheduled].at-elapsed)){pause();data.error='音声が停止したため中断しました。';return;}scheduled++;}
 }
 async function start(){if(running||starting)return;if(data.ended){data.error='終了済みです。リセットしてから開始してください。';return;}starting=true;const token=++request;try{await tone.enable();if(token!==request)return;data.error='';scheduled=shuttleAt(plan,data.elapsed).completed;started=performance.now();elapsed=data.elapsed;running=true;tone.beep(660);timer=setInterval(update,50);}catch(e){if(token===request)data.error=`音声を開始できません。${(e as Error).message}`;}finally{if(token===request)starting=false;}}
 function end(){pause();data.ended=true;}
 onMount(()=>{elapsed=data.elapsed;const visibility=()=>{if(document.hidden&&running){pause();data.error='画面が非表示になったため安全のため一時停止しました。';}};document.addEventListener('visibilitychange',visibility);return ()=>document.removeEventListener('visibilitychange',visibility);});onDestroy(()=>{pause();tone.close();});
</script>
<p class="error">体調に不安がある場合は実施しないでください。痛み・息苦しさ・めまいを感じたら、すぐに「終了」で中断し、無理をしないでください。</p>
<dl class="readouts"><div><dt>レベル / 次のシャトル</dt><dd>{progress.current.level} / {progress.current.shuttle}</dd></div><div><dt>参考速度</dt><dd>{progress.current.speed.toFixed(1)} km/h</dd></div><div><dt>完了本数 / 距離</dt><dd>{progress.completed} / {progress.completed*20} m</dd></div><div><dt>経過</dt><dd>{durationText(elapsed)}</dd></div></dl>
<div class="speed-readout"><strong>{(progress.remaining/1000).toFixed(1)}</strong><span>秒 / 次の20m</span><p role="status">{data.ended?'終了':running?'進行中':'待機・一時停止'}</p></div>
<div class="action-row"><button class="primary" onclick={start} disabled={running||starting||data.ended}>開始 / 再開</button><button onclick={pause} disabled={!running}>一時停止</button><button class="primary" onclick={end}>終了・中断</button><button onclick={()=>{pause();data.elapsed=0;elapsed=0;data.ended=false;data.error='';}}>リセット</button><CopyButton text={`完了: ${progress.completed}本 / ${progress.completed*20}m\n経過: ${durationText(elapsed)}`}/></div>
{#if data.error}<p role="alert" class="error">{data.error}</p>{/if}
<p class="tool-note">参考ペース: 20m、8.5km/h開始、レベルごとに0.5km/h増加。各レベルの本数は <a class="source-link" href={source} target="_blank" rel="noreferrer">Topend Sportsの掲載表（8.5km/h版）</a> を使用（2026-10-21確認）。音はWeb Audioで合成し、公式音源は使用していません。日本の新体力テスト等の公式音源との一致・認定記録は保証しません。画面非表示・ツール切替で一時停止。開始前に20mの安全な直線区間を確保し、音量を確認してください。</p>
