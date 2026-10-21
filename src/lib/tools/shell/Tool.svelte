<script lang="ts">
 import Transform from '../../components/Transform.svelte';import {shellQuote} from './logic';import type {ToolState} from '../../types';
 let {state=$bindable()}: {state:ToolState} = $props();
</script>
<Transform bind:state actions={[{label:'1引数としてクォート',run:shellQuote}]} note="POSIX sh / bash / zsh用。入力全体を1つの引数にします。コマンド自体の安全性を保証せず、実行もしません。先頭の - がオプションとして解釈される問題は防げません。必要なら呼び出し側で -- を使用。PowerShell・cmdは未対応。最大100,000文字。"/>
