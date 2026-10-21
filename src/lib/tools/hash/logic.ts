export async function hash(text: string | ArrayBuffer, algorithm: string) {
 const data = typeof text === 'string' ? new TextEncoder().encode(text) : text;
 const digest = await crypto.subtle.digest(algorithm, data);
 return [...new Uint8Array(digest)].map(v => v.toString(16).padStart(2,'0')).join('');
}
