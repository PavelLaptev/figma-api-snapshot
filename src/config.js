const SHARED = {
  origin: "https://developers.figma.com",
  userAgent: "figma-api-snapshot/1.0 (+local crawler for LLM prep)",
  timeoutMs: 30000,
  maxPages: 800,
  requestDelayMs: 120,
  outputDir: "out",
  chunkSizeChars: 2200,
  chunkOverlapChars: 220,
};

export const TARGETS = [
  {
    ...SHARED,
    id: "plugin-api",
    label: "Figma Plugin API",
    startUrl: "https://developers.figma.com/docs/plugins/api/api-reference/",
    allowedPathPrefix: "/docs/plugins/api",
  },
  {
    ...SHARED,
    id: "widgets",
    label: "Figma Widgets",
    startUrl: "https://developers.figma.com/docs/widgets/",
    allowedPathPrefix: "/docs/widgets",
  },
];
