<script lang="ts">
 import {untrack} from 'svelte';
 import type {ToolState} from '../../types';
 import Result from '../../components/Result.svelte';
 let {state=$bindable()}: {state:ToolState} = $props();
 import {convert} from './logic';untrack(()=>{state.input??='name: 日本語\ncount: 2';state.from??='yaml';state.to??='json';state.output??='';state.error??='';});function run(){try{state.output=convert(state.input,state.from,state.to);state.error='';}catch(e){state.output='';state.error=(e as Error).message;}}
</script>
<div class="form-grid"><label>入力形式<select bind:value={state.from}><option value="yaml">YAML</option><option value="toml">TOML</option></select></label><label>出力形式<select bind:value={state.to}><option value="json">JSON</option><option value="yaml">YAML</option><option value="toml">TOML</option></select></label></div><label>入力<textarea bind:value={state.input} maxlength="100000" rows="10" spellcheck="false"></textarea></label><div class="action-row"><button class="primary" onclick={run}>検証・変換</button></div>{#if state.error}<p class="error" role="alert">{state.error}</p>{/if}<Result text={state.output}/><p class="tool-note">例：name: 日本語 と count: 2。100,000文字・64階層・20,000要素。コメント・引用スタイルは保持しません。小数はIEEE 754精度で丸められ、整数と浮動小数点の表現上の区別も保持しません。数値の絶対値は安全整数範囲以内に制限します。日時型・精度を失う整数・非有限数・カスタムタグ・alias・危険なキーは拒否します。TOMLではnullを表現できません。</p>
