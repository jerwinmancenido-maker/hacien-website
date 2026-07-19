# HACIEN Website — Architecture Review & Execution Roadmap

> **Status:** Superseded historical architecture assessment. Not current source,
> runtime, provider, database, deployment, or production truth.
> **Superseded by:** `AGENTS.md`, current source inspection,
> `plans/hacien-website-masterplan-index.md`, and the P1.3 contract at
> `/Users/m5/Projects/hacien-staging/operations/knowledge/website-source-data-promotion-contract.md`.
> **Preservation rule:** Findings below describe the repository at an earlier
> point and must be reverified before use.

> **Historical status recorded by the original review:** Planning-only. No implementation until approved.
> **Repo:** `hacien-website` | **Live:** https://haciensolutions.com
> **Stack:** Next.js 16.2.9 (Turbopack), Tailwind CSS v4, Hostinger Node.js

---

## SECTION A — Current Website Assessment

### A1. What is structurally wrong?

| Issue | Detail |
|-------|--------|
| **No `not-found.tsx`** | Any invalid route gets Next.js default 404. No branded error page. |
| **No `error.tsx`** | Runtime errors render the default Next.js error boundary with no recovery UI. |
| **No `loading.tsx`** | No loading states for any page. On slow Hostinger Node.js, pages flash blank. |
| **No `robots.ts` / `sitemap.ts`** | Zero SEO structure. Google has no crawl instructions. |
| **No `public/` assets** | No logo SVG, no brand imagery, no favicon beyond Next.js default. |
| **Header logo is a CSS square** | `<span className="grid h-10 w-10...">H</span>` — not an actual logo file. |
| **All forms are dead ends** | `ContactForm`, `QuoteCart`, `QuoteRequestForm` — all call `event.preventDefault()` then `setSubmitted(true)`. Zero data is sent anywhere. |
| **No product detail page** | You can browse categories and see product cards, but clicking a product has no destination. There's no `/products/[category]/[product]` route. |
| **Only 9 products** | Across 7 categories, the catalog is extremely thin. Several categories have 1 product. |
| **No `error.tsx` at category level** | If `getCategory()` returns undefined, `notFound()` is called — but without a custom 404 page, it's the default Next.js 404. |
| **No TypeScript path aliases beyond `@/`** | No separation between `@/data`, `@/lib`, `@/components` — fine for now but limit scaling. |

### A2. Why does it still feel generic?

1. **Content depth is shallow.** Nine products with one-line descriptions. Six solutions with boilerplate text. Nothing feels like a real business with real expertise.
2. **No brand personality.** The color palette is standard blue/navy. The typography is system fonts. The "H" square is a placeholder. There's no photography, no illustration, no brand voice.
3. **Forms go nowhere.** The primary call-to-action on every page is a form that doesn't send data. This undermines credibility.
4. **No social proof.** No case studies, no project portfolio, no client logos, no testimonials, no team photos.
5. **The "0 Fake Certifications" metric** in the Hero section is clever but signals that the company has nothing to show.
6. **No differentiation.** The copy could describe any IT company. There's no unique angle, no specific methodology, no personality.
7. **No interactive depth.** The quote cart is the only interactive element. No filtering, no search, no comparison, no saved lists.

### A3. What pages/components are missing?

| Missing | Priority |
|---------|----------|
| `not-found.tsx` (custom 404) | Critical |
| `error.tsx` (error boundary) | Critical |
| `loading.tsx` (loading states) | High |
| `robots.ts` + `sitemap.ts` | High |
| Individual product detail page `/products/[category]/[product]` | High |
| Case studies / project portfolio page | Medium |
| Supplier/vendor directory page | Medium |
| Blog / resources / insights page | Low |
| Careers page placeholder | Low |
| Proper logo SVG + favicon | Critical |

### A4. Why does `/products/network-equipment` return 503?

The `[category]` dynamic route at `app/products/[category]/page.tsx` uses `generateStaticParams()` to pre-render all category pages at build time. The `network-equipment` slug exists in `data/products.ts` and should be generated.

