<script lang="ts">
 import {untrack} from 'svelte';
 import type {ToolState} from '../../types';
 import Result from '../../components/Result.svelte';
 let {state=$bindable()}: {state:ToolState} = $props();
 import {parseDelimited,serializeDelimited} from './logic';import {download} from '../../browser-files';untrack(()=>{state.input??='商品,価格\r\nりんご,120\r\nみかん,80';state.from??=',';});let result=$derived.by(()=>{try{const rows=parseDelimited(state.input,state.from);return {rows,output:serializeDelimited(rows,state.from===','?'\t':','),error:''};}catch(e){return {rows:[],output:'',error:(e as Error).message};}});
</script>
<label>入力形式<select bind:value={state.from}><option value=",">CSV → TSV</option><option value="	">TSV → CSV</option></select></label><label>入力<textarea bind:value={state.input} maxlength="200000" rows="9" spellcheck="false"></textarea></label>{#if result.error}<p class="error" role="alert">{result.error}</p>{:else}<div style="overflow:auto;max-height:320px"><table class="utility-table"><tbody>{#each result.rows.slice(0,50) as row}<tr>{#each row.slice(0,20) as cell}<td style="white-space:pre-wrap">{cell}</td>{/each}</tr>{/each}</tbody></table></div><p class="tool-note">{result.rows.length}行。プレビューは先頭50行・20列。</p><Result text={result.output}/><button onclick={()=>download(new Blob([result.output],{type:'text/plain;charset=utf-8'}),state.from===','?'converted.tsv':'converted.csv')}>ファイル保存</button>{/if}<p class="tool-note">例：商品,価格 改行 りんご,120。200,000文字・20,000セル。UTF-8 BOMは入力時に除去。出力はBOMなし。数式として始まるセルもそのまま保持するため、表計算ソフトで開く際は数式の実行に注意してください。</p>
