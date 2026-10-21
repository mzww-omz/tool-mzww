export function count(input: string) {
 const text = input.replace(/\r\n?/g, '\n');
 const graphemes = [...new Intl.Segmenter('ja', { granularity: 'grapheme' }).segment(text)];
 return { characters: graphemes.length, noSpaces: graphemes.filter(s => !/^\s+$/u.test(s.segment)).length,
 lines: text ? text.split('\n').length : 0,
 words: [...new Intl.Segmenter('ja', { granularity:'word' }).segment(text)].filter(s => s.isWordLike).length,
 bytes: new TextEncoder().encode(input).length };
}
