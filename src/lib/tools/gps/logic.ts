export interface Fix {lat:number;lon:number;accuracy:number;time:number;speed?:number|null}
export function distance(a:Pick<Fix,'lat'|'lon'>,b:Pick<Fix,'lat'|'lon'>){const rad=Math.PI/180,p=(b.lat-a.lat)*rad,l=(b.lon-a.lon)*rad,h=Math.sin(p/2)**2+Math.cos(a.lat*rad)*Math.cos(b.lat*rad)*Math.sin(l/2)**2;return 6371000*2*Math.atan2(Math.sqrt(h),Math.sqrt(Math.max(0,1-h)));}
export function speed(mps:number,unit:string){const result=mps*(unit==='km/h'?3.6:unit==='mph'?2.2369362921:1);if(!Number.isFinite(result))throw new Error('速度が数値の範囲を超えています。');return result;}
export function acceptFix(fix:Fix,last?:Fix){
 if(![fix.lat,fix.lon,fix.accuracy,fix.time].every(Number.isFinite)||Math.abs(fix.lat)>90||Math.abs(fix.lon)>180||fix.accuracy<0||fix.accuracy>50)return false;
 if(!last)return true;const seconds=(fix.time-last.time)/1000;return seconds>=1&&seconds<=30&&distance(last,fix)/seconds<=100;
}
export function manualSpeed(meters:number,seconds:number){if(!Number.isFinite(meters)||!Number.isFinite(seconds)||meters<0||seconds<=0)throw new Error('距離は0以上、時間は0より大きい有限数にしてください。');const result=meters/seconds;if(!Number.isFinite(result))throw new Error('計算結果が数値の範囲を超えています。');return result;}
