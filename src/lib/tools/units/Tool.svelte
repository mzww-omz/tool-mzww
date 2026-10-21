<script lang="ts">
 import { untrack } from 'svelte';
 import type { ToolState } from '../../types';
 import { convert, groups } from './logic';
 import Result from '../../components/Result.svelte';
 let {state=$bindable()}: {state:ToolState} = $props();
 untrack(()=>{state.group??='長さ';state.from??='m';state.to??='km';state.value??=1;state.output??='';state.error??='';});
 let units=$derived(Object.keys(groups[state.group]));
 function changeGroup(){const keys=Object.keys(groups[state.group]);state.from=keys[0];state.to=keys[1];state.output='';state.error='';}
 function run(){try{if(state.value===undefined || state.value==='')throw new Error('数値を入力してください。');const n=convert(Number(state.value),state.from,state.to);if(!Number.isFinite(n))throw new Error('結果が数値の範囲を超えています。');state.output=`${Number(n.toPrecision(12))} ${state.to}`;state.error='';}catch(e){state.error=(e as Error).message;state.output='';}}
</script>
<label class="short-field">種類<select bind:value={state.group} onchange={changeGroup}>{#each Object.keys(groups) as g}<option>{g}</option>{/each}</select></label>
<div class="form-grid three"><label>数値<input type="number" step="any" bind:value={state.value}/></label><label>変換元<select bind:value={state.from}>{#each units as u}<option>{u}</option>{/each}</select></label><label>変換先<select bind:value={state.to}>{#each units as u}<option>{u}</option>{/each}</select></label></div>
<div class="action-row"><button class="primary" onclick={run}>変換 ↗</button><button onclick={()=>{const x=state.from;state.from=state.to;state.to=x;run();}}>単位を入れ替え</button><button onclick={()=>{state.value=undefined;state.output='';state.error='';}}>クリア</button></div>
{#if state.error}<p class="error" role="alert">{state.error}</p>{/if}<Result text={state.output}/><p class="tool-note">結果は有効数字12桁。データ量: KB = 1,000 B / KiB = 1,024 B。</p>
