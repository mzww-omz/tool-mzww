import type {ToolDefinition} from '../../types';
export default {id:"cidr",number:"45",name:"IP / CIDR計算",english:"IPv4 / IPv6 CIDR Calculator",categories:["開発", "ネットワーク"],aliases:["サブネット", "IPアドレス", "IPv6"],description:"BigIntでネットワーク範囲とアドレス数を計算。",load:()=>import('./Tool.svelte')} satisfies ToolDefinition;
