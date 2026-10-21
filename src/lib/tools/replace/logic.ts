export function replaceAll(text: string, search: string, replacement: string) {
 if (!search) throw new Error('検索する文字列を入力してください。');
 const parts = text.split(search);
 if (text.length + (parts.length - 1) * (replacement.length - search.length) > 1_000_000) throw new Error('置換後は1,000,000文字以内にしてください。');
 return parts.join(replacement);
}
