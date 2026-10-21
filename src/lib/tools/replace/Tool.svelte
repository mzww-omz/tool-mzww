<script lang="ts">
 import { untrack } from 'svelte';
 import type { ToolState } from '../../types';
 import Result from '../../components/Result.svelte';
 import { replaceAll } from './logic';
 let {state=$bindable()}=$props<{state:ToolState}>();
 untrack(()=>{state.text??='';state.search??='';state.replacement??='';state.output??='';state.error??='';});
 function run(){try{state.output=replaceAll(state.text,state.search,state.replacement);state.error='';}catch(e){state.error=(e as Error).message;}}
</script>
<div class="field-heading"><label for="replace-text">入力 / INPUT</label><button class="text-button" onclick={()=>{state.text='';state.search='';state.replacement='';state.output='';state.error='';}}>すべてクリア</button></div>
<textarea id="replace-text" bind:value={state.text} maxlength="500000" rows="7" placeholder="置換するテキストを入力…"></textarea>
<div class="form-grid"><label>検索する文字列<input bind:value={state.search} maxlength="10000" placeholder="検索文字列"/></label><label>置換後の文字列<input bind:value={state.replacement} maxlength="10000" placeholder="空欄で削除"/></label></div>
<div class="action-row"><button class="primary" onclick={run}>すべて置換 ↗</button><span class="limit-note">大文字・小文字を区別 / 文字列の完全一致</span></div>
{#if state.error}<p class="error" role="alert">{state.error}</p>{/if}<Result text={state.output}/>
