import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { LIGHT, HEAVY, parseSkill, upstreamPath, findUpstream } from './helpers.js';

// Catches Matt renaming or moving a skill. Locally it uses your installed plugin;
// CI clones mattpocock/skills and sets UPSTREAM_DIR.
const upstream = findUpstream();
const skip = upstream ? false : 'upstream skills not found: install mattpocock-skills or set UPSTREAM_DIR';

// Upstream user-invoked skills we deliberately do not alias.
const EXCLUDED = new Set([
  'engineering/setup-matt-pocock-skills', // one-time, user should type it
  'engineering/ask-matt', // wrapped by the /mp router instead
  'productivity/teach',
  'productivity/to-questionnaire',
]);

for (const name of [...LIGHT, ...HEAVY]) {
  test(`${name}: upstream SKILL.md exists`, { skip }, () => {
    const rel = upstreamPath(parseSkill(name).body);
    assert.ok(existsSync(join(upstream, rel, 'SKILL.md')), `missing upstream ${rel} in ${upstream}`);
  });
}

test('router target ask-matt exists upstream', { skip }, () => {
  assert.ok(existsSync(join(upstream, 'engineering', 'ask-matt', 'SKILL.md')));
});

test('every upstream user-invoked skill is aliased or deliberately excluded', { skip }, () => {
  const covered = new Set([...LIGHT, ...HEAVY].map((n) => upstreamPath(parseSkill(n).body)));
  const userInvoked = [];
  for (const area of ['engineering', 'productivity']) {
    const dir = join(upstream, area);
    assert.ok(existsSync(dir), `upstream has no ${area}/ folder: it was moved, so this check would cover nothing`);
    for (const skill of readdirSync(dir)) {
      const file = join(dir, skill, 'SKILL.md');
      if (!existsSync(file)) continue;
      if (/^disable-model-invocation:\s*true/m.test(readFileSync(file, 'utf8'))) userInvoked.push(`${area}/${skill}`);
    }
  }
  assert.ok(userInvoked.length > 0, 'no user-invoked skill found upstream: the disable-model-invocation marker changed');
  assert.deepEqual(
    userInvoked.filter((rel) => !covered.has(rel) && !EXCLUDED.has(rel)),
    [],
    'new upstream user-invoked skills need an alias or an EXCLUDED entry',
  );
});
