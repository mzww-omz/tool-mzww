function ipv4(s:string){const parts=s.split('.');if(parts.length!==4||parts.some(x=>!/^\d{1,3}$/.test(x)||Number(x)>255||x.length>1&&x[0]==='0'))throw new Error('IPv4が無効です。');return parts.reduce((v,x)=>(v<<8n)|BigInt(x),0n);}
function ipv6(s:string){
 if(s.includes('.')){const i=s.lastIndexOf(':');const v=ipv4(s.slice(i+1));s=s.slice(0,i+1)+(v>>16n).toString(16)+':'+(v&65535n).toString(16);}
 if(!/^[\da-f:]+$/i.test(s)||s.split('::').length>2)throw new Error('IPv6が無効です。');
 const halves=s.split('::'),left=halves[0]?halves[0].split(':'):[],right=halves.length===2&&halves[1]?halves[1].split(':'):[];
 if([...left,...right].some(x=>! /^[\da-f]{1,4}$/i.test(x))||halves.length===1&&left.length!==8||halves.length===2&&left.length+right.length>=8)throw new Error('IPv6が無効です。');
 return [...left,...Array(8-left.length-right.length).fill('0'),...right].reduce((v,x)=>(v<<16n)|BigInt('0x'+x),0n);
}
function format(v:bigint,version:number){if(version===4)return [24n,16n,8n,0n].map(n=>Number(v>>n&255n)).join('.');const parts=Array.from({length:8},(_,i)=>(v>>BigInt((7-i)*16)&65535n).toString(16));let start=-1,len=1;for(let i=0;i<8;){if(parts[i]!=='0'){i++;continue;}let j=i;while(j<8&&parts[j]==='0')j++;if(j-i>len){start=i;len=j-i;}i=j;}return start<0?parts.join(':'):parts.slice(0,start).join(':')+'::'+parts.slice(start+len).join(':');}
export function cidr(input:string){
 const match=input.trim().match(/^([^/\s]+)\/(\d{1,3})$/);if(!match)throw new Error('例：192.168.1.99/24、2001:db8::1/64');
 const version=match[1].includes(':')?6:4,bits=version===4?32:128,prefix=Number(match[2]);if(prefix>bits)throw new Error('プレフィックスが範囲外です。');
 const address=version===4?ipv4(match[1]):ipv6(match[1]),shift=BigInt(bits-prefix),network=address>>shift<<shift,count=1n<<shift,last=network+count-1n,traditional=version===4&&prefix<31;
 return {version,prefix,network:format(network,version),last:format(last,version),broadcast:version===4?format(last,version):'なし',count:count.toString(),hosts:(traditional?count-2n:count).toString(),firstHost:format(network+(traditional?1n:0n),version),lastHost:format(last-(traditional?1n:0n),version)};
}
