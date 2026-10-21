<script lang="ts">
 import { untrack } from 'svelte';
 import type { ToolState } from '../../types';
 import { color } from './logic';
 import Result from '../../components/Result.svelte';
 let {state=$bindable()}=$props<{state:ToolState}>();
 untrack(()=>{state.input??='#EB541D';state.output??='';state.preview??='#EB541D';state.error??='';});
 function run(){try{const c=color(state.input);state.output=`${c.hex}\n${c.rgb}\n${c.hsl}`;state.preview=c.hex;state.error='';}catch(e){state.error=(e as Error).message;state.output='';}}
</script>
<div class="color-layout"><div class="color-swatch" style:background={state.preview} aria-label={`プレビュー: ${state.preview}`}></div><div><label>カラーコード<input bind:value={state.input} maxlength="100" placeholder="#FF6600 / rgb(255, 102, 0)"/></label><label class="color-picker">カラーピッカー<input type="color" value={state.preview} oninput={e=>{state.input=e.currentTarget.value;run();}}/></label></div></div>
<div class="action-row"><button class="primary" onclick={run}>変換 ↗</button><button onclick={()=>{state.input='';state.output='';state.error='';}}>クリア</button></div>
{#if state.error}<p class="error" role="alert">{state.error}</p>{/if}<Result text={state.output}/><p class="tool-note">不透明色のみ。HEXは3桁または6桁、RGBは整数0〜255、HSLは彩度・明度0〜100%に対応。</p>
