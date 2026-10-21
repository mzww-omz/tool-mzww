<script lang="ts">
 import {untrack} from 'svelte';
 import type {ToolState} from '../../types';
 import Result from '../../components/Result.svelte';
 let {state=$bindable()}=$props<{state:ToolState}>();
 import {tap,measure} from './logic';untrack(()=>{state.times??=[];});let value=$derived(measure(state.times));function hit(){state.times=tap(state.times,performance.now());}function key(e:KeyboardEvent){if(e.code!=='Space'||e.repeat||(e.target as HTMLElement)?.closest('input,textarea,select,button,[contenteditable]'))return;e.preventDefault();hit();}
</script>
<svelte:window onkeydown={key}/><button class="primary" onclick={hit} style="width:100%;min-height:120px;font-size:28px">タップ / Space</button><div class="action-row"><button onclick={()=>state.times=[]}>リセット</button></div><Result text={`BPM: ${value.bpm?value.bpm.toFixed(1):'—'}\n平均間隔: ${value.interval.toFixed(1)} ms\n採用間隔: ${value.accepted} / 除外: ${value.rejected}`}/><p class="tool-note">例：0.5秒ごとにタップすると約120 BPM。直近32タップ、間隔中央値の70〜130%を採用。100ms未満の連打は無視、3秒を超える空白で再計測。performance.now()を使用。フォーカスが入力欄やボタンにある場合はその通常操作を優先します。</p>
