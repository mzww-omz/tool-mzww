import qrcode from 'qrcode-generator';
export function qrMatrix(text:string,level:string){
 if(!text||new TextEncoder().encode(text).length>2000)throw new Error('UTF-8で1〜2,000バイトにしてください。');
 if(!['L','M','Q','H'].includes(level))throw new Error('誤り訂正レベルが無効です。');
 qrcode.stringToBytes=(s:string)=>Array.from(new TextEncoder().encode(s));
 try{const qr=qrcode(0,level as 'L'|'M'|'Q'|'H');qr.addData(text,'Byte');qr.make();const n=qr.getModuleCount();return Array.from({length:n},(_,y)=>Array.from({length:n},(_,x)=>qr.isDark(y,x)));}
 catch{throw new Error('この訂正レベルでは容量を超えています。テキストを短くしてください。');}
}
export function qrSvg(matrix:boolean[][],size:number){
 const n=matrix.length+8;if(!Number.isInteger(size)||size<n||size>2048)throw new Error(`サイズは${n}〜2,048pxの整数にしてください。`);
 const paths=matrix.flatMap((row,y)=>row.flatMap((dark,x)=>dark?[`M${x+4} ${y+4}h1v1h-1z`]:[])).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges"><path fill="white" d="M0 0h${n}v${n}H0z"/><path fill="black" d="${paths}"/></svg>`;
}
