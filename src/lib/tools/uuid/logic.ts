export function uuids(amount: number) {
 if (!Number.isInteger(amount) || amount<1 || amount>10000) throw new Error('生成数は1〜10,000の整数にしてください。');
 return Array.from({ length:amount }, () => crypto.randomUUID());
}