**Root cause analysis:**
- The page *should* work because `categories` includes `network-equipment` and `generateStaticParams` returns it.
- A 503 on Hostinger Node.js typically means the Node process crashed or is unresponsive — not a 404.
- The most likely cause: Hostinger's Node.js server ran out of memory or the worker process died. With a thin Next.js site this shouldn't happen, but shared hosting Node.js instances are notoriously under-resourced.
- **Alternative cause:** If the build was run without `network-equipment` in the data (e.g., an older deployment), the route would not be pre-rendered and the Node.js server would need to render it on-demand — which could fail if the server is in a bad state.
- **Secondary cause:** No `error.tsx` boundary exists, so any unhandled error in the page component crashes the entire route with no graceful fallback.

**Immediate fix (Phase 0):** Add `error.tsx` and `not-found.tsx`. Verify the deployment matches the current build. Check Hostinger Node.js logs.

---

## SECTION B — Target Information Architecture

### B1. Recommended Final Sitemap

```
NOW (Phase 1-4)
├── /                           Homepage
├── /about                      Company profile
├── /solutions                  Solutions overview
│   └── /solutions/[slug]       Solution detail
├── /products                   Product catalog
│   └── /products/[category]    Category listing
│       └── /products/[category]/[product]   Product detail
├── /government-procurement     Government procurement support
├── /erp-platform               HACIEN ERP teaser (future)
├── /contact                    Contact + RFQ hub
├── /quote                      Quote cart
├── /privacy                    Privacy policy
├── /terms                      Terms of use
├── /robots.ts                  SEO robots
├── /sitemap.ts                 Dynamic sitemap
├── /not-found.tsx              Custom 404
├── /error.tsx                  Error boundary
└── /loading.tsx                Loading states

FUTURE (Phase 5-6)
├── /case-studies               Project portfolio
│   └── /case-studies/[slug]    Case study detail
├── /suppliers                  Supplier/vendor ecosystem
├── /blog                       Insights and resources
│   └── /blog/[slug]            Blog post
├── /careers                    Careers (placeholder)
└── /api/rfq                    RFQ submission endpoint
```

### B2. Which pages exist now vs. later?

| Page | Now | Later |
|------|-----|-------|
| Home, About, Solutions, Products, Government, ERP, Contact, Quote, Privacy, Terms | ✅ | — |
| Product detail, Custom 404/error/loading, Robots, Sitemap | ✅ Phase 1-2 | — |
| Case studies, Supplier directory | — | Phase 5 |
| Blog, Careers | — | Phase 6 |
| `/api/rfq` endpoint | — | Phase 5 |

---

## SECTION C — Data Architecture

### C1. Current state

Data is in [`data/products.ts`](data/products.ts) and [`data/solutions.ts`](data/solutions.ts) as static TypeScript arrays. This is the correct approach for now — no database, no CMS, no API calls.

### C2. Recommended structure

**Keep static TS data but improve the schema:**

```typescript
// data/products.ts — proposed schema
type Product = {
  id: string;           // e.g., "HAC-NET-001"
  slug: string;         // URL-safe identifier
  categorySlug: string; // FK to Category
  name: string;         // Display name
  shortDescription: string;
  longDescription: string;    // NEW: for detail page
  specs: string[];
  procurementNotes: string;
  estimatedPrice: number;
  unit: string;
  availability: "For quotation" | "Fast moving" | "Project order";
  featured?: boolean;
  vendorBrands?: string[];    // NEW: referenced brands
  images?: string[];          // NEW: placeholder for future images
};
```

**Add a validation layer:**

```typescript
// lib/validate.ts
export function validateSlugs() {
  const productSlugs = new Set(products.map(p => p.slug));
  const categorySlugs = new Set(categories.map(c => c.slug));

  for (const product of products) {
    if (!categorySlugs.has(product.categorySlug)) {
      throw new Error(`Product ${product.id} references unknown category: ${product.categorySlug}`);
    }
  }

  return { products: productSlugs.size, categories: categorySlugs.size };
}
```

