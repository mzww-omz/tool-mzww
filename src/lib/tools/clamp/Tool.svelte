<script lang="ts">
 import {untrack} from 'svelte';
 import type {ToolState} from '../../types';
 import Result from '../../components/Result.svelte';
 let {state=$bindable()}: {state:ToolState} = $props();
 import {fluid} from './logic';untrack(()=>{state.min??=16;state.max??=32;state.start??=320;state.end??=1280;state.root??=16;state.width??=800;});let result=$derived.by(()=>{try{return {value:fluid(state.min,state.max,state.start,state.end,state.root),error:''};}catch(e){return {value:null,error:(e as Error).message};}});
</script>
<div class="form-grid">{#each [['min','最小サイズ (px)'],['max','最大サイズ (px)'],['start','viewport開始 (px)'],['end','viewport終了 (px)'],['root','root font-size (px)']] as [key,label]}<label>{label}<input type="number" step="any" bind:value={state[key]}/></label>{/each}</div>{#if result.error}<p role="alert" class="error">{result.error}</p>{/if}{#if result.value}<Result text={`font-size: ${result.value.css};`}/><label>プレビュー幅 {state.width}px<input type="range" min={state.start} max={state.end} bind:value={state.width}/></label><output>{result.value.at(Number(state.width)).toFixed(2)}px</output><p style:font-size={`${Math.min(100,result.value.at(Number(state.width)))}px`} style="overflow-wrap:anywhere">TOOLBOX あいうえお</p>{/if}<p class="tool-note">例：320〜1280pxで16〜32px。入力はpx、出力の端点と切片は指定rootに基づくrem、傾きはvw。適用先のrootが変わるとサイズも変わります。プレビューは文字サイズ100pxまで表示。</p>
