function date(s:string){if(!/^\d{4}-\d{2}-\d{2}$/.test(s)||s.startsWith('0000'))throw new Error('日付は0001〜9999年のYYYY-MM-DDで指定してください。');const [y,m,d]=s.split('-').map(Number),v=new Date(0);v.setUTCHours(0,0,0,0);v.setUTCFullYear(y,m-1,d);if(v.getUTCFullYear()!==y||v.getUTCMonth()!==m-1||v.getUTCDate()!==d)throw new Error('実在する日付を入力してください。');return v;}
function advance(v:Date,months:number){const y=v.getUTCFullYear(),m=v.getUTCMonth()+months,out=new Date(0);out.setUTCHours(0,0,0,0);out.setUTCFullYear(y,m+1,0);const last=out.getUTCDate();out.setUTCDate(Math.min(v.getUTCDate(),last));return out;}
export function dateDiff(first:string,second:string,mode='elapsed'){
 let a=date(first),b=date(second);const direction=a<=b?1:-1;if(direction<0)[a,b]=[b,a];const elapsed=(b.getTime()-a.getTime())/86400000;
 let months=(b.getUTCFullYear()-a.getUTCFullYear())*12+b.getUTCMonth()-a.getUTCMonth();if(advance(a,months)>b)months--;const anniversary=advance(a,months),remainder=(b.getTime()-anniversary.getTime())/86400000;
 if(!['elapsed','both','neither'].includes(mode))throw new Error('日数の数え方が無効です。');
 const days=mode==='both'?elapsed+1:mode==='neither'?Math.max(0,elapsed-1):elapsed;
 return {days,weeks:Math.floor(days/7),weekDays:days%7,years:Math.floor(months/12),months:months%12,remainder,direction,elapsed};
}
