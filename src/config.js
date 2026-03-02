export const DEFAULTS = {
  startUrl: "https://developers.figma.com/docs/plugins/api/api-reference/",
  origin: "https://developers.figma.com",
  allowedPathPrefix: "/docs/plugins/api",
  userAgent:
    "figma-plugin-api-for-ai/1.0 (+local crawler for LLM prep)",
  timeoutMs: 30000,
  maxPages: 800,
  requestDelayMs: 120,
  outputDir: "out",
  chunkSizeChars: 2200,
  chunkOverlapChars: 220,
};
