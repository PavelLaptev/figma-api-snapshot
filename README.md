# figma-plugin-api-for-ai

Auto-updated dataset of the [Figma Plugin API](https://developers.figma.com/docs/plugins/api/api-reference/) reference docs, compressed into LLM-ready formats.

Refreshed daily by GitHub Actions. Use the files in `out/llm/` directly.

## Output files (updated daily)

| File | Description |
|---|---|
| [`out/llm/figma-plugin-api-corpus.md`](out/llm/figma-plugin-api-corpus.md) | Full Markdown corpus — all pages merged, great for long-context models |
| [`out/llm/figma-plugin-api-chunks.jsonl`](out/llm/figma-plugin-api-chunks.jsonl) | Chunked JSONL for RAG, vector DBs, or fine-tuning |
| [`out/llm/manifest.json`](out/llm/manifest.json) | Metadata: page count, chunk count, generation timestamp |
| [`out/index.json`](out/index.json) | Flat index of all crawled pages with titles and URLs |

Each JSONL record has: `id`, `title`, `source`, `path`, `chunkIndex`, `content`, `length`.

## Run locally

```bash
npm install
npm run build
```

Outputs are written to `out/`.

## Daily automation

A GitHub Actions workflow (`.github/workflows/daily-crawl.yml`) runs every day at 03:00 UTC, crawls the docs, and commits any changes back to the repo automatically.

To trigger a manual refresh: **Actions → Daily Figma API Docs Crawl → Run workflow**.

## Configuration

All tunable options are in `src/config.js`:

| Option | Default | Description |
|---|---|---|
| `startUrl` | API reference root | Starting URL for the crawl |
| `allowedPathPrefix` | `/docs/plugins/api` | Scope of pages to follow |
| `maxPages` | 800 | Safety cap on number of pages |
| `requestDelayMs` | 120 | Delay between requests (ms) |
| `chunkSizeChars` | 2200 | Max chars per JSONL chunk |
| `chunkOverlapChars` | 220 | Overlap between adjacent chunks |
