export function replaceAll(text: string, search: string, replacement: string) {
 if (!search) throw new Error('検索する文字列を入力してください。');
 return text.split(search).join(replacement);
}
