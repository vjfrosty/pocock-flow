import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, LIGHT, HEAVY, ROUTER, parseSkill, skillNames, upstreamPath } from './helpers.js';

const names = skillNames();
const aliases = [...LIGHT, ...HEAVY];

test('skill set is exactly router + light + heavy (no stray or missing skills)', () => {
  assert.deepEqual(names, [ROUTER, ...aliases].sort());
});

test('light and heavy lists do not overlap', () => {
  assert.deepEqual(LIGHT.filter((n) => HEAVY.includes(n)), []);
});

for (const name of names) {
  test(`${name}: frontmatter name matches folder, description is valid`, () => {
    const { frontmatter } = parseSkill(name);
    assert.ok(frontmatter, 'missing --- frontmatter ---');
    assert.equal(frontmatter.name, name);
    assert.ok(frontmatter.description, 'missing description');
    assert.ok(frontmatter.description.length <= 1024, 'description over 1024 chars');
    assert.match(frontmatter.description, /\bUse (when|after|only|at)\b/, 'description must say when to use it');
  });

  test(`${name}: does not disable model invocation (auto-start is the point)`, () => {
    assert.equal(parseSkill(name).frontmatter['disable-model-invocation'], undefined);
  });

  test(`${name}: uses LF line endings`, () => {
    assert.ok(!readFileSync(join(ROOT, 'skills', name, 'SKILL.md'), 'utf8').includes('\r\n'));
  });
}

for (const name of aliases) {
  test(`${name}: points at an upstream skill via a version-agnostic glob`, () => {
    const { body } = parseSkill(name);
    assert.ok(upstreamPath(body), 'no upstream Glob line found');
    assert.match(
      body,
      /~\/\.claude\/plugins\/cache\/\*\/mattpocock-skills\/\*\/skills\//,
      'glob must not pin the marketplace or version',
    );
  });

  test(`${name}: heading, description and follow line name the same upstream skill as the glob`, () => {
    const { frontmatter, body } = parseSkill(name);
    const orig = upstreamPath(body).split('/')[1];
    assert.ok(frontmatter.description.startsWith(`Matt Pocock's /${orig}.`), 'description must start with the upstream name');
    assert.ok(body.includes(`# /${name} → Matt's /${orig}`), 'heading mismatch');
    assert.ok(body.includes(`as if the user had typed \`/${orig}\``), 'follow line names the wrong skill');
  });
}

test('aliases point at distinct upstream skills', () => {
  const ups = aliases.map((n) => upstreamPath(parseSkill(n).body));
  assert.equal(new Set(ups).size, ups.length);
});

for (const name of HEAVY) {
  test(`${name}: heavy rule asks before starting and before outward actions`, () => {
    const { body } = parseSkill(name);
    assert.match(body, /Heavy skill/);
    assert.match(body, /wait for yes/);
    assert.match(body, /publishing issues, labelling, committing or pushing/);
    assert.ok(body.includes(`Next: \`/${name}\``), 'proposal line names the wrong alias');
  });
}

for (const name of LIGHT) {
  test(`${name}: light rule, and no heavy wording`, () => {
    const { body } = parseSkill(name);
    assert.match(body, /Light skill/);
    assert.doesNotMatch(body, /Heavy skill/);
  });
}

test('router: lists every light and heavy alias in the right group', () => {
  const { body } = parseSkill(ROUTER);
  const line = body.split('\n').find((l) => l.includes('light skills') && l.includes('heavy ones'));
  assert.ok(line, 'router start-rule line not found');
  const [lightPart, heavyPart] = line.split('heavy ones');
  for (const n of LIGHT) assert.ok(lightPart.includes(`\`${n}\``), `${n} missing from router light list`);
  for (const n of HEAVY) assert.ok(heavyPart.includes(`\`${n}\``), `${n} missing from router heavy list`);
});

test('router: only references aliases that exist', () => {
  const refs = [...parseSkill(ROUTER).body.matchAll(/`\/?(mp-[\w-]+)`/g)].map((m) => m[1]);
  assert.ok(refs.length > 0);
  for (const r of refs) assert.ok(names.includes(r), `router references unknown alias ${r}`);
});

test('router: enforces setup check and context hygiene', () => {
  const { body } = parseSkill(ROUTER);
  assert.match(body, /setup-matt-pocock-skills/);
  assert.match(body, /\/clear/);
  assert.match(body, /Never chain two heavy skills/);
});
