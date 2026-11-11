# pocock-flow

Short aliases and a router for [Matt Pocock's skills](https://github.com/mattpocock/skills). Claude can start them when a task fits:

- **Light** skills (local, reversible) start on their own.
- **Heavy** skills (publish issues, build, commit) are proposed first and wait for your yes.

The aliases read Matt's current SKILL.md files, so his updates still apply.

## Install

Requires Matt's plugin:

```bash
claude plugin marketplace add mattpocock/skills
claude plugin install mattpocock-skills@mattpocock
claude plugin marketplace add <path-or-github-repo-of-pocock-flow>
claude plugin install pocock-flow@pocock-flow
```

Per-project only: disable both at user level (`claude plugin disable ...`) and enable them in the project's `.claude/settings.local.json`:

```json
{ "enabledPlugins": { "mattpocock-skills@mattpocock": true, "pocock-flow@pocock-flow": true } }
```

Then run `/setup-matt-pocock-skills` once per repo.

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
