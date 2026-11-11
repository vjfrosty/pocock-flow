---
name: mp-implement
description: "Matt Pocock's /implement. Use when the user wants a specific ticket, issue or agreed small change built (TDD, review, commit)."
---

# /mp-implement → Matt's /implement

1. Say in one line: "Starting `/mp-implement` (Matt's `/implement`)."
2. Glob `~/.claude/plugins/cache/*/mattpocock-skills/*/skills/engineering/implement/SKILL.md` and Read the match with the highest version.
3. Follow that file exactly, as if the user had typed `/implement`. Relative links in it resolve from its folder.
4. Heavy skill: if the user did not type it, propose it in one line ("Next: `/mp-implement` — <why>. Start?") and wait for yes. Even once started, ask before publishing issues, labelling, committing or pushing unless the user typed the command.
