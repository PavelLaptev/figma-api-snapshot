import axios from "axios";
import * as cheerio from "cheerio";
import TurndownService from "turndown";

import {
  looksLikeDocUrl,
  normalizeWhitespace,
  safeSlug,
  stripHashAndUtm,
  toAbsoluteUrl,
} from "./utils.js";

function pickMainContent($) {
  const candidates = [
    "main",
    "article",
    "[data-pagefind-body]",
    "[role='main']",
    ".docs-content",
    ".markdown",
  ];

  for (const selector of candidates) {
    const node = $(selector).first();
    if (node.length) return node;
  }

  return $("body");
}

function cleanupNode($, node) {
  node.find("script,style,noscript,iframe,svg").remove();
  node.find("button").remove();

  node.find("a").each((_, el) => {
    const href = $(el).attr("href") || "";
    if (href.startsWith("#")) {
      $(el).replaceWith($(el).text());
    }
  });

  return node;
}

function htmlToMarkdown(html) {
  const turndown = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });
  turndown.remove(["img", "picture"]);
  return turndown.turndown(html).replace(/\n{3,}/g, "\n\n").trim();
}

function extractTitle($) {
  const og = $("meta[property='og:title']").attr("content");
  const h1 = $("h1").first().text();
  const title = og || h1 || $("title").text() || "Untitled";
  return normalizeWhitespace(title);
}

export async function crawlDocs(config) {
  const queue = [config.startUrl];
  const visited = new Set();
  const pages = [];

  while (queue.length && pages.length < config.maxPages) {
    const current = queue.shift();
    if (!current) continue;

    const canonical = stripHashAndUtm(current);
    if (visited.has(canonical)) continue;
    visited.add(canonical);

    let html = "";
    try {
      const response = await axios.get(canonical, {
        timeout: config.timeoutMs,
        headers: { "User-Agent": config.userAgent },
      });
      html = String(response.data || "");
    } catch (error) {
      console.warn(`Skipping ${canonical}: ${error.message}`);
      await sleep(config.requestDelayMs);
      continue;
    }

    const $ = cheerio.load(html);
    const title = extractTitle($);
    const mainNode = cleanupNode($, pickMainContent($).clone());
    const markdown = htmlToMarkdown(mainNode.html() || "");

    if (markdown.length > 80) {
      const urlPath = new URL(canonical).pathname;
      pages.push({
        url: canonical,
        path: urlPath,
        slug: safeSlug(urlPath),
        title,
        markdown,
      });
      console.log(`Captured ${canonical}`);
    }

    $("a[href]").each((_, el) => {
      const href = $(el).attr("href");
      const abs = href ? toAbsoluteUrl(href, canonical) : null;
      if (!abs) return;
      const normalized = stripHashAndUtm(abs);
      if (
        looksLikeDocUrl(normalized, config.origin, config.allowedPathPrefix) &&
        !visited.has(normalized)
      ) {
        queue.push(normalized);
      }
    });

    await sleep(config.requestDelayMs);
  }

  return pages;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
