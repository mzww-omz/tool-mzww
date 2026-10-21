<script lang="ts">
 import {untrack} from 'svelte';
 import type {ToolState} from '../../types';
 import Result from '../../components/Result.svelte';
 let {state=$bindable()}: {state:ToolState} = $props();
 import {renderMarkdown} from './logic';import {previewDocument,safePreviewHTML} from '../../preview';import {download} from '../../browser-files';untrack(()=>{state.input??='# こんにちは\n\n| 道具 | 個数 |\n| --- | --- |\n| TOOLBOX | 56 |\n\n```js\nconsole.log("Hello")\n```';});let result=$derived.by(()=>{try{return {html:renderMarkdown(state.input),error:''};}catch(e){return {html:'',error:(e as Error).message};}});let document=$derived(previewDocument(safePreviewHTML(result.html),'body{font:16px/1.7 sans-serif;overflow-wrap:anywhere}pre{white-space:pre-wrap}table,td,th{border:1px solid #777;border-collapse:collapse;padding:8px}'));
 
</script>
<label>Markdown<textarea bind:value={state.input} maxlength="100000" rows="12" spellcheck="false"></textarea></label>{#if result.error}<p class="error" role="alert">{result.error}</p>{/if}<iframe title="Markdownプレビュー" sandbox="" srcdoc={document} style="width:100%;height:400px;border:1px solid var(--line)"></iframe><Result text={result.html}/><button disabled={!!result.error} onclick={()=>download(new Blob([previewDocument(result.html)],{type:'text/html;charset=utf-8'}),'document.html')}>HTMLを保存</button><p class="tool-note">例：# 見出し、**強調**、コードブロック、表。100,000文字まで。入力HTMLは文字として表示。画像は代替テキストのみ。危険なURLスキームは無効、プレビュー内のリンク移動も無効です。保存HTMLの通常リンクは利用できます。</p>
