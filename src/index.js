import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

import { DEFAULTS } from "./config.js";
import { crawlDocs } from "./crawler.js";
import { ensureDir, markdownToChunks, writeJson, writeText } from "./utils.js";

async function main() {
  const startedAt = new Date().toISOString();
  const config = { ...DEFAULTS };

  const outRoot = path.resolve(process.cwd(), config.outputDir);
  const rawDir = path.join(outRoot, "raw");
  const llmDir = path.join(outRoot, "llm");

  await ensureDir(rawDir);
  await ensureDir(llmDir);

  console.log("Crawling Figma Plugin API reference docs...");
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
      config.chunkOverlapChars,
    ).map((content, index) => ({
      id: hash(`${page.url}::${index}::${content.slice(0, 40)}`),
      source: page.url,
      title: page.title,
      path: page.path,
      chunkIndex: index,
      content,
      length: content.length,
    }));

    chunks.push(...pageChunks);
  }

  const deduped = dedupeChunks(chunks);
  const jsonl = deduped.map((x) => JSON.stringify(x)).join("\n");

  await writeText(path.join(llmDir, "figma-plugin-api-corpus.md"), markdownCorpus.trim() + "\n");
  await writeText(path.join(llmDir, "figma-plugin-api-chunks.jsonl"), jsonl + "\n");
  await writeJson(path.join(llmDir, "manifest.json"), {
    sourceRoot: config.startUrl,
    generatedAt: new Date().toISOString(),
    startedAt,
    pageCount: pages.length,
    chunkCount: deduped.length,
    chunking: {
      chunkSizeChars: config.chunkSizeChars,
      chunkOverlapChars: config.chunkOverlapChars,
    },
    files: {
      rawPagesDir: "out/raw",
      markdownCorpus: "out/llm/figma-plugin-api-corpus.md",
      jsonlChunks: "out/llm/figma-plugin-api-chunks.jsonl",
    },
  });

  await writeJson(path.join(outRoot, "index.json"),
    pages.map((p) => ({ title: p.title, url: p.url, path: p.path, slug: p.slug })),
  );

  await fs.writeFile(path.join(outRoot, ".complete"), "ok\n", "utf8");

  console.log(`Done. Saved ${pages.length} pages and ${deduped.length} chunks in ${outRoot}`);
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
