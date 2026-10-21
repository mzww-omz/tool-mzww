import {randomIntegers} from '../random/logic.ts';
export interface Board{participants:string[];results:string[];edges:number[]}
export function generate(names:string,prizes:string):Board{
 const parse=(s:string)=>{if(s.length>1000)throw new Error('入力は1,000文字以内です。');const lines=s.split(/\r?\n/).map(x=>x.trim());if(lines.some(x=>!x||x.length>40)||lines.length<2||lines.length>16)throw new Error('空行なしで2〜16行、各40文字以内にしてください。');return lines;};
 const participants=parse(names),results=parse(prizes);if(participants.length!==results.length||new Set(participants.map(x=>x.normalize('NFKC'))).size!==participants.length)throw new Error('参加者は重複なし、結果と同じ人数にしてください。');
 const n=participants.length,target=Array.from({length:n},(_,i)=>i),current=[...target],edges:number[]=[];
 for(let i=n-1;i>0;i--){const j=randomIntegers(0,i,1)[0];[target[i],target[j]]=[target[j],target[i]];}
 // One crossing per row: no overlapping intersections; adjacent swaps realize the shuffled permutation.
 for(let i=0;i<n;i++){let j=current.indexOf(target[i]);while(j>i){edges.push(j-1);[current[j-1],current[j]]=[current[j],current[j-1]];j--;}}
 const extra=randomIntegers(0,n-2,1)[0];edges.push(extra,extra);return {participants,results,edges};
}
export function trace(board:Board,start:number){const n=board.participants.length;if(n<2||n>16||board.results.length!==n||board.edges.length>122||!Number.isInteger(start)||start<0||start>=n||board.edges.some(x=>!Number.isInteger(x)||x<0||x>=n-1))throw new Error('あみだくじの経路が無効です。');let column=start;const points:[[number,number],...[number,number][]]=[[40+column*80,30]];board.edges.forEach((edge,row)=>{const y=60+row*24;points.push([40+column*80,y]);if(column===edge)column++;else if(column===edge+1)column--;points.push([40+column*80,y]);});points.push([40+column*80,90+board.edges.length*24]);return {end:column,points:points.map(p=>p.join(',')).join(' ')};}
