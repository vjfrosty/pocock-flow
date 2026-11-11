import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readJson } from './helpers.js';

const plugin = readJson('.claude-plugin/plugin.json');
const market = readJson('.claude-plugin/marketplace.json');

test('plugin.json has name, semver version, description', () => {
  assert.equal(plugin.name, 'pocock-flow');
  assert.match(plugin.version, /^\d+\.\d+\.\d+$/);
  assert.ok(plugin.description?.length > 10);
});

test('marketplace has a name, owner and description', () => {
  assert.equal(market.name, 'pocock-flow');
  assert.ok(market.owner?.name);
  assert.ok(market.description, 'marketplace description missing');
});

test('marketplace lists this plugin from ./', () => {
  const self = market.plugins.find((p) => p.name === plugin.name);
  assert.ok(self, 'pocock-flow missing from marketplace');
  assert.equal(self.source, './');
});

test('marketplace lists upstream mattpocock-skills from GitHub', () => {
  const up = market.plugins.find((p) => p.name === 'mattpocock-skills');
  assert.ok(up, 'mattpocock-skills missing from marketplace');
  assert.deepEqual(up.source, { source: 'github', repo: 'mattpocock/skills' });
});

test('marketplace plugin names are unique', () => {
  const names = market.plugins.map((p) => p.name);
  assert.equal(new Set(names).size, names.length);
});
