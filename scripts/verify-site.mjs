import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const htmlFiles = readdirSync(root).filter((name) => name.endsWith(".html")).sort();
const errors = [];

function fail(file, message) {
  errors.push(`${file}: ${message}`);
}

for (const file of htmlFiles) {
  const source = readFileSync(join(root, file), "utf8");
  const h1Count = (source.match(/<h1\b/gi) || []).length;
  const mainCount = (source.match(/<main\b/gi) || []).length;
  if (!/^<!doctype html>/i.test(source)) fail(file, "missing HTML doctype");
  if (!/<html\s+lang="en">/i.test(source)) fail(file, "missing lang=en");
  if (!/<title>[^<]+<\/title>/i.test(source)) fail(file, "missing title");
  if (!/<meta\s+name="description"\s+content="[^"]+">/i.test(source)) fail(file, "missing meta description");
  if (!/<link\s+rel="canonical"\s+href="https:\/\/www\.alphaonegarage\.com\/[^"]*">/i.test(source)) fail(file, "missing canonical URL");
  if (h1Count !== 1) fail(file, `expected one H1, found ${h1Count}`);
  if (mainCount !== 1) fail(file, `expected one main landmark, found ${mainCount}`);
  if (source.includes("BBB A+")) fail(file, "contains unverified BBB A+ claim");

  for (const match of source.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      fail(file, `invalid JSON-LD: ${error.message}`);
    }
  }

  for (const match of source.matchAll(/(?:href|src|data-src)="([^"]+)"/gi)) {
    const raw = match[1].replaceAll("&amp;", "&");
    if (/^(?:https?:|mailto:|tel:|data:|#)/i.test(raw)) continue;
    const target = raw.split(/[?#]/, 1)[0];
    if (!target) continue;
    const path = join(root, target);
    if (!existsSync(path)) fail(file, `missing local target ${raw}`);
  }
}

const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
const sitemapPaths = new Set([...sitemap.matchAll(/<loc>https:\/\/www\.alphaonegarage\.com\/(.*?)<\/loc>/g)].map((match) => match[1] || "index.html"));
for (const file of htmlFiles) {
  if (!sitemapPaths.has(file)) fail("sitemap.xml", `missing ${file}`);
}

const robots = readFileSync(join(root, "robots.txt"), "utf8");
for (const agent of ["OAI-SearchBot", "Googlebot", "Bingbot"]) {
  if (!robots.includes(`User-agent: ${agent}`)) fail("robots.txt", `missing explicit ${agent} rule`);
}
if (!robots.includes("Sitemap: https://www.alphaonegarage.com/sitemap.xml")) fail("robots.txt", "missing sitemap URL");

const home = readFileSync(join(root, "index.html"), "utf8");
if (!home.includes('"@id": "https://www.alphaonegarage.com/#business"')) fail("index.html", "missing canonical business entity ID");
if (!home.includes('"name": "Alpha One Garage Door Service"')) fail("index.html", "missing canonical business name");
if ((home.match(/bKCXwQJwLrBYXMwhfEsa/g) || []).length < 4) fail("index.html", "GHL form ID references changed or are missing");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Verified ${htmlFiles.length} HTML pages, JSON-LD blocks, local links, sitemap coverage, crawler rules, and preserved GHL form IDs.`);
