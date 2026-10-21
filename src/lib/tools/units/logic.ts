export const groups: Record<string, Record<string, number>> = {
 '長さ': { mm:0.001, cm:0.01, m:1, km:1000, in:0.0254, ft:0.3048, yd:0.9144, mi:1609.344 },
 '重さ': { mg:0.000001, g:0.001, kg:1, t:1000, oz:0.028349523125, lb:0.45359237 },
 '温度': { '°C':1, '°F':1, K:1 },
 '面積': { 'm²':1, 'km²':1000000, ha:10000, acre:4046.8564224 },
 'データ': { B:1, KB:1000, MB:1e6, GB:1e9, KiB:1024, MiB:1048576, GiB:1073741824 }
};
export function convert(value:number, from:string, to:string) {
 if (!Number.isFinite(value)) throw new Error('有限の数値を入力してください。');
 const group=Object.values(groups).find(g => from in g && to in g);
 if (!group) throw new Error('同じ種類の単位を選択してください。');
 if (from in groups['温度']) {
 const c=from==='°F' ? (value-32)*5/9 : from==='K' ? value-273.15 : value;
 if(c < -273.15) throw new Error('絶対零度未満の温度は変換できません。');
 return to==='°F' ? c*9/5+32 : to==='K' ? c+273.15 : c;
 }
 return value*group[from]/group[to];
}
