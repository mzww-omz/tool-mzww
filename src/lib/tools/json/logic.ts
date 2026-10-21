export function formatJson(text: string, indent = 2) {
 return JSON.stringify(JSON.parse(text), null, indent);
}
