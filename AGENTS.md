# Tech Details

- The project uses `uv` package manager. Always run commands as modules with `PYTHONPATH=.  uv run -m ...`
- The project uses `ruff` for linting. Always run the linter with `uv run ruff check` and fix errors before continuing.
- The project uses `ruff` for formatting. Always run the formatter with `uv run ruff format` after editing any python file.
- The project uses `pytest` for testing. Always run tests with `PYTHONPATH=. uv run pytest` after editing any python code.
- The database is `mariadb` version 12 - do not use MySQL dialects where MariaDB functions differ.


## Approach
- Think before acting. Read existing files before writing code.
- Be concise in output but thorough in reasoning.
- Prefer editing over rewriting whole files.
- Do not re-read files you have already read unless the file may have changed.
- Test your code before declaring done.
- No sycophantic openers or closing fluff.
- Keep solutions simple and direct. No over-engineering.
- If unsure: say so. Never guess or invent file paths.
- User instructions always override this file.

## Efficiency
- Read before writing. Understand the problem before coding.
- No redundant file reads. Read each file once.
- One focused coding pass. Avoid write-delete-rewrite cycles.
- Test once, fix if needed, verify once. No unnecessary iterations.
- Budget: 50 tool calls maximum. Work efficiently.