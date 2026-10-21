import { test } from 'node:test';
import assert from 'node:assert/strict';
import { count } from '../src/lib/tools/counter/logic.ts';
import { diff } from '../src/lib/tools/diff/logic.ts';
import { replaceAll } from '../src/lib/tools/replace/logic.ts';
import { formatJson } from '../src/lib/tools/json/logic.ts';
import { base64 } from '../src/lib/tools/base64/logic.ts';
import { url } from '../src/lib/tools/url/logic.ts';
import { uuids } from '../src/lib/tools/uuid/logic.ts';
import { hash } from '../src/lib/tools/hash/logic.ts';
import { timestamp } from '../src/lib/tools/timestamp/logic.ts';
import { radix } from '../src/lib/tools/radix/logic.ts';
import { convert } from '../src/lib/tools/units/logic.ts';
import { color } from '../src/lib/tools/color/logic.ts';
import { dimensions } from '../src/lib/tools/image/logic.ts';
import { randomIntegers } from '../src/lib/tools/random/logic.ts';
import { step } from '../src/lib/tools/life/logic.ts';

test('counter counts graphemes, CRLF lines, words and UTF-8 bytes', () => {
 assert.deepEqual(count('A👨‍👩‍👧‍👦\r\n猫'), { characters: 4, noSpaces: 3, lines: 2, words: 2, bytes: 31 });
 assert.equal(count('').lines, 0);
});
test('diff detects inserted and deleted lines, and rejects expensive matrices', () => {
 assert.deepEqual(diff('a\nb', 'a\nc'), [{ kind:'same', text:'a' }, { kind:'remove', text:'b' }, { kind:'add', text:'c' }]);
 assert.throws(() => diff('a\n'.repeat(1500), 'b\n'.repeat(1500)));
});
test('replacement is literal, including dollar expressions, and forbids empty search', () => {
 assert.equal(replaceAll('aaa $&', 'a', '$&'), '$&$&$& $&');
 assert.throws(() => replaceAll('abc', '', 'x'));
});
test('JSON formatting validates syntax and preserves structure', () => {
 assert.equal(formatJson('{"a":[1,true]}', 2), '{\n  "a": [\n    1,\n    true\n  ]\n}');
 assert.throws(() => formatJson('{a:1}', 2));
});
test('Base64 handles UTF-8 and rejects malformed input', () => {
 assert.equal(base64('日本語', false), '5pel5pys6Kqe');
 assert.equal(base64('5pel5pys6Kqe', true), '日本語');
 assert.throws(() => base64('%%%!', true));
 assert.throws(() => base64('/w==', true));
});
test('URL uses component encoding and reports invalid percent sequences', () => {
 assert.equal(url('a b/?猫', false), 'a%20b%2F%3F%E7%8C%AB');
 assert.equal(url('a%20b', true), 'a b');
 assert.throws(() => url('%xx', true));
});
test('UUID produces requested unique RFC 4122 v4 identifiers with a cap', () => {
 const result = uuids(10);
 assert.equal(new Set(result).size, 10);
 assert.ok(result.every(x => /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/.test(x)));
 assert.throws(() => uuids(10001));
});
test('SHA-256 matches published abc vector', async () => {
 assert.equal(await hash('abc', 'SHA-256'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
});
test('timestamp handles seconds, milliseconds and explicit timezone dates', () => {
 assert.equal(timestamp('0', 'seconds').iso, '1970-01-01T00:00:00.000Z');
 assert.equal(timestamp('1000', 'milliseconds').seconds, 1);
 assert.equal(timestamp('2024-01-01T00:00:00Z', 'date').seconds, 1704067200);
 assert.throws(() => timestamp('no date', 'date'));
 assert.throws(() => timestamp('1.2abc', 'seconds'));
});
test('radix preserves integers beyond Number.MAX_SAFE_INTEGER and validates digits', () => {
 assert.equal(radix('FFFFFFFFFFFFFFFF', 16, 10), '18446744073709551615');
 assert.equal(radix('-101', 2, 10), '-5');
 assert.throws(() => radix('102', 2, 10));
});
test('units handle linear units and absolute temperatures with bounds', () => {
 assert.equal(convert(1, 'km', 'm'), 1000);
 assert.equal(convert(32, '°F', '°C'), 0);
 assert.equal(convert(0, '°C', 'K'), 273.15);
 assert.throws(() => convert(-274, '°C', 'K'));
 assert.throws(() => convert(1, 'kg', 'm'));
});
test('color converts HEX, RGB and HSL without silently clamping invalid values', () => {
 assert.deepEqual(color('#f00'), { hex:'#FF0000', rgb:'rgb(255, 0, 0)', hsl:'hsl(0, 100%, 50%)', channels:[255,0,0] });
 assert.equal(color('rgb(0, 128, 255)').hex, '#0080FF');
 assert.equal(color('hsl(120, 100%, 50%)').hex, '#00FF00');
 assert.throws(() => color('rgb(256, 0, 0)'));
});
test('image dimensions preserve ratio and reject excessive decoded pixels', () => {
 assert.deepEqual(dimensions(1200, 800, 600), { width:600, height:400 });
 assert.throws(() => dimensions(20000, 20000, 600));
 assert.throws(() => dimensions(1200, 800, 0));
});
test('random integers respect inclusive negative bounds and reject invalid ranges', () => {
 const values = randomIntegers(-2, 2, 200);
 assert.ok(values.every(x => Number.isInteger(x) && x >= -2 && x <= 2));
 assert.equal(randomIntegers(7, 7, 1)[0], 7);
 assert.throws(() => randomIntegers(2, 1, 1));
 assert.throws(() => randomIntegers(0, 1, 10001));
});
test('Life blinker oscillates with fixed dead boundaries', () => {
 const board = [0,0,0, 1,1,1, 0,0,0];
 const next = step(board, 3, 3);
 assert.deepEqual(next, [0,1,0, 0,1,0, 0,1,0]);
 assert.deepEqual(step(next, 3, 3), board);
});
