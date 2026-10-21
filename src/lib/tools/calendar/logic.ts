export interface CalendarEvent{id:string;title:string;start:string;end:string}
export function dateKey(d:Date){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function localDate(key:string){const m=key.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(!m)throw new Error('日付が無効です。');const d=new Date(Number(m[1]),Number(m[2])-1,Number(m[3]),12);if(dateKey(d)!==key||d.getFullYear()<1900||d.getFullYear()>2100)throw new Error('1900〜2100年の実在する日付を指定してください。');return d;}
export function calendarDays(key:string,view:string){const d=localDate(key);if(view==='month')d.setDate(1);d.setDate(d.getDate()-((d.getDay()+6)%7));return Array.from({length:view==='month'?42:7},()=>{const key=dateKey(d);d.setDate(d.getDate()+1);return key;});}
export function validateEvent(event:CalendarEvent){
 if(!event||typeof event.id!=='string'||!event.id||typeof event.title!=='string'||!event.title.trim()||event.title.length>200)throw new Error('予定名は1〜200文字にしてください。');
 for(const value of [event.start,event.end]){if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d$/.test(value))throw new Error('開始・終了日時を指定してください。');localDate(value.slice(0,10));}
 if(event.end<=event.start)throw new Error('終了は開始より後にしてください。');return {...event,title:event.title.trim()};
}
