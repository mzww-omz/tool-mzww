<script lang="ts">
 import { untrack } from 'svelte';
 import type { ToolState } from '../../types';
 import { dimensions } from './logic';
 let {state: data=$bindable()}: {state:ToolState} = $props();
 untrack(()=>{data.source??='';data.output??='';data.file??=null;data.width??=800;data.height??=600;data.lock??=true;data.format??='image/png';data.quality??=90;data.error??='';data.size??=0;});
 let busy=$derived(data.busy ?? false);
 let input:HTMLInputElement;
 function clear(){
  if(data.source)URL.revokeObjectURL(data.source);
  if(data.output)URL.revokeObjectURL(data.output);
  data.source='';data.output='';data.file=null;data.error='';data.size=0;
  if(input)input.value='';
 }
 async function load(event:Event){
  const file=(event.currentTarget as HTMLInputElement).files?.[0];
  if(!file)return;
  clear();data.busy=true;
  try{
   if(!['image/png','image/jpeg','image/webp'].includes(file.type))throw new Error('PNG、JPEG、WebP画像を選択してください。');
   if(file.size>10*1024*1024)throw new Error('入力ファイルは10MB以下にしてください。');
   const bitmap=await createImageBitmap(file);
   try{
    dimensions(bitmap.width,bitmap.height,Math.min(bitmap.width,2000));
    data.originalWidth=bitmap.width;data.originalHeight=bitmap.height;
    data.width=Math.min(bitmap.width,2000);data.height=Math.round(bitmap.height*data.width/bitmap.width);
    data.source=URL.createObjectURL(file);data.file=file;
   }finally{bitmap.close();}
  }catch(e){data.error=(e as Error).message;}finally{data.busy=false;}
 }
 function widthChanged(){if(data.lock && data.originalWidth)data.height=Math.max(1,Math.round(data.originalHeight*Number(data.width)/data.originalWidth));}
 function heightChanged(){if(data.lock && data.originalHeight)data.width=Math.max(1,Math.round(data.originalWidth*Number(data.height)/data.originalHeight));}
 async function process(){
  if(!data.file)return;
  data.busy=true;data.error='';
  if(data.output)URL.revokeObjectURL(data.output);
  data.output='';
  try{
   const size=dimensions(data.originalWidth,data.originalHeight,Number(data.width),Number(data.height));
   const bitmap=await createImageBitmap(data.file);
   let blob:Blob|null;
   try{
    const canvas=document.createElement('canvas');canvas.width=size.width;canvas.height=size.height;
    const ctx=canvas.getContext('2d');
    if(!ctx)throw new Error('Canvasを利用できません。');
    if(data.format==='image/jpeg'){ctx.fillStyle='#ffffff';ctx.fillRect(0,0,size.width,size.height);}
    ctx.drawImage(bitmap,0,0,size.width,size.height);
    blob=await new Promise(resolve=>canvas.toBlob(resolve,data.format,Number(data.quality)/100));
   }finally{bitmap.close();}
   if(!blob || blob.type!==data.format)throw new Error('このブラウザは指定形式での保存に対応していません。');
   data.output=URL.createObjectURL(blob);data.size=blob.size;
   data.extension=data.format==='image/jpeg'?'jpg':data.format.split('/')[1];
  }catch(e){data.error=(e as Error).message;}finally{data.busy=false;}
 }
</script>
<div class="upload-zone"><span class="micro">LOCAL FILE / NO UPLOAD</span><strong>画像を選択して、軽く、小さく。</strong><label class="file-label">ファイルを選択<input bind:this={input} type="file" accept="image/png,image/jpeg,image/webp" onchange={load} disabled={busy}/></label><span>PNG・JPEG・WebP / 最大10MB・4,000万画素</span></div>
{#if data.file}
 <div class="field-heading"><span>{data.file.name} · {data.originalWidth} × {data.originalHeight}px</span><button disabled={busy} class="text-button" onclick={clear}>クリア</button></div>
 <div class="form-grid three"><label>幅 / px<input type="number" min="1" max="8192" bind:value={data.width} oninput={widthChanged} disabled={busy}/></label><label>高さ / px<input type="number" min="1" max="8192" bind:value={data.height} oninput={heightChanged} disabled={busy}/></label><label>保存形式<select bind:value={data.format} disabled={busy}><option value="image/png">PNG</option><option value="image/jpeg">JPEG</option><option value="image/webp">WebP</option></select></label></div>
 <div class="action-row"><label class="checkbox-label"><input type="checkbox" bind:checked={data.lock} disabled={busy}/> 縦横比を固定</label>{#if data.format!=='image/png'}<label class="quality-label">品質 {data.quality}%<input type="range" min="1" max="100" bind:value={data.quality} disabled={busy}/></label>{/if}</div>
 <div class="action-row"><button class="primary" disabled={busy} onclick={process}>{busy?'処理中…':'リサイズ・変換 ↗'}</button>{#if data.output}<a class="button" href={data.output} download={`toolbox-image.${data.extension}`}>画像をダウンロード ↓</a><span class="limit-note">{(data.size/1024).toFixed(1)} KB</span>{/if}</div>
 <div class="image-preview"><img src={data.output || data.source} alt={data.output?'変換後のプレビュー':'元画像のプレビュー'}/></div>
{/if}
{#if data.error}<p class="error" role="alert">{data.error}</p>{/if}
<p class="tool-note">出力は各辺8,192px・合計1,600万画素まで。JPEGの透明部分は白になります。アニメーションは静止画として出力し、メタデータは保持しません。</p>
