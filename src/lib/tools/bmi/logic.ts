export function bmi(height:number,weight:number,growing:boolean){
 if(!Number.isFinite(height)||!Number.isFinite(weight)||height<=0||height>300||weight<=0||weight>1000)throw new Error('身長は0超〜300cm、体重は0超〜1,000kgの有限数にしてください。');
 const value=weight/(height/100)**2;
 if(!Number.isFinite(value))throw new Error('計算結果が範囲を超えています。身長・体重を確認してください。');
 return {value,note:growing?'成長期には成人のBMI基準を適用しません。年齢・発育状況を含め専門家に相談してください。':'BMIは身長と体重の比率です。体組成や健康状態を判断するものではありません。'};
}
