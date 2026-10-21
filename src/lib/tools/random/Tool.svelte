<script lang="ts">
 import { untrack } from 'svelte';
 import type { ToolState } from '../../types';
 import { randomIntegers } from './logic';
 import Result from '../../components/Result.svelte';
 let {state=$bindable()}=$props<{state:ToolState}>();
 untrack(()=>{state.min??=1;state.max??=100;state.amount??=10;state.output??='';state.error??='';});
 function run(){try{state.output=randomIntegers(Number(state.min),Number(state.max),Number(state.amount)).join('\n');state.error='';}catch(e){state.error=(e as Error).message;state.output='';}}
</script>
<div class="form-grid three"><label>最小値（含む）<input type="number" bind:value={state.min}/></label><label>最大値（含む）<input type="number" bind:value={state.max}/></label><label>生成数<input type="number" min="1" max="10000" bind:value={state.amount}/></label></div>
<div class="action-row"><button class="primary" onclick={run}>乱数を生成 ↗</button><button onclick={()=>{state.output='';state.error='';}}>クリア</button></div>
{#if state.error}<p role="alert" class="error">{state.error}</p>{/if}<Result text={state.output}/><p class="tool-note">整数のみ・重複あり。crypto.getRandomValues() と棄却法により偏りを避けます。最大10,000個 / 範囲幅は2³²以内。</p>
