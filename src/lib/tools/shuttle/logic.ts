// Topend Sports 20m shuttle table (8.5 km/h version), checked 2026-10-21.
export const source='https://www.topendsports.com/testing/tests/20mshuttle.htm';
export function shuttlePlan(){
 const counts=[7,8,8,8,9,9,10,10,10,11,11,12,12,13,13,13,14,14,15,15,16];
 const plan:{at:number;level:number;shuttle:number;speed:number}[]=[];let at=0;
 counts.forEach((count,i)=>{const speed=8.5+i*.5;for(let n=1;n<=count;n++){at+=20/(speed/3.6)*1000;plan.push({at,level:i+1,shuttle:n,speed});}});return plan;
}
export function shuttleAt(plan:ReturnType<typeof shuttlePlan>,elapsed:number){const next=plan.findIndex(p=>p.at>elapsed);const completed=next<0?plan.length:next;return {completed,finished:next<0,current:plan[Math.min(completed,plan.length-1)],remaining:next<0?0:plan[next].at-elapsed};}
