export function shellQuote(text:string){if(text.length>100000||text.includes('\0'))throw new Error('NULを除く100,000文字以内にしてください。');return "'"+text.replaceAll("'","'\"'\"'")+"'";}
