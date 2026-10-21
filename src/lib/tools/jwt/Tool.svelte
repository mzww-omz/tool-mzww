<script lang="ts">
 import Transform from '../../components/Transform.svelte';import {jwt} from './logic';import type {ToolState} from '../../types';
 let {state=$bindable()}=$props<{state:ToolState}>();
</script>
<p class="error">署名未検証 / 内容は信頼できません。認証・権限の判断には使用しないでください。</p>
<Transform bind:state actions={[{label:'内容を表示（署名未検証）',run:t=>JSON.stringify(jwt(t),null,2)}]} note="JWSのヘッダーとペイロードのみデコードします。暗号化されたJWE・署名検証は非対応。exp等の値も未検証です。最大100,000文字。"/>
