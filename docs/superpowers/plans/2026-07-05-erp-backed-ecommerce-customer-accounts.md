# HACIEN ERP-Backed Ecommerce and Customer Accounts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build HACIEN ecommerce and customer accounts with HACIEN ERP as the sole source of truth, while keeping the standalone website as the storefront and customer-facing portal.

**Architecture:** The ERP owns product creation, product publication, catalog, customer identity, order intent, manual payment review, quotations, sales orders, invoices, receipts, inventory, and audit history. The website never owns a second ecommerce database and does not hardcode sellable products; it calls ERP ecommerce endpoints from server actions and renders customer-safe state. The catalog is two-layered (ERP Product Master + ERP Product Publication), so public copy/slug/snapshot controls remain separate from operational inventory records. Direct checkout starts as ERP order intent plus manual payment review, with a sandbox payment adapter added behind feature flags before any production gateway is enabled.

**Tech Stack:** HACIEN ERP NestJS API, Prisma/Postgres via `packages/db/prisma/schema.prisma`, existing Gateway and Customer Identity modules, standalone HACIEN Website Next.js 16 App Router, TypeScript, Server Actions, Playwright, Jest, existing teammate tooling, HEDS design constraints.

---

## Approved Decisions

- ERP is the sole source of truth.
- Customer signup is open signup.
- Payment posture is manual payment first, plus a payment gateway sandbox adapter.
- Official invoices and tax documents are not automated by ecommerce MVP.
- Ecommerce work starts now, despite current ERP dirty work, but implementation must isolate changes and avoid staging unrelated files.
- Products are added and maintained in HACIEN ERP Product Master. Website product data is temporary fallback/demo content only and must be phased out as a source of truth.
- Supplier product/API ingestion is candidate-only and maps into Product Master only after review and approval.
- Payment provider integration is planned as a future production lane; live provider paths should stay behind a secure feature-gated adapter layer.

## Superseded Plan

This plan supersedes the website-local persistence sections in:

- `/Users/jerwinmancenido/hacien-website/docs/superpowers/plans/2026-07-05-ecommerce-customer-accounts.md`

Do not implement that plan's website-owned `prisma/schema.prisma`, website-local customer auth database, website admin product database, hardcoded sellable catalog, or website-owned order/payment tables.

## Current State Summary

Website verified:

- RFQ submission already posts to ERP Gateway through `/gateway/submissions`.
- Product data is currently static in `/Users/jerwinmancenido/hacien-website/data/products.ts`, but this must become temporary fallback/demo content only.
- `/login` and `/signup` are informational access pages, not real credential pages.
- No website auth provider, ORM, checkout, order, payment, or customer account persistence exists.

ERP verified:

- Gateway exists and stores public submissions in `GatewaySubmission`.
- Gateway currently supports `RFQ`, `CONTACT`, `SUPPORT`, and `GOVERNMENT_PROCUREMENT`.
- Customer Identity exists with `CustomerUser`, `CustomerOrganization`, `CustomerMembership`, verifications, invitations, roles, permissions, and visibility assignments.
- Inventory exists with `Product`, categories, brands, UOMs, stock, availability, verification status, and evidence reference.
- ERP web already has Product Master UI at `/products`, backed by `/inventory/products`, where products, categories, brands, UOMs, price, stock, availability, verification status, and evidence reference are managed.
- Sales orders currently require quotation flow at the DTO/service boundary.
- Sales invoices currently require delivery receipt flow.
- Official receipts exist, but ecommerce MVP must not auto-post receipts or tax invoices.

## File Structure

ERP files to create:

- `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/ecommerce.module.ts` - wires ecommerce API into Nest.
- `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/ecommerce.controller.ts` - public-safe ecommerce endpoints.
- `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/ecommerce.service.ts` - catalog projection, signup intake, order intent, manual payment review payloads.
- `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/dto/ecommerce.dto.ts` - validated request DTOs.
- `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/ecommerce.service.spec.ts` - unit tests for catalog filtering, signup payload, and order intent.
- `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/product-publication.service.ts` - publish/unpublish ERP products to the website catalog.
- `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/product-publication.service.spec.ts` - tests for product publication rules.

ERP files to modify:

- `/Users/jerwinmancenido/hacien/apps/api/src/app.module.ts` - import `EcommerceModule`.
- `/Users/jerwinmancenido/hacien/apps/api/src/admin/auth.guard.ts` - make only selected public ecommerce endpoints public.
- `/Users/jerwinmancenido/hacien/apps/api/src/gateway/gateway.policy.ts` - add `ECOMMERCE_ORDER` only after tests prove Gateway accepts and references it.
- `/Users/jerwinmancenido/hacien/apps/api/src/gateway/gateway.service.ts` - update acknowledgement text for ecommerce order intent if required.
- `/Users/jerwinmancenido/hacien/packages/db/prisma/schema.prisma` - add `ProductPublication` after local migration approval; this model stores website-facing slug/specs/images/purchase mode and does not replace `Product`.
- `/Users/jerwinmancenido/hacien/apps/web/app/products/page.tsx` - add a publish-to-website panel or tab to existing ERP Product Master.
- `/Users/jerwinmancenido/hacien/apps/web/app/actions/product.ts` - expose product publication actions for the ERP Product Master UI.

Website files to create:

- `/Users/jerwinmancenido/hacien-website/lib/erp/ecommerce-types.ts` - shared website-side DTO/result types.
- `/Users/jerwinmancenido/hacien-website/lib/erp/ecommerce-client.ts` - server-only ERP ecommerce client.
- `/Users/jerwinmancenido/hacien-website/app/actions/customer-signup.ts` - signup action calling ERP.
- `/Users/jerwinmancenido/hacien-website/app/actions/order-intent.ts` - checkout/order intent action calling ERP.
- `/Users/jerwinmancenido/hacien-website/components/account/SignupForm.tsx` - open signup form using HEDS styles.
- `/Users/jerwinmancenido/hacien-website/components/checkout/ManualPaymentIntentForm.tsx` - manual payment order-intent form.

Website files to modify:

- `/Users/jerwinmancenido/hacien-website/app/signup/page.tsx` - replace informational copy with open signup, while keeping approval-safe language.
- `/Users/jerwinmancenido/hacien-website/app/login/page.tsx` - keep workspace login route until customer sessions exist; do not claim website-native login before ERP session API exists.
- `/Users/jerwinmancenido/hacien-website/app/products/page.tsx` - render ERP catalog when available and fallback only to non-sellable demo/static data when ERP is unavailable.
- `/Users/jerwinmancenido/hacien-website/app/products/[category]/page.tsx` - render ERP category/catalog data when available.
- `/Users/jerwinmancenido/hacien-website/app/product/[slug]/page.tsx` - resolve ERP product publication by slug before local fallback.
- `/Users/jerwinmancenido/hacien-website/components/ProductDetail.tsx` - render RFQ CTA by default and checkout/order-intent CTA only for ERP-published products that permit it.
- `/Users/jerwinmancenido/hacien-website/components/ProductCard.tsx` - show ERP publication purchase mode labels without claiming universal checkout.
- `/Users/jerwinmancenido/hacien-website/scripts/validate-data.ts` - keep local fallback data valid, but do not treat it as the sellable catalog.

## PR Slicing

1. PR 1: ERP-backed architecture docs and API contract.
2. PR 2: ERP Product Publication model and Product Master UI setup; products are added in ERP, not website code.
3. PR 3: ERP ecommerce API foundation with published catalog, signup request, and order intent stored as Gateway submissions.
4. PR 4: Website ERP ecommerce client, open signup UI, ERP catalog rendering, and order-intent UI behind feature flags.
5. PR 5: Customer session/account API design and implementation using ERP customer identity; no internal admin auth reuse.
6. PR 6: Payment sandbox adapter and webhook verification in sandbox only.
7. PR 7: Customer account dashboard pulling customer-safe ERP history.
8. PR 8: Production hardening, smoke tests, legal copy review, and deployment checklist.
9. Future PR A: Supplier product feed/connectors (manual upload + API candidates only).
10. Future PR B: Supplier-to-ERP matching review and publication readiness pipeline.
11. Future PR C: Live payment provider abstraction + adapter + webhook endpoints.

## Task 1: Create ERP-Backed Ecommerce ADR

**Files:**

- Create: `/Users/jerwinmancenido/hacien-website/docs/ecommerce/erp-backed-ecommerce-architecture.md`
- Create: `/Users/jerwinmancenido/hacien-website/docs/ecommerce/ecommerce-api-contract.md`

- [ ] **Step 1: Create architecture decision doc**

Create `/Users/jerwinmancenido/hacien-website/docs/ecommerce/erp-backed-ecommerce-architecture.md`:

```markdown
# HACIEN ERP-Backed Ecommerce Architecture

## Decision

HACIEN ERP is the sole source of truth for ecommerce. The standalone HACIEN website is the storefront and customer-facing portal client.

## Approved Business Rules

- Customer signup is open, but organization/customer access may still require verification before sensitive records are visible.
- Manual payment order intent is allowed first.
- Payment gateway work starts in sandbox only.
- Ecommerce must not automate official tax invoices, official receipts, or accounting postings in MVP.
- Hardware, project-scoped, and variable-availability products remain RFQ-first unless explicitly approved for checkout.

## Ownership

- ERP owns Product Master, Product Publication, customers, customer users, organizations, memberships, product catalog, order intent, quotation conversion, sales orders, invoices, receipts, and audit logs.
- Products are added through ERP Product Master and published through ERP Product Publication settings.
- Website owns public rendering, customer-safe forms, RFQ/cart UX, and server-side calls to ERP.

## Non-Goals

- No website-local ecommerce database.
- No website-local product admin database.
- No hardcoded sellable product catalog in the website.
- No automatic official invoice generation.
- No direct Sales Order creation from public checkout until quotation, inventory, approval, payment, and tax rules are approved.
- No card data storage in HACIEN systems.
```

