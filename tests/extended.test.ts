import {test} from 'node:test';
import assert from 'node:assert/strict';
import {encode,decode,garble,recover} from '../src/lib/tools/encoding/logic.ts';
import {bmi} from '../src/lib/tools/bmi/logic.ts';
import {deviation,statistics} from '../src/lib/tools/zscore/logic.ts';
import {qrMatrix,qrSvg} from '../src/lib/tools/qr/logic.ts';
import {importNotes,searchNotes} from '../src/lib/tools/notes/logic.ts';
import {distance,speed,acceptFix} from '../src/lib/tools/gps/logic.ts';
import {permissions,octal} from '../src/lib/tools/chmod/logic.ts';
import {cron,explainCron} from '../src/lib/tools/cron/logic.ts';
import {shellQuote} from '../src/lib/tools/shell/logic.ts';
import {systemd} from '../src/lib/tools/systemd/logic.ts';
import {unicode} from '../src/lib/tools/unicode/logic.ts';
import {html} from '../src/lib/tools/html/logic.ts';
import {jwt} from '../src/lib/tools/jwt/logic.ts';
import {escapeCode} from '../src/lib/tools/escape/logic.ts';
import {pattern,matchRegex} from '../src/lib/tools/regex/logic.ts';
import {keyState} from '../src/lib/tools/keyboard/logic.ts';
import {calendarDays,validateEvent} from '../src/lib/tools/calendar/logic.ts';
import {timerValue} from '../src/lib/tools/timer/logic.ts';
import {zoned} from '../src/lib/tools/clock/logic.ts';
import {shuttlePlan,shuttleAt} from '../src/lib/tools/shuttle/logic.ts';
import {changeScore} from '../src/lib/tools/score/logic.ts';
import {url} from '../src/lib/tools/url/logic.ts';

