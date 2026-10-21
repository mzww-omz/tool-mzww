export interface Note {id:string;title:string;body:string;updated:number}
export function importNotes(text:string):Note[]{
 if(text.length>2_000_000)throw new Error('インポートは2MB以内にしてください。');
 const data=JSON.parse(text);if(data.version!==1||!Array.isArray(data.notes)||data.notes.length>250)throw new Error('形式が無効です。version:1、notes配列（250件以内）が必要です。');
 return data.notes.map((n:unknown)=>{if(!n||typeof n!=='object'||typeof (n as Note).title!=='string'||typeof (n as Note).body!=='string'||(n as Note).title.length>200||(n as Note).body.length>100000)throw new Error('メモの形式または長さが無効です。');return {id:crypto.randomUUID(),title:(n as Note).title,body:(n as Note).body,updated:Date.now()};});
}
export function searchNotes(notes:Note[],query:string){const q=query.normalize('NFKC').toLowerCase();return notes.filter(n=>(n.title+'\n'+n.body).normalize('NFKC').toLowerCase().includes(q));}
