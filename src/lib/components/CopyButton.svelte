<script lang="ts">
 let { text, label = 'コピー' }: {text:string;label?:string} = $props();
 let status = $state('');
 $effect(()=>{text;status='';});
 async function copy() {
  try { await navigator.clipboard.writeText(text); status='コピーしました'; }
  catch { status='コピーできません。テキストを選択してコピーしてください。'; }
 }
</script>
<button type="button" onclick={copy} disabled={!text} class="copy-button"><span aria-hidden="true">▣</span> {status==='コピーしました'?'コピー済み':label}</button>
<span class:sr-only={!status || status==='コピーしました'} class="copy-feedback" role="status">{status}</span>
