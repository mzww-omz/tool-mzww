export const units:Record<string,{kind:string;scale:number;label:string}>={g:{kind:'mass',scale:1,label:'円/100g'},kg:{kind:'mass',scale:1000,label:'円/100g'},mg:{kind:'mass',scale:0.001,label:'円/100g'},mL:{kind:'volume',scale:0.001,label:'円/L'},L:{kind:'volume',scale:1,label:'円/L'},'個':{kind:'count',scale:1,label:'円/個'}};
export function compare(items:{price:number;quantity:number;unit:string}[]){
 if(!items.length||items.length>20)throw new Error('商品は1〜20件です。');const kind=units[items[0].unit]?.kind;
 const result=items.map(item=>{const u=units[item.unit];if(!u||u.kind!==kind)throw new Error('重さ・容量・個数は混ぜずに比較してください。');if(!Number.isFinite(item.price)||item.price<0||item.price>1e12||!Number.isFinite(item.quantity)||item.quantity<=0||item.quantity>1e12)throw new Error('価格は0〜1兆円、数量は0より大きく1兆以内です。');const value=item.price/(item.quantity*u.scale)*(kind==='mass'?100:1);if(!Number.isFinite(value)||value>1e15)throw new Error('単価が大きすぎます。数量を確認してください。');return {value,label:u.label};});
 const best=result.reduce((best,x,i)=>x.value<result[best].value?i:best,0);return {items:result,best};
}
