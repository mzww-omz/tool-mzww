export function color(input:string) {
 const s=input.trim(); let r:number,g:number,b:number;
 const hex=s.match(/^#?([\da-f]{3}|[\da-f]{6})$/i), rgb=s.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i), hsl=s.match(/^hsl\(\s*(-?[\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/i);
 if(hex) { const h=hex[1].length===3 ? [...hex[1]].map(c=>c+c).join('') : hex[1]; [r,g,b]=[0,2,4].map(i=>parseInt(h.slice(i,i+2),16)); }
 else if(rgb) { [r,g,b]=rgb.slice(1).map(Number); if([r,g,b].some(x=>x>255)) throw new Error('RGBの値は0〜255にしてください。'); }
 else if(hsl) {
 const [h,s,l]=hsl.slice(1).map(Number); if(![h,s,l].every(Number.isFinite) || s>100 || l>100) throw new Error('HSLの彩度・明度は0〜100%にしてください。');
 const hue=((h%360)+360)%360, sat=s/100, light=l/100;
 const a=sat*Math.min(light,1-light);
 [r,g,b]=[0,8,4].map(n=>{const k=(n+hue/30)%12; return Math.round((light-a*Math.max(-1,Math.min(k-3,9-k,1)))*255);});
 } else throw new Error('HEX、rgb(r, g, b)、hsl(h, s%, l%) を入力してください。');
 const [rr,gg,bb]=[r,g,b].map(x=>x/255), max=Math.max(rr,gg,bb), min=Math.min(rr,gg,bb), delta=max-min, light=(max+min)/2;
 let hue=0;
 if(delta) hue=(max===rr ? ((gg-bb)/delta)%6 : max===gg ? (bb-rr)/delta+2 : (rr-gg)/delta+4)*60;
 const saturation=delta===0 ? 0 : delta/(1-Math.abs(2*light-1));
 return { hex:'#'+[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('').toUpperCase(), rgb:`rgb(${r}, ${g}, ${b})`, hsl:`hsl(${Math.round((hue+360)%360)}, ${Math.round(saturation*100)}%, ${Math.round(light*100)}%)`, channels:[r,g,b] };
}
