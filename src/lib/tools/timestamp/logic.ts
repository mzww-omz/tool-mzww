export function timestamp(input: string, mode: string) {
 if (!input.trim()) throw new Error('日時またはタイムスタンプを入力してください。');
 if (mode !== 'date' && !/^-?\d+(\.\d+)?$/.test(input.trim())) throw new Error('数値を入力してください。');
 const date = mode==='date' ? new Date(input) : new Date(Number(input) * (mode==='seconds' ? 1000 : 1));
 if (!Number.isFinite(date.getTime())) throw new Error('有効な日時を入力してください。');
 return { seconds:Math.floor(date.getTime()/1000), milliseconds:date.getTime(), iso:date.toISOString(), local:date.toLocaleString('ja-JP') };
}