### C3. `generateStaticParams` safety

```typescript
// app/products/[category]/page.tsx
export function generateStaticParams() {
  // This already exists — add fallback safety
  if (categories.length === 0) {
    console.warn("No categories defined — product pages will 404");
    return [];
  }
  return categories.map((c) => ({ category: c.slug }));
}
```

### C4. Route safety

- Every dynamic route needs `generateStaticParams` + `notFound()` guard.
- Every data lookup needs a null check.
- Add a **build-time validation script** that runs `validateSlugs()` before `next build`.

### C5. Future migration path

When moving to a CMS or ERP-backed catalog:
- Replace `data/products.ts` with `fetch()` calls to the HACIEN ERP API.
- Keep the same TypeScript interfaces — only the data source changes.
- `generateStaticParams` can call the API at build time (ISR) or switch to `dynamicParams = true`.

---

## SECTION D — Visual System

### D1. Current state

The visual system is defined in [`globals.css`](app/globals.css) as CSS custom properties and utility classes. It's clean but minimal — no design token file, no Tailwind theme extension.

### D2. Recommended design tokens

```css
/* Design tokens — extract to tailwind.config.ts or a CSS variables file */
:root {
  /* Brand */
  --color-brand-navy: #071426;
  --color-brand-blue: #1457d9;
  --color-brand-violet: #5b4bff;

  /* Neutral */
  --color-bg: #f7f9fc;
  --color-surface: #ffffff;
  --color-line: #dde5f2;
  --color-text: #0b1220;
  --color-muted: #5f6d82;

  /* Semantic */
  --color-success: #0f766e;
  --color-warning: #b45309;
  --color-danger: #be123c;

  /* Typography */
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;

  /* Spacing rhythm */
  --space-section: 5rem;       /* py-20 equivalent */
  --space-section-lg: 7rem;    /* py-28 equivalent */
  --space-card-padding: 1.5rem;
  --space-card-gap: 1.5rem;

  /* Radii */
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;

  /* Shadows */
  --shadow-card: 0 20px 60px rgba(10, 31, 68, 0.08);
  --shadow-elevated: 0 24px 70px rgba(10, 31, 68, 0.12);
}
```

### D3. Typography

- **Primary:** Inter (Google Fonts, variable) — modern, readable, excellent for procurement/enterprise.
- **Mono:** JetBrains Mono — for product codes, specs, technical data.
- **Scale:** Use Tailwind's built-in scale but ensure consistent heading hierarchy:
  - h1: `text-4xl` to `text-7xl` (page titles)
  - h2: `text-2xl` to `text-4xl` (section titles)
  - h3: `text-lg` to `text-xl` (card titles)
  - Body: `text-sm` to `text-base` (15–16px)
  - Caption: `text-xs` (legal, metadata)

### D4. Layout grid

- **Max width:** `max-w-7xl` (1280px) — already used, keep it.
- **Section rhythm:** Every section gets `py-20` (5rem) or `py-28` (7rem).
- **Card system:**
  - Product cards: 3-column grid on desktop (`lg:grid-cols-3`)
  - Solution cards: 2-column grid on desktop (`md:grid-cols-2`)
  - Always use the `.surface` class for consistent card styling.

### D5. What to avoid

- **Gradient-heavy backgrounds** — the current `.animated-grid` and `.mesh` are tasteful. Don't go overboard.
- **Stock photography** — unless it's high-quality, industry-specific imagery. Better to use no photos than bad photos.
- **Over-animation** — keep motion purposeful (see Section E).
- **Dark mode** — not needed for an IT procurement site. Keep `color-scheme: light` as-is.
- **Claiming partnerships** — the current "sourced technologies" language is correct. Don't add partner logos or badges.

---

## SECTION E — Motion/Interaction Strategy

### E1. Current state

