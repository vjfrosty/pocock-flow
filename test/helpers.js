import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const SKILLS_DIR = join(ROOT, 'skills');

export const readJson = (rel) => JSON.parse(readFileSync(join(ROOT, rel), 'utf8'));

export const LIGHT = ['mp-grill', 'mp-grill-me', 'mp-arch', 'mp-retro', 'mp-handoff', 'mp-what'];
export const HEAVY = ['mp-spec', 'mp-tickets', 'mp-implement', 'mp-implement-spec', 'mp-wayfinder', 'mp-triage'];
export const ROUTER = 'mp';

/** Parse a SKILL.md into { frontmatter, body, raw }. Supports `key: value` and `key: "quoted"` lines. */
export function parseSkill(name) {
  const raw = readFileSync(join(SKILLS_DIR, name, 'SKILL.md'), 'utf8').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { frontmatter: null, body: raw, raw };
  const frontmatter = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith('"') && v.endsWith('"')) v = JSON.parse(v);
    frontmatter[kv[1]] = v;
  }
  return { frontmatter, body: m[2], raw };
}

export const skillNames = () =>
  readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

/** Upstream path an alias points at, e.g. "engineering/to-spec", taken from its Glob line. */
export function upstreamPath(body) {
  const m = body.match(/mattpocock-skills\/\*\/skills\/([\w-]+\/[\w-]+)\/SKILL\.md/);
  return m ? m[1] : null;
}

const semverKey = (v) => v.split('.').map((n) => n.padStart(6, '0')).join('.');

/**
 * Where Matt's upstream skills live, in priority order:
 * 1. $UPSTREAM_DIR (CI clones mattpocock/skills there)
 * 2. the highest installed version under ~/.claude/plugins/cache/<any marketplace>/mattpocock-skills/
 * Returns the path of its `skills/` folder, or null.
 */
export function findUpstream() {
  if (process.env.UPSTREAM_DIR) {
    const p = join(process.env.UPSTREAM_DIR, 'skills');
    return existsSync(p) ? p : null;
  }
  const cache = join(homedir(), '.claude', 'plugins', 'cache');
  if (!existsSync(cache)) return null;
  const found = [];
  for (const mk of readdirSync(cache)) {
    const base = join(cache, mk, 'mattpocock-skills');
    if (!existsSync(base)) continue;
    for (const v of readdirSync(base)) {
      if (existsSync(join(base, v, 'skills'))) found.push({ v, p: join(base, v, 'skills') });
    }
  }
  found.sort((a, b) => semverKey(b.v).localeCompare(semverKey(a.v)));
  return found[0]?.p ?? null;
}
