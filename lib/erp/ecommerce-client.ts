import "server-only";

import type {
  EcommerceOrderIntentInput,
  EcommerceSignupInput,
  EcommerceSubmissionResult,
  ErpCatalogProduct,
} from "./ecommerce-types";

function getErpApiUrl() {
  let url = (
    process.env.HACIEN_ECOMMERCE_API_URL ||
    process.env.HACIEN_API_PUBLIC_URL ||
    process.env.HACIEN_GATEWAY_API_URL ||
    "http://localhost:4101/api/v1"
  ).replace(/\/+$/, "");

  if (!url.endsWith("/api/v1")) {
    url = `${url}/api/v1`;
  }
  return url;
}

async function erpFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getErpApiUrl()}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
    signal:
      init?.signal ||
      AbortSignal.timeout(Number(process.env.HACIEN_ECOMMERCE_TIMEOUT_MS || 3000)),
  });

  if (!response.ok) {
    throw new Error(`ERP ecommerce request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function listErpCatalog() {
  return erpFetch<{ items: ErpCatalogProduct[] }>("/ecommerce/catalog");
}

export function getErpCatalogProduct(slug: string) {
  return erpFetch<{ item: ErpCatalogProduct }>(
    `/ecommerce/catalog/${encodeURIComponent(slug)}`,
  );
}

export function requestCustomerSignup(input: EcommerceSignupInput) {
  return erpFetch<EcommerceSubmissionResult>("/ecommerce/signup", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function createOrderIntent(input: EcommerceOrderIntentInput) {
  return erpFetch<EcommerceSubmissionResult>("/ecommerce/order-intents", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