The site uses CSS-only animations defined in [`globals.css`](app/globals.css) with classes like `.motion-fade`, `.motion-slide-up`, `.motion-stagger`, `.floating-card`. It respects `prefers-reduced-motion`. There's no Framer Motion dependency.

**This is good.** CSS animations are lighter, faster, and don't add bundle size.

### E2. Where animation should exist

| Element | Animation | Duration | Purpose |
|---------|-----------|----------|---------|
| Hero heading | Slide-up + fade | 680ms | Draw attention |
| Section reveals | `.motion-section` (scroll-triggered) | 720ms | Progressive disclosure |
| Card grids | Stagger children | 90ms delay each | Visual rhythm |
| Quote cart items | Slide-up on add | 300ms | Feedback |
| Quote cart count | Scale pulse on change | 200ms | Micro-interaction |
| Navigation | None (instant) | — | Performance |
| Page transitions | None (instant) | — | Procurement users want speed |

### E3. Where animation should NOT exist

- **Page transitions** — IT buyers don't want to wait for animations between pages.
- **Parallax** — heavy, accessibility-hostile, doesn't fit procurement.
- **Scroll-jacking** — never.
- **Auto-playing video** — bandwidth waste, doesn't fit the audience.

### E4. Performance rules

- All animations use `transform` and `opacity` only (GPU-composited).
- `prefers-reduced-motion: reduce` kills all animation — already implemented.
- No JavaScript animation libraries. Keep the CSS-only approach.

---

## SECTION F — Content Strategy

### F1. Headline direction

Move from generic IT statements to procurement-specific, action-oriented copy:

| Current | Recommended |
|---------|-------------|
| "IT infrastructure and procurement solutions" | "Technology sourcing and project delivery for Philippine organizations" |
| "Solutions" | "How we move IT requirements forward" |
| "Products" | "Quote-ready technology catalog" |
| "Government Procurement" | "Public sector IT procurement support" |

### F2. Product categories

Keep the current 7 categories. They're well-chosen. But each needs **at least 3–5 products** to feel credible.

Priority expansion:
1. **Network Equipment** (currently 2 products — add firewall, wireless controller, structured cabling kit)
2. **Licensed Software** (currently 1 product — add endpoint security, OS licensing, backup software)
3. **Computers & Laptops** (add workstation class, thin client option)

### F3. Brand/vendor wording

**Always use legally safe language:**
- "Dell Latitude-class" NOT "Dell Latitude"
- "Cisco-class switching" NOT "Cisco switches"
- "Fortinet-class firewall options" NOT "Fortinet firewalls"
- "Microsoft 365 license sourcing" NOT "Microsoft 365"

This is already done correctly in the current data. Maintain this discipline.

### F4. Procurement workflow

The 7-step workflow in the Hero is strong. Keep it:
1. Requirement → 2. Specification Review → 3. Supplier Canvass → 4. Quotation → 5. Procurement → 6. Delivery

### F5. Government procurement wording

The current government page copy is legally safe. Key phrases to maintain:
- "supplier-ready support"
- "specification matching"
- "equivalent options"
- "quotation support"
- "procurement documentation support"

**Never use:** "PhilGEPS accredited", "government accredited", "BIR registered" (until actual registration).

### F6. ERP teaser wording

The ERP page is honest about "Coming Soon." That's correct. Keep it aspirational but not over-promising.

---

## SECTION G — Lead Capture / RFQ Strategy

### G1. Current state: Fake forms

All three form components (`ContactForm`, `QuoteCart`, `QuoteRequestForm`) are frontend-only. They call `event.preventDefault()` then `setSubmitted(true)`. No data leaves the browser.

**This is the #1 credibility problem.** Every form is a dead end.

### G2. Recommended approach: Phase-based

**Phase 4 (Now):** Frontend-only with `mailto:` fallback
- Keep the forms as-is but add a real submit action.
- On submit, compose a `mailto:` link with form data and open the email client.
- This requires zero backend and delivers leads immediately.

**Phase 5 (Later):** Server action → email endpoint
- Add a Next.js server action at `app/actions/submit-rfq.ts`.
- Use a transactional email service (Resend, SendGrid, or Brevo free tier).
- Send RFQ data to `sales@haciensolutions.com`.

