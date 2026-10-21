import type {ToolDefinition} from '../../types';
export default {id:'qr',number:'19',name:'QRコード生成',english:'QR Code Generator',description:'テキスト・URLからQRコードを生成し、PNG・SVGで保存。',categories:['画像','開発'],aliases:['qrcode','二次元コード'],load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
