export function layoutCSS(s:Record<string,any>) {
 if(!Array.isArray(s.items)||s.items.length<1||s.items.length>20)throw new Error('要素は1〜20個です。');
 if(!Number.isFinite(s.gap)||s.gap<0||s.gap>200)throw new Error('Gapは0〜200pxです。');
 if(!['flex-start','flex-end','center','space-between','space-around','space-evenly'].includes(s.justify)||!['stretch','flex-start','flex-end','center','baseline'].includes(s.align))throw new Error('配置が無効です。');
 const track=(v:string)=>{if(!v||v.length>200||!/^[a-z0-9().,% /-]+$/i.test(v)||/[;{}<>]|url|var|attr/i.test(v))throw new Error('行・列はfr、px、repeat()、minmax()などで指定してください。');return v;};
 const position=(v:string)=>{if(!/^(auto|span [1-9]\d?|[1-9]\d?)( ?\/ ?(auto|span [1-9]\d?|[1-9]\d?))?$/.test(v))throw new Error('配置はauto、正の行番号、span Nで指定してください。');return v;};
 return `.container { display: grid; grid-template-columns: ${track(s.columns)}; grid-template-rows: ${track(s.rows)}; gap: ${s.gap}px; justify-content: ${s.justify}; align-items: ${s.align}; }\n`+s.items.map((x:any,i:number)=>`.item-${i+1} { grid-column: ${position(x.column)}; grid-row: ${position(x.row)}; }`).join('\n');
}
