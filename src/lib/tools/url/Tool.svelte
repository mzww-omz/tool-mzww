<script lang="ts">
 import Transform from '../../components/Transform.svelte';
 import { url } from './logic';
 import type { ToolState } from '../../types';
 let {state=$bindable()}=$props<{state:ToolState}>();
</script>
<Transform bind:state actions={[{label:'エンコード',run:t=>url(t,false)},{label:'デコード',run:t=>url(t,true)}]} note="encodeURIComponent形式。URL全体ではなく、クエリの値などの構成要素に使用してください。+ は空白に変換しません。"/>
