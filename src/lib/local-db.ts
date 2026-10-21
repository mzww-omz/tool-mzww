let database:Promise<IDBDatabase>|undefined;
function open(){
 if(!database)database=new Promise((resolve,reject)=>{
  if(!globalThis.indexedDB){reject(new Error('IndexedDBを利用できません。'));return;}
  const request=indexedDB.open('toolbox-local',1);
  request.onupgradeneeded=()=>{for(const name of ['notes','events'])if(!request.result.objectStoreNames.contains(name))request.result.createObjectStore(name,{keyPath:'id'});};
  request.onsuccess=()=>{const db=request.result;db.onversionchange=()=>{db.close();database=undefined;};resolve(db);};
  request.onerror=()=>{database=undefined;reject(request.error??new Error('保存領域を開けません。'));};
  request.onblocked=()=>reject(new Error('別のタブを閉じて再読み込みしてください。'));
 });
 return database;
}
export async function allRecords<T>(store:'notes'|'events'):Promise<T[]>{const db=await open();return new Promise((resolve,reject)=>{const tx=db.transaction(store,'readonly');const request=tx.objectStore(store).getAll();tx.oncomplete=()=>resolve(request.result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error??new Error('読み込みが中断されました。'));});}
export async function writeRecords(store:'notes'|'events',records:object[],removeIds:string[]=[]){
 const db=await open();return new Promise<void>((resolve,reject)=>{const tx=db.transaction(store,'readwrite');const target=tx.objectStore(store);try{for(const id of removeIds)target.delete(id);for(const record of records)target.put({...record});}catch(e){tx.abort();reject(e);return;}tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error??new Error('端末内に保存できません。'));tx.onabort=()=>reject(tx.error??new Error('保存が中断されました。'));});
}
