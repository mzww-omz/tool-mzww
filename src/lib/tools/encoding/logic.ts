import Encoding from 'encoding-japanese';
export const encodings = ['UTF8','SJIS','EUCJP','JIS','UTF16LE'] as const;
export type Charset = typeof encodings[number];
function check(text:string){if(text.length>20000)throw new Error('20,000文字以内にしてください。');}
export function encode(text:string, charset:Charset):Uint8Array {
 check(text);if(!encodings.includes(charset))throw new Error('未対応の文字コードです。');
 const bytes=Encoding.convert(Encoding.stringToCode(text),{from:'UNICODE',to:charset,type:'array',fallback:'error'});
 const result=Uint8Array.from(bytes);
 if(decode(result,charset)!==text)throw new Error('この文字コードでは元の文字列を完全に表現できません。');
 return result;
}
export function decode(bytes:ArrayLike<number>,charset:Charset){
 if(bytes.length>100000)throw new Error('100KB以下にしてください。');
 const labels={UTF8:'utf-8',SJIS:'shift_jis',EUCJP:'euc-jp',JIS:'iso-2022-jp',UTF16LE:'utf-16le'};
 return new TextDecoder(labels[charset],{fatal:true}).decode(Uint8Array.from(bytes));
}
export function garble(text:string,source:Charset,wrong:Charset){
 const labels={UTF8:'utf-8',SJIS:'shift_jis',EUCJP:'euc-jp',JIS:'iso-2022-jp',UTF16LE:'utf-16le'};
 return new TextDecoder(labels[wrong]).decode(encode(text,source));
}
export function recover(text:string){
 check(text);const candidates:{text:string;route:string}[]=[];
 if(text.includes('\uFFFD'))return candidates;
 for(const wrong of encodings)for(const original of encodings){if(wrong===original)continue;
 try{const restored=decode(encode(text,wrong),original);if(restored!==text&&!candidates.some(c=>c.text===restored)&&garble(restored,original,wrong)===text)candidates.push({text:restored,route:`${wrong}として再符号化 → ${original}で解読`});}catch{/* Lossy or invalid candidates are not recoverable. */}}
 return candidates;
}
export function parseHex(text:string){if(!/^(?:[\da-f]{2}\s*)*$/i.test(text.trim()))throw new Error('2桁の16進数を空白で区切ってください。');return Uint8Array.from(text.match(/[\da-f]{2}/gi)||[],s=>parseInt(s,16));}
