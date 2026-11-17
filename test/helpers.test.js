import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { findUpstream } from './helpers.js';

test('a wrong UPSTREAM_DIR fails instead of skipping the upstream checks', () => {
  const saved = process.env.UPSTREAM_DIR;
  process.env.UPSTREAM_DIR = mkdtempSync(join(tmpdir(), 'pocock-flow-'));
  try {
    assert.throws(findUpstream, /UPSTREAM_DIR/);
  } finally {
    if (saved === undefined) delete process.env.UPSTREAM_DIR;
    else process.env.UPSTREAM_DIR = saved;
  }
});
