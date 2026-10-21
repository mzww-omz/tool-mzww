<script lang="ts">
 import { untrack } from 'svelte';
 import type { ToolState } from '../../types';
 import { uuids } from './logic';
 import Result from '../../components/Result.svelte';
 let {state=$bindable()}: {state:ToolState} = $props();
 untrack(()=>{state.amount??=1;state.output??='';state.error??='';});
 function generate(){try{state.output=uuids(Number(state.amount)).join('\n');state.error='';}catch(e){state.error=(e as Error).message;}}
</script>
<label class="short-field">生成する個数<input type="number" min="1" max="10000" bind:value={state.amount}/></label>
<div class="action-row"><button class="primary" onclick={generate}>UUID v4を生成 ↗</button><button onclick={()=>{state.output='';state.error='';}}>クリア</button></div>
{#if state.error}<p role="alert" class="error">{state.error}</p>{/if}<Result text={state.output}/><p class="tool-note">crypto.randomUUID() によるランダムなUUID v4。最大10,000個。1行に1つずつ出力します。</p>
