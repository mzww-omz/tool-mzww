export function workerTask<T>(worker:Worker,data:unknown,signal:AbortSignal,timeout=20000):Promise<T>{
 return new Promise((resolve,reject)=>{
  const finish=(error?:Error,value?:T)=>{clearTimeout(timer);signal.removeEventListener('abort',abort);worker.terminate();error?reject(error):resolve(value as T);};
  const abort=()=>finish(new Error('処理を中止しました。'));
  const timer=setTimeout(()=>finish(new Error('処理が20秒を超えました。ファイルを小さくしてください。')),timeout);
  worker.onmessage=e=>e.data.error?finish(new Error(e.data.error)):finish(undefined,e.data.result);
  worker.onerror=event=>{event.preventDefault();finish(new Error('Workerで処理できません。ファイル形式とブラウザ設定を確認してください。'));};
  signal.addEventListener('abort',abort,{once:true});if(signal.aborted){abort();return;}try{worker.postMessage(data);}catch(e){finish(new Error(`Workerにデータを渡せません: ${(e as Error).message}`));}
 });
}
