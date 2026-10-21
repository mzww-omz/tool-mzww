export function systemd(description:string,executable:string,args:string[],user:string,restart:string){
 const strings=[description,executable,user,...args];if(strings.some(s=>s.length>1000||/[\x00-\x1f\x7f]/.test(s))||args.length>100)throw new Error('制御文字・改行は使用できません。各項目1,000文字、引数100個以内。');
 if(!executable.startsWith('/')||!/^\/[\w./+-]+$/.test(executable))throw new Error('実行ファイルには空白のない絶対パスを指定してください。');
 if(!/^[a-z_][a-z0-9_-]*\$?$/.test(user)||!['no','on-failure','always'].includes(restart))throw new Error('ユーザー名またはRestart設定が無効です。');
 const quote=(s:string)=>'"'+s.replaceAll('\\','\\\\').replaceAll('"','\\"').replaceAll('%','%%').replaceAll('$','$$')+'"';
 return `[Unit]\nDescription=${description.replaceAll('%','%%')}\nAfter=network.target\n\n[Service]\nType=simple\nUser=${user}\nExecStart=${[executable,...args].map(quote).join(' ')}\nRestart=${restart}\nNoNewPrivileges=true\n\n[Install]\nWantedBy=multi-user.target\n`;
}
