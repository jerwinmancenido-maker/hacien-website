# HACIEN Ecommerce API Contract

## Base URL

- `HACIEN_API_PUBLIC_URL` or `HACIEN_GATEWAY_API_URL` (normalized through API client layer to `/api/v1` when required by deployment).

## Product Setup Flow

Products are added in ERP Product Master, not in website code.

1. Create or update an operational product in ERP `/products`.
2. Set SKU, legally safe public name, category, brand, UOM, price, stock, availability, verification status, and evidence reference.
3. Open the product's Website Publication controls in ERP.
4. Configure:
   - slug
   - public name
   - public description
   - specs payload
   - image(s)
   - purchase mode
   - manual/sandbox checkout flags
   - publication status
5. Publish only VERIFIED products.

## GET /ecommerce/catalog

Returns public-safe ERP-published products only.

### Response

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

Returns one published ERP product publication by slug.

### Response

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

### Request

```json
{
  "contactName": "Maria Santos",
  "email": "maria@example.com",
  "organizationName": "Example Corporation",
  "phone": "+63 900 000 0000",
  "sourceUrl": "https://haciensolutions.com/signup"
}
```

### Response

```json
{
  "success": true,
  "referenceNumber": "CUS-2026-000001",
  "status": "PENDING_VERIFICATION",
  "message": "Account request received. Verify your email and wait for access approval."
}
```

## POST /ecommerce/order-intents

Creates a customer-safe ecommerce order intent in Gateway. It does not create official Sales Orders, invoices, receipts, or accounting entries.

### Request

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

### Response

```json
{
  "success": true,
  "referenceNumber": "ECO-2026-000001",
  "status": "RECEIVED",
  "message": "Order intent received for manual payment review."
}
```

## Validation Notes

- `slug` is normalized to lower-case hyphen form and unique per company/website.
- Only published products for `VERIFIED` ERP products are exposed.
- `RFQ-first` is the default, checkout-enabled products require explicit publication controls.
