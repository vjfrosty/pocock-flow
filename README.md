# pocock-flow

Short aliases and a router for [Matt Pocock's skills](https://github.com/mattpocock/skills). Claude can start them when a task fits:

- **Light** skills (local, reversible) start on their own.
- **Heavy** skills (publish issues, build, commit) are proposed first and wait for your yes.

The aliases read Matt's current SKILL.md files, so his updates still apply.

## Install

One marketplace gives you both this plugin and Matt's upstream skills:

```bash
claude plugin marketplace add vjfrosty/pocock-flow
claude plugin install mattpocock-skills@pocock-flow
claude plugin install pocock-flow@pocock-flow
```

Already have Matt's plugin from `mattpocock/skills`? Skip the second line; the aliases find his skills from either marketplace.

**Per-project only:** disable both at user level, then enable them in the project's `.claude/settings.local.json`:

```bash
claude plugin disable pocock-flow@pocock-flow
claude plugin disable mattpocock-skills@pocock-flow
```

```json
{ "enabledPlugins": { "mattpocock-skills@pocock-flow": true, "pocock-flow@pocock-flow": true } }
```

Restart Claude Code, then run `/setup-matt-pocock-skills` once per repo.

## Skills

| Alias | Matt's skill | Auto-start |
| --- | --- | --- |
| `/mp` | router over `/ask-matt` | yes: reads project state, recommends next step |
| `/mp-grill` | `/grill-with-docs` | light |
| `/mp-grill-me` | `/grill-me` | light |
| `/mp-spec` | `/to-spec` | heavy |
| `/mp-tickets` | `/to-tickets` | heavy |
| `/mp-implement` | `/implement` | heavy |
| `/mp-implement-spec` | `/implement-spec` | heavy |
| `/mp-wayfinder` | `/wayfinder` | heavy |
| `/mp-triage` | `/triage` | heavy |
| `/mp-arch` | `/improve-codebase-architecture` | light |
| `/mp-retro` | `/retro` | light |
| `/mp-handoff` | `/handoff` | light |
| `/mp-what` | `/wait-what` | light |

Usage: "use Pocock for this: <task>" — `/mp` picks the step.

## Credits

All workflow content is [Matt Pocock's skills](https://github.com/mattpocock/skills) (MIT). This plugin only adds aliases, a router and auto-start rules on top.

## Tests

```bash
npm test
```

Zero dependencies (Node 20+, `node:test`). Checks manifests, skill frontmatter, light/heavy rules, router coverage, README sync, and that every alias still points at an existing upstream skill. Locally the upstream check uses your installed `mattpocock-skills`; CI clones `mattpocock/skills` and runs weekly to catch upstream renames.
