export function zoned(instant:number,zone:string){
 const parts=new Intl.DateTimeFormat('en-GB',{timeZone:zone,hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(instant);const number=(type:string)=>Number(parts.find(p=>p.type===type)?.value);return {hour:number('hour'),minute:number('minute'),second:number('second'),date:new Intl.DateTimeFormat('ja-JP',{timeZone:zone,dateStyle:'full'}).format(instant)};
}
