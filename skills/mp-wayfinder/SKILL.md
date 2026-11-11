---
name: mp-wayfinder
description: "Matt Pocock's /wayfinder. Use only for a huge, foggy effort too big for one session (greenfield or a big feature). Never for a well-scoped feature."
---

# /mp-wayfinder → Matt's /wayfinder

1. Say in one line: "Starting `/mp-wayfinder` (Matt's `/wayfinder`)."
2. Glob `~/.claude/plugins/cache/mattpocock/mattpocock-skills/*/skills/engineering/wayfinder/SKILL.md` and Read the match with the highest version.
3. Follow that file exactly, as if the user had typed `/wayfinder`. Relative links in it resolve from its folder.
4. Heavy skill: if the user did not type it, propose it in one line ("Next: `/mp-wayfinder` — <why>. Start?") and wait for yes. Even once started, ask before publishing issues, labelling, committing or pushing unless the user typed the command.
