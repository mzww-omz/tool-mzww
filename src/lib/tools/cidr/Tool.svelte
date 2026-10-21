<script lang="ts">
 import {untrack} from 'svelte';
 import type {ToolState} from '../../types';
 import Result from '../../components/Result.svelte';
 let {state=$bindable()}=$props<{state:ToolState}>();
 import {cidr} from './logic';untrack(()=>{state.input??='192.168.1.99/24';});let result=$derived.by(()=>{try{const v=cidr(state.input);return {text:`IPv${v.version} /${v.prefix}\nネットワーク: ${v.network}\n範囲終端: ${v.last}\nブロードキャスト: ${v.broadcast}\nアドレス数: ${v.count}\n利用可能数: ${v.hosts}\n利用可能範囲: ${v.firstHost} 〜 ${v.lastHost}`,error:''};}catch(e){return {text:'',error:(e as Error).message};}});
</script>
<label>IP / CIDR<input bind:value={state.input} maxlength="100" spellcheck="false"/></label>{#if result.error}<p role="alert" class="error">{result.error}</p>{/if}<Result text={result.text}/><p class="tool-note">例：192.168.1.99/24、2001:db8::1/64。IPv4 /31は2ホスト、/32は1ホストとして計算。IPv6にブロードキャストはなく、全アドレス数を表示。IPv6 zone ID、IPv4の先頭ゼロ表記は非対応。</p>