**Phase 6 (Future):** ERP API integration
- Post RFQ data to HACIEN ERP's `/api/v1/opportunities` endpoint.
- Create a lead/opportunity record automatically.

### G3. Form fields needed

```typescript
type RfqSubmission = {
  contactName: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  budgetRange: string;
  timeline: string;
  notes: string;
  items: { productId: string; name: string; quantity: number; indicativePrice: number }[];
  submittedAt: string;
};
```

### G4. Spam protection

**Phase 4:** Simple honeypot field (hidden input that bots fill).
**Phase 5:** reCAPTCHA v3 or Turnstile (Cloudflare, free).
**Phase 6:** Rate limiting at the API gateway.

### G5. Privacy/terms

Already partially covered in [`privacy/page.tsx`](app/privacy/page.tsx) and [`terms/page.tsx`](app/terms/page.tsx). Add:
- Checkbox on all forms: "I agree to the Privacy Policy and Terms of Use."
- Link to privacy and terms pages from every form.

---

## SECTION H — Stability & QA Strategy

### H1. Prevent 503s: Build-time checks

Add a `prebuild` script to `package.json`:

```json
{
  "scripts": {
    "prebuild": "tsx scripts/validate-data.ts",
    "build": "next build",
    "postbuild": "tsx scripts/validate-routes.ts"
  }
}
```

### H2. Validation script (`scripts/validate-data.ts`)

```typescript
// Validates:
// 1. All product slugs are unique
// 2. All product categorySlugs reference existing categories
// 3. All solution slugs are unique
// 4. No empty required fields
// 5. All prices are positive numbers
// Exit with code 1 on failure (blocks build)
```

### H3. Route crawler (`scripts/validate-routes.ts`)

```typescript
// After build, crawl all static pages:
// 1. /, /about, /solutions, /products, etc.
// 2. All /products/[category] from generateStaticParams
// 3. Check each returns 200
// 4. Report any failures
```

### H4. Runtime guards

- **`error.tsx`** at every route level: `app/error.tsx`, `app/products/error.tsx`, etc.
- **`not-found.tsx`**: `app/not-found.tsx` with branded 404.
- **`loading.tsx`**: `app/loading.tsx` with skeleton UI.

### H5. Hostinger-specific

- Check Hostinger's Node.js logs after every deployment.
- Ensure the Node.js version matches what Next.js 16 expects (Node 18+).
- Monitor memory usage — shared hosting often has 256–512MB limits.
- Consider adding a health check endpoint: `app/api/health/route.ts` returning `{ status: "ok" }`.

---

## SECTION I — Implementation Roadmap

### Phase 0: Urgent Bug Fix

| Goal | Fix the `/products/network-equipment` 503 |
|------|------------------------------------------|
| **Files** | `app/not-found.tsx` (new), `app/error.tsx` (new), `app/loading.tsx` (new) |
| **Risk** | None — additive only |
| **Acceptance** | `/products/network-equipment` returns 200 or branded 404; no route returns default Next.js error page |

### Phase 1: Architecture Cleanup

| Goal | Add missing infrastructure: error boundaries, loading states, SEO files, logo |
|------|-------------------------------------------------------------------------------|
| **Files** | `app/not-found.tsx`, `app/error.tsx`, `app/loading.tsx`, `app/robots.ts`, `app/sitemap.ts`, `public/logo.svg`, `public/favicon.ico`, `scripts/validate-data.ts`, `package.json` |
| **Risk** | Low — additive files, no existing behavior changed |
| **Acceptance** | All routes have branded error/loading/404 states; sitemap and robots return valid content; build fails on data validation errors |

### Phase 2: Design System

| Goal | Extract design tokens, add Inter font, create consistent card/section system |
|------|---------------------------------------------------------------------------|
| **Files** | `app/globals.css`, `tailwind.config.ts` (or CSS variable file), `components/Surface.tsx`, `components/Section.tsx`, layout components |
| **Risk** | Medium — touches global styles, may cause visual regressions |
| **Acceptance** | Visual consistency across all pages; typography uses Inter; no broken layouts |

