<script lang="ts">
 import Transform from '../../components/Transform.svelte';
 import { formatJson } from './logic';
 import type { ToolState } from '../../types';
 let {state=$bindable()}=$props<{state:ToolState}>();
</script>
<Transform bind:state placeholder={'{"hello": "world"}'} actions={[{label:'整形 · 2スペース',run:t=>formatJson(t,2)},{label:'4スペース',run:t=>formatJson(t,4)},{label:'圧縮',run:t=>formatJson(t,0)}]} note="最大100,000文字・64階層。JSON標準の数値精度（IEEE 754）で処理します。巨大な整数のIDは文字列にしてください。"/>
