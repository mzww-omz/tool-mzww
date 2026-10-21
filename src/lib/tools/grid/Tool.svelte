<script lang="ts">
 import {untrack} from 'svelte';
 import type {ToolState} from '../../types';
 import Result from '../../components/Result.svelte';
 let {state=$bindable()}: {state:ToolState} = $props();
 import {layoutCSS} from './logic';import {previewDocument} from '../../preview';
 untrack(()=>{state.direction??='row';state.justify??='flex-start';state.align??='stretch';state.wrap??='wrap';state.gap??=16;state.columns??='repeat(3, minmax(0, 1fr))';state.rows??='auto';state.items??=Array.from({length:3},()=>({grow:0,shrink:1,basis:'80px',column:'auto',row:'auto'}));});
 let result=$derived.by(()=>{try{const css=layoutCSS(state);if(!CSS.supports('grid-template-columns',state.columns)||!CSS.supports('grid-template-rows',state.rows))throw new Error('行・列のCSS構文が無効です。repeat(3, minmax(0, 1fr))などを指定してください。');return {css,error:''};}catch(e){return {css:'',error:(e as Error).message};}});
 let document=$derived(previewDocument('<div class="container">'+state.items.map((_:unknown,i:number)=>`<div class="item item-${i+1}">${i+1}</div>`).join('')+'</div>',`body{margin:12px;min-height:220px}.container{min-height:220px}.item{background:#e8ecdf;border:1px solid #69705c;padding:16px;min-width:0;overflow-wrap:anywhere}${result.css}`.replace('body{','body.container{')));
 
</script>
<div class="form-grid"><label>Columns<input bind:value={state.columns} maxlength="200"/></label><label>Rows<input bind:value={state.rows} maxlength="200"/></label><label>justify-content<select bind:value={state.justify}>{#each ['flex-start','flex-end','center','space-between','space-around','space-evenly'] as v}<option>{v}</option>{/each}</select></label><label>align-items<select bind:value={state.align}>{#each ['stretch','flex-start','flex-end','center','baseline'] as v}<option>{v}</option>{/each}</select></label><label>Gap (px)<input type="number" min="0" max="200" bind:value={state.gap}/></label></div>
 {#each state.items as item,i}<fieldset><legend>要素 {i+1}</legend><div class="form-grid"><label>grid-column<input bind:value={item.column} maxlength="50"/></label><label>grid-row<input bind:value={item.row} maxlength="50"/></label></div><button disabled={state.items.length<=1} onclick={()=>state.items.splice(i,1)}>要素 {i+1} を削除</button></fieldset>{/each}
 <div class="action-row"><button disabled={state.items.length>=20} onclick={()=>state.items.push({grow:0,shrink:1,basis:'80px',column:'auto',row:'auto'})}>子要素を追加</button></div>
 {#if result.error}<p class="error" role="alert">{result.error}</p>{:else}<iframe title="配置プレビュー" sandbox="" srcdoc={document} style="width:100%;height:280px;border:1px solid var(--line)"></iframe><Result text={result.css}/>{/if}
 <p class="tool-note">例：3要素を中央揃えにし、Gapを24pxに変更。最大20要素、repeatは40回・サイズ数値は10,000まで。プレビューは隔離されています。</p>
