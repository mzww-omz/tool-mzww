import {PDFDocument,degrees} from 'pdf-lib';
export interface PageSpec{file:number;index:number;rotation:number}
async function load(bytes:Uint8Array){if(!bytes.length||bytes.length>30*1024*1024)throw new Error('PDFは1ファイル30MB以内です。');try{const pdf=await PDFDocument.load(bytes,{throwOnInvalidObject:true});if(pdf.isEncrypted)throw new Error('encrypted');if(pdf.getPageCount()>300)throw new Error('pages');return pdf;}catch(e){throw new Error(`PDFを読み込めません。暗号化・破損、または300ページ上限を確認してください。${(e as Error).message.includes('encrypted')?' 暗号化PDFは非対応です。':''}`);}}
export async function inspectPDF(bytes:Uint8Array){return (await load(bytes)).getPageCount();}
export async function buildPDF(files:Uint8Array[],pages:PageSpec[]){
 if(!files.length||files.length>10||files.reduce((sum,x)=>sum+x.length,0)>60*1024*1024||!pages.length||pages.length>300)throw new Error('PDFは10ファイル・合計60MB・出力1〜300ページ以内です。');
 const docs=await Promise.all(files.map(load)),out=await PDFDocument.create();
 for(const page of pages){const doc=docs[page.file];if(!doc||!Number.isInteger(page.index)||page.index<0||page.index>=doc.getPageCount()||![0,90,180,270].includes(page.rotation))throw new Error('ページ指定が無効です。');const [copy]=await out.copyPages(doc,[page.index]);copy.setRotation(degrees((copy.getRotation().angle+page.rotation)%360));out.addPage(copy);}
 return out.save();
}