- [ ] **Step 2: Create API contract doc**

Create `/Users/jerwinmancenido/hacien-website/docs/ecommerce/ecommerce-api-contract.md`:

````markdown
# HACIEN Ecommerce API Contract

Base URL: `HACIEN_API_PUBLIC_URL` or `HACIEN_GATEWAY_API_URL`, normalized to `/api/v1`.

## Product Setup Flow

Products are added in ERP Product Master, not in website code.

1. Create or update the operational product in ERP `/products`.
2. Set SKU, legally safe generic public name, category, brand, UOM, price, stock, availability, verification status, and evidence reference.
3. Open the product's Website Publication panel.
4. Configure slug, public name, public description, specs, image, purchase mode, manual payment eligibility, sandbox payment eligibility, and publication status.
5. Publish only VERIFIED products.

## GET /ecommerce/catalog

Returns public-safe ERP products.

Response:

```json
{
  "items": [
    {
      "id": "uuid",
      "publicationId": "publication-uuid",
      "slug": "latitude-class-business-laptop",
      "sku": "HACIEN-SKU",
      "name": "Dell Latitude-class business laptop",
      "description": "Customer-safe public description",
      "category": "Computers",
      "isAvailable": true,
      "purchaseMode": "rfq",
      "checkoutEnabled": false,
      "manualPaymentEnabled": false,
      "sandboxPaymentEnabled": false,
      "currency": "PHP",
      "price": null,
      "image": null,
      "specs": {
        "processor": "Intel Core-class options"
      }
    }
  ]
}
```

## GET /ecommerce/catalog/:slug

Returns one public-safe ERP product publication by slug.

Response:

```json
{
  "item": {
    "id": "uuid",
    "publicationId": "publication-uuid",
    "slug": "latitude-class-business-laptop",
    "sku": "HACIEN-SKU",
    "name": "Dell Latitude-class business laptop",
    "description": "Customer-safe public description",
    "category": "Computers",
    "isAvailable": true,
    "purchaseMode": "rfq",
    "checkoutEnabled": false,
    "manualPaymentEnabled": false,
    "sandboxPaymentEnabled": false,
    "currency": "PHP",
    "price": null,
    "image": null,
    "specs": {
      "processor": "Intel Core-class options"
    }
  }
}
```

## POST /ecommerce/signup

Creates an open customer signup request in ERP Customer Identity.

Request:

```json
{
  "contactName": "Maria Santos",
  "email": "maria@example.com",
  "organizationName": "Example Corporation",
  "phone": "+63 900 000 0000",
  "sourceUrl": "https://haciensolutions.com/signup"
}
```

Response:

```json
{
  "success": true,
  "referenceNumber": "CUS-2026-000001",
  "status": "PENDING_VERIFICATION",
  "message": "Account request received. Verify your email and wait for access approval."
}
```

## POST /ecommerce/order-intents

Creates a customer-safe ecommerce order intent in ERP Gateway. It does not create an official Sales Order, invoice, receipt, or accounting entry.

Request:

```json
{
  "customerEmail": "maria@example.com",
  "organizationName": "Example Corporation",
  "paymentMode": "manual",
  "items": [
    {
      "productId": "erp-product-uuid",
      "publicationId": "product-publication-uuid",
      "sku": "HACIEN-SKU",
      "name": "Checkout-eligible service",
      "quantity": 1
    }
  ],
  "sourceUrl": "https://haciensolutions.com/checkout"
}
```

Response:

```json
{
  "success": true,
  "referenceNumber": "ECO-2026-000001",
  "status": "RECEIVED",
  "message": "Order intent received for manual payment review."
}
```
````

- [ ] **Step 3: Verify docs**

Run:

```bash
rg -n "website-local ecommerce database|official invoice|ECOMMERCE_ORDER|/ecommerce/catalog" /Users/jerwinmancenido/hacien-website/docs/ecommerce
```

Expected: docs explicitly reject website-local persistence, reject official invoice automation, and define the ERP ecommerce API contract.

- [ ] **Step 4: Commit only docs**

Run:

```bash
git -C /Users/jerwinmancenido/hacien-website status --short
git -C /Users/jerwinmancenido/hacien-website add docs/ecommerce/erp-backed-ecommerce-architecture.md docs/ecommerce/ecommerce-api-contract.md
git -C /Users/jerwinmancenido/hacien-website commit -m "docs: define ERP-backed ecommerce architecture"
```

Expected: only the two ecommerce docs are staged and committed.

## Task 2: Add ERP Product Publication Setup

**Purpose:**

Products are added in ERP Product Master, not in website code. Product Master remains the operational record for SKU, price, stock, category, brand, UOM, availability, and verification evidence. Product Publication is the ecommerce/website layer that decides whether a product appears publicly, what URL slug it uses, which purchase mode it supports, and what customer-safe specs/images/copy are shown.

**Files:**

- Modify: `/Users/jerwinmancenido/hacien/packages/db/prisma/schema.prisma`
- Modify: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/dto/ecommerce.dto.ts`
- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/product-publication.service.ts`
- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/product-publication.service.spec.ts`
- Modify: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/ecommerce.controller.ts`
- Modify: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/ecommerce.module.ts`
- Modify: `/Users/jerwinmancenido/hacien/apps/web/app/actions/product.ts`
- Modify: `/Users/jerwinmancenido/hacien/apps/web/app/products/page.tsx`

- [ ] **Step 1: Write publication service tests**

Create `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/product-publication.service.spec.ts`:

```ts
import { BadRequestException } from '@nestjs/common';
import { ProductPublicationService } from './product-publication.service';

