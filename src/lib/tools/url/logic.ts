export function url(text:string,decode:boolean,mode='component') {
 if(text.length>500000)throw new Error('500,000文字以内にしてください。');
 if(mode==='full')return decode?decodeURI(text):encodeURI(text);
 if(mode==='component')return decode?decodeURIComponent(text):encodeURIComponent(text);
 if(mode!=='form')throw new Error('変換モードが無効です。');
 return decode?decodeURIComponent(text.replaceAll('+',' ')):encodeURIComponent(text).replace(/%20/g,'+').replace(/[!'()~]/g,c=>'%'+c.charCodeAt(0).toString(16).toUpperCase());
}
