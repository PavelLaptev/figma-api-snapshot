import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

import { TARGETS } from "./config.js";
import { crawlDocs } from "./crawler.js";
import { ensureDir, markdownToChunks, writeJson, writeText } from "./utils.js";

async function processTarget(config) {
  const startedAt = new Date().toISOString();
  const { id, label } = config;

  const outRoot = path.resolve(process.cwd(), config.outputDir);
  const rawDir = path.join(outRoot, "raw", id);
  const llmDir = path.join(outRoot, "llm");

  await ensureDir(rawDir);
  await ensureDir(llmDir);

  console.log(`\nCrawling ${label}...`);
  const pages = await crawlDocs(config);

  const chunks = [];
  let markdownCorpus = "";

  for (const page of pages) {
    const rawFile = path.join(rawDir, `${page.slug}.json`);
    await writeJson(rawFile, page);

    markdownCorpus += `# ${page.title}\n\nSource: ${page.url}\n\n${page.markdown}\n\n---\n\n`;

    const pageChunks = markdownToChunks(
      `# ${page.title}\n\nSource: ${page.url}\n\n${page.markdown}`,
      config.chunkSizeChars,
      config.chunkOverlapChars
    ).map((content, index) => ({
      id: hash(`${page.url}::${index}::${content.slice(0, 40)}`),
      source: page.url,
      title: page.title,
      path: page.path,
      chunkIndex: index,
      content,
      length: content.length
    }));

    chunks.push(...pageChunks);
  }

  const deduped = dedupeChunks(chunks);
  const jsonl = deduped.map((x) => JSON.stringify(x)).join("\n");

  const corpusFile = path.join(llmDir, `figma-${id}-corpus.md`);
  const chunksFile = path.join(llmDir, `figma-${id}-chunks.jsonl`);
  const manifestFile = path.join(llmDir, `figma-${id}-manifest.json`);

  await writeText(corpusFile, markdownCorpus.trim() + "\n");
  await writeText(chunksFile, jsonl + "\n");
  await writeJson(manifestFile, {
    id,
    label,
    sourceRoot: config.startUrl,
    generatedAt: new Date().toISOString(),
    startedAt,
    pageCount: pages.length,
    chunkCount: deduped.length,
    chunking: {
      chunkSizeChars: config.chunkSizeChars,
      chunkOverlapChars: config.chunkOverlapChars
    },
    files: {
      rawPagesDir: `out/raw/${id}`,
      markdownCorpus: `out/llm/figma-${id}-corpus.md`,
      jsonlChunks: `out/llm/figma-${id}-chunks.jsonl`
    }
  });

  console.log(
    `Done. Saved ${pages.length} pages and ${deduped.length} chunks → out/llm/figma-${id}-*`
  );

  return pages.map((p) => ({
    dataset: id,
    title: p.title,
    url: p.url,
    path: p.path,
    slug: p.slug
  }));
}

async function main() {
  const allPages = [];

  for (const target of TARGETS) {
    const pages = await processTarget(target);
    allPages.push(...pages);
  }

  const outRoot = path.resolve(process.cwd(), TARGETS[0].outputDir);
  await writeJson(path.join(outRoot, "index.json"), allPages);
  await fs.writeFile(path.join(outRoot, ".complete"), "ok\n", "utf8");

  console.log(`\nAll done. Total pages indexed: ${allPages.length}`);
}

function hash(value) {
  return crypto.createHash("sha1").update(value).digest("hex");
}

function dedupeChunks(items) {
  const byHash = new Map();
  for (const item of items) {
    const key = hash(item.content);
    if (!byHash.has(key)) byHash.set(key, item);
  }
  return [...byHash.values()];
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
