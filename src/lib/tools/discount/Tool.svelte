<script lang="ts">
 import {untrack} from 'svelte';
 import type {ToolState} from '../../types';
 import Result from '../../components/Result.svelte';
 let {state=$bindable()}: {state:ToolState} = $props();
 import {discount} from './logic';untrack(()=>{state.price??=1000;state.rates??='20,10';state.amount??=0;state.tax??=10;});let result=$derived.by(()=>{try{const raw=state.rates.trim();const rates=raw?raw.split(',').map((s:string)=>{if(!s.trim())throw new Error('割引率をカンマで区切ってください。');return Number(s);}):[];const v=discount(state.price,rates,state.tax,state.amount);return {text:`割引後（税抜）: ${v.subtotal}円\n割引額（税抜・概算）: ${v.saved.toFixed(4)}円\n実質割引率: ${v.effective.toFixed(4)}%\n税額（丸め後の差）: ${v.tax}円\n最終価格（税込）: ${v.final}円`,error:''};}catch(e){return {text:'',error:(e as Error).message};}});
</script>
<div class="form-grid"><label>元価格（税抜・円）<input type="number" min="0" step="0.0001" bind:value={state.price}/></label><label>先に引く割引額 (円)<input type="number" min="0" step="0.0001" bind:value={state.amount}/></label><label>連続割引率 (%)<input bind:value={state.rates} maxlength="100" placeholder="20,10"/></label><label>消費税率 (%)<input type="number" min="0" max="100" step="0.0001" bind:value={state.tax}/></label></div>{#if result.error}<p class="error" role="alert">{result.error}</p>{/if}<Result text={result.text}/><p class="tool-note">例：1,000円を20%引き、さらに10%引き、税10% → 792円。割引額→連続割引→税の順。小数4桁までの入力を整数比で計算し、途中では丸めず税抜額・最終額それぞれを1円単位で四捨五入（0.5切り上げ）。店舗の端数処理とは異なる場合があります。率0〜100%、10回まで、価格1兆円以内。</p>
