<script lang="ts">
 import { untrack } from 'svelte';
 import type { ToolState } from '../../types';
 import { timestamp } from './logic';
 import Result from '../../components/Result.svelte';
 let {state=$bindable()}=$props<{state:ToolState}>();
 untrack(()=>{state.input??='';state.mode??='seconds';state.output??='';state.error??='';});
 function run(){try{const t=timestamp(state.input,state.mode);state.output=`UNIX (秒): ${t.seconds}\nUNIX (ミリ秒): ${t.milliseconds}\nUTC: ${t.iso}\nローカル: ${t.local}`;state.error='';}catch(e){state.error=(e as Error).message;state.output='';}}
</script>
<div class="form-grid"><label>入力形式<select bind:value={state.mode}><option value="seconds">UNIX 秒</option><option value="milliseconds">UNIX ミリ秒</option><option value="date">日時文字列（ISO 8601）</option></select></label><label>値<input bind:value={state.input} maxlength="100" placeholder={state.mode==='date'?'2025-01-01T00:00:00+09:00':'1735689600'}/></label></div>
<div class="action-row"><button class="primary" onclick={run}>変換 ↗</button><button onclick={()=>{state.mode='milliseconds';state.input=String(Date.now());run();}}>現在時刻</button><button onclick={()=>{state.input='';state.output='';state.error='';}}>クリア</button></div>
{#if state.error}<p class="error" role="alert">{state.error}</p>{/if}<Result text={state.output}/><p class="tool-note">日時には Z または +09:00 などのタイムゾーン指定を推奨。省略するとブラウザの日時解釈に従います。</p>
