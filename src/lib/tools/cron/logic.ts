const bounds=[[0,59],[0,23],[1,31],[1,12],[0,7]];
export function cron(fields:string[]){
 if(fields.length!==5)throw new Error('分・時・日・月・曜日の5項目を指定してください。');
 fields.forEach((field,i)=>{if(field.length>100)throw new Error('式が長すぎます。');for(const part of field.split(',')){const m=part.match(/^(\*|\d+(?:-\d+)?)(?:\/(\d+))?$/);if(!m)throw new Error('数値・*・範囲・リスト・ステップのみ対応しています。');const step=m[2]?Number(m[2]):1;if(step<1||step>bounds[i][1]-bounds[i][0]+1)throw new Error('ステップが範囲外です。');if(m[1]!=='*'){const range=m[1].split('-').map(Number);if(range.some(n=>n<bounds[i][0]||n>bounds[i][1])||(range.length===2&&range[0]>range[1]))throw new Error('値が項目の範囲外です。');}}});return fields.join(' ');
}
export function explainCron(expression:string){const fields=expression.trim().split(/\s+/);cron(fields);const names=['分 (0–59)','時 (0–23)','日 (1–31)','月 (1–12)','曜日 (日曜日=0/7、月曜日=1〜金曜日=5、土曜日=6)'];return fields.map((f,i)=>`${names[i]}: ${f==='*'?'すべて':f}（, は列挙、- は範囲、/ は間隔）`).join('\n')+'\n日と曜日の両方を指定した場合はOR条件（一般的なVixie cron）。実行環境のローカル時刻に従います。秒・@記法・拡張記号は未対応。';}
