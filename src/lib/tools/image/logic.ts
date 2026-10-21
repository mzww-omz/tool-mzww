export function dimensions(originalWidth:number, originalHeight:number, width:number, height?:number) {
 if (!Number.isFinite(originalWidth*originalHeight) || originalWidth<1 || originalHeight<1 || originalWidth*originalHeight>40_000_000) throw new Error('元画像は4,000万画素以下にしてください。');
 const h=height ?? Math.max(1,Math.round(originalHeight*width/originalWidth));
 if(![width,h].every(x=>Number.isInteger(x) && x>0 && x<=8192) || width*h>16_000_000) throw new Error('出力は各辺1〜8,192px、合計1,600万画素以内にしてください。');
 return {width,height:h};
}