### Phase 3: Homepage Rebuild

| Goal | Replace generic sections with content-rich, procurement-focused homepage |
|------|------------------------------------------------------------------------|
| **Files** | `app/page.tsx`, `components/HomeV3Sections.tsx`, `components/Hero.tsx`, new section components |
| **Risk** | Medium — homepage is the most visited page |
| **Acceptance** | Homepage clearly communicates HACIEN's value proposition within 5 seconds; all CTAs lead to real destinations |

### Phase 4: Catalog + RFQ

| Goal | Add product detail pages, expand catalog to 15+ products, RFQ email delivery |
|------|-----------------------------------------------------------------------------|
| **Files** | `app/products/[category]/[product]/page.tsx`, `data/products.ts`, `app/actions/submit-rfq.ts`, `components/QuoteCart.tsx`, `components/ContactForm.tsx` |
| **Risk** | Medium — new dynamic routes, form submission logic |
| **Acceptance** | Every product has a detail page; RFQ form sends email to sales@haciensolutions.com; catalog has at least 15 products across 7 categories |

### Phase 5: Lead Delivery

| Goal | Real email delivery for all forms, spam protection, privacy consent |
|------|--------------------------------------------------------------------|
| **Files** | `app/actions/submit-rfq.ts`, `app/actions/submit-contact.ts`, form components, `app/privacy/page.tsx` |
| **Risk** | Medium — depends on email service setup |
| **Acceptance** | All form submissions deliver to sales@haciensolutions.com with proper formatting; spam honeypot active; privacy checkbox required |

### Phase 6: ERP Integration (Future)

| Goal | Connect website RFQ to HACIEN ERP opportunity pipeline |
|------|--------------------------------------------------------|
| **Files** | `app/actions/submit-rfq.ts`, `lib/api-client.ts` |
| **Risk** | Depends on ERP API availability |
| **Acceptance** | RFQ submissions create opportunity records in ERP; status syncs back to website |

---

## SECTION J — Final Recommendation

### J1. Continue with current repo or rebuild?

**Continue with the current repo.** The foundation is solid:
- Next.js 16 with Turbopack is modern and fast.
- The component architecture is clean and composable.
- The data-as-static-TS pattern is correct for the current stage.
- The legal-safe copy is already well-written.

**Do not rebuild from scratch.** A rebuild would waste the credit already spent on getting the architecture, components, and legal copy right. The problems are about depth, completeness, and real form delivery — not structural flaws.

### J2. Keep Hostinger Node.js?

**Yes, for now.** Hostinger Node.js is sufficient for a static-heavy Next.js site with a few server actions. Monitor:
- Memory usage (the 503 suggests possible resource limits).
- Response times under load.
- If problems persist, consider Cloudflare Pages + static export (no Node.js needed) or a VPS with more resources.

### J3. Static-only pages first?

**Yes.** The site should be 95% static. The only dynamic parts should be:
- Form submissions (server actions).
- Future ERP API calls.

Everything else — product pages, category pages, solutions, about, contact — should be statically generated at build time. This eliminates the 503 risk entirely for content pages.

### J4. Lowest-risk path to a premium website

```
Phase 0 (urgent)  →  Fix the 503, add error boundaries
Phase 1 (cleanup) →  SEO, logo, validation scripts
Phase 2 (design)  →  Consistent visual system
Phase 3 (home)    →  Content-rich homepage
Phase 4 (catalog) →  Product detail pages, RFQ email
Phase 5 (leads)   →  Real form delivery, spam protection
```

**The single highest-impact action:** Make the RFQ form actually send an email. A form that works is infinitely more credible than a beautiful form that does nothing.

**The single most important design decision:** Invest in a proper logo (SVG) and brand identity. The "H" square placeholder signals "unfinished" more than any other element on the site.
