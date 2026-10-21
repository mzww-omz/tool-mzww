export function fluid(min:number,max:number,start:number,end:number,root:number){
 if(![min,max,start,end,root].every(Number.isFinite)||min<0||max<min||max>10000||start<1||end<=start||end>100000||root<1||root>100)throw new Error('0≤最小≤最大≤10,000、1≤viewport開始<終了≤100,000、rootは1〜100pxにしてください。');
 const slope=(max-min)/(end-start),intercept=min-slope*start,fmt=(n:number)=>Number(n.toPrecision(12));
 return {css:`clamp(${fmt(min/root)}rem, ${fmt(intercept/root)}rem + ${fmt(slope*100)}vw, ${fmt(max/root)}rem)`,at:(width:number)=>Math.min(max,Math.max(min,intercept+slope*width))};
}
