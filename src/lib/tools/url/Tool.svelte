<script lang="ts">
 import {untrack} from 'svelte';
 import Transform from '../../components/Transform.svelte';
 import {url} from './logic';
 import type {ToolState} from '../../types';
 let {state=$bindable()}: {state:ToolState} = $props();
 untrack(()=>{state.mode??='component';});
</script>
<label class="short-field">変換形式<select bind:value={state.mode}><option value="component">構成要素（encodeURIComponent）</option><option value="full">URL全体（encodeURI）</option><option value="form">フォームの単一値（空白 ↔ +）</option></select></label>
<Transform bind:state actions={[{label:'エンコード',run:t=>url(t,false,state.mode)},{label:'デコード',run:t=>url(t,true,state.mode)}]} note="URL全体モードは : / ? & = などの予約文字を維持します。構成要素・フォームモードは値だけに使用してください。フォームのクエリ全体を分解・生成する機能ではありません。"/>
