export function deviation(score:number,mean:number,sd:number){if(![score,mean,sd].every(Number.isFinite)||sd<=0)throw new Error('有限数と、0より大きい標準偏差を入力してください。');const result=50+10*(score-mean)/sd;if(!Number.isFinite(result))throw new Error('計算結果が範囲を超えています。');return result;}
export function statistics(text:string,sample:boolean){
 const tokens=text.trim().split(/[\s,、]+/);if(!text.trim()||tokens.length>10000)throw new Error('1〜10,000個の得点を入力してください。');
 const values=tokens.map(t=>{if(!/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(t))throw new Error('得点には数値のみ指定してください。');return Number(t);});
 if(!values.every(Number.isFinite)||sample&&values.length<2)throw new Error('標本標準偏差には2件以上の有限数が必要です。');
 let mean=0,m2=0;values.forEach((v,i)=>{const delta=v-mean;mean+=delta/(i+1);m2+=delta*(v-mean);});
 const sd=Math.sqrt(m2/(values.length-(sample?1:0)));if(!Number.isFinite(sd))throw new Error('数値が大きすぎます。');
 return {count:values.length,mean,sd};
}
