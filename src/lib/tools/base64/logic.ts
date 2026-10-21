export function base64(text: string, decode: boolean) {
 if (decode) {
 const clean = text.replace(/\s/g, '');
 if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(clean)) throw new Error('有効なBase64文字列を入力してください（パディング必須）。');
 return new TextDecoder('utf-8', { fatal:true }).decode(Uint8Array.from(atob(clean), c => c.charCodeAt(0)));
 }
 const bytes = new TextEncoder().encode(text);
 let binary = '';
 for (let i=0; i<bytes.length; i+=8192) binary += String.fromCharCode(...bytes.subarray(i,i+8192));
 return btoa(binary);
}
