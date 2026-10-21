<script lang="ts">
 import { untrack } from 'svelte';
 import type { ToolState } from '../../types';
 import { count } from './logic';
 import CopyButton from '../../components/CopyButton.svelte';
 let { state = $bindable() }: {state:ToolState} = $props();
 untrack(()=>{state.text ??= '';});
 let stats = $derived(count(state.text));
 const sample='小さな道具で、日々を少し軽やかに。\n\nTOOLBOXは、ブラウザだけで使えるツール集です。\nテキストの編集から、開発、画像処理まで。\n必要なときに、必要な道具を。\n\nSmall tools. More possibilities.';
 let summary = $derived(`文字数: ${stats.characters}\n空白・改行を除く: ${stats.noSpaces}\n行数: ${stats.lines}\n単語数: ${stats.words}\nUTF-8: ${stats.bytes} bytes`);
</script>
<div class="stats-strip" aria-live="polite" aria-atomic="true">
 {#each [[stats.characters,'文字数','CHARACTERS'],[stats.noSpaces,'空白・改行を除く','NO WHITESPACE'],[stats.lines,'行数','LINES'],[stats.words,'単語数','WORDS'],[stats.bytes,'バイト数','UTF-8 BYTES']] as metric,i}
 <div class:accent-metric={i===0}><span class="metric-label">{metric[1]}</span><strong>{Number(metric[0]).toLocaleString()}</strong><span class="metric-en">{metric[2]}</span></div>
 {/each}
</div>
<div class="field-heading"><label for="counter-text">テキスト入力 <span class="micro">/ INPUT</span></label><div class="inline-actions"><button class="text-button" onclick={()=>state.text=sample}>サンプルを入力</button><span class="divider">/</span><button class="text-button" onclick={()=>state.text=''}>クリア</button><CopyButton text={state.text}/></div></div>
<div class="editor-wrap"><textarea id="counter-text" bind:value={state.text} maxlength="500000" placeholder="ここにテキストを入力、またはペーストしてください。" rows="10" spellcheck="false"></textarea><div class="editor-footer"><span>プレーンテキスト · リアルタイム計測</span><span>{state.text.length.toLocaleString()} / 500,000</span></div></div>
<div class="under-editor"><span><span class="live-dot"></span> 入力内容は自動でカウントされます</span><CopyButton text={summary} label="結果をコピー"/></div>
<section class="count-guide"><h2><span class="micro">REFERENCE</span> カウントの基準</h2><div class="guide-grid"><div><h3>見た目に沿った文字数</h3><p>絵文字や結合文字は、見た目の1文字として計測。空白や改行も1文字に含めます。</p></div><div><h3>日本語にも、英語にも。</h3><p>単語は言語に応じて区切って計測。バイト数はUTF-8でのデータサイズです。</p></div></div></section>
