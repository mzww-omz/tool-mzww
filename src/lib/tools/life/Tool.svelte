<script lang="ts">
 import { tick, untrack } from 'svelte';
 import type { ToolState } from '../../types';
 import { step } from './logic';
 let {state: data=$bindable()}: {state:ToolState} = $props();
 const width=32,height=20;
 function seed(){const b=Array(width*height).fill(0);[9*width+16,10*width+17,11*width+15,11*width+16,11*width+17].forEach(i=>b[i]=1);return b;}
 untrack(()=>{data.board??=seed();data.generation??=0;data.speed??=160;});
 let running=$state(false),focus=$state(0);
 let grid:HTMLDivElement;
 let population=$derived(data.board.reduce((a:number,b:number)=>a+b,0));
 function advance(){data.board=step(data.board,width,height);data.generation++;}
 $effect(()=>{if(running){const timer=setInterval(advance,Number(data.speed));return ()=>clearInterval(timer);}});
 async function key(event:KeyboardEvent,i:number){
  const offsets:Record<string,number>={ArrowLeft:-1,ArrowRight:1,ArrowUp:-width,ArrowDown:width};
  if(event.key in offsets){event.preventDefault();focus=Math.max(0,Math.min(width*height-1,i+offsets[event.key]));await tick();(grid.querySelector(`[data-cell="${focus}"]`) as HTMLButtonElement)?.focus();}
 }
 function randomize(){running=false;data.board=Array.from(crypto.getRandomValues(new Uint8Array(width*height)),x=>x<64?1:0);data.generation=0;}
</script>
<div class="life-toolbar"><div><span class="micro">GENERATION</span><strong>{String(data.generation).padStart(4,'0')}</strong></div><div><span class="micro">POPULATION</span><strong>{population}</strong></div><label>更新間隔<select bind:value={data.speed}><option value="500">500 ms</option><option value="160">160 ms</option><option value="80">80 ms</option></select></label></div>
<div class="action-row"><button class="primary" onclick={()=>running=!running}>{running?'一時停止 Ⅱ':'再生 ▷'}</button><button onclick={()=>{running=false;advance();}}>1世代進める</button><button onclick={randomize}>ランダム配置</button><button onclick={()=>{running=false;data.board=seed();data.generation=0;}}>グライダー</button><button onclick={()=>{running=false;data.board=Array(width*height).fill(0);data.generation=0;}}>クリア</button></div>
<div class="life-scroll"><div class="life-grid" role="grid" aria-label="ライフゲーム。矢印キーで移動、スペースでセルを切り替え。" bind:this={grid}>{#each Array(height) as _,y}<div role="row" class="life-row">{#each Array(width) as _,x}{@const i=y*width+x}<button role="gridcell" data-cell={i} tabindex={focus===i?0:-1} aria-selected={!!data.board[i]} aria-label={`${y+1}行${x+1}列 ${data.board[i]?'生':'死'}`} class:alive={data.board[i]} onclick={()=>{focus=i;data.board[i]=1-data.board[i];}} onkeydown={e=>key(e,i)}></button>{/each}</div>{/each}</div></div>
<p class="tool-note">セルをクリック、または矢印キー＋Spaceで編集。32 × 20セル、盤面の外は死セル。隣接する生セルが3つなら誕生、2〜3つなら生存。それ以外は死滅します。</p>
