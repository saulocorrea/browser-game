# n8n AI Commit Review

This workflow uses n8n to retrieve recent commits from the browser-game
repository and analyze the changed files using a locally hosted LLM.

## Workflow

GitHub API
→ Get latest commits
→ Filter merge commits
→ Get commit details
→ Split changed files
→ Extract Git diff
→ Ollama
→ Qwen2.5-Coder
→ Structured AI review

## Technologies

- n8n
- GitHub REST API
- Ollama
- Qwen2.5-Coder 3B
- Docker

## How it works

The workflow retrieves the five most recent commits from the repository and
filters out merge commits.

For each remaining commit, it retrieves the commit details and splits the
changed files into individual n8n items.

Each Git diff is then sent to a local Qwen2.5-Coder model through Ollama for
code review.

The final output contains:

- Commit SHA
- Commit message
- Changed file
- Additions
- Deletions
- AI-generated code review

## Requirements

- n8n
- Ollama
- `qwen2.5-coder:3b`

When n8n is running in Docker and Ollama is running on the host machine,
configure the Ollama connection using:

`http://host.docker.internal:11434`

## Importing the workflow

Import `commit-review-workflow.json` into n8n and configure the Ollama
credential for your environment.

The workflow does not contain API keys or authentication secrets.
