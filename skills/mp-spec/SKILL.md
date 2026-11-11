---
name: mp-spec
description: "Matt Pocock's /to-spec. Use after grilling, when the idea is clear and the build spans more than one session: publish a spec to the issue tracker."
---

# /mp-spec → Matt's /to-spec

1. Say in one line: "Starting `/mp-spec` (Matt's `/to-spec`)."
2. Glob `~/.claude/plugins/cache/mattpocock/mattpocock-skills/*/skills/engineering/to-spec/SKILL.md` and Read the match with the highest version.
3. Follow that file exactly, as if the user had typed `/to-spec`. Relative links in it resolve from its folder.
4. Heavy skill: if the user did not type it, propose it in one line ("Next: `/mp-spec` — <why>. Start?") and wait for yes. Even once started, ask before publishing issues, labelling, committing or pushing unless the user typed the command.
