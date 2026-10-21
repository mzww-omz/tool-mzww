<script lang="ts">
 import Transform from '../../components/Transform.svelte';import {unicode} from './logic';import type {ToolState} from '../../types';
 let {state=$bindable()}=$props<{state:ToolState}>();
</script>
<Transform bind:state actions={[{label:'コードポイントを解析',run:t=>'文字\tコードポイント\tUTF-16\tUTF-8\n'+unicode(t).map(c=>[JSON.stringify(c.character),c.code,c.utf16,c.utf8].join('\t')).join('\n')}]} note="コードポイント単位（見た目の文字・書記素単位ではありません）。絵文字の結合列は複数行になります。最大10,000 UTF-16コード単位。"/>