test('encoding uses real Shift_JIS bytes, rejects unrepresentable text and offers reversible candidates',()=>{
 assert.deepEqual([...encode('日本語','SJIS')],[0x93,0xfa,0x96,0x7b,0x8c,0xea]);
 assert.equal(decode([0x93,0xfa],'SJIS'),'日');
 assert.throws(()=>encode('😀','SJIS'));
 const broken=garble('日本','UTF8','SJIS');
 assert.notEqual(broken,'日本');
 assert.ok(recover(broken).some(c=>c.text==='日本'));
 assert.deepEqual(recover('隱�'),[]);
 assert.throws(()=>decode([0xff],'UTF8'));
});
test('BMI is numeric and never applies adult thresholds to growing users',()=>{
 assert.equal(bmi(200,80,false).value,20);
 assert.match(bmi(160,50,true).note,/成人.*適用しません/);
 assert.throws(()=>bmi(0,60,false));
});
test('deviation and population/sample statistics handle zero variance',()=>{
 assert.equal(deviation(80,60,10),70);
 assert.deepEqual(statistics('1, 2\n3',false),{count:3,mean:2,sd:Math.sqrt(2/3)});
 assert.equal(statistics('1 2 3',true).sd,1);
 assert.throws(()=>deviation(60,60,0));
 assert.throws(()=>statistics('1 bad 2',false));
});
test('QR includes finder patterns, quiet zone, Unicode and bounded dimensions',()=>{
 const m=qrMatrix('日本語','H');assert.ok(m.length>=21);assert.equal(m[0][0],true);assert.equal(m[1][1],false);
 const svg=qrSvg(m,300);assert.match(svg,/viewBox="0 0 33 33"/);assert.ok(!svg.includes('日本語'));
 assert.throws(()=>qrSvg(m,10));assert.throws(()=>qrMatrix('','M'));
});
test('notes validate imports and search title and content without interpreting HTML',()=>{
 const notes=importNotes(JSON.stringify({version:1,notes:[{title:'猫',body:'<script>x</script>'}]}));
 assert.equal(searchNotes(notes,'SCRIPT').length,1);assert.equal(notes[0].body,'<script>x</script>');
 assert.throws(()=>importNotes('{"version":2,"notes":[]}'));
 assert.throws(()=>importNotes('{"version":1,"notes":[{"title":4}]}'));
});
test('GPS geodesic distance, units and accuracy/speed gates',()=>{
 assert.ok(Math.abs(distance({lat:0,lon:0},{lat:0,lon:1})-111195)<10);
 assert.equal(speed(10,'km/h'),36);assert.equal(speed(10,'m/s'),10);
 assert.equal(acceptFix({lat:35,lon:139,accuracy:100,time:1000}),false);
 assert.equal(acceptFix({lat:35,lon:139,accuracy:5,time:1000}),true);
 assert.equal(acceptFix({lat:35,lon:140,accuracy:5,time:2000},{lat:35,lon:139,accuracy:5,time:1000}),false);
});
test('chmod includes special bits and validates octal',()=>{
 assert.equal(permissions('4755'),'rwsr-xr-x');assert.equal(permissions('0644'),'rw-r--r--');assert.equal(octal([true,true,true,true,false,true,true,false,true],0),'755');assert.throws(()=>permissions('888'));
});
test('cron builds validated five-field expressions, explains ranges and rejects injection',()=>{
 assert.equal(cron(['*/15','9-17','*','*','1-5']),'*/15 9-17 * * 1-5');
 assert.match(explainCron('0 9 * * 1-5'),/月曜日.*金曜日/);
 assert.throws(()=>explainCron('60 * * * *'));assert.throws(()=>cron(['*','*','*','*','*\nrm -rf /']));
});
test('POSIX quoting treats every string as one literal argument',()=>{
 assert.equal(shellQuote("a'b $HOME"),"'a'\"'\"'b $HOME'");assert.equal(shellQuote(''),"''");assert.throws(()=>shellQuote('\0'));
});
test('systemd quotes ExecStart arguments and rejects directive injection',()=>{
 const s=systemd('Demo','/usr/bin/node',['/opt/app.js','a b'],'app','on-failure');
 assert.match(s,/ExecStart="\/usr\/bin\/node" "\/opt\/app.js" "a b"/);
 assert.throws(()=>systemd('x\nExecStart=bad','/bin/a',[],'app','always'));
 assert.throws(()=>systemd('x','relative',[],'root','always'));
});
test('Unicode describes codepoints not just UTF-16 units',()=>{
 const c=unicode('A😀');assert.equal(c.length,2);assert.equal(c[1].code,'U+1F600');assert.equal(c[1].utf16,'D83D DE00');assert.equal(c[1].utf8,'F0 9F 98 80');
});
test('HTML entities round trip without executing markup',()=>{
 assert.equal(html('<a "&\'>',false),'&lt;a &quot;&amp;&#39;&gt;');
 assert.equal(html('&#x1F600; &amp; &copy;',true),'😀 & ©');assert.throws(()=>html('&#x110000;',true));
});
test('JWT only decodes untrusted content and rejects malformed tokens',()=>{
 const h=btoa('{"alg":"none"}').replace(/=+$/,''),p=btoa('{"sub":"123","exp":0}').replace(/=+$/,'');
 assert.equal(jwt(`${h}.${p}.`).payload.sub,'123');assert.equal(jwt(`${h}.${p}.`).verified,false);
 assert.throws(()=>jwt('not.a.jwt'));assert.throws(()=>jwt('a.b.c.d'));
});
test('code escape handles JSON and JavaScript Unicode without eval',()=>{
 assert.equal(escapeCode('猫\n"','json',false),'"猫\\n\\\""');
 assert.equal(escapeCode('"a\\n"','json',true),'a\n');
 assert.equal(escapeCode('😀','unicode',false),'\\u{1f600}');assert.equal(escapeCode('\\u{1f600}','unicode',true),'😀');
 assert.throws(()=>escapeCode('process.exit()','json',true));
});
test('regex builder escapes literals and bounded matcher handles zero-width results',()=>{
 assert.equal(pattern('a.b','literal','+',true),'^(?:a\\.b)+$');
 assert.equal(matchRegex('a+','g','aa b a').matches.length,2);
 assert.equal(matchRegex('(?=a)','g','aa').matches.length,2);assert.throws(()=>matchRegex('a','gg','a'));assert.throws(()=>matchRegex('a'.repeat(2001),'',''));
});
test('keyboard tracks physical key codes and ignores repeat duplication',()=>{
 assert.deepEqual(keyState(['KeyA'],'KeyA',true),['KeyA']);assert.deepEqual(keyState(['KeyA'],'KeyA',false),[]);
});
test('calendar covers month grid, leap days and validates local event ranges',()=>{
 const days=calendarDays('2024-02-15','month');assert.equal(days.length,42);assert.ok(days.includes('2024-02-29'));
 assert.equal(calendarDays('2024-02-15','week').length,7);
 assert.equal(validateEvent({id:'a',title:'予定',start:'2024-02-29T10:00',end:'2024-02-29T11:00'}).title,'予定');
 assert.throws(()=>validateEvent({id:'a',title:'x',start:'2024-02-30T10:00',end:'2024-02-30T11:00'}));
});
test('timers derive from deadlines, not number of ticks',()=>{
 assert.equal(timerValue({kind:'countdown',duration:60000,accumulated:0,startedAt:1000},51000),10000);
 assert.equal(timerValue({kind:'countdown',duration:60000,accumulated:0,startedAt:1000},71000),0);
 assert.equal(timerValue({kind:'stopwatch',duration:0,accumulated:500,startedAt:null},999999),500);
});
test('world clock uses IANA zones and stable supplied instants',()=>{
 assert.equal(zoned(0,'Asia/Tokyo').hour,9);assert.equal(zoned(0,'UTC').hour,0);assert.throws(()=>zoned(0,'Not/AZone'));
});
test('shuttle schedule uses sourced 20m pace, handles boundaries and ends',()=>{
 const plan=shuttlePlan();assert.equal(plan[0].speed,8.5);assert.ok(Math.abs(plan[0].at-20/(8.5/3.6)*1000)<0.001);
 assert.equal(shuttleAt(plan,0).completed,0);assert.equal(shuttleAt(plan,plan[0].at).completed,1);assert.equal(shuttleAt(plan,Infinity).finished,true);
});
test('scoreboard adds/subtracts safely with immutable snapshots for undo',()=>{
 const before=[{name:'A',score:0},{name:'B',score:2}];const after=changeScore(before,0,-1);assert.equal(after[0].score,-1);assert.equal(before[0].score,0);assert.throws(()=>changeScore(before,4,1));
});
test('URL distinguishes full URI, component and form rules without changing default',()=>{
 assert.equal(url('https://a.test/a b?q=猫',false,'full'),'https://a.test/a%20b?q=%E7%8C%AB');
 assert.equal(url('a+b c',false,'form'),'a%2Bb+c');assert.equal(url('a%2Bb+c',true,'form'),'a+b c');assert.equal(url('%3F',true,'full'),'%3F');
});
