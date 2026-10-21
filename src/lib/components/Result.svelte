<script lang="ts">
 import CopyButton from './CopyButton.svelte';
 let { text, label='出力 / OUTPUT' }: {text:string;label?:string} = $props();
</script>
<div class="field-heading"><span>{label}</span><CopyButton {text}/></div>
<textarea class="result-text" aria-label="出力" value={text} readonly placeholder="結果がここに表示されます" rows="8"></textarea>
