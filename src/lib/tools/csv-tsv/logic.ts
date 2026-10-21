export function parseDelimited(input:string,delimiter=","):string[][] {
 if(![',','\t'].includes(delimiter)||input.length>200000)throw new Error('CSV/TSVは200,000文字以内です。');
 const text=input.replace(/^\uFEFF/,'');const rows:string[][]=[];let row:string[]=[],cell='',quoted=false,closed=false,cells=0;
 const pushCell=()=>{if(++cells>20000)throw new Error('セルは20,000個以内です。');row.push(cell);cell='';closed=false;};
 for(let i=0;i<text.length;i++) {const c=text[i];
  if(quoted){if(c==='"'){if(text[i+1]==='"'){cell+='"';i++;}else{quoted=false;closed=true;}}else cell+=c;continue;}
  if(c==='"'){if(cell||closed)throw new Error(`位置${i+1}: 引用符はセル先頭のみです。`);quoted=true;}
  else if(c===delimiter){pushCell();}
  else if(c==='\r'||c==='\n'){pushCell();rows.push(row);row=[];if(c==='\r'&&text[i+1]==='\n')i++;}
  else {if(closed)throw new Error(`位置${i+1}: 閉じ引用符の後は区切り文字が必要です。`);cell+=c;}
 }
 if(quoted)throw new Error('引用符が閉じられていません。');
 if(cell||row.length||closed||!rows.length){pushCell();rows.push(row);}return rows;
}
export function serializeDelimited(rows:string[][],delimiter=",") {
 if(![',','\t'].includes(delimiter))throw new Error('区切り文字が無効です。');
 return rows.map(row=>row.map(cell=>cell.includes(delimiter)||/["\r\n]/.test(cell)?'"'+cell.replace(/"/g,'""')+'"':cell).join(delimiter)).join('\r\n');
}
