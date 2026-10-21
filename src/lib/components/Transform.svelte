<script lang="ts">
 import { untrack } from 'svelte';
 import type { ToolState } from '../types';
 import Result from './Result.svelte';
 let { state=$bindable(), actions, placeholder='変換するテキストを入力…', note='' } = $props<{state:ToolState; actions:{label:string; run:(text:string)=>string}[];placeholder?:string;note?:string}>();
 untrack(()=>{state.text ??= ''; state.output ??= ''; state.error ??= '';});
 function run(fn:(text:string)=>string) { try { state.output=fn(state.text); state.error=''; } catch(e) { state.error=e instanceof Error?e.message:String(e); state.output=''; } }
</script>
<div class="field-heading"><label for="transform-input">入力 / INPUT</label><button class="text-button" onclick={()=>{state.text='';state.output='';state.error='';}}>クリア</button></div>
<textarea id="transform-input" bind:value={state.text} maxlength="500000" {placeholder} rows="9"></textarea>
<div class="action-row">{#each actions as action,i}<button class:primary={i===0} onclick={()=>run(action.run)}>{action.label}<span aria-hidden="true"> ↗</span></button>{/each}<span class="limit-note">最大500,000文字</span></div>
{#if state.error}<p role="alert" class="error">{state.error}</p>{/if}
<Result text={state.output}/>
{#if note}<p class="tool-note">{note}</p>{/if}
