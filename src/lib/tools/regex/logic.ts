export function pattern(text:string,kind:string,repeat:string,anchored:boolean){
 if(text.length>500||!['','?','+','*','{1,3}'].includes(repeat))throw new Error('GUI入力の上限を超えています。');
 const atom=kind==='digits'?'\\d':kind==='letters'?'[A-Za-z]':kind==='space'?'\\s':text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');const body=`(?:${atom})${repeat}`;return anchored?`^${body}$`:body;
}
export function matchRegex(source:string,flags:string,text:string){
 if(source.length>2000||text.length>20000)throw new Error('パターン2,000文字、対象20,000文字まで。');
 if(!/^[gimsuy]*$/.test(flags)||new Set(flags).size!==flags.length)throw new Error('フラグはg i m s u yを重複なく指定してください。');
 const regex=new RegExp(source,flags.includes('g')?flags:flags+'g');const matches:{index:number;text:string;groups:string[]}[]=[];let result:RegExpExecArray|null;
 while((result=regex.exec(text))){matches.push({index:result.index,text:result[0],groups:result.slice(1)});if(matches.length>=1000)break;if(result[0]==='')regex.lastIndex+=flags.includes('u')&&text.codePointAt(regex.lastIndex)!>0xffff?2:1;if(!flags.includes('g')&&!flags.includes('y'))break;}
 return {matches,truncated:matches.length>=1000};
}
