const fail=()=>{throw new Error('未対応・破損した画像です。JPEG / PNG / WebPの静止画を選択してください。');};
function join(parts:Uint8Array[]){const out=new Uint8Array(parts.reduce((n,p)=>n+p.length,0));let offset=0;for(const p of parts){out.set(p,offset);offset+=p.length;}return out;}
function pixels(w:number,h:number){if(!w||!h||w*h>40000000)throw new Error('画像は4,000万画素以内です。');}
const text=(b:Uint8Array)=>String.fromCharCode(...b);
export function stripMetadata(b:Uint8Array):{bytes:Uint8Array;type:string;extension:string;removed:number}{
 if(!b.length||b.length>10*1024*1024)throw new Error('画像は10MB以内です。');
 const view=new DataView(b.buffer,b.byteOffset,b.byteLength);let removed=0;
 if(b.length>24&&text(b.slice(0,8))==='\x89PNG\r\n\x1a\n'){
  let p=8,ended=false,header=false,data=false;const parts=[b.slice(0,8)];
  while(p+12<=b.length){const size=view.getUint32(p),type=text(b.slice(p+4,p+8)),end=p+12+size;if(end>b.length)fail();
   let crc=0xffffffff;for(const value of b.subarray(p+4,end-4)){crc^=value;for(let bit=0;bit<8;bit++)crc=crc>>>1^((crc&1)?0xedb88320:0);}if((crc^0xffffffff)>>>0!==view.getUint32(end-4))fail();
   if(type==='acTL'||type==='fcTL'||type==='fdAT')throw new Error('アニメーションPNGは対応しません。');
   if(type==='IHDR'){if(header||p!==8||size!==13)fail();header=true;pixels(view.getUint32(p+8),view.getUint32(p+12));}
   if(type==='IDAT')data=true;
   if(['IHDR','PLTE','IDAT','IEND','tRNS'].includes(type))parts.push(b.slice(p,end));else {if(type[0]===type[0].toUpperCase())fail();removed++;}
   p=end;if(type==='IEND'){if(size!==0)fail();ended=true;break;}
  }
  if(!header||!data||!ended||p!==b.length)fail();return {bytes:join(parts),type:'image/png',extension:'png',removed};
 }
 if(b.length>12&&text(b.slice(0,4))==='RIFF'&&text(b.slice(8,12))==='WEBP'){
  if(view.getUint32(4,true)+8!==b.length)fail();let p=12,hasImage=false;const parts:Uint8Array[]=[];
  while(p+8<=b.length){const type=text(b.slice(p,p+4)),size=view.getUint32(p+4,true),end=p+8+size+(size%2);if(end>b.length)fail();
   if(type==='ANIM'||type==='ANMF'||type==='VP8X'&&(b[p+8]&2))throw new Error('アニメーションWebPは対応しません。');
   if(type==='VP8X'){if(size!==10)fail();const chunk=b.slice(p,end);chunk[8]&=~(0x20|0x08|0x04);pixels(1+b[p+12]+(b[p+13]<<8)+(b[p+14]<<16),1+b[p+15]+(b[p+16]<<8)+(b[p+17]<<16));parts.push(chunk);}
   else if(type==='VP8 '||type==='VP8L'){hasImage=true;if(type==='VP8 '){if(size<10||text(b.slice(p+11,p+14))!=='\x9d\x01\x2a')fail();pixels(view.getUint16(p+14,true)&16383,view.getUint16(p+16,true)&16383);}else{if(size<5||b[p+8]!==0x2f)fail();const bits=view.getUint32(p+9,true);pixels((bits&16383)+1,((bits>>>14)&16383)+1);}parts.push(b.slice(p,end));}
   else if(type==='ALPH')parts.push(b.slice(p,end));else removed++;
   p=end;
  }if(p!==b.length||!hasImage)fail();const out=join([b.slice(0,12),...parts]);new DataView(out.buffer).setUint32(4,out.length-8,true);return {bytes:out,type:'image/webp',extension:'webp',removed};
 }
 if(b.length>4&&b[0]===255&&b[1]===216){
  const parts=[b.slice(0,2)];let p=2,frame=false,scan=false,ended=false;
  while(p<b.length){const start=p;if(b[p++]!==255)fail();while(b[p]===255)p++;const marker=b[p++];
   if(marker===217){parts.push(b.slice(start,p));ended=true;break;}
   if(marker===216||marker===0||marker>=208&&marker<=215||p+2>b.length)fail();const size=view.getUint16(p),end=p+size;if(size<2||end>b.length)fail();
   if([192,193,194].includes(marker)){if(size<8)fail();pixels(view.getUint16(p+5),view.getUint16(p+3));if(b[p+7]===4)throw new Error('CMYK JPEGは色変化を防ぐため非対応です。');frame=true;}
   if(marker>=224&&marker<=239||marker===254)removed++;else parts.push(b.slice(start,end));p=end;
   if(marker===218){scan=true;const entropyStart=p;while(p<b.length){if(b[p]!==255){p++;continue;}const next=b[p+1];if(next===0||next>=208&&next<=215){p+=2;continue;}break;}parts.push(b.slice(entropyStart,p));}
  }
  if(!ended||!frame||!scan||p!==b.length)fail();return {bytes:join(parts),type:'image/jpeg',extension:'jpg',removed};
 }return fail();
}
