import {parseDocument,stringify as yamlStringify} from 'yaml';
import {parse as tomlParse,stringify as tomlStringify} from 'smol-toml';
export function convert(input:string,from:'yaml'|'toml',to:'yaml'|'toml'|'json') {
 if(!input.trim()||input.length>100000)throw new Error('入力は1〜100,000文字です。');
 let value:unknown;
 try {
  if(from==='yaml') {const doc=parseDocument(input,{schema:'core',uniqueKeys:true,intAsBigInt:true});if(doc.errors.length||doc.warnings.length)throw doc.errors[0]||doc.warnings[0];value=doc.toJS({maxAliasCount:0,mapAsMap:true});}
  else value=tomlParse(input,{integersAsBigInt:'asNeeded'});
 }catch(e){throw new Error(`構文エラー（行・列）: ${(e as Error).message}`);}
 let nodes=0;
 function safe(v:any,depth=0):any {
  if(++nodes>20000||depth>64)throw new Error('20,000要素・64階層以内にしてください。');
  if(v instanceof Date||typeof v==='bigint'&&(v>BigInt(Number.MAX_SAFE_INTEGER)||v<BigInt(Number.MIN_SAFE_INTEGER))||typeof v==='number'&&(!Number.isFinite(v)||Math.abs(v)>Number.MAX_SAFE_INTEGER))throw new Error('日時型・非有限数・精度を失う整数の変換には対応しません。');
  if(typeof v==='bigint')return Number(v);
  if(Array.isArray(v))return v.map(x=>safe(x,depth+1));
  if(v&&typeof v==='object') {const out=Object.create(null);for(const [k,x] of v instanceof Map?v.entries():Object.entries(v)){if(typeof k!=='string'||['__proto__','constructor','prototype'].includes(k))throw new Error('非文字列キー・危険なキーは使用できません。');out[k]=safe(x,depth+1);}return out;}
  if(to==='toml'&&v===null)throw new Error('TOMLはnullを表現できないため変換できません。');return v;
 }
 const result=safe(value);
 if(to==='toml'&&(!result||Array.isArray(result)||typeof result!=='object'))throw new Error('TOMLのルートにはテーブルが必要です。');
 return to==='json'?JSON.stringify(result,null,2):to==='yaml'?yamlStringify(result):tomlStringify(result);
}
