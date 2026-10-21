<script lang="ts">
 import Transform from '../../components/Transform.svelte';
 import { base64 } from './logic';
 import type { ToolState } from '../../types';
 let {state=$bindable()}: {state:ToolState} = $props();
</script>
<Transform bind:state actions={[{label:'エンコード',run:t=>base64(t,false)},{label:'デコード',run:t=>base64(t,true)}]} note="UTF-8テキスト専用。Base64は暗号化ではありません。標準形式（+ /、=パディング）に対応。"/>
