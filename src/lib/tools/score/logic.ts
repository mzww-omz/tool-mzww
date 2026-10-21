export interface Team {name:string;score:number}
export function changeScore(teams:Team[],index:number,delta:number){
 if(!Number.isInteger(index)||index<0||index>=teams.length||!Number.isSafeInteger(delta)||!Number.isSafeInteger(teams[index].score+delta))throw new Error('チームまたは得点が無効です。');
 return teams.map((t,i)=>({...t,score:t.score+(i===index?delta:0)}));
}
