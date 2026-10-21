export function randomIntegers(min:number, max:number, amount:number) {
 const range=max-min+1;
 if(![min,max].every(Number.isSafeInteger) || min>max || range>4294967296 || !Number.isInteger(amount) || amount<1 || amount>10000) throw new Error('安全な整数の範囲で、最小値≤最大値、範囲幅2³²以内、個数1〜10,000を指定してください。');
 const limit=Math.floor(4294967296/range)*range, buffer=new Uint32Array(1);
 return Array.from({length:amount},()=>{let n:number; do {crypto.getRandomValues(buffer); n=buffer[0];} while(n>=limit); return min+n%range;});
}
