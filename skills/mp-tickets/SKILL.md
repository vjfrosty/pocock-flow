---
name: mp-tickets
description: "Matt Pocock's /to-tickets. Use when a spec or plan exists and needs splitting into tracer-bullet tickets with blocking edges."
---

# /mp-tickets → Matt's /to-tickets

1. Say in one line: "Starting `/mp-tickets` (Matt's `/to-tickets`)."
2. Glob `~/.claude/plugins/cache/*/mattpocock-skills/*/skills/engineering/to-tickets/SKILL.md` and Read the match with the highest version.
3. Follow that file exactly, as if the user had typed `/to-tickets`. Relative links in it resolve from its folder.
4. Heavy skill: if the user did not type it, propose it in one line ("Next: `/mp-tickets` — <why>. Start?") and wait for yes. Even once started, ask before publishing issues, labelling, committing or pushing unless the user typed the command.
