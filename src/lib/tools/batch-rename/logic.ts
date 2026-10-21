import {zipSync} from 'fflate';
export interface RenameOptions {prefix:string;suffix:string;find:string;replacement:string;start:number;pad:number;number:boolean}
export function validFilename(name:string){if(!name||name.length>200||new TextEncoder().encode(name).length>255||/[<>:"/\\|?*\x00-\x1f\x7f]/.test(name)||/[. ]$/.test(name)||name==='.'||name==='..'||/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(name))throw new Error('不正なファイル名です。パス・予約名・末尾の空白やドットは使用できません。');}
export function renameFiles(names:string[],o:RenameOptions){
 if(!names.length||names.length>200||!Number.isSafeInteger(o.start)||o.start<0||o.start>999999||!Number.isInteger(o.pad)||o.pad<1||o.pad>6||[o.prefix,o.suffix,o.find,o.replacement].some(s=>s.length>100))throw new Error('最大200ファイル、連番開始0〜999999、桁数1〜6です。');
 const seen=new Set<string>();return names.map((name,i)=>{validFilename(name);const dot=name.lastIndexOf('.'),stem=dot>0?name.slice(0,dot):name,ext=dot>0?name.slice(dot):'';const out=o.prefix+(o.find?stem.split(o.find).join(o.replacement):stem)+o.suffix+(o.number?String(o.start+i).padStart(o.pad,'0'):'')+ext;validFilename(out);const key=out.normalize('NFKC').toLowerCase();if(seen.has(key))throw new Error('変更後のファイル名が重複します（大文字小文字・Unicode正規化も確認）。');seen.add(key);return out;});
}
export async function makeZip(files:{name:string;data:Uint8Array}[]){
 if(!files.length||files.length>200||files.reduce((n,f)=>n+f.data.length,0)>50*1024*1024)throw new Error('ZIPは200ファイル・合計50MB以内です。');
 const map:Record<string,Uint8Array>=Object.create(null);for(const f of files){validFilename(f.name);if(Object.hasOwn(map,f.name))throw new Error('ファイル名が重複しています。');map[f.name]=f.data;}return zipSync(map,{level:0});
}
