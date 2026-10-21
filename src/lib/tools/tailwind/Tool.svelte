<script lang="ts">
 import {untrack} from 'svelte';
 import type {ToolState} from '../../types';
 import Result from '../../components/Result.svelte';
 let {state=$bindable()}=$props<{state:ToolState}>();
 import {previewDocument,safePreviewHTML} from '../../preview';import Worker from './compiler.worker?worker';
 untrack(()=>{state.html??='<div class="p-6 bg-red-500 text-white">こんにちは TOOLBOX</div>';state.classes??='rounded-none';});
 let css=$state(''),error=$state(''),busy=$state(false);
 $effect(()=>{const html=state.html,classes=state.classes;busy=true;error='';css='';if(html.length>20000){error='HTMLは20,000文字以内です。';busy=false;return;}
 const timer=setTimeout(()=>{const worker=new Worker();const deadline=setTimeout(()=>{worker.terminate();busy=false;error='コンパイルが3秒を超えました。入力を減らしてください。';},3000);worker.onmessage=e=>{clearTimeout(deadline);worker.terminate();css=e.data.css||'';error=e.data.error||'';busy=false;};worker.onerror=()=>{clearTimeout(deadline);worker.terminate();error='コンパイラを起動できません。';busy=false;};worker.postMessage(classes+' '+[...html.matchAll(/class\s*=\s*["']([^"']*)["']/g)].map(m=>m[1]).join(' '));cleanup=()=>{clearTimeout(deadline);worker.terminate();};},180);let cleanup=()=>{};return()=>{clearTimeout(timer);cleanup();};});
 let document=$derived(previewDocument(safePreviewHTML(`<div class="${state.classes.replace(/["<>]/g,'')}">${state.html}</div>`),css));
 
</script>
<label>HTML<textarea bind:value={state.html} maxlength="20000" rows="7" spellcheck="false"></textarea></label><label>外側の要素のクラス<input bind:value={state.classes} maxlength="10000"/></label>
 <p role="status">{busy?'コンパイル中…':'Tailwind CSS v4（プロジェクトと同一バージョン）'}</p>{#if error}<p class="error" role="alert">{error}</p>{/if}
 <iframe title="Tailwindプレビュー" sandbox="" srcdoc={document} style="width:100%;height:300px;border:1px solid var(--line)"></iframe><Result text={state.html}/><Result text={css}/>
 <p class="tool-note">例：w-[137px] p-[19px] bg-red-500。標準v4テーマを使用。アプリ独自のCSSトークンは継承しません。HTMLは安全な要素とclassのみ。スクリプト・外部画像・フォント・リンク移動は無効。最大500クラス、3秒で停止。</p>
