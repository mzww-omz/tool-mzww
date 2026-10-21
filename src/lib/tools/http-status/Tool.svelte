<script lang="ts">
 import {untrack} from 'svelte';
 import type {ToolState} from '../../types';
 import Result from '../../components/Result.svelte';
 let {state=$bindable()}=$props<{state:ToolState}>();
 import {searchStatus} from './logic';untrack(()=>{state.query??='';state.group??='';});let matches=$derived(searchStatus(state.query,state.group));
</script>
<div class="form-grid"><label>番号・名称・説明で検索<input bind:value={state.query} maxlength="200" placeholder="例：404 / 認証 / Too Many"/></label><label>分類<select bind:value={state.group}><option value="">すべて</option>{#each ['1','2','3','4','5'] as v}<option value={v}>{v}xx</option>{/each}</select></label></div><p role="status">{matches.length}件</p>{#each matches as item}<section style="border-top:1px solid var(--line);padding:16px 0"><h2 style="font-size:16px">{item.code} {item.name}</h2><p>{item.description}</p><p class="tool-note">例：{item.example}</p></section>{/each}<p class="tool-note">IANA HTTP Status Code RegistryとRFC 9110ほかの主要な恒久登録コードを収録。418（Unused）、未割当・非標準コードや一時登録は収録しません。305・510は新規利用非推奨。401は認証、403はアクセス拒否です。外部情報の自動取得は行いません。</p>
