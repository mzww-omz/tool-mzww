<script lang="ts">
 import { untrack } from 'svelte';
 import type { ToolState } from '../../types';
 import { radix } from './logic';
 import Result from '../../components/Result.svelte';
 let {state=$bindable()}: {state:ToolState} = $props();
 untrack(()=>{state.input??='';state.from??=10;state.to??=2;state.output??='';state.error??='';});
 function run(){try{state.output=radix(state.input.trim(),Number(state.from),Number(state.to));state.error='';}catch(e){state.error=(e as Error).message;state.output='';}}
</script>
<div class="form-grid"><label>変換元の基数<input type="number" min="2" max="36" bind:value={state.from}/></label><label>変換先の基数<input type="number" min="2" max="36" bind:value={state.to}/></label></div>
<label>変換する整数<input class="mono" bind:value={state.input} maxlength="4097" placeholder="例: 255、FF、101010"/></label>
<div class="action-row"><button class="primary" onclick={run}>変換 ↗</button><button onclick={()=>{const x=state.from;state.from=state.to;state.to=x;if(state.output){state.input=state.output;run();}}}>基数を入れ替え</button><button onclick={()=>{state.input='';state.output='';state.error='';}}>クリア</button></div>
{#if state.error}<p role="alert" class="error">{state.error}</p>{/if}<Result text={state.output}/><p class="tool-note">2〜36進数 / 負の整数に対応 / 最大4,096桁。0x・0bなどの接頭辞、小数、桁区切りは入力しないでください。</p>
