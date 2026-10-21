export function layoutCSS(s:Record<string,any>) {
 if(!Array.isArray(s.items)||s.items.length<1||s.items.length>20)throw new Error('要素は1〜20個です。');
 if(!Number.isFinite(s.gap)||s.gap<0||s.gap>200)throw new Error('Gapは0〜200pxです。');
 if(!['flex-start','flex-end','center','space-between','space-around','space-evenly'].includes(s.justify)||!['stretch','flex-start','flex-end','center','baseline'].includes(s.align))throw new Error('配置が無効です。');
 if(!['row','row-reverse','column','column-reverse'].includes(s.direction)||!['nowrap','wrap','wrap-reverse'].includes(s.wrap))throw new Error('Flex設定が無効です。');
 return `.container { display: flex; flex-direction: ${s.direction}; flex-wrap: ${s.wrap}; gap: ${s.gap}px; justify-content: ${s.justify}; align-items: ${s.align}; }\n`+s.items.map((x:any,i:number)=>{if(![x.grow,x.shrink].every(v=>Number.isFinite(v)&&v>=0&&v<=100)||!/^(auto|content|0|(?:\d+(?:\.\d+)?)(?:px|rem|em|%))$/.test(x.basis))throw new Error('子要素のflex値が無効です。');return `.item-${i+1} { flex: ${x.grow} ${x.shrink} ${x.basis}; }`;}).join('\n');
}
