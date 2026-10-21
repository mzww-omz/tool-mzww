<script lang="ts">
 import { onMount, untrack } from 'svelte';
 import { page } from '$app/state';
 import { tools, categories, matches } from './registry';
 import type { ToolState } from './types';
 let query=$state(''),category=$state('all'),view=$state('all'),mobileOpen=$state(false);
 let favorites=$state<string[]>([]),recent=$state<string[]>([]),hydrated=$state(false),storageNotice=$state('');
 let search:HTMLInputElement,help:HTMLDialogElement;
 const states=$state<Record<string,ToolState>>(Object.fromEntries(tools.map(t=>[t.id,{}])));
 let id=$derived(page.params.id || 'counter');
 let active=$derived(tools.find(t=>t.id===id));
 let filtered=$derived(tools.filter(t=>matches(t,query)&&(category==='all'||t.categories.includes(category))&&(view==='all'||(view==='favorites'?favorites:recent).includes(t.id))).sort((a,b)=>view==='recent'?recent.indexOf(a.id)-recent.indexOf(b.id):Number(a.number)-Number(b.number)));
 let grouped=$derived(view==='recent'?[{label:'最近使用したツール',items:filtered}]:categories.map(c=>({label:c,items:filtered.filter(t=>t.categories[0]===c)})).filter(g=>g.items.length));
 let related=$derived(active?tools.filter(t=>t.id!==active.id && t.categories.some(c=>active.categories.includes(c))).slice(0,3):[]);
 function read(key:string){try{const value=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(value)?value.filter((v):v is string=>typeof v==='string'&&tools.some(t=>t.id===v)).slice(0,1000):[];}catch{storageNotice='ローカル保存を利用できません。設定はこの画面でのみ保持されます。';return [];}}
 onMount(()=>{favorites=read('toolbox:favorites');recent=read('toolbox:recent');hydrated=true;});
 $effect(()=>{if(hydrated&&active){const current=active.id;recent=[current,...untrack(()=>recent).filter(x=>x!==current)].slice(0,20);}});
 $effect(()=>{if(hydrated){try{localStorage.setItem('toolbox:favorites',JSON.stringify(favorites));localStorage.setItem('toolbox:recent',JSON.stringify(recent));}catch{storageNotice='ローカル保存を利用できません。設定はこの画面でのみ保持されます。';}}});
 $effect(()=>{id;mobileOpen=false;});
 function favorite(id:string){favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];}
 function keyboard(event:KeyboardEvent){if(event.defaultPrevented)return;if((event.metaKey||event.ctrlKey)&&event.key==='k'){event.preventDefault();mobileOpen=true;requestAnimationFrame(()=>search?.focus());}if(event.key==='Escape')mobileOpen=false;}
 function showHelp(){help.showModal();}
</script>

<svelte:head><title>{active?`${active.name} — TOOLBOX`:'ツールが見つかりません — TOOLBOX'}</title><meta name="description" content="テキスト、開発、画像、数学。日々の作業に使える道具を、ひとつの場所に。登録不要・ブラウザ内で完結。"/></svelte:head>
<svelte:window onkeydown={keyboard}/>
<a href="#main-content" class="skip-link">ツール本体へスキップ</a>
<header class="site-header">
 <a class="brand" href="/" aria-label="TOOLBOX ホーム"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span>TOOLBOX<span class="brand-period">.</span></span></a>
 <div class="header-tagline">日々の「ちょっと」を、ひとつの場所に。<span>SMALL TOOLS, EVERYDAY POSSIBILITIES.</span></div>
 <div class="header-right"><span class="local-indicator"><span class="live-dot"></span> すべてブラウザ内で処理</span><button class="help-button" onclick={showHelp} aria-label="使い方・キーボードショートカット">?</button></div>
