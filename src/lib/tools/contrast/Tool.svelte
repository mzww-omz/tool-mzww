<script lang="ts">
 import {untrack} from 'svelte';
 import type {ToolState} from '../../types';
 import Result from '../../components/Result.svelte';
 let {state=$bindable()}: {state:ToolState} = $props();
 import {contrast} from './logic';untrack(()=>{state.fg??='#333333';state.bg??='#FFFFFF';});let result=$derived.by(()=>{try{return {value:contrast(state.fg,state.bg),error:''};}catch(e){return {value:null,error:(e as Error).message};}});
</script>
<div class="form-grid"><label>前景色<input bind:value={state.fg} maxlength="100"/></label><label>背景色<input bind:value={state.bg} maxlength="100"/></label></div>{#if result.error}<p class="error" role="alert">{result.error}</p>{/if}{#if result.value}<p style:color={result.value.foreground} style:background={result.value.background} style="padding:24px;border:1px solid var(--line)">通常文字のサンプル / Sample<br/><strong style="font-size:24px">大きい文字のサンプル</strong></p><Result text={`${result.value.ratio.toFixed(2)} : 1
通常文字 AA: ${result.value.normalAA?'適合':'不適合'} / AAA: ${result.value.normalAAA?'適合':'不適合'}
大きい文字 AA: ${result.value.largeAA?'適合':'不適合'} / AAA: ${result.value.largeAAA?'適合':'不適合'}`}/>{/if}<p class="tool-note">例：#333333 と #FFFFFF。大きい文字は18pt（24px）以上、太字は14pt（約18.67px）以上。不透明なsRGB色のみ。判定は丸め前の比率を使用します。</p>
