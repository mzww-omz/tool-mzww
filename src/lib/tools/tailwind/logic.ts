import {compile} from 'tailwindcss';
export async function compileClasses(classes:string,theme:string,preflight='') {
 if(classes.length>20000)throw new Error('クラスは20,000文字以内です。');
 const candidates=[...new Set(classes.split(/\s+/).filter(Boolean))];
 if(candidates.length>500)throw new Error('クラスは500種類以内です。');
 const compiler=await compile(`${theme}\n${preflight}\n@tailwind utilities;`);
 return compiler.build(candidates);
}
