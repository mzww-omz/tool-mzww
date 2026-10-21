function fixed(value:number,max:number){if(!Number.isFinite(value)||value<0||value>max||!/^\d+(?:\.\d{1,4})?$/.test(String(value)))throw new Error('金額・率は範囲内の非負数、小数4桁以内で入力してください。');const [a,b='']=String(value).split('.');return BigInt(a)*10000n+BigInt(b.padEnd(4,'0'));}
export function discount(price:number,rates:number[],tax:number,amount=0){
 const original=fixed(price,1e12),off=fixed(amount,1e12),taxRate=fixed(tax,100);if(off>original||rates.length>10)throw new Error('割引額は元価格以下、連続割引は10回以内です。');
 let numerator=original-off,denominator=10000n;for(const rate of rates){numerator*=1000000n-fixed(rate,100);denominator*=1000000n;}
 const round=(n:bigint,d:bigint)=>Number((n*2n+d)/(d*2n));const subtotal=round(numerator,denominator),final=round(numerator*(1000000n+taxRate),denominator*1000000n);
 return {subtotal,final,saved:Number(original)/10000-Number(numerator)/Number(denominator),effective:original===0n?0:(1-Number(numerator)/Number(denominator)/(Number(original)/10000))*100,tax:final-subtotal};
}
