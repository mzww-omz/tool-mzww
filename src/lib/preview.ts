// No scripts, forms, navigation, embedded documents, or network resources in previews.
export function previewDocument(body: string, css = '') {
 return `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src 'none'; font-src 'none'; base-uri 'none'; form-action 'none'"><meta name="viewport" content="width=device-width"><style>${css.replace(/</g, '\\3c ')} </style></head><body>${body}</body></html>`;
}
export function safePreviewHTML(input: string) {
 const doc = new DOMParser().parseFromString(input, 'text/html');
 const allowed = new Set('div span p h1 h2 h3 h4 h5 h6 section article header footer main nav ul ol li a strong em b i u s code pre blockquote table thead tbody tr th td hr br button label small'.split(' '));
 for (const el of [...doc.body.querySelectorAll('*')]) {
  if (!allowed.has(el.localName)) { el.remove(); continue; }
  for (const attr of [...el.attributes]) if (!['class', 'title', 'aria-label'].includes(attr.name)) el.removeAttribute(attr.name);
 }
 return doc.body.innerHTML;
}
