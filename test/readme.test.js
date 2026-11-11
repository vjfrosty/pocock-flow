import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, LIGHT, HEAVY, ROUTER, parseSkill, upstreamPath } from './helpers.js';

const readme = readFileSync(join(ROOT, 'README.md'), 'utf8').replace(/\r\n/g, '\n');
const rows = Object.fromEntries(
  [...readme.matchAll(/^\| `\/([\w-]+)` \| (.+?) \| (.+?) \|$/gm)].map((m) => [m[1], { runs: m[2], tier: m[3] }]),
);

test('README table has a row for every skill', () => {
  for (const n of [ROUTER, ...LIGHT, ...HEAVY]) assert.ok(rows[n], `README missing /${n}`);
});

test('README tiers match the skill files', () => {
  for (const n of LIGHT) assert.equal(rows[n].tier, 'light', n);
  for (const n of HEAVY) assert.equal(rows[n].tier, 'heavy', n);
});

test('README upstream column matches each alias glob', () => {
  for (const n of [...LIGHT, ...HEAVY]) {
    const orig = upstreamPath(parseSkill(n).body).split('/')[1];
    assert.equal(rows[n].runs, `\`/${orig}\``, n);
  }
});

test('README install commands use this marketplace', () => {
  assert.match(readme, /claude plugin marketplace add vjfrosty\/pocock-flow/);
  assert.match(readme, /claude plugin install pocock-flow@pocock-flow/);
});
