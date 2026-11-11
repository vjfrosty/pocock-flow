---
name: mp
description: "Matt Pocock skills router. Use when the user says to use Pocock, Matt or the skills on a task, or asks what to do next on the project: read the project state, recommend the next skill, and start it."
---

# /mp — pick the next Pocock step

1. Glob `~/.claude/plugins/cache/mattpocock/mattpocock-skills/*/skills/engineering/ask-matt/SKILL.md`, Read the highest version: it is the flow map. Read a target skill's SKILL.md before describing it.
2. Check the project state (quietly, in parallel):
   - `docs/agents/` exists? If not, the first step is `/setup-matt-pocock-skills` (user must type it).
   - `GLOSSARY.md`, `docs/adr/` — has grilling happened?
   - `gh issue list --limit 20` — open specs/tickets, labels like `ready-for-agent`, `needs-triage`.
   - `git status`, current branch — work in progress?
3. Reply in at most 5 lines: where the task sits on the main flow, the recommended next skill (an `/mp-*` alias), and one line of why. Mention one alternative only if it is a close call.
4. Start it: light skills (`mp-grill`, `mp-grill-me`, `mp-arch`, `mp-retro`, `mp-handoff`, `mp-what`) start right away; heavy ones (`mp-spec`, `mp-tickets`, `mp-implement`, `mp-implement-spec`, `mp-wayfinder`, `mp-triage`) wait for the user's yes.
5. Context hygiene: keep grill → spec → tickets in one session. Before `mp-implement` on a ticket from an earlier session, recommend `/clear` first. Never chain two heavy skills without the user's yes in between.
