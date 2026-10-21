import {matchRegex} from './logic';
self.onmessage=(event:MessageEvent)=>{try{self.postMessage({result:matchRegex(event.data.source,event.data.flags,event.data.text)});}catch(e){self.postMessage({error:(e as Error).message});}};
