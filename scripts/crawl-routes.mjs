const baseArg = process.argv.find((arg) => arg.startsWith("--base="));
const BASE_URL = baseArg?.replace("--base=", "") || process.env.BASE_URL || "http://localhost:3000";

async function checkRoute(path) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, { redirect: "manual" });
    const status = res.status;
    const icon = status === 200 ? "✅" : status === 404 ? "⚠️" : "❌";
    console.log(`  ${icon} ${status} — ${path}`);
    return { path, status };
  } catch (err) {
    console.log(`  ❌ ERR — ${path} (${err.message})`);
    return { path, status: 503, error: err.message };
  }
}

async function main() {
  console.log(`\nRoute Crawl — ${BASE_URL}\n`);

  let ok = 0;
  let bad = 0;

  const sitemap = await fetch(`${BASE_URL}/sitemap.xml`);
  if (!sitemap.ok) {
    console.log(`  ❌ ${sitemap.status} — /sitemap.xml`);
    process.exit(1);
  }

  const xml = await sitemap.text();
  const routes = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((match) => new URL(match[1]).pathname)
    .sort();

  console.log(`Sitemap routes: ${routes.length}`);
  for (const route of routes) {
    const result = await checkRoute(route);
    if (result.status === 200) ok++;
    else bad++;
  }

  console.log(`\nResult: ${ok} OK, ${bad} failures`);
  process.exit(bad > 0 ? 1 : 0);
}

main();
