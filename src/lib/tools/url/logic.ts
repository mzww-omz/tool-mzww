export function url(text: string, decode: boolean) { return decode ? decodeURIComponent(text) : encodeURIComponent(text); }
