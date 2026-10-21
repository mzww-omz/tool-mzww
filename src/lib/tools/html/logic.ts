const entities:Record<string,string>={amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:'\u00a0',copy:'©',reg:'®',trade:'™',yen:'¥',euro:'€',mdash:'—',ndash:'–',hellip:'…'};
export function html(text:string,decode:boolean){
 if(text.length>100000)throw new Error('100,000文字以内にしてください。');
 if(!decode)return text.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
 return text.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi,(all,entity:string)=>{if(entity[0]==='#'){const n=entity[1].toLowerCase()==='x'?parseInt(entity.slice(2),16):Number(entity.slice(1));if(n<1||n>0x10ffff||n>=0xd800&&n<=0xdfff)throw new Error('無効なUnicode数値参照です。');return String.fromCodePoint(n);}return entities[entity]??all;});
}