describe('ProductPublicationService', () => {
  const prisma = {
    product: { findFirst: jest.fn() },
    productPublication: {
      findFirst: jest.fn(),
      upsert: jest.fn(),
    },
  };
  const companyContext = { getCompanyId: jest.fn().mockResolvedValue('company-1') };
  const service = new ProductPublicationService(prisma as any, companyContext as any);

  beforeEach(() => {
    jest.clearAllMocks();
    companyContext.getCompanyId.mockResolvedValue('company-1');
  });

  it('blocks publishing unknown products', async () => {
    prisma.product.findFirst.mockResolvedValue(null);

    await expect(
      service.upsertPublication('missing-product', {
        slug: 'missing-product',
        publicName: 'Missing product',
        purchaseMode: 'rfq',
        publicationStatus: 'DRAFT',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('requires verified evidence before publication status PUBLISHED', async () => {
    prisma.product.findFirst.mockResolvedValue({
      id: 'product-1',
      companyId: 'company-1',
      verificationStatus: 'PILOT',
      evidenceReference: null,
    });

    await expect(
      service.upsertPublication('product-1', {
        slug: 'published-product',
        publicName: 'Published product',
        purchaseMode: 'rfq',
        publicationStatus: 'PUBLISHED',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('creates a draft publication for an ERP product', async () => {
    prisma.product.findFirst.mockResolvedValue({
      id: 'product-1',
      companyId: 'company-1',
      verificationStatus: 'PILOT',
      evidenceReference: null,
    });
    prisma.productPublication.upsert.mockResolvedValue({
      productId: 'product-1',
      slug: 'laptop-class-product',
      purchaseMode: 'rfq',
      publicationStatus: 'DRAFT',
    });

    const result = await service.upsertPublication('product-1', {
      slug: 'laptop-class-product',
      publicName: 'Dell Latitude-class laptop',
      purchaseMode: 'rfq',
      publicationStatus: 'DRAFT',
    });

    expect(result).toMatchObject({
      productId: 'product-1',
      slug: 'laptop-class-product',
      purchaseMode: 'rfq',
      publicationStatus: 'DRAFT',
    });
  });
});
```

- [ ] **Step 2: Add ProductPublication schema**

Modify `/Users/jerwinmancenido/hacien/packages/db/prisma/schema.prisma`:

```prisma
model ProductPublication {
  id                    String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  companyId             String   @map("company_id") @db.Uuid
  company               Company  @relation(fields: [companyId], references: [id], onDelete: Restrict)
  productId             String   @map("product_id") @db.Uuid
  product               Product  @relation(fields: [productId, companyId], references: [id, companyId], onDelete: Cascade)
  slug                  String   @db.VarChar(160)
  publicName            String   @map("public_name") @db.VarChar(255)
  publicDescription     String?  @map("public_description") @db.Text
  purchaseMode          String   @default("rfq") @map("purchase_mode") @db.VarChar(30)
  publicationStatus     String   @default("DRAFT") @map("publication_status") @db.VarChar(30)
  checkoutEnabled       Boolean  @default(false) @map("checkout_enabled")
  manualPaymentEnabled  Boolean  @default(false) @map("manual_payment_enabled")
  sandboxPaymentEnabled Boolean  @default(false) @map("sandbox_payment_enabled")
  currency              String   @default("PHP") @db.VarChar(3)
  publicPrice           Decimal? @map("public_price") @db.Decimal(15, 2)
  primaryImageUrl       String?  @map("primary_image_url") @db.Text
  imageGallery          Json?    @map("image_gallery") @db.JsonB
  specs                 Json?    @db.JsonB
  sortOrder             Int      @default(0) @map("sort_order")
  publishedAt           DateTime? @map("published_at") @db.Timestamptz
  createdAt             DateTime @default(now()) @map("created_at") @db.Timestamptz
  updatedAt             DateTime @default(now()) @updatedAt @map("updated_at") @db.Timestamptz

  @@unique([companyId, slug], map: "uk_product_publications_company_slug")
  @@unique([companyId, productId], map: "uk_product_publications_company_product")
  @@index([companyId, publicationStatus])
  @@index([companyId, purchaseMode])
  @@map("product_publications")
  @@schema("inventory")
}
```

Also add relations:

```prisma
// Inside model Product
publication ProductPublication?

// Inside model Company
productPublications ProductPublication[]
```

- [ ] **Step 3: Generate migration locally**

Run:

```bash
npm run db:generate --workspace @hacien/db
npm run db:migrate --workspace @hacien/db -- --name add_product_publications
```

Expected: local migration is created and Prisma client generates. Do not apply this to production until Jerwin approves a deployment/migration window.

- [ ] **Step 4: Add publication DTOs**

Add to `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/dto/ecommerce.dto.ts`:

```ts
import { IsBoolean, IsIn, IsInt, IsNumber, IsObject, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UpsertProductPublicationDto {
  @IsString()
  @MaxLength(160)
  slug: string;

  @IsString()
  @MaxLength(255)
  publicName: string;

  @IsOptional()
  @IsString()
  publicDescription?: string;

  @IsIn(['rfq', 'checkout', 'hybrid'])
  purchaseMode: 'rfq' | 'checkout' | 'hybrid';

  @IsIn(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
  publicationStatus: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

  @IsOptional()
  @IsBoolean()
  checkoutEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  manualPaymentEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  sandboxPaymentEnabled?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  publicPrice?: number;

  @IsOptional()
  @IsString()
  primaryImageUrl?: string;

  @IsOptional()
  @IsObject()
  specs?: Record<string, unknown>;

  @IsOptional()
  @IsInt()
  sortOrder?: number;
}
```

- [ ] **Step 5: Add publication service**

Create `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/product-publication.service.ts`:

```ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CompanyContextService } from '../admin/company-context.service';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertProductPublicationDto } from './dto/ecommerce.dto';

function normalizeSlug(slug: string) {
  return slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

@Injectable()
export class ProductPublicationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly companyContext: CompanyContextService,
  ) {}

  async upsertPublication(productId: string, dto: UpsertProductPublicationDto) {
    const companyId = await this.companyContext.getCompanyId();
    const product = await this.prisma.product.findFirst({ where: { id: productId, companyId } });
    if (!product) {
      throw new BadRequestException('Product does not exist in ERP Product Master.');
    }

    const slug = normalizeSlug(dto.slug);
    if (!slug) {
      throw new BadRequestException('Publication slug is required.');
    }

    const publishing = dto.publicationStatus === 'PUBLISHED';
    if (publishing && product.verificationStatus !== 'VERIFIED') {
      throw new BadRequestException('Only VERIFIED ERP products can be published to the public catalog.');
    }

    if (dto.purchaseMode === 'checkout' && !dto.checkoutEnabled) {
      throw new BadRequestException('Checkout products must explicitly enable checkout.');
    }

    const now = new Date();
    return this.prisma.productPublication.upsert({
      where: { companyId_productId: { companyId, productId } },
      create: {
        companyId,
        productId,
        slug,
        publicName: dto.publicName.trim(),
        publicDescription: dto.publicDescription?.trim(),
        purchaseMode: dto.purchaseMode,
        publicationStatus: dto.publicationStatus,
        checkoutEnabled: dto.checkoutEnabled ?? false,
        manualPaymentEnabled: dto.manualPaymentEnabled ?? false,
        sandboxPaymentEnabled: dto.sandboxPaymentEnabled ?? false,
        publicPrice: dto.publicPrice !== undefined ? new Prisma.Decimal(dto.publicPrice) : null,
        primaryImageUrl: dto.primaryImageUrl?.trim(),
        specs: dto.specs ?? Prisma.JsonNull,
        sortOrder: dto.sortOrder ?? 0,
        publishedAt: publishing ? now : null,
      },
      update: {
        slug,
        publicName: dto.publicName.trim(),
        publicDescription: dto.publicDescription?.trim(),
        purchaseMode: dto.purchaseMode,
        publicationStatus: dto.publicationStatus,
        checkoutEnabled: dto.checkoutEnabled ?? false,
        manualPaymentEnabled: dto.manualPaymentEnabled ?? false,
        sandboxPaymentEnabled: dto.sandboxPaymentEnabled ?? false,
        publicPrice: dto.publicPrice !== undefined ? new Prisma.Decimal(dto.publicPrice) : null,
        primaryImageUrl: dto.primaryImageUrl?.trim(),
        specs: dto.specs ?? Prisma.JsonNull,
        sortOrder: dto.sortOrder ?? 0,
        publishedAt: publishing ? now : null,
      },
      include: { product: { include: { category: true, brand: true, unitOfMeasure: true } } },
    });
  }

  async listPublishedCatalog() {
    const companyId = await this.companyContext.getCompanyId();
    return this.prisma.productPublication.findMany({
      where: {
        companyId,
        publicationStatus: 'PUBLISHED',
        product: {
          isAvailable: true,
          verificationStatus: 'VERIFIED',
        },
      },
      include: { product: { include: { category: true, brand: true, unitOfMeasure: true } } },
      orderBy: [{ sortOrder: 'asc' }, { publicName: 'asc' }],
    });
  }

  async findPublishedBySlug(slug: string) {
    const companyId = await this.companyContext.getCompanyId();
    const normalizedSlug = normalizeSlug(slug);
    const publication = await this.prisma.productPublication.findFirst({
      where: {
        companyId,
        slug: normalizedSlug,
        publicationStatus: 'PUBLISHED',
        product: {
          isAvailable: true,
          verificationStatus: 'VERIFIED',
        },
      },
      include: { product: { include: { category: true, brand: true, unitOfMeasure: true } } },
    });

    if (!publication) {
      throw new BadRequestException('Published product not found.');
    }

    return publication;
  }
}
```

- [ ] **Step 6: Wire publication API**

Add endpoints to `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/ecommerce.controller.ts`:

```ts
@Patch('products/:productId/publication')
upsertProductPublication(
  @Param('productId') productId: string,
  @Body() dto: UpsertProductPublicationDto,
) {
  return this.productPublications.upsertPublication(productId, dto);
}
```

Inject `ProductPublicationService` in the controller and add it to `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/ecommerce.module.ts` providers/exports.

- [ ] **Step 7: Add ERP Product Master publication panel**

Modify `/Users/jerwinmancenido/hacien/apps/web/app/products/page.tsx` so each product row can open a "Website publication" editor with:

- slug;
- public name;
- public description;
- purchase mode: `rfq`, `checkout`, `hybrid`;
- publication status: `DRAFT`, `PUBLISHED`, `ARCHIVED`;
- checkout enabled;
- manual payment enabled;
- sandbox payment enabled;
- public price;
- primary image URL;
- specs JSON text area;
- sort order.

The panel must show: "Only VERIFIED products can be published."

- [ ] **Step 8: Verify publication setup**

Run:

```bash
npm run test --workspace @hacien/api -- product-publication.service.spec.ts --runInBand
npm run build:api
npm run build:web
```

Expected: product publication tests pass, API builds, and ERP web builds.

## Task 3: Add ERP Ecommerce API Module

**Files:**

- Modify: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/dto/ecommerce.dto.ts`
- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/ecommerce.service.ts`
- Modify: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/ecommerce.controller.ts`
- Modify: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/ecommerce.module.ts`
- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/ecommerce.service.spec.ts`
- Modify: `/Users/jerwinmancenido/hacien/apps/api/src/app.module.ts`
- Modify: `/Users/jerwinmancenido/hacien/apps/api/src/admin/auth.guard.ts`

- [ ] **Step 1: Write service tests**

Create `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/ecommerce.service.spec.ts`:

```ts
import { EcommerceService } from './ecommerce.service';

describe('EcommerceService', () => {
  const productPublications = {
    listPublishedCatalog: jest.fn(),
  };

  const gatewayService = {
    createSubmission: jest.fn(),
  };

  const customerIdentity = {
    createUser: jest.fn(),
    createOrganization: jest.fn(),
    createMembership: jest.fn(),
    createMembershipVerification: jest.fn(),
    issueEmailVerification: jest.fn(),
  };

  const service = new EcommerceService(productPublications as any, gatewayService as any, customerIdentity as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns only explicitly published catalog products', async () => {
    productPublications.listPublishedCatalog.mockResolvedValue([
      {
        id: 'publication-1',
        slug: 'latitude-class-business-laptop',
        publicName: 'Dell Latitude-class business laptop',
        publicDescription: 'Public description',
        purchaseMode: 'rfq',
        checkoutEnabled: false,
        manualPaymentEnabled: false,
        sandboxPaymentEnabled: false,
        publicPrice: null,
        primaryImageUrl: null,
        specs: { processor: 'Intel Core-class options' },
        product: {
          id: 'product-1',
          sku: 'SKU-1',
          isAvailable: true,
          category: { name: 'Computers' },
        },
      },
    ]);

    const result = await service.listCatalog();

    expect(productPublications.listPublishedCatalog).toHaveBeenCalled();
    expect(result.items[0]).toMatchObject({
      id: 'product-1',
      publicationId: 'publication-1',
      slug: 'latitude-class-business-laptop',
      sku: 'SKU-1',
      name: 'Dell Latitude-class business laptop',
      purchaseMode: 'rfq',
      currency: 'PHP',
      price: null,
    });
  });

  it('creates ecommerce order intent through Gateway', async () => {
    gatewayService.createSubmission.mockResolvedValue({
      referenceNumber: 'ECO-2026-000001',
      tracking: { status: 'RECEIVED' },
    });

    const result = await service.createOrderIntent({
      customerEmail: 'buyer@example.com',
      organizationName: 'Example Corp',
      paymentMode: 'manual',
      items: [{ productId: 'product-1', publicationId: 'publication-1', sku: 'SKU-1', name: 'Service plan', quantity: 1 }],
      sourceUrl: 'https://haciensolutions.com/checkout',
    });

    expect(gatewayService.createSubmission).toHaveBeenCalledWith(
      expect.objectContaining({
        submissionType: 'ECOMMERCE_ORDER',
        sourceSurface: 'WEBSITE',
      }),
    );
    expect(result).toEqual({
      success: true,
      referenceNumber: 'ECO-2026-000001',
      status: 'RECEIVED',
      message: 'Order intent received for manual payment review.',
    });
  });
});
```

- [ ] **Step 2: Run the failing test**

Run:

```bash
npm run test --workspace @hacien/api -- ecommerce.service.spec.ts --runInBand
```

Expected: FAIL because `EcommerceService` does not exist.

- [ ] **Step 3: Add DTOs**

Create `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/dto/ecommerce.dto.ts`:

```ts
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

export class EcommerceSignupDto {
  @IsString()
  @IsNotEmpty()
  contactName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  organizationName: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  sourceUrl?: string;
}

export class EcommerceOrderIntentItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  publicationId: string;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class EcommerceOrderIntentDto {
  @IsEmail()
  customerEmail: string;

  @IsString()
  @IsNotEmpty()
  organizationName: string;

  @IsIn(['manual', 'sandbox'])
  paymentMode: 'manual' | 'sandbox';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EcommerceOrderIntentItemDto)
  items: EcommerceOrderIntentItemDto[];

  @IsString()
  @IsOptional()
  sourceUrl?: string;
}
```

- [ ] **Step 4: Add service**

Create `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/ecommerce.service.ts`:

```ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { GatewayService } from '../gateway/gateway.service';
import { CustomerIdentityService } from '../identity/customer-identity.service';
import { ProductPublicationService } from './product-publication.service';
import { EcommerceOrderIntentDto, EcommerceSignupDto } from './dto/ecommerce.dto';

@Injectable()
export class EcommerceService {
  constructor(
    private readonly productPublications: ProductPublicationService,
    private readonly gateway: GatewayService,
    private readonly customerIdentity: CustomerIdentityService,
  ) {}

  async listCatalog() {
    const publications = await this.productPublications.listPublishedCatalog();

    return {
      items: publications.map((publication) => this.toCatalogItem(publication)),
    };
  }

  async findCatalogProduct(slug: string) {
    const publication = await this.productPublications.findPublishedBySlug(slug);
    return { item: this.toCatalogItem(publication) };
  }

  private toCatalogItem(publication: any) {
    return {
      id: publication.product.id,
      publicationId: publication.id,
      slug: publication.slug,
      sku: publication.product.sku,
      name: publication.publicName,
      description: publication.publicDescription,
      category: publication.product.category?.name ?? null,
      isAvailable: publication.product.isAvailable,
      purchaseMode: publication.purchaseMode,
      checkoutEnabled: publication.checkoutEnabled,
      manualPaymentEnabled: publication.manualPaymentEnabled,
      sandboxPaymentEnabled: publication.sandboxPaymentEnabled,
      currency: 'PHP' as const,
      price: publication.publicPrice ? Number(publication.publicPrice) : null,
      image: publication.primaryImageUrl,
      specs: publication.specs,
    };
  }

  async requestSignup(dto: EcommerceSignupDto) {
    const normalizedEmail = dto.email.trim().toLowerCase();
    const organizationName = dto.organizationName.trim();
    const contactName = dto.contactName.trim();
    const [firstName, ...lastNameParts] = contactName.split(/\s+/);
    const lastName = lastNameParts.join(' ') || undefined;

    if (!organizationName || !contactName) {
      throw new BadRequestException('Contact name and organization are required.');
    }

    const user = await this.customerIdentity.createUser({
      email: normalizedEmail,
      firstName,
      lastName,
      status: 'PENDING_VERIFICATION',
    });
    const organization = await this.customerIdentity.createOrganization({
      displayName: organizationName,
      organizationType: 'BUSINESS',
      status: 'PENDING_VERIFICATION',
    });
    const membership = await this.customerIdentity.createMembership({
      organizationId: organization.id,
      customerUserId: user.id,
      title: 'Requester',
      status: 'REQUESTED',
    });
    await this.customerIdentity.createMembershipVerification({
      membershipId: membership.id,
      evidence: {
        source: 'website-open-signup',
        sourceUrl: dto.sourceUrl,
        contactName,
        phone: dto.phone,
      },
    });
    await this.customerIdentity.issueEmailVerification({
      userId: user.id,
    });

    return {
      success: true,
      referenceNumber: `CUS-${String(user.id).slice(0, 8)}`,
      status: 'PENDING_VERIFICATION',
      message: 'Account request received. Verify your email and wait for access approval.',
    };
  }

  async createOrderIntent(dto: EcommerceOrderIntentDto) {
    if (!dto.items.length) {
      throw new BadRequestException('At least one item is required.');
    }

    const result = await this.gateway.createSubmission({
      submissionType: 'ECOMMERCE_ORDER',
      sourceSurface: 'WEBSITE',
      sourceUrl: dto.sourceUrl,
      payload: {
        customerEmail: dto.customerEmail.trim().toLowerCase(),
        organizationName: dto.organizationName.trim(),
        paymentMode: dto.paymentMode,
        items: dto.items,
        officialInvoiceAutomation: false,
        salesOrderAutomation: false,
        gatewayPrinciple:
          'Ecommerce order intent enters manual payment and fulfillment review before any official Sales Order, invoice, receipt, or accounting entry is created.',
      },
    });

    return {
      success: true,
      referenceNumber: result.referenceNumber,
      status: result.tracking?.status ?? 'RECEIVED',
      message: 'Order intent received for manual payment review.',
    };
  }
}
```

- [ ] **Step 5: Add controller**

Create `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/ecommerce.controller.ts`:

```ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EcommerceService } from './ecommerce.service';
import { EcommerceOrderIntentDto, EcommerceSignupDto } from './dto/ecommerce.dto';

@Controller('ecommerce')
export class EcommerceController {
  constructor(private readonly ecommerce: EcommerceService) {}

  @Get('catalog')
  listCatalog() {
    return this.ecommerce.listCatalog();
  }

  @Get('catalog/:slug')
  findCatalogProduct(@Param('slug') slug: string) {
    return this.ecommerce.findCatalogProduct(slug);
  }

  @Post('signup')
  requestSignup(@Body() dto: EcommerceSignupDto) {
    return this.ecommerce.requestSignup(dto);
  }

  @Post('order-intents')
  createOrderIntent(@Body() dto: EcommerceOrderIntentDto) {
    return this.ecommerce.createOrderIntent(dto);
  }
}
```

- [ ] **Step 6: Add module and wire public routes**

Create `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/ecommerce.module.ts`:

```ts
import { Module } from '@nestjs/common';
import { EcommerceController } from './ecommerce.controller';
import { EcommerceService } from './ecommerce.service';
import { ProductPublicationService } from './product-publication.service';
import { GatewayModule } from '../gateway/gateway.module';
import { CustomerIdentityModule } from '../identity/customer-identity.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, GatewayModule, CustomerIdentityModule],
  controllers: [EcommerceController],
  providers: [EcommerceService, ProductPublicationService],
  exports: [EcommerceService, ProductPublicationService],
})
export class EcommerceModule {}
```

Modify `/Users/jerwinmancenido/hacien/apps/api/src/app.module.ts`:

```ts
import { EcommerceModule } from './ecommerce/ecommerce.module';
```

Add `EcommerceModule` to the `imports` array.

Modify `/Users/jerwinmancenido/hacien/apps/api/src/admin/auth.guard.ts` by adding these public routes:

```ts
{ method: 'GET', path: '/api/v1/ecommerce/catalog' },
{ method: 'POST', path: '/api/v1/ecommerce/signup' },
{ method: 'POST', path: '/api/v1/ecommerce/order-intents' },
```

Also update `isPublicRoute` to allow published product detail lookups:

```ts
if (method === 'GET' && /^\/api\/v1\/ecommerce\/catalog\/[^/]+$/.test(normalizedPath)) {
  return true;
}
```

- [ ] **Step 7: Add Gateway submission type**

Modify `/Users/jerwinmancenido/hacien/apps/api/src/gateway/gateway.policy.ts`:

```ts
export const GATEWAY_SUBMISSION_TYPES = [
  'RFQ',
  'CONTACT',
  'SUPPORT',
  'GOVERNMENT_PROCUREMENT',
  'ECOMMERCE_ORDER',
] as const;
```

Update `gatewayPrefixForSubmissionType`:

```ts
case 'ECOMMERCE_ORDER':
  return 'ECO';
```

- [ ] **Step 8: Verify ERP**

Run:

```bash
npm run test --workspace @hacien/api -- ecommerce.service.spec.ts --runInBand
npm run build:api
```

Expected: ecommerce service tests pass and API builds. If unrelated dirty ERP work breaks build, capture the exact pre-existing failure and do not stage unrelated files.

- [ ] **Step 9: Commit ERP ecommerce foundation**

Run:

```bash
git -C /Users/jerwinmancenido/hacien status --short
git -C /Users/jerwinmancenido/hacien add apps/api/src/ecommerce apps/api/src/app.module.ts apps/api/src/admin/auth.guard.ts apps/api/src/gateway/gateway.policy.ts
git -C /Users/jerwinmancenido/hacien commit -m "feat(api): add ERP ecommerce intake foundation"
```

Expected: commit includes only ecommerce module wiring and Gateway policy changes.

## Task 4: Add Website ERP Ecommerce Client

**Files:**

- Create: `/Users/jerwinmancenido/hacien-website/lib/erp/ecommerce-types.ts`
- Create: `/Users/jerwinmancenido/hacien-website/lib/erp/ecommerce-client.ts`
- Create: `/Users/jerwinmancenido/hacien-website/app/actions/customer-signup.ts`
- Create: `/Users/jerwinmancenido/hacien-website/app/actions/order-intent.ts`

- [ ] **Step 1: Add website-side types**

Create `/Users/jerwinmancenido/hacien-website/lib/erp/ecommerce-types.ts`:

```ts
export type ErpCatalogProduct = {
  id: string;
  publicationId: string;
  slug: string;
  sku: string;
  name: string;
  description: string | null;
  category: string | null;
  isAvailable: boolean;
  purchaseMode: 'rfq' | 'checkout' | 'hybrid';
  checkoutEnabled: boolean;
  manualPaymentEnabled: boolean;
  sandboxPaymentEnabled: boolean;
  currency: 'PHP';
  price: number | null;
  image: string | null;
  specs: Record<string, unknown> | null;
};

export type EcommerceSignupInput = {
  contactName: string;
  email: string;
  organizationName: string;
  phone?: string;
  sourceUrl?: string;
};

export type EcommerceOrderIntentInput = {
  customerEmail: string;
  organizationName: string;
  paymentMode: 'manual' | 'sandbox';
  items: Array<{
    productId: string;
    publicationId: string;
    sku?: string;
    name: string;
    quantity: number;
  }>;
  sourceUrl?: string;
};
```

- [ ] **Step 2: Add server-only ERP client**

Create `/Users/jerwinmancenido/hacien-website/lib/erp/ecommerce-client.ts`:

```ts
import 'server-only';
import type { EcommerceOrderIntentInput, EcommerceSignupInput, ErpCatalogProduct } from './ecommerce-types';

function getErpApiUrl() {
  return (
    process.env.HACIEN_ECOMMERCE_API_URL ||
    process.env.HACIEN_API_PUBLIC_URL ||
    process.env.HACIEN_GATEWAY_API_URL ||
    'http://localhost:4101/api/v1'
  ).replace(/\/$/, '');
}

async function erpFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getErpApiUrl()}${path}`, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`ERP ecommerce request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function listErpCatalog() {
  return erpFetch<{ items: ErpCatalogProduct[] }>('/ecommerce/catalog');
}

export function getErpCatalogProduct(slug: string) {
  return erpFetch<{ item: ErpCatalogProduct }>(`/ecommerce/catalog/${encodeURIComponent(slug)}`);
}

export function requestCustomerSignup(input: EcommerceSignupInput) {
  return erpFetch<{ success: boolean; referenceNumber: string; status: string; message: string }>('/ecommerce/signup', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function createOrderIntent(input: EcommerceOrderIntentInput) {
  return erpFetch<{ success: boolean; referenceNumber: string; status: string; message: string }>('/ecommerce/order-intents', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}
```

- [ ] **Step 3: Add signup action**

Create `/Users/jerwinmancenido/hacien-website/app/actions/customer-signup.ts`:

```ts
'use server';

import { requestCustomerSignup } from '@/lib/erp/ecommerce-client';

export async function submitCustomerSignup(formData: FormData) {
  const contactName = String(formData.get('contactName') || '').trim();
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const organizationName = String(formData.get('organizationName') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const sourceUrl = String(formData.get('sourceUrl') || '').trim();

  if (!contactName || !email || !organizationName) {
    return { success: false, message: 'Contact name, email, and organization are required.' };
  }

  if (!email.includes('@')) {
    return { success: false, message: 'Enter a valid work email address.' };
  }

  try {
    return await requestCustomerSignup({
      contactName,
      email,
      organizationName,
      phone: phone || undefined,
      sourceUrl: sourceUrl || undefined,
    });
  } catch {
    return {
      success: false,
      message: 'Account signup is temporarily unavailable. Please use the quote or contact form.',
    };
  }
}
```

- [ ] **Step 4: Add order-intent action**

Create `/Users/jerwinmancenido/hacien-website/app/actions/order-intent.ts`:

```ts
'use server';

import { createOrderIntent } from '@/lib/erp/ecommerce-client';

export async function submitOrderIntent(formData: FormData) {
  const customerEmail = String(formData.get('customerEmail') || '').trim().toLowerCase();
  const organizationName = String(formData.get('organizationName') || '').trim();
  const productId = String(formData.get('productId') || '').trim();
  const publicationId = String(formData.get('publicationId') || '').trim();
  const sku = String(formData.get('sku') || '').trim();
  const name = String(formData.get('name') || '').trim();
  const quantity = Number(formData.get('quantity') || 1);
  const sourceUrl = String(formData.get('sourceUrl') || '').trim();

  if (!customerEmail || !organizationName || !productId || !publicationId || !name) {
    return { success: false, message: 'Email, organization, and product are required.' };
  }

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    return { success: false, message: 'Quantity must be between 1 and 99.' };
  }

  try {
    return await createOrderIntent({
      customerEmail,
      organizationName,
      paymentMode: 'manual',
      items: [{ productId, publicationId, sku: sku || undefined, name, quantity }],
      sourceUrl: sourceUrl || undefined,
    });
  } catch {
    return {
      success: false,
      message: 'Order intent is temporarily unavailable. Please request a quote instead.',
    };
  }
}
```

- [ ] **Step 5: Verify website client**

Run:

```bash
npm run lint
npm run validate
npm run build
```

Expected: website builds without requiring ERP to be online at build time.

## Task 5: Convert Signup UI to Open Signup Without Overclaiming Login

**Files:**

- Create: `/Users/jerwinmancenido/hacien-website/components/account/SignupForm.tsx`
- Modify: `/Users/jerwinmancenido/hacien-website/app/signup/page.tsx`
- Modify: `/Users/jerwinmancenido/hacien-website/app/login/page.tsx`

- [ ] **Step 1: Add signup form component**

Create `/Users/jerwinmancenido/hacien-website/components/account/SignupForm.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { submitCustomerSignup } from '@/app/actions/customer-signup';

export function SignupForm() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(formData: FormData) {
    setStatus('submitting');
    const result = await submitCustomerSignup(formData);
    setStatus(result.success ? 'success' : 'error');
    setMessage(result.message);
  }

  return (
    <form action={handleSubmit} className="surface grid gap-4 rounded p-6">
      <input type="hidden" name="sourceUrl" value="/signup" />
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Contact name
        <input name="contactName" required className="focus-ring min-h-12 rounded border border-slate-300 px-4" />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Work email
        <input name="email" type="email" required className="focus-ring min-h-12 rounded border border-slate-300 px-4" />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Company or agency
        <input name="organizationName" required className="focus-ring min-h-12 rounded border border-slate-300 px-4" />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Phone
        <input name="phone" className="focus-ring min-h-12 rounded border border-slate-300 px-4" />
      </label>
      <button type="submit" disabled={status === 'submitting'} className="button-glow rounded bg-[#1457d9] px-5 py-3 text-sm font-bold text-white disabled:bg-slate-300">
        {status === 'submitting' ? 'Submitting...' : 'Create account request'}
      </button>
      {message ? (
        <p className={status === 'error' ? 'text-sm font-semibold text-red-700' : 'text-sm font-semibold text-emerald-700'}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
```

- [ ] **Step 2: Update signup page**

Modify `/Users/jerwinmancenido/hacien-website/app/signup/page.tsx` to render `<SignupForm />` and use this approved copy:

```tsx
<p className="mt-4 text-sm leading-6 text-slate-600">
  Create a HACIEN customer access request. Signup is open, and sensitive account records become visible only after email and organization verification.
</p>
```

- [ ] **Step 3: Keep login copy bounded**

Modify `/Users/jerwinmancenido/hacien-website/app/login/page.tsx` so it does not claim website-native customer login until ERP customer sessions exist:

```tsx
<p id="login-status" className="mt-4 text-sm leading-6 text-slate-600">
  Customer account login will use HACIEN ERP-backed access after account verification. Existing workspace users should use the workspace login.
</p>
```

- [ ] **Step 4: Verify signup UI**

Run:

```bash
npm run lint
npm run validate
npm run build
```

Expected: signup page builds, login copy remains bounded, and no customer session is claimed before implementation.

## Task 6: Add ERP-Driven Manual Payment Order Intent UI

**Files:**

- Create: `/Users/jerwinmancenido/hacien-website/components/checkout/ManualPaymentIntentForm.tsx`
- Modify: `/Users/jerwinmancenido/hacien-website/app/products/page.tsx`
- Modify: `/Users/jerwinmancenido/hacien-website/app/products/[category]/page.tsx`
- Modify: `/Users/jerwinmancenido/hacien-website/app/product/[slug]/page.tsx`
- Modify: `/Users/jerwinmancenido/hacien-website/components/ProductDetail.tsx`

- [ ] **Step 1: Load ERP catalog before static fallback**

Modify product listing/detail routes so they call:

```ts
import { getErpCatalogProduct, listErpCatalog } from '@/lib/erp/ecommerce-client';
```

Required behavior:

- `/products` renders `listErpCatalog()` when ERP returns products.
- `/products/[category]` filters ERP catalog by `category` when ERP returns products.
- `/product/[slug]` calls `getErpCatalogProduct(slug)` first.
- Static `data/products.ts` is used only when ERP is unavailable, and fallback products must show RFQ-only/demo-safe CTAs.
- No hardcoded fallback product may show manual payment, sandbox payment, public price, or checkout.

- [ ] **Step 2: Add manual payment intent form**

Create `/Users/jerwinmancenido/hacien-website/components/checkout/ManualPaymentIntentForm.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { submitOrderIntent } from '@/app/actions/order-intent';

export function ManualPaymentIntentForm({ productId, publicationId, sku, name }: { productId: string; publicationId: string; sku?: string; name: string }) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(formData: FormData) {
    setStatus('submitting');
    const result = await submitOrderIntent(formData);
    setStatus(result.success ? 'success' : 'error');
    setMessage(result.message);
  }

  return (
    <form action={handleSubmit} className="grid gap-3 rounded border border-slate-200 bg-white p-4">
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="publicationId" value={publicationId} />
      <input type="hidden" name="sku" value={sku || ''} />
      <input type="hidden" name="name" value={name} />
      <input type="hidden" name="quantity" value="1" />
      <input type="hidden" name="sourceUrl" value={`/product/${productId}`} />
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Work email
        <input name="customerEmail" type="email" required className="focus-ring min-h-12 rounded border border-slate-300 px-4" />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Company or agency
        <input name="organizationName" required className="focus-ring min-h-12 rounded border border-slate-300 px-4" />
      </label>
      <button type="submit" disabled={status === 'submitting'} className="button-glow rounded bg-[#1457d9] px-5 py-3 text-sm font-bold text-white disabled:bg-slate-300">
        {status === 'submitting' ? 'Submitting...' : 'Start manual payment review'}
      </button>
      {message ? (
        <p className={status === 'error' ? 'text-sm font-semibold text-red-700' : 'text-sm font-semibold text-emerald-700'}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
```

- [ ] **Step 3: Render CTA safely**

Modify `/Users/jerwinmancenido/hacien-website/components/ProductDetail.tsx`:

- Always keep RFQ CTA for `rfq` and `hybrid` products.
- Render `<ManualPaymentIntentForm />` only when the ERP product publication has `manualPaymentEnabled === true`.
- Render sandbox-payment messaging only when the ERP product publication has `sandboxPaymentEnabled === true`.
- Use copy "manual payment review" and "order intent", not "pay now" or "official order".

- [ ] **Step 4: Verify checkout/order-intent UI**

Run:

```bash
npm run validate
npm run lint
npm run build
```

Then start the website on an unused port:

```bash
PORT=3100 npm run dev
```

Run:

```bash
npm run crawl -- --base=http://127.0.0.1:3100
VISUAL_AUDIT_BASE_URL=http://127.0.0.1:3100 npm run visual:audit
```

Expected: no route failures, signup page renders, product detail renders, and no UI claims live payment or official invoice automation.

## Task 7: Add Payment Sandbox Adapter Contract

**Files:**

- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/payment-adapter.ts`
- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/payment-adapter.spec.ts`
- Modify: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/dto/ecommerce.dto.ts`
- Modify: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/ecommerce.service.ts`
- Optional expansion (future live gateway):
- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/payment/provider.interface.ts`
- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/payment/payment-provider.service.ts`
- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/payment/payment-provider.controller.ts`

- [ ] **Step 1: Add adapter tests**

Create `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/payment-adapter.spec.ts`:

```ts
import { createSandboxPaymentIntent } from './payment-adapter';

describe('payment adapter', () => {
  it('creates a deterministic sandbox payment intent without external network calls', () => {
    const result = createSandboxPaymentIntent({
      orderReference: 'ECO-2026-000001',
      amountCents: 10000,
      currency: 'PHP',
    });

    expect(result).toEqual({
      provider: 'sandbox',
      providerReference: 'sandbox-ECO-2026-000001',
      status: 'PENDING_SANDBOX_PAYMENT',
      checkoutUrl: null,
    });
  });
});
```

- [ ] **Step 2: Add adapter**

Create `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/payment-adapter.ts`:

```ts
export type SandboxPaymentInput = {
  orderReference: string;
  amountCents: number;
  currency: 'PHP';
};

export function createSandboxPaymentIntent(input: SandboxPaymentInput) {
  return {
    provider: 'sandbox' as const,
    providerReference: `sandbox-${input.orderReference}`,
    status: 'PENDING_SANDBOX_PAYMENT' as const,
    checkoutUrl: null,
  };
}
```

- [ ] **Step 3: Keep production gateway blocked**

Add an environment gate in `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/ecommerce.service.ts`:

```ts
const sandboxEnabled = process.env.ECOMMERCE_PAYMENT_SANDBOX_ENABLED === 'true';
if (dto.paymentMode === 'sandbox' && !sandboxEnabled) {
  throw new BadRequestException('Payment sandbox is not enabled.');
}
```

- [ ] **Step 4: Verify payment adapter**

Run:

```bash
npm run test --workspace @hacien/api -- payment-adapter.spec.ts ecommerce.service.spec.ts --runInBand
npm run build:api
```

Expected: sandbox adapter tests pass and no real payment provider is called.

## Task 11: Supplier Candidate Ingestion (Future)

**Goal:** Let ERP ingest supplier catalogs as candidates and convert them into Product Master entries only through human-approved matches.

**Files:**

- Modify: `/Users/jerwinmancenido/hacien/packages/db/prisma/schema.prisma`
- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/supplier-catalog/dto/supplier-catalog.dto.ts`
- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/supplier-catalog/interfaces/supplier-catalog-client.ts`
- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/supplier-catalog/interfaces/http-catalog-client.ts`
- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/supplier-catalog/interfaces/csv-catalog-client.ts`
- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/supplier-catalog/services/supplier-catalog.service.ts`
- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/supplier-catalog/services/supplier-import-runner.service.ts`
- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/supplier-catalog/controllers/supplier-catalog.controller.ts`
- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/supplier-catalog/supplier-catalog.module.ts`
- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/supplier-catalog/supplier-catalog.spec.ts`
- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/supplier-catalog/services/supplier-catalog.service.spec.ts`
- Modify: `/Users/jerwinmancenido/hacien/apps/api/src/app.module.ts`

- [ ] **Step 1: Add supplier ingestion schema in Prisma**

In `schema.prisma` add models:

```prisma
model SupplierSource {
  id                String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  companyId         String   @map("company_id") @db.Uuid
  company           Company  @relation(fields: [companyId], references: [id], onDelete: Restrict)
  code              String   @db.VarChar(64)
  name              String   @db.VarChar(120)
  channel           String   @db.VarChar(40)
  settings          Json     @db.JsonB
  isEnabled         Boolean  @default(true)
  lastRunAt          DateTime? @map("last_run_at") @db.Timestamptz
  createdAt         DateTime @default(now()) @map("created_at") @db.Timestamptz
  updatedAt         DateTime @default(now()) @updatedAt @map("updated_at") @db.Timestamptz

  imports           SupplierRawImport[]
  candidates        SupplierProductCandidate[]

  @@unique([companyId, code])
  @@index([companyId, isEnabled])
  @@map("supplier_sources")
  @@schema("inventory")
}

model SupplierRawImport {
  id          String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  companyId   String   @map("company_id") @db.Uuid
  company     Company  @relation(fields: [companyId], references: [id], onDelete: Restrict)
  sourceId    String   @map("source_id") @db.Uuid
  source      SupplierSource @relation(fields: [sourceId], references: [id], onDelete: Restrict)
  importedAt  DateTime @default(now()) @map("imported_at") @db.Timestamptz
  inputKind   String   @map("input_kind") @db.VarChar(20)
  batchKey    String   @map("batch_key") @db.VarChar(120)
  inputHash   String   @map("input_hash") @db.VarChar(64)
  recordCount Int      @map("record_count")
  successCount Int     @map("success_count")
  failCount   Int      @map("fail_count")
  createdAt   DateTime @default(now()) @map("created_at") @db.Timestamptz

  candidates  SupplierProductCandidate[]

  @@unique([companyId, batchKey])
  @@index([companyId, sourceId])
  @@map("supplier_raw_imports")
  @@schema("inventory")
}

model SupplierProductCandidate {
  id             String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  companyId      String   @map("company_id") @db.Uuid
  company        Company  @relation(fields: [companyId], references: [id], onDelete: Restrict)
  sourceId       String   @map("source_id") @db.Uuid
  source         SupplierSource @relation(fields: [sourceId], references: [id], onDelete: Restrict)
  importId       String   @map("import_id") @db.Uuid
  rawImport      SupplierRawImport @relation(fields: [importId], references: [id], onDelete: Restrict)
  supplierSku    String   @map("supplier_sku") @db.VarChar(120)
  supplierName   String   @map("supplier_name") @db.VarChar(255)
  proposedName   String   @map("proposed_name") @db.VarChar(255)
  normalizedName String   @map("normalized_name") @db.VarChar(255)
  categoryHint   String?  @map("category_hint") @db.VarChar(120)
  brandHint      String?  @map("brand_hint") @db.VarChar(120)
  specs          Json     @db.JsonB
  rawPayload     Json     @map("raw_payload") @db.JsonB
  currency       String   @default("PHP") @db.VarChar(3)
  unitPriceMin   Decimal? @map("unit_price_min") @db.Decimal(15, 2)
  unitPriceMax   Decimal? @map("unit_price_max") @db.Decimal(15, 2)
  stockQty       Int      @map("stock_qty")
  availability   String   @db.VarChar(40)
  leadTimeDays   Int?     @map("lead_time_days")
  terms          String?
  status         String   @default("RAW") @db.VarChar(40)
  productId      String?  @map("product_id") @db.Uuid
  matchedProduct  Product? @relation(fields: [productId, companyId], references: [id, companyId], onDelete: SetNull)
  confidence     Int?     @default(0)
  mappedBy       String?  @map("mapped_by") @db.Uuid
  mappedAt       DateTime? @map("mapped_at") @db.Timestamptz
  notes          String?
  createdAt      DateTime @default(now()) @map("created_at") @db.Timestamptz
  updatedAt      DateTime @default(now()) @updatedAt @map("updated_at") @db.Timestamptz

  @@unique([companyId, sourceId, supplierSku])
  @@index([companyId, status])
  @@index([companyId, matchedProduct])
  @@index([companyId, confidence])
  @@map("supplier_product_candidates")
  @@schema("inventory")
}
```

Run:

```bash
npm run db:generate --workspace @hacien/db
```

Expected: Prisma client can generate with existing migrations left untouched until migration review.

- [ ] **Step 2: Write candidate DTOs and state constants**

Create `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/supplier-catalog/dto/supplier-catalog.dto.ts`:

```ts
export type SupplierFeedStatus = 'RAW' | 'REVIEWING' | 'MAPPED' | 'REJECTED' | 'ARCHIVED';

export interface RawSupplierProductInput {
  supplierSku: string;
  supplierName: string;
  proposedName: string;
  categoryHint?: string;
  brandHint?: string;
  specs?: Record<string, unknown>;
  stockQty?: number;
  unitPriceMin?: number;
  unitPriceMax?: number;
  currency?: string;
  availability?: string;
  leadTimeDays?: number;
  terms?: string;
}

export interface RunSupplierImportDto {
  sourceCode: string;
  batchKey: string;
  rawUrl?: string;
  inputKind: 'http_json' | 'http_csv' | 'csv_upload';
}

export interface MatchCandidateDto {
  candidateId: string;
  productId: string;
  confidence?: number;
  notes?: string;
}

export interface RejectCandidateDto {
  candidateId: string;
  reason: string;
}
```

- [ ] **Step 3: Add supplier client interface and one HTTP/CSV implementation**

Create `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/supplier-catalog/interfaces/supplier-catalog-client.ts`:

```ts
import { RawSupplierProductInput } from '../dto/supplier-catalog.dto';

export interface SupplierCatalogClient {
  readonly provider: string;
  fetchCatalog(input?: Record<string, unknown>): Promise<RawSupplierProductInput[]>;
}
```

Create `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/supplier-catalog/interfaces/http-catalog-client.ts`:

```ts
import { RawSupplierProductInput } from '../dto/supplier-catalog.dto';
import { SupplierCatalogClient } from './supplier-catalog-client';

export class HttpCatalogClient implements SupplierCatalogClient {
  provider = 'http_json';
  constructor(private readonly endpoint: string, private readonly token: string) {}

  async fetchCatalog(input: Record<string, unknown> = {}): Promise<RawSupplierProductInput[]> {
    void input;
    const response = await fetch(this.endpoint, {
      headers: {
        authorization: `Bearer ${this.token}`,
        'content-type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Supplier HTTP catalog fetch failed: ${response.status}`);
    }

    const body = (await response.json()) as { items?: RawSupplierProductInput[] };
    return Array.isArray(body.items) ? body.items : [];
  }
}
```

Create `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/supplier-catalog/interfaces/csv-catalog-client.ts`:

```ts
import { RawSupplierProductInput } from '../dto/supplier-catalog.dto';
import { SupplierCatalogClient } from './supplier-catalog-client';

export class CsvCatalogClient implements SupplierCatalogClient {
  provider = 'http_csv';
  constructor(private readonly rows: RawSupplierProductInput[]) {}

  async fetchCatalog(_input: Record<string, unknown> = {}): Promise<RawSupplierProductInput[]> {
    void _input;
    return this.rows;
  }
}
```

- [ ] **Step 4: Add catalog ingestion service with deterministic mapping helpers**

Create `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/supplier-catalog/services/supplier-catalog.service.ts`:

```ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CompanyContextService } from '../../admin/company-context.service';
import { RawSupplierProductInput } from '../dto/supplier-catalog.dto';

@Injectable()
export class SupplierCatalogService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly companyContext: CompanyContextService,
  ) {}

  normalizeText(value: string) {
    return value.trim().toLowerCase().replace(/\s+/g, ' ');
  }

  async importCandidates(sourceCode: string, payloads: RawSupplierProductInput[], batchKey: string) {
    const companyId = await this.companyContext.getCompanyId();
    const source = await this.prisma.supplierSource.findFirstOrThrow({
      where: { companyId, code: sourceCode },
    });

    if (!source.isEnabled) {
      throw new BadRequestException('Supplier source is disabled.');
    }

    const rawImport = await this.prisma.supplierRawImport.create({
      data: {
        companyId,
        sourceId: source.id,
        inputKind: 'http_json',
        batchKey,
        inputHash: batchKey,
        recordCount: payloads.length,
        successCount: payloads.length,
        failCount: 0,
      },
    });

    const candidates = payloads.map((item) => ({
      companyId,
      sourceId: source.id,
      importId: rawImport.id,
      supplierSku: item.supplierSku,
      supplierName: item.supplierName,
      proposedName: item.proposedName,
      normalizedName: this.normalizeText(item.proposedName),
      categoryHint: item.categoryHint,
      brandHint: item.brandHint,
      specs: item.specs ?? {},
      rawPayload: item,
      currency: item.currency ?? 'PHP',
      stockQty: item.stockQty ?? 0,
      availability: item.availability ?? 'unknown',
      unitPriceMin: item.unitPriceMin,
      unitPriceMax: item.unitPriceMax,
      leadTimeDays: item.leadTimeDays,
      terms: item.terms,
    }));

    await this.prisma.supplierProductCandidate.createMany({
      data: candidates,
      skipDuplicates: true,
    });

    return { imported: candidates.length };
  }
}
```

- [ ] **Step 5: Add candidate review, mapping, and status transitions**

Create `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/supplier-catalog/services/supplier-import-runner.service.ts`:

```ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SupplierCatalogService } from './supplier-catalog.service';
import { CompanyContextService } from '../../admin/company-context.service';

@Injectable()
export class SupplierImportRunnerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly catalog: SupplierCatalogService,
    private readonly companyContext: CompanyContextService,
  ) {}

  async matchCandidate(candidateId: string, productId: string, confidence = 0, notes?: string) {
    const companyId = await this.companyContext.getCompanyId();
    const candidate = await this.prisma.supplierProductCandidate.findFirst({
      where: { id: candidateId, companyId },
    });
    if (!candidate) {
      throw new BadRequestException('Candidate not found.');
    }

    const product = await this.prisma.product.findFirst({
      where: { id: productId, companyId },
    });
    if (!product) {
      throw new BadRequestException('Product not found.');
    }

    await this.prisma.supplierProductCandidate.update({
      where: { id: candidateId },
      data: {
        status: 'MAPPED',
        productId,
        confidence,
        notes,
        mappedAt: new Date(),
      },
    });

    return { status: 'mapped', candidateId, productId };
  }

  async rejectCandidate(candidateId: string, reason: string) {
    const companyId = await this.companyContext.getCompanyId();
    const candidate = await this.prisma.supplierProductCandidate.findFirst({
      where: { id: candidateId, companyId },
    });
    if (!candidate) {
      throw new BadRequestException('Candidate not found.');
    }

    return this.prisma.supplierProductCandidate.update({
      where: { id: candidateId },
      data: {
        status: 'REJECTED',
        notes: reason,
      },
    });
  }
}
```

- [ ] **Step 6: Add API surface for candidate runs and review**

Create `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/supplier-catalog/controllers/supplier-catalog.controller.ts`:

```ts
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SupplierCatalogService } from '../services/supplier-catalog.service';
import { SupplierImportRunnerService } from '../services/supplier-import-runner.service';
import { MatchCandidateDto, RejectCandidateDto } from '../dto/supplier-catalog.dto';

@Controller('ecommerce/supplier-catalog')
export class SupplierCatalogController {
  constructor(
    private readonly catalog: SupplierCatalogService,
    private readonly runner: SupplierImportRunnerService,
  ) {}

  @Post('run')
  runImport(@Body() body: { sourceCode: string; batchKey: string; payloads: unknown[] }) {
    return this.catalog.importCandidates(body.sourceCode, body.payloads as any, body.batchKey);
  }

  @Get('candidates')
  listCandidates() {
    return [];
  }

  @Patch('candidates/:id/match')
  match(@Param('id') id: string, @Body() body: MatchCandidateDto) {
    return this.runner.matchCandidate(id, body.productId, body.confidence, body.notes);
  }

  @Patch('candidates/:id/reject')
  reject(@Param('id') id: string, @Body() body: RejectCandidateDto) {
    return this.runner.rejectCandidate(id, body.reason);
  }
}
```

Run command expectations include `401/403` on admin-required routes; keep this endpoint admin-only until customer policy is set.

- [ ] **Step 7: Wire module + guard and add API tests**

Create `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/supplier-catalog/supplier-catalog.module.ts`:

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { SupplierCatalogService } from './services/supplier-catalog.service';
import { SupplierImportRunnerService } from './services/supplier-import-runner.service';
import { SupplierCatalogController } from './controllers/supplier-catalog.controller';

@Module({
  imports: [PrismaModule],
  providers: [SupplierCatalogService, SupplierImportRunnerService],
  controllers: [SupplierCatalogController],
})
export class SupplierCatalogModule {}
```

Add import to `/Users/jerwinmancenido/hacien/apps/api/src/app.module.ts`.

Create tests in `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/supplier-catalog/supplier-catalog.spec.ts` and `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/supplier-catalog/services/supplier-catalog.service.spec.ts`.

Run:

```bash
npm run test --workspace @hacien/api -- supplier-catalog --runInBand
npm run test --workspace @hacien/api -- supplier-catalog --runInBand --testPathPattern=supplier-catalog.service.spec.ts
npm run build:api
```

Expected: candidate upsert, mapping, and reject paths pass and API compiles.

- [ ] **Step 8: Add visibility and safety controls**

In the ERP Product Master or Product Publication workflow, add a precondition:

- candidate with status `MAPPED` only sets `productId`; it does not alter publication status.
- only `DRAFT` / `ARCHIVED` or `PUBLISHED` controls remain in Product Publication.
- supplier fields never appear in public website API responses.

Document policy in code comments:

"Supplier ingestion proposes candidates only. Product Publication is the only website visibility gate."

- [ ] **Step 9: Create operator runbook and rollback**

Add a short checklist under `/Users/jerwinmancenido/hacien-website/docs/ecommerce/production-readiness.md`:

- disable source on mapping errors
- quarantine invalid imports
- archive stale `RAW` candidates older than policy threshold
- keep all candidate records (do not delete)

Run:

```bash
npm run lint --workspace @hacien/api
npm run lint
```

Expected: lint clean on changed API/ERP and no unresolved docs placeholders.

### Acceptance Criteria

- No supplier product reaches website routes until candidate is mapped to Product and Product Publication is explicitly enabled.
- Candidate list is auditable, searchable by source, and reject/match actions are traceable.
- No cardholder data is introduced in this path.
- Empty import payloads are handled safely and returned as no-op with explicit counters.

## Task 12: Live Payment Gateway Integration (Future)

Scope:
- Keep sandbox and manual-first behavior in place.
- Introduce a provider abstraction layer in ERP only.
- Add webhook ingestion, idempotency, and event reconciliation before exposing provider-specific checkout.

Files to create (future):
- `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/payment/payment-gateway.module.ts`
- `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/payment/gateway-adapter.interface.ts`
- `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/payment/gateway-webhook.controller.ts`
- `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/payment/payment-metadata.entity.ts` (or Prisma-backed payload store)

Recommended implementation approach:
- Add a strict state model for intent and payment status.
- Do not store cardholder data in ERP or website.
- Verify webhook signatures and include retry-safe dedupe keys.
- Keep provider-specific credentials in ERP secrets only.

## Task 8: Customer Sessions and Account Dashboard

**Files:**

- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/customer-session.controller.ts`
- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/customer-session.service.ts`
- Create: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/customer-session.service.spec.ts`
- Modify: `/Users/jerwinmancenido/hacien/apps/api/src/ecommerce/ecommerce.module.ts`
- Create: `/Users/jerwinmancenido/hacien-website/lib/erp/customer-session-client.ts`
- Create: `/Users/jerwinmancenido/hacien-website/app/account/page.tsx`
- Create: `/Users/jerwinmancenido/hacien-website/app/account/orders/page.tsx`
- Create: `/Users/jerwinmancenido/hacien-website/app/account/quotes/page.tsx`
- Create: `/Users/jerwinmancenido/hacien-website/app/account/support/page.tsx`

- [ ] **Step 1: Define customer session rules**

Implement customer sessions separately from internal ERP admin auth.

Required rules:

- Customer login may authenticate only verified `CustomerUser` records.
- Customer account data must be scoped by `CustomerMembership`.
- Internal `User` sessions must not grant public customer account access.
- Public customer sessions must not grant internal ERP admin access.

- [ ] **Step 2: Add customer account read APIs**

Add ERP endpoints:

```text
POST /ecommerce/customer-sessions
DELETE /ecommerce/customer-sessions/current
GET /ecommerce/account/overview
GET /ecommerce/account/order-intents
GET /ecommerce/account/rfqs
GET /ecommerce/account/support
```

Do not expose invoices, receipts, tax records, or internal comments until visibility assignment rules are implemented.

- [ ] **Step 3: Add website account pages**

Account pages must:

- redirect anonymous users to `/login`;
- display "Pending verification" when account exists but organization is not approved;
- show customer-safe references only;
- avoid showing official invoice or payment status unless the ERP endpoint returns customer-safe state.

- [ ] **Step 4: Verify account access**

Run ERP tests:

```bash
npm run test --workspace @hacien/api -- customer-session.service.spec.ts --runInBand
npm run build:api
```

Run website checks:

```bash
npm run lint
npm run validate
npm run build
```

Expected: unverified accounts cannot see account records, verified scoped accounts can see only their own customer-safe records, and website builds.

## Task 9: Full Integration Verification

**Files:**

- Create: `/Users/jerwinmancenido/hacien-website/tests/ecommerce/signup.spec.ts`
- Create: `/Users/jerwinmancenido/hacien-website/tests/ecommerce/order-intent.spec.ts`
- Modify: `/Users/jerwinmancenido/hacien-website/package.json`
- Modify: `/Users/jerwinmancenido/hacien/package.json` only if test scripts are missing.

- [ ] **Step 1: Add Playwright ecommerce smoke tests**

Create tests covering:

- open signup page;
- submit signup with mocked ERP success;
- ERP unavailable shows safe failure;
- checkout-ineligible product does not show manual payment CTA;
- checkout-eligible product creates order intent with mocked ERP success;
- order intent failure falls back to RFQ guidance.

- [ ] **Step 2: Run local ERP and website on non-conflicting ports**

If ports `3000` or `4100` are busy, use alternatives:

```bash
PORT=4101 npm run start:api:prod
PORT=3100 npm run dev
```

- [ ] **Step 3: Run required verification**

ERP:

```bash
npm run test --workspace @hacien/api -- ecommerce --runInBand
npm run build:api
```

Website:

```bash
npm run lint
npm run validate
npm run build
npm run crawl -- --base=http://127.0.0.1:3100
VISUAL_AUDIT_BASE_URL=http://127.0.0.1:3100 npm run visual:audit
```

Expected: all ecommerce-specific tests pass, builds pass, route crawl passes, and visual audit does not show broken signup/product/quote/customer surfaces.

## Task 10: Production Readiness Checklist

**Files:**

- Create: `/Users/jerwinmancenido/hacien-website/docs/ecommerce/production-readiness.md`

- [ ] **Step 1: Add readiness doc**

Create `/Users/jerwinmancenido/hacien-website/docs/ecommerce/production-readiness.md`:

```markdown
# HACIEN Ecommerce Production Readiness

## Required Before Production Enablement

- ERP ecommerce endpoints deployed and smoke-tested.
- Website configured with `HACIEN_API_PUBLIC_URL`.
- Signup endpoint rate-limited and bot-protected.
- Manual payment copy reviewed.
- Sandbox payment adapter tested without real money.
- Production payment provider selected and separately approved before live payment gateway enablement.
- No official invoice automation enabled.
- No official receipt/accounting posting triggered by public ecommerce order intent.
- Customer sessions separated from internal ERP admin sessions.
- Customer records scoped by membership and visibility rules.
- Privacy, Terms, Legal, Support, and Trust Center copy reviewed for account and payment language.

## Rollback

- Disable website checkout/order-intent CTA.
- Keep RFQ Gateway active.
- Keep ERP ecommerce records; do not delete order intent, signup, payment, or audit records.
- Disable sandbox/live payment webhooks before provider-side retries are changed.
```

- [ ] **Step 2: Verify readiness doc**

Run:

```bash
rg -n "No official invoice automation|Disable website checkout|HACIEN_API_PUBLIC_URL" /Users/jerwinmancenido/hacien-website/docs/ecommerce/production-readiness.md
```

Expected: readiness doc contains explicit non-automation and rollback controls.

## Implementation Order Recommendation

Start with Task 1 and Task 2. They make ERP ready for the website to connect without creating a second backend. Do not start Task 5 checkout UI until Task 2 passes at least local API tests, because otherwise the website would expose a form backed by a non-existent endpoint.

## Blockers That Still Require Jerwin Later

- Production payment gateway vendor and account approval.
- Live payment webhook secret.
- Production deployment and migration windows.
- Legal copy approval before public payment/account claims go live.
- Explicit approval before official invoice, official receipt, or accounting automation is connected.

## Verification Minimum Before Any PR Is Called Ready

- ERP touched: `npm run test --workspace @hacien/api -- <changed ecommerce tests> --runInBand` and `npm run build:api`.
- Website touched: `npm run lint`, `npm run validate`, `npm run build`.
- Website UI touched: local route crawl and visual audit on a non-conflicting port.
- Public forms touched: success and failure paths verified without real secrets.
- Payment touched: sandbox only; no real provider calls unless Jerwin approves provider credentials and live/sandbox scope.
