// Builds a fully static, Netlify-ready copy of the site into dist/client.
// Usage: bun run build && bun scripts/export-static.mjs
//
// Nitro's output folder differs per preset (`dist/` for the Lovable fetch-bundle
// preset, `.output/` for the cloudflare/netlify presets), so we detect it and
// always normalise the static site into dist/client.
import { writeFileSync, existsSync, cpSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const candidates = [
  { publicDir: "dist/client", serverEntry: "dist/server/index.mjs" },
  { publicDir: ".output/public", serverEntry: ".output/server/index.mjs" },
  { publicDir: ".output/client", serverEntry: ".output/server/index.mjs" },
];

const found = candidates.find(
  (c) => existsSync(join(c.publicDir, "assets")) && existsSync(c.serverEntry),
);

if (!found) {
  console.error(
    "Could not find a build output. Run `bun run build` first — looked for:\n" +
      candidates.map((c) => `  - ${c.publicDir}/assets + ${c.serverEntry}`).join("\n"),
  );
  process.exit(1);
}

const clientDir = "dist/client";
if (found.publicDir !== clientDir) {
  mkdirSync(clientDir, { recursive: true });
  cpSync(found.publicDir, clientDir, { recursive: true });
  console.log(`Copied ${found.publicDir} -> ${clientDir}`);
}

const mod = await import(pathToFileURL(resolve(found.serverEntry)).href);
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

console.log(`Static export ready in ${clientDir} — publish this folder.`);
