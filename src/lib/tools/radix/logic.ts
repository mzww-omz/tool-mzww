export function radix(input: string, from: number, to: number) {
 if (![from,to].every(x => Number.isInteger(x) && x>=2 && x<=36)) throw new Error('基数は2〜36にしてください。');
 const negative = input.startsWith('-'), digits = (negative ? input.slice(1) : input).toLowerCase();
 if (!digits || digits.length>4096) throw new Error('1〜4,096桁の整数を入力してください。');
 let result=0n;
 for (const c of digits) { const n='0123456789abcdefghijklmnopqrstuvwxyz'.indexOf(c); if(n<0 || n>=from) throw new Error(`${from}進数として無効な文字です: ${c}`); result=result*BigInt(from)+BigInt(n); }
 return (negative ? -result : result).toString(to).toUpperCase();
}
