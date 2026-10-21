export interface Timer {id:string;name:string;kind:'countdown'|'stopwatch';duration:number;accumulated:number;startedAt:number|null;alerted:boolean}
export function elapsed(t:Pick<Timer,'accumulated'|'startedAt'>,now:number){return t.accumulated+(t.startedAt===null?0:Math.max(0,now-t.startedAt));}
export function timerValue(t:Pick<Timer,'kind'|'duration'|'accumulated'|'startedAt'>,now:number){const ms=elapsed(t,now);return t.kind==='countdown'?Math.max(0,t.duration-ms):ms;}
export function durationText(ms:number){const seconds=Math.floor(ms/1000);return `${String(Math.floor(seconds/3600)).padStart(2,'0')}:${String(Math.floor(seconds/60)%60).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;}
