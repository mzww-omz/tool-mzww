import {color} from '../color/logic.ts';
export function contrast(fg:string,bg:string){
 const luminance=(s:string)=>color(s).channels.map(x=>{const c=x/255;return c<=0.04045?c/12.92:((c+0.055)/1.055)**2.4;}).reduce((sum,x,i)=>sum+x*[0.2126,0.7152,0.0722][i],0);
 const a=luminance(fg),b=luminance(bg),ratio=(Math.max(a,b)+0.05)/(Math.min(a,b)+0.05);
 return {ratio,normalAA:ratio>=4.5,normalAAA:ratio>=7,largeAA:ratio>=3,largeAAA:ratio>=4.5,foreground:color(fg).hex,background:color(bg).hex};
}
