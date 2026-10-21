<script lang="ts">
 import {untrack} from 'svelte';
 import type {ToolState} from '../../types';
 import Result from '../../components/Result.svelte';
 let {state=$bindable()}: {state:ToolState} = $props();
 import {dateDiff} from './logic';untrack(()=>{state.first??='2024-01-31';state.second??='2024-03-01';state.mode??='elapsed';});let result=$derived.by(()=>{try{const v=dateDiff(state.first,state.second,state.mode);return {text:`日数: ${v.days}日\n週数: ${v.weeks}週 ${v.weekDays}日\n暦の差（通常の経過期間）: ${v.years}年 ${v.months}か月 ${v.remainder}日\n方向: ${v.direction===1?'順方向（同日含む）':'逆方向'}\n通常の経過日数: ${v.elapsed}日`,error:''};}catch(e){return {text:'',error:(e as Error).message};}});
</script>
<div class="form-grid"><label>開始日<input type="date" min="0001-01-01" max="9999-12-31" bind:value={state.first}/></label><label>終了日<input type="date" min="0001-01-01" max="9999-12-31" bind:value={state.second}/></label><label>日数の数え方<select bind:value={state.mode}><option value="elapsed">通常の経過日数</option><option value="both">両端を含む</option><option value="neither">両端を含まない</option></select></label></div>{#if result.error}<p class="error" role="alert">{result.error}</p>{/if}<Result text={result.text}/><p class="tool-note">例：2024-01-31〜2024-03-01は30日、暦では1か月1日。月末は移動先の月末へ丸めます。逆順は絶対差と方向を表示。暦の差は両端設定で変わりません。時刻・タイムゾーンを使わないため夏時間の影響はありません。</p>
