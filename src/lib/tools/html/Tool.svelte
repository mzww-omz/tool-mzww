<script lang="ts">
 import Transform from '../../components/Transform.svelte';import {html} from './logic';import type {ToolState} from '../../types';
 let {state=$bindable()}=$props<{state:ToolState}>();
</script>
<Transform bind:state actions={[{label:'エンティティ化',run:t=>html(t,false)},{label:'文字に戻す',run:t=>html(t,true)}]} note="HTMLは実行しません。エンコードは & < > 引用符。デコードはUnicode数値参照と主要な名前参照（amp/lt/gt/quot/apos/nbsp/copy/reg/trade/yen/euro/mdash/ndash/hellip）。未知の名前参照は維持。最大100,000文字。"/>
