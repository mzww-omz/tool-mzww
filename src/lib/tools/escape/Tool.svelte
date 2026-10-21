<script lang="ts">
 import {untrack} from 'svelte';import Transform from '../../components/Transform.svelte';import {escapeCode} from './logic';import type {ToolState} from '../../types';
 let {state=$bindable()}: {state:ToolState} = $props();untrack(()=>{state.mode??='json';});
</script>
<label class="short-field">形式<select bind:value={state.mode}><option value="json">JSON / JavaScript文字列（ダブルクォート付き）</option><option value="unicode">JavaScript Unicodeエスケープ</option></select></label>
<Transform bind:state actions={[{label:'エスケープ',run:t=>escapeCode(t,state.mode,false)},{label:'元に戻す',run:t=>escapeCode(t,state.mode,true)}]} note={'evalは使用しません。JSON形式の復元は文字列のみ。Unicode形式の復元は \\uXXXX と \\u{X} のみ対応。最大100,000文字。'}/>
