// Builds a fully static, Netlify-ready copy of the site into dist/client.
// Usage: bun run build && bun scripts/export-static.mjs
import { writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const clientDir = "dist/client";
if (!existsSync(join(clientDir, "assets"))) {
  console.error("Run `bun run build` first — dist/client/assets is missing.");
  process.exit(1);
}

const mod = await import(new URL("../dist/server/index.mjs", import.meta.url).href);
const handler = mod.default;

async function render(path) {
  const res = await handler.fetch(new Request(`http://localhost${path}`), {}, {
    waitUntil() {},
    passThroughOnException() {},
  });
  const html = await res.text();
  if (!html.includes("<html")) throw new Error(`Render of ${path} produced no HTML`);
  return html;
}

writeFileSync(join(clientDir, "index.html"), await render("/"));
writeFileSync(join(clientDir, "404.html"), await render("/not-found"));
writeFileSync(join(clientDir, "_redirects"), "/*    /index.html   200\n");
writeFileSync(
  join(clientDir, "netlify.toml"),
  '[[redirects]]\n  from = "/*"\n  to = "/index.html"\n  status = 200\n',
);

console.log(`Static export ready in ${clientDir} — drag this folder (or its zip) into Netlify.`);
