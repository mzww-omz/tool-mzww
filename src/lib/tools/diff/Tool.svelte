<script lang="ts">
 import { untrack } from 'svelte';
 import type { ToolState } from '../../types';
 import { diff } from './logic';
 import CopyButton from '../../components/CopyButton.svelte';
 let {state=$bindable()}: {state:ToolState} = $props();
 untrack(()=>{state.before??='';state.after??='';state.result??=[];state.error??='';});
 function compare(){try{state.result=diff(state.before.replace(/\r\n?/g,'\n'),state.after.replace(/\r\n?/g,'\n'));state.error='';}catch(e){state.error=(e as Error).message;state.result=[];}}
</script>
<div class="form-grid"><label>変更前 / BEFORE<textarea bind:value={state.before} maxlength="200000" rows="12" placeholder="変更前のテキスト"></textarea></label><label>変更後 / AFTER<textarea bind:value={state.after} maxlength="200000" rows="12" placeholder="変更後のテキスト"></textarea></label></div>
<div class="action-row"><button class="primary" onclick={compare}>差分を比較 ↗</button><button onclick={()=>{state.before='';state.after='';state.result=[];state.error='';}}>クリア</button><span class="limit-note">各200,000文字 / 各約1,000行まで</span></div>
{#if state.error}<p class="error" role="alert">{state.error}</p>{/if}
<div class="field-heading"><span>比較結果 / DIFF</span><CopyButton text={state.result.map((r:any)=>(r.kind==='add'?'+':r.kind==='remove'?'-':' ')+r.text).join('\n')}/></div>
<div class="diff-output" aria-live="polite">{#each state.result as line}<div class="diff-line" class:diff-add={line.kind==='add'} class:diff-remove={line.kind==='remove'}><span>{line.kind==='add'?'+':line.kind==='remove'?'−':' '}</span><pre>{line.text || ' '}</pre></div>{:else}<p class="empty-output">追加は + 、削除は − で表示します。</p>{/each}</div>
