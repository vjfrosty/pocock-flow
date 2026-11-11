---
name: mp-triage
description: "Matt Pocock's /triage. Use when incoming bugs or requests (not tickets we wrote) need triaging into agent-ready issues."
---

# /mp-triage → Matt's /triage

1. Say in one line: "Starting `/mp-triage` (Matt's `/triage`)."
2. Glob `~/.claude/plugins/cache/*/mattpocock-skills/*/skills/engineering/triage/SKILL.md` and Read the match with the highest version.
3. Follow that file exactly, as if the user had typed `/triage`. Relative links in it resolve from its folder.
4. Heavy skill: if the user did not type it, propose it in one line ("Next: `/mp-triage` — <why>. Start?") and wait for yes. Even once started, ask before publishing issues, labelling, committing or pushing unless the user typed the command.
