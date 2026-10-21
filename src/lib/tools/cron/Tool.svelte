<script lang="ts">
 import {untrack} from 'svelte';import {cron,explainCron} from './logic';import Result from '../../components/Result.svelte';import type {ToolState} from '../../types';
 let {state=$bindable()}: {state:ToolState} = $props();untrack(()=>{state.fields??=['*/15','*','*','*','*'];state.expression??='*/15 * * * *';state.output??='';state.error??='';});
 function run(build=false){try{if(build)state.expression=cron(state.fields);state.output=state.expression+'\n\n'+explainCron(state.expression);state.fields=state.expression.trim().split(/\s+/);state.error='';}catch(e){state.error=(e as Error).message;state.output='';}}
</script>
<div class="compact-fields">{#each ['分 0–59','時 0–23','日 1–31','月 1–12','曜日 0–7'] as label,i}<label>{label}<input bind:value={state.fields[i]} maxlength="100"/></label>{/each}</div>
<div class="action-row"><button class="primary" onclick={()=>run(true)}>フィールドから生成</button><button onclick={()=>{state.fields=['0','9','*','*','1-5'];run(true);}}>平日9時</button><button onclick={()=>{state.fields=['*','*','*','*','*'];run(true);}}>毎分</button></div>
<label>Cron式（5項目）<input bind:value={state.expression} maxlength="504"/></label><div class="action-row"><button onclick={()=>run()}>手入力の式を解説</button><button onclick={()=>{state.output='';state.error='';}}>結果をクリア</button></div>
{#if state.error}<p role="alert" class="error">{state.error}</p>{/if}<Result text={state.output}/>
