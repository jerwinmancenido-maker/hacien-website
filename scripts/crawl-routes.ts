import { categories } from "../data/products";
import { solutions } from "../data/solutions";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const staticRoutes = [
  "/",
  "/about",
  "/solutions",
  "/products",
  "/erp-platform",
  "/contact",
  "/quote",
  "/privacy",
  "/terms",
];

async function checkRoute(path: string) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, { redirect: "manual" });
    const status = res.status;
    const icon = status === 200 ? "✅" : status === 404 ? "⚠️" : "❌";
    console.log(`  ${icon} ${status} — ${path}`);
    return { path, status };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.log(`  ❌ ERR — ${path} (${message})`);
    return { path, status: 503, error: message };
  }
}

async function main() {
  console.log(`\nRoute Crawl — ${BASE_URL}\n`);

  let ok = 0;
  let bad = 0;

  // Static routes
  console.log("Static routes:");
  for (const route of staticRoutes) {
    const result = await checkRoute(route);
    if (result.status === 200) ok++;
    else bad++;
  }

  // Dynamic category routes
  console.log("\nCategory routes:");
  for (const cat of categories) {
    const path = `/products/${cat.slug}`;
    const result = await checkRoute(path);
    if (result.status === 200) ok++;
    else bad++;
  }

  // Dynamic solution routes
  console.log("\nSolution routes:");
  for (const sol of solutions) {
    const path = `/solutions/${sol.slug}`;
    const result = await checkRoute(path);
    if (result.status === 200) ok++;
    else bad++;
  }

  console.log(`\nResult: ${ok} OK, ${bad} failures`);
  process.exit(bad > 0 ? 1 : 0);
}

main();
