<script lang="ts">
 import {untrack} from 'svelte';import {deviation,statistics} from './logic';import Result from '../../components/Result.svelte';import type {ToolState} from '../../types';
 let {state=$bindable()}: {state:ToolState} = $props();untrack(()=>{state.score??=80;state.mean??=60;state.sd??=10;state.scores??='';state.sample??=false;state.output??='';state.error??='';});
 function run(multiple=false){try{if(multiple){const s=statistics(state.scores,state.sample);state.mean=s.mean;state.sd=s.sd;state.output=`件数: ${s.count}\n平均: ${s.mean}\n${state.sample?'標本':'母'}標準偏差: ${s.sd}\n`+(s.sd>0?`指定得点の偏差値: ${deviation(Number(state.score),s.mean,s.sd).toFixed(3)}`:'分散が0のため偏差値は定義できません。');}else{state.output=`偏差値: ${deviation(Number(state.score),Number(state.mean),Number(state.sd)).toFixed(3)}`;}state.error='';}catch(e){state.error=(e as Error).message;state.output='';}}
</script>
<div class="form-grid three"><label>得点<input type="number" step="any" bind:value={state.score}/></label><label>平均<input type="number" step="any" bind:value={state.mean}/></label><label>標準偏差<input type="number" min="0" step="any" bind:value={state.sd}/></label></div>
<div class="action-row"><button class="primary" onclick={()=>run()}>偏差値を計算</button></div>
<label>複数得点（空白・改行・カンマ区切り）<textarea rows="4" maxlength="200000" bind:value={state.scores} placeholder="40, 50, 60, 70, 80"></textarea></label>
<label class="checkbox-label"><input type="checkbox" bind:checked={state.sample}/> 標本標準偏差（n−1、通常はオフで母標準偏差）</label>
<div class="action-row"><button onclick={()=>run(true)}>得点一覧から統計・偏差値を計算</button><button onclick={()=>{state.scores='';state.output='';state.error='';}}>結果をクリア</button></div>
{#if state.error}<p role="alert" class="error">{state.error}</p>{/if}<Result text={state.output}/><p class="tool-note">偏差値 = 50 + 10 × (得点 − 平均) ÷ 標準偏差。最大10,000得点。平均・標準偏差は計算後に入力欄へ反映します。</p>
