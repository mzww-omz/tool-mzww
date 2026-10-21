export function electricity(devices:{watts:number;hours:number;days:number}[],tariff:number){
 if(!devices.length||devices.length>20||!Number.isFinite(tariff)||tariff<0||tariff>10000)throw new Error('1〜20機器、単価0〜10,000円/kWhです。');
 const period=(kwh:number)=>({kwh,yen:kwh*tariff});
 const items=devices.map(d=>{if(!Number.isFinite(d.watts)||d.watts<0||d.watts>1e6||!Number.isFinite(d.hours)||d.hours<0||d.hours>24||!Number.isFinite(d.days)||d.days<0||d.days>31)throw new Error('消費電力0〜100万W、時間0〜24、月の使用日数0〜31で入力してください。');const day=d.watts/1000*d.hours;return {day:period(day),month:period(day*d.days),year:period(day*d.days*12)};});
 const sum=(key:'day'|'month'|'year')=>period(items.reduce((n,x)=>n+x[key].kwh,0));return {items,total:{day:sum('day'),month:sum('month'),year:sum('year')}};
}
