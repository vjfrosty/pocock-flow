---
name: mp-implement-spec
description: "Matt Pocock's /implement-spec. Use when the user wants a whole spec built in one run with parallel subagents."
---

# /mp-implement-spec → Matt's /implement-spec

1. Say in one line: "Starting `/mp-implement-spec` (Matt's `/implement-spec`)."
2. Glob `~/.claude/plugins/cache/mattpocock/mattpocock-skills/*/skills/engineering/implement-spec/SKILL.md` and Read the match with the highest version.
3. Follow that file exactly, as if the user had typed `/implement-spec`. Relative links in it resolve from its folder.
4. Heavy skill: if the user did not type it, propose it in one line ("Next: `/mp-implement-spec` — <why>. Start?") and wait for yes. Even once started, ask before publishing issues, labelling, committing or pushing unless the user typed the command.
