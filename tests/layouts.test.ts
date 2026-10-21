import {test} from 'node:test';import assert from 'node:assert/strict';
for(const id of ['flexbox','grid'])test(`${id}: layout CSS, limits and injection`,async()=>{
 const {layoutCSS}=await import(`../src/lib/tools/${id}/logic.ts`);
 const s={direction:'row',wrap:'wrap',justify:'center',align:'stretch',gap:16,columns:'repeat(3, minmax(0, 1fr))',rows:'auto',items:[{grow:1,shrink:1,basis:'80px',column:'1 / span 2',row:'auto'}]};
 assert.match(layoutCSS(s),/gap: 16px/);assert.match(layoutCSS(s),id==='grid'?/grid-column: 1 \/ span 2/:/flex: 1 1 80px/);
 assert.throws(()=>layoutCSS({...s,gap:NaN}));assert.throws(()=>layoutCSS({...s,items:[]}));assert.throws(()=>layoutCSS({...s,columns:'url(https://evil)',items:[{...s.items[0],basis:'1px; color:red'}]}));
});
