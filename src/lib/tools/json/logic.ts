export function formatJson(text: string, indent = 2) {
 if (text.length > 100_000) throw new Error('JSONは100,000文字以内にしてください。');
 const value = JSON.parse(text);
 const stack = [{ value, depth:0 }];
 while (stack.length) {
  const current = stack.pop()!;
  if (current.depth > 64) throw new Error('JSONのネストは64階層以内にしてください。');
  if (current.value && typeof current.value === 'object') {
   for (const child of Object.values(current.value)) stack.push({ value:child, depth:current.depth+1 });
  }
 }
 return JSON.stringify(value, null, indent);
}
