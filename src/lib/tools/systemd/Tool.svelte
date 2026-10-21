<script lang="ts">
 import {untrack} from 'svelte';import {systemd} from './logic';import Result from '../../components/Result.svelte';import {download} from '../../browser-files';import type {ToolState} from '../../types';
 let {state=$bindable()}: {state:ToolState} = $props();untrack(()=>{state.description??='My application';state.executable??='/usr/bin/node';state.args??='/opt/app/main.js';state.user??='app';state.restart??='on-failure';state.output??='';state.error??='';});
 function run(){try{state.output=systemd(state.description,state.executable,state.args?state.args.split('\n'):[],state.user,state.restart);state.error='';}catch(e){state.error=(e as Error).message;state.output='';}}
</script>
<div class="form-grid"><label>説明<input bind:value={state.description} maxlength="1000"/></label><label>実行ファイルの絶対パス<input bind:value={state.executable} maxlength="1000"/></label><label>実行ユーザー<input bind:value={state.user} maxlength="64"/></label><label>Restart<select bind:value={state.restart}><option>no</option><option>on-failure</option><option>always</option></select></label></div>
<label>引数（1行を1引数として扱う・シェル構文なし）<textarea rows="4" bind:value={state.args} maxlength="100000"></textarea></label>
<div class="action-row"><button class="primary" onclick={run}>Unitを生成</button><button disabled={!state.output} onclick={()=>download(new Blob([state.output],{type:'text/plain'}),'toolbox.service')}>.service保存</button><button onclick={()=>{state.output='';state.error='';}}>結果をクリア</button></div>
{#if state.error}<p role="alert" class="error">{state.error}</p>{/if}<Result text={state.output}/><p class="tool-note">テンプレート生成のみ。ブラウザからLinuxのコマンド実行・インストール・有効化はできません。使用前に対象環境で systemd-analyze verify を実行し、パス・ユーザー・権限を確認してください。</p>
