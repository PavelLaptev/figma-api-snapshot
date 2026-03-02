import { decode } from "html-entities";
import path from "node:path";
import fs from "node:fs/promises";

export function normalizeWhitespace(text) {
  return text.replace(/\s+/g, " ").trim();
}

export function safeSlug(urlPath) {
  const normalized = urlPath
    .replace(/^\/+/, "")
    .replace(/\/$/, "")
    .replace(/[^a-zA-Z0-9/_-]/g, "")
    .replace(/\//g, "__");

  return normalized.length ? normalized : "index";
}

export function toAbsoluteUrl(href, baseUrl) {
  try {
    return new URL(href, baseUrl).toString();
  } catch {
    return null;
  }
}

export function looksLikeDocUrl(url, origin, allowedPathPrefix) {
  try {
    const parsed = new URL(url);
    if (parsed.origin !== origin) return false;
    if (!parsed.pathname.startsWith(allowedPathPrefix)) return false;
    if (
      /(\.(png|jpg|jpeg|gif|svg|webp|ico|pdf|zip|css|js))$/i.test(
        parsed.pathname
      )
    )
      return false;
    return true;
  } catch {
    return false;
  }
}

export function stripHashAndUtm(url) {
  const parsed = new URL(url);
  parsed.hash = "";
  [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content"
  ].forEach((k) => {
    parsed.searchParams.delete(k);
  });
  return parsed.toString();
}

export function markdownToChunks(markdown, maxChars, overlapChars) {
  const text = decode(markdown).replace(/\r\n/g, "\n");
  const sections = text.split(/\n(?=# )/g);
  const chunks = [];

  for (const section of sections) {
    const trimmed = section.trim();
    if (!trimmed) continue;

    if (trimmed.length <= maxChars) {
      chunks.push(trimmed);
      continue;
    }

    let start = 0;
    while (start < trimmed.length) {
      const end = Math.min(start + maxChars, trimmed.length);
      const slice = trimmed.slice(start, end);
      chunks.push(slice.trim());
      if (end === trimmed.length) break;
      start = Math.max(end - overlapChars, start + 1);
    }
  }

  return chunks.filter(Boolean);
}

export async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

export async function writeJson(filePath, value) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}

export async function writeText(filePath, value) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, value, "utf8");
}
