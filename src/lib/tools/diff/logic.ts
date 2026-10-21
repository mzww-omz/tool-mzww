export function diff(before: string, after: string) {
 const a = before ? before.split('\n') : [], b = after ? after.split('\n') : [];
 if ((a.length + 1) * (b.length + 1) > 1_000_000) throw new Error('比較は合計100万セル以内にしてください（目安：各1,000行）。');
 const rows = Array.from({ length:a.length + 1 }, () => new Uint16Array(b.length + 1));
 for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--) rows[i][j] = a[i] === b[j] ? rows[i+1][j+1]+1 : Math.max(rows[i+1][j], rows[i][j+1]);
 const result: { kind:'same'|'remove'|'add'; text:string }[] = [];
 let i=0, j=0;
 while (i<a.length || j<b.length) {
 if (i<a.length && j<b.length && a[i]===b[j]) { result.push({kind:'same',text:a[i++]}); j++; }
 else if (i<a.length && (j===b.length || rows[i+1][j]>=rows[i][j+1])) result.push({kind:'remove',text:a[i++]});
 else result.push({kind:'add',text:b[j++]});
 }
 return result;
}
