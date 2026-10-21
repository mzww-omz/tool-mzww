<script lang="ts">
 import {keyState,rows} from './logic';
 import type {ToolState} from '../../types';
 // Accept the workspace binding, but never retain key data in it.
 let {state: ephemeral=$bindable()}=$props<{state:ToolState}>();
 let down=$state<string[]>([]),last=$state(''),enabled=$state(false);
 function key(event:KeyboardEvent,pressed:boolean){if(!enabled)return;if(event.key==='Tab'||event.key==='Escape'){enabled=false;down=[];last='';return;}event.preventDefault();down=keyState(down,event.code,pressed);last=JSON.stringify({key:event.key,code:event.code,repeat:event.repeat,location:event.location,ctrl:event.ctrlKey,alt:event.altKey,shift:event.shiftKey,meta:event.metaKey},null,2);}
 function stop(){enabled=false;down=[];last='';}
</script>
<svelte:window onkeydowncapture={e=>key(e,true)} onkeyupcapture={e=>key(e,false)} onblur={stop}/>
<div class="action-row"><button class="primary" onclick={()=>{enabled=!enabled;down=[];last='';}}>{enabled?'チェックを停止':'チェックを開始'}</button><button onclick={stop}>リセット</button><span class="limit-note">{enabled?'テスト中 · Tab / Escapeで終了':'停止中 · 開始後にキーを押してください'}</span></div>
<div class="keyboard-scroll"><div class="keyboard-layout" aria-label="US配列を基準にした物理キー表示">{#each rows as row}<div class="keyboard-row">{#each row as code}<span class:pressed={down.includes(code)} class:space-key={code==='Space'}>{code.replace(/^Key|^Digit/,'')}</span>{/each}</div>{/each}</div></div>
<div class="field-heading"><span>同時押し / {down.length} KEYS</span></div><output class="key-output">{down.join(' + ')||'—'}</output><div class="field-heading"><span>最新イベント（保存しません）</span></div><pre class="event-output">{last||'—'}</pre>
<p class="tool-note">図はUS物理配列の参考表示です。JIS固有キー等もcode欄と同時押し欄で確認できます。OS予約キー、Fn、ブラウザで捕捉できないキーは測定不可。キーの故障を断定する機能ではありません。タブ移動・フォーカス喪失・画面切替で記録を消去します。</p>