</header>
<div class="mobile-bar"><button onclick={()=>mobileOpen=!mobileOpen} aria-expanded={mobileOpen} aria-controls="tool-sidebar">{mobileOpen?'一覧を閉じる −':'ツール一覧 ＋'} <span>{tools.length}</span></button><span>{active?.english||'NOT FOUND'}</span></div>
<div class="app-layout">
 <aside id="tool-sidebar" class:mobile-open={mobileOpen} aria-label="ツール一覧">
  <div class="sidebar-controls">
   <div class="sidebar-heading"><h2>TOOL_LIST</h2><span>{String(tools.length).padStart(3,'0')} TOOLS</span></div>
   <div class="search-wrap"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><input bind:this={search} bind:value={query} placeholder="ツールを検索…" aria-label="ツールを検索"/><kbd>⌘ K</kbd></div>
   <div class="view-tabs" aria-label="一覧の表示"><button class:selected={view==='all'} onclick={()=>view='all'} aria-pressed={view==='all'}>すべて <span>{tools.length}</span></button><button class:selected={view==='favorites'} onclick={()=>view='favorites'} aria-pressed={view==='favorites'}>お気に入り <span>{favorites.length}</span></button><button class:selected={view==='recent'} onclick={()=>view='recent'} aria-pressed={view==='recent'}>最近使用</button></div>
   <div class="category-heading"><span>CATEGORY</span>{#if category!=='all'}<button class="text-button" onclick={()=>category='all'}>解除 ×</button>{/if}</div>
   <div class="category-filters"><button class:chosen={category==='all'} aria-pressed={category==='all'} onclick={()=>category='all'}>すべて</button>{#each categories as c}<button class:chosen={category===c} aria-pressed={category===c} onclick={()=>category=c}>{c}<span>{tools.filter(t=>t.categories.includes(c)).length}</span></button>{/each}</div>
  </div>
  <nav class="tool-navigation" aria-label="ツール">
   {#each grouped as group}<div class="tool-group"><h3><span>{group.label}</span><span>{String(group.items.length).padStart(2,'0')}</span></h3>{#each group.items as tool}<a href={`/tools/${tool.id}`} class:active={active?.id===tool.id} aria-current={active?.id===tool.id?'page':undefined}><span class="tool-number">{tool.number}</span><span class="tool-link-label">{tool.name}</span>{#if favorites.includes(tool.id)}<span class="favorite-marker" aria-label="お気に入り">★</span>{:else}<span class="tool-arrow" aria-hidden="true">↗</span>{/if}</a>{/each}</div>{:else}<div class="no-results"><strong>該当するツールがありません</strong><p>検索語やカテゴリを変更してください。</p><button onclick={()=>{query='';category='all';view='all';}}>すべて表示</button></div>{/each}
  </nav>
  <div class="sidebar-footer"><span class="live-dot"></span> アカウント不要。いつでも、すぐに。<span class="micro">TOOLBOX / VER. 1.0</span></div>
 </aside>
 <main id="main-content" tabindex="-1">
  {#if active}
  <div class="content-topline"><div class="breadcrumb"><a href="/">TOOLS</a><span>/</span><span>{active.categories[0]}</span><span>/</span><span class="accent">{active.number}</span></div><button class="favorite-button" class:is-favorite={favorites.includes(active.id)} aria-pressed={favorites.includes(active.id)} onclick={()=>favorite(active.id)}><span aria-hidden="true">{favorites.includes(active.id)?'★':'☆'}</span> {favorites.includes(active.id)?'お気に入り登録済み':'お気に入りに追加'}</button></div>
  <div class="title-block"><div><p class="tool-eyebrow">TOOL {active.number} <span>/ {active.english.toUpperCase()}</span></p><h1>{active.name}</h1><p class="tool-description">{active.description}</p></div><div class="tool-index" aria-hidden="true">{active.number}<span>UTILITY</span></div></div>
  <hr class="title-rule"/>
  <div class="tool-body">{#key active.id}{#await active.load()}<p class="loading" role="status">ツールを読み込み中…</p>{:then module}<module.default bind:state={states[active.id]}/>{:catch}<p class="error" role="alert">ツールを読み込めませんでした。接続を確認して再読み込みしてください。</p>{/await}{/key}</div>
  <div class="privacy-note"><span class="privacy-symbol" aria-hidden="true">↳</span><div><strong>データは、あなたのブラウザに。</strong><p>入力したテキストやファイルをサーバーに送信しません。<br/>{active.persistent?'このツールのメモ・予定は端末内のIndexedDBに保存されます。ブラウザのデータ削除で失われます。':active.id==='keyboard'?'キー入力は保存せず、この画面を離れると消去します。':'通常の入力はツールを切り替えても保持され、再読み込みで消去されます。'}</p></div><span class="micro">100%<br/>CLIENT-SIDE</span></div>
  {#if related.length}<section class="related-tools"><div class="section-heading"><h2>こちらの道具も</h2><span class="micro">RELATED TOOLS</span></div><div class="related-list">{#each related as tool}<a href={`/tools/${tool.id}`}><span class="micro">{tool.number}</span><span>{tool.name}</span><span aria-hidden="true">↗</span></a>{/each}</div></section>{/if}
  {:else}<div class="not-found"><p class="micro">404 / TOOL NOT FOUND</p><h1>ツールが見つかりません</h1><p>左の一覧からツールを選択してください。</p><a class="button" href="/">ホームに戻る ↗</a></div>{/if}
  {#if storageNotice}<p role="status" class="error">{storageNotice}</p>{/if}
  <footer class="content-footer"><span>必要なときに、必要な道具を。</span><span>BUILT FOR THE LITTLE THINGS. <span class="accent">↗</span></span></footer>
 </main>
</div>
<dialog bind:this={help} aria-labelledby="help-title"><div class="field-heading"><span class="micro">QUICK GUIDE</span><button onclick={()=>help.close()} aria-label="閉じる">閉じる ×</button></div><h2 id="help-title">TOOLBOXの使い方</h2><p>左の一覧から道具を選択してください。日本語・英語・別名で検索できます。</p><dl><dt><kbd>⌘ / Ctrl + K</kbd></dt><dd>ツール検索へ移動</dd><dt><kbd>Tab / Shift + Tab</kbd></dt><dd>操作項目を移動</dd><dt><kbd>Escape</kbd></dt><dd>ダイアログ・モバイル一覧を閉じる</dd></dl><p>お気に入りと最近の20件は、このブラウザに保存されます。通常の入力は再読み込みまでメモリ内だけで保持されます。メモ・カレンダーの予定は端末内に保存されます。キー入力と座標履歴は保存しません。</p><p class="tool-note">クリップボード・暗号機能には HTTPS または localhost が必要です。</p></dialog>
