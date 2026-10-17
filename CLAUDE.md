<!-- BEGIN WEB-XP: managed block. Edit outside this block. Changes inside may be replaced by Web XP commands. -->

# Web XP Project Contract

Read this file first on every task.

<!-- web-xp-version: 02be06a -->

## On every session

If the task involves JS, HTML, or CSS, read `code-guidelines.md` and `code-philosophy.md` from your Web XP install before writing or reviewing code.

Apply the standard to the new code you write for the user's request. Do not refactor unrelated existing code unless the user asks. If you notice pre-existing Web XP violations outside the requested scope, ask whether to fix them now, list them, or leave them.

## Editorial Rules (ER)

`editorial-rules.md` in your Web XP install is the prose styleguide. Read it on demand and apply it to covered prose (its Scope lists what counts), including prose you draft for the user to use (e.g. "you can explain the code like this: …").

## Before every commit

1. Run `bash ~/.web-xp/bin/pre-commit-check.sh` — catches mechanical violations.
2. Review the diff against Patterns and Fail-Safe in `code-guidelines.md` from your Web XP install.
3. Verify covered prose in the diff against the ER.

## Claude Code

Use `/web-xp` to load the standards. Use `/web-xp-check` to audit the diff. Use `/web-xp-review` to review any code and, when explicitly asked or approved, apply fixes.

<!-- END WEB-XP -->

# garrettsmith.co

## Writing and editing article prose

Follow the editorial rules in `writing-style.md` (repo root) when drafting or editing any prose for the articles. It is the source of truth for voice, punctuation, and sourcing. Read it before writing.

@writing-style.md

## Before committing article prose

Run a reading pass over the article prose you drafted or edited — judgment, not a script. Read `git diff` and check every passage you wrote or changed against `writing-style.md`. Start with the topic-sentence skim (read only the first sentence of each changed paragraph, in order, and confirm the claim is there), then check for colons or semicolons you introduced, truthiness qualifiers, empty "X, not Y" contrasts, metaphor where a literal verb works, vague wording where a specific word fits, and any study claim not scoped to what the paper did. Fix your prose, then commit.

Scope it to prose you authored. Leave Garrett's own text alone — do not touch his colons, semicolons, or wording, even in the same diff. The pass enforces how you write, not how he writes.
