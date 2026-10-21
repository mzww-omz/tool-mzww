export function permissions(input:string){
 if(!/^[0-7]{3,4}$/.test(input))throw new Error('3〜4桁の8進数を入力してください。');
 const digits=input.padStart(4,'0').split('').map(Number),out:string[]=[];
 for(let group=0;group<3;group++){const value=digits[group+1];out.push(value&4?'r':'-',value&2?'w':'-');const special=digits[0]&(4>>group);out.push(special?(group===2?(value&1?'t':'T'):(value&1?'s':'S')):(value&1?'x':'-'));}
 return out.join('');
}
export function octal(bits:boolean[],special:number){if(bits.length!==9||!Number.isInteger(special)||special<0||special>7)throw new Error('権限が無効です。');return (special?String(special):'')+[0,3,6].map(i=>(bits[i]?4:0)+(bits[i+1]?2:0)+(bits[i+2]?1:0)).join('');}
