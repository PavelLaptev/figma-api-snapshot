# figma-api-snapshot

Auto-updated LLM-ready datasets of Figma developer docs, refreshed daily by GitHub Actions.

Covers:

- [Figma Plugin API](https://developers.figma.com/docs/plugins/api/api-reference/)
- [Figma Widgets](https://developers.figma.com/docs/widgets/)

## Output files (updated daily)

### Plugin API

| File | Description |
|---|---|
| [`out/llm/figma-plugin-api-corpus.md`](out/llm/figma-plugin-api-corpus.md) | Full Markdown corpus — great for long-context models |
| [`out/llm/figma-plugin-api-chunks.jsonl`](out/llm/figma-plugin-api-chunks.jsonl) | Chunked JSONL for RAG / vector DBs / fine-tuning |
| [`out/llm/figma-plugin-api-manifest.json`](out/llm/figma-plugin-api-manifest.json) | Metadata: page count, chunk count, timestamps |

### Widgets

| File | Description |
|---|---|
| [`out/llm/figma-widgets-corpus.md`](out/llm/figma-widgets-corpus.md) | Full Markdown corpus |
| [`out/llm/figma-widgets-chunks.jsonl`](out/llm/figma-widgets-chunks.jsonl) | Chunked JSONL |
| [`out/llm/figma-widgets-manifest.json`](out/llm/figma-widgets-manifest.json) | Metadata |

[`out/index.json`](out/index.json) — flat index of all crawled pages across both datasets.

Each JSONL record has: `id`, `title`, `source`, `path`, `chunkIndex`, `content`, `length`.

## Run locally

```bash
npm install
npm run build
```

Outputs are written to `out/`. Both datasets are crawled in sequence.

## Daily automation

A GitHub Actions workflow (`.github/workflows/daily-crawl.yml`) runs every day at 03:00 UTC, crawls all docs, and commits any changes back to the repo automatically.

To trigger a manual refresh: **Actions → Daily Figma Docs Crawl → Run workflow**.

## Adding more doc sections

Edit the `TARGETS` array in `src/config.js` — add an entry with `id`, `label`, `startUrl`, and `allowedPathPrefix`.

## Configuration

Shared options (in `src/config.js`):

| Option | Default | Description |
|---|---|---|
| `maxPages` | 800 | Safety cap on number of pages per target |
| `requestDelayMs` | 120 | Delay between requests (ms) |
| `chunkSizeChars` | 2200 | Max chars per JSONL chunk |
| `chunkOverlapChars` | 220 | Overlap between adjacent chunks |
