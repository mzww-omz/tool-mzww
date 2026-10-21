export function escapeCode(text:string,mode:string,decode:boolean){
 if(text.length>100000)throw new Error('100,000文字以内にしてください。');
 if(mode==='json'){if(!decode)return JSON.stringify(text);const value=JSON.parse(text);if(typeof value!=='string')throw new Error('JSON文字列リテラルを入力してください。');return value;}
 if(mode!=='unicode')throw new Error('未対応の形式です。');
 if(!decode)return Array.from(text,c=>'\\u{'+c.codePointAt(0)!.toString(16)+'}').join('');
 if(!/^(?:\\u\{[\da-f]{1,6}\}|\\u[\da-f]{4})*$/i.test(text))throw new Error('Unicodeエスケープのみ入力してください。');
 return text.replace(/\\u(?:\{([\da-f]{1,6})\}|([\da-f]{4}))/gi,(_,a,b)=>{const n=parseInt(a||b,16);if(n>0x10ffff)throw new Error('Unicode範囲外です。');return String.fromCodePoint(n);});
}
