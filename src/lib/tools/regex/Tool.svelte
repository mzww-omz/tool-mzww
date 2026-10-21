<script lang="ts">
 import {untrack} from 'svelte';import {pattern} from './logic';import Result from '../../components/Result.svelte';import CopyButton from '../../components/CopyButton.svelte';import type {ToolState} from '../../types';
 let {state:data=$bindable()}=$props<{state:ToolState}>();untrack(()=>{data.source??='\\d+';data.flags??='g';data.text??='ID: 123 / 456';data.literal??='';data.kind??='literal';data.repeat??='';data.anchor??=false;data.parts??=[];data.output??='';data.error??='';data.status??='';});
 function add(){try{data.parts=[...data.parts,pattern(data.literal,data.kind,data.repeat,false)];build();data.error='';}catch(e){data.error=(e as Error).message;}}
 function build(){data.source=(data.anchor?'^':'')+data.parts.join('')+(data.anchor?'$':'');}
 $effect(()=>{
  const source=data.source,flags=data.flags,text=data.text;let worker:Worker|undefined,timeout:ReturnType<typeof setTimeout>|undefined;
  data.status='入力待ち…';data.error='';data.output='';
  const debounce=setTimeout(()=>{
   if(!globalThis.Worker){data.error='Workerが利用できないため安全な評価を実行できません。';return;}
   try{worker=new Worker(new URL('./worker.ts',import.meta.url),{type:'module'});data.status='評価中…';
    timeout=setTimeout(()=>{worker?.terminate();data.error='500msで評価を中断しました。パターンまたは対象を短くしてください。';data.status='タイムアウト';},500);
    worker.onmessage=event=>{clearTimeout(timeout);worker?.terminate();if(event.data.error){data.error=event.data.error;data.status='エラー';}else{const result=event.data.result;data.output=JSON.stringify(result.matches,null,2);data.status=`${result.matches.length}件${result.truncated?'（1,000件で打ち切り）':''}`;}};
    worker.onerror=()=>{clearTimeout(timeout);worker?.terminate();data.error='Workerを読み込めません。ブラウザ設定・CSPを確認してください。';data.status='エラー';};
    worker.postMessage({source,flags,text});
   }catch(e){data.error=(e as Error).message;}
  },200);
  return ()=>{clearTimeout(debounce);clearTimeout(timeout);worker?.terminate();};
 });
</script>
<div class="form-grid"><label>パーツ<select bind:value={data.kind}><option value="literal">文字列（特殊文字をエスケープ）</option><option value="digits">数字 \d</option><option value="letters">英字 [A-Za-z]</option><option value="space">空白 \s</option></select></label><label>繰り返し<select bind:value={data.repeat}><option value="">1回</option><option value="?">0〜1回</option><option value="+">1回以上</option><option value="*">0回以上</option><option value={'{1,3}'}>1〜3回</option></select></label></div>
<label>文字列パーツ<input bind:value={data.literal} maxlength="500" disabled={data.kind!=='literal'}/></label><div class="action-row"><button onclick={add}>パーツを追加</button><label class="checkbox-label"><input type="checkbox" bind:checked={data.anchor} onchange={e=>{data.anchor=e.currentTarget.checked;build();}}/> 全体一致 ^…$</label><button onclick={()=>{data.parts=[];data.source='';}}>組み立てをクリア</button></div>
<p class="tool-note">パーツ追加・全体一致の変更は手入力部分を組み立て結果で上書きします。必要なパターンは先にコピーしてください。</p>
<label>パターン（手入力編集可）<input class="mono" bind:value={data.source} maxlength="2000"/></label><label class="short-field">フラグ / g i m s u y<input class="mono" bind:value={data.flags} maxlength="6"/></label>
<div class="action-row"><button onclick={()=>{data.source='\\d+';data.flags='g';data.text='注文 123、商品 456';}}>数字サンプル</button><button onclick={()=>{data.source='[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}';data.flags='g';data.text='連絡先: hello@example.com';}}>メール風サンプル</button><CopyButton text={data.source}/></div>
<label>対象テキスト<textarea rows="5" bind:value={data.text} maxlength="20000"></textarea></label><p class="tool-note" role="status">{data.status}</p>{#if data.error}<p class="error" role="alert">{data.error}</p>{/if}<Result text={data.output}/><p class="tool-note">JavaScript正規表現。Web Workerを500msで強制終了し、UIスレッドでは評価しません。対象20,000文字・パターン2,000文字・結果1,000件まで。gなしは最初の1件。サンプルは入力例であり完全なメール検証ではありません。</p>
