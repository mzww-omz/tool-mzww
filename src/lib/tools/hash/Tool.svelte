<script lang="ts">
 import { untrack } from 'svelte';
 import type { ToolState } from '../../types';
 import { hash } from './logic';
 import Result from '../../components/Result.svelte';
 let {state: data=$bindable()}: {state:ToolState} = $props();
 untrack(()=>{data.text??='';data.algorithm??='SHA-256';data.output??='';data.error??='';data.file??=null;data.filename??='';});
 let busy=$derived(data.busy ?? false);
 let fileInput:HTMLInputElement;
 function clearFile(){data.file=null;data.filename='';if(fileInput)fileInput.value='';}
 function fileChange(event:Event){
  const input=event.currentTarget as HTMLInputElement, file=input.files?.[0];
  data.file=null;data.filename='';
  if(!file)return;
  if(file.size>20*1024*1024){data.error='ファイルは20MB以下にしてください。';input.value='';return;}
  data.file=file;data.filename=file.name;data.error='';
 }
 async function calculate(){
  data.busy=true;data.error='';
  try{const input=data.file ? await data.file.arrayBuffer() : data.text;data.output=await hash(input,data.algorithm);}
  catch(e){data.error=(e as Error).message;data.output='';}
  finally{data.busy=false;}
 }
</script>
<label class="short-field">アルゴリズム<select bind:value={data.algorithm} disabled={busy}><option>SHA-256</option><option>SHA-384</option><option>SHA-512</option><option>SHA-1</option></select></label>
<div class="field-heading"><label for="hash-text">テキスト / UTF-8</label><button class="text-button" disabled={busy} onclick={()=>{data.text='';clearFile();data.output='';data.error='';}}>クリア</button></div><textarea id="hash-text" bind:value={data.text} maxlength="500000" rows="6" placeholder="ハッシュを計算するテキスト" disabled={busy}></textarea>
<label class="file-line">またはファイル（20MB以下）<input bind:this={fileInput} type="file" onchange={fileChange} disabled={busy}/></label>
{#if data.filename}<p class="tool-note">ファイルを優先して計算: {data.filename} <button class="text-button" disabled={busy} onclick={clearFile}>解除</button></p>{/if}
<div class="action-row"><button class="primary" disabled={busy} onclick={calculate}>{busy?'計算中…':'ハッシュを計算 ↗'}</button></div>
{#if data.error}<p role="alert" class="error">{data.error}</p>{/if}<Result text={data.output}/><p class="tool-note">SHA-1は互換性の確認用です。セキュリティ用途にはSHA-256以上を使用してください。</p>
