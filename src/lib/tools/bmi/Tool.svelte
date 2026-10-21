<script lang="ts">
 import {untrack} from 'svelte';import {bmi} from './logic';import Result from '../../components/Result.svelte';import type {ToolState} from '../../types';
 let {state=$bindable()}: {state:ToolState} = $props();untrack(()=>{state.height??=170;state.weight??=60;state.growing??=true;state.output??='';state.error??='';});
 function run(){try{const result=bmi(Number(state.height),Number(state.weight),state.growing);state.output=`BMI: ${result.value.toFixed(2)}\n\n${result.note}`;state.error='';}catch(e){state.error=(e as Error).message;state.output='';}}
</script>
<div class="form-grid"><label>身長 / cm<input type="number" min="0.1" max="300" step="any" bind:value={state.height}/></label><label>体重 / kg<input type="number" min="0.1" max="1000" step="any" bind:value={state.weight}/></label></div>
<label class="checkbox-label"><input type="checkbox" bind:checked={state.growing}/> 成長期・未成年の方（成人向け基準を適用しない）</label>
<div class="action-row"><button class="primary" onclick={run}>BMIを計算</button><button onclick={()=>{state.height=undefined;state.weight=undefined;state.output='';state.error='';}}>クリア</button></div>
{#if state.error}<p role="alert" class="error">{state.error}</p>{/if}<Result text={state.output}/><p class="tool-note">BMI = 体重kg ÷ 身長m²。どの年齢でも優劣や体型の評価は行いません。診断や減量の指示ではありません。</p>
