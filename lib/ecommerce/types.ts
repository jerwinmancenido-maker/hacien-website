export type PurchaseMode = "rfq" | "checkout" | "hybrid";
export type ProductStatus = "draft" | "published" | "archived";
export type FulfillmentType = "manual" | "digital" | "license" | "shipment" | "service";
export type InventoryPolicy = "not_tracked" | "track_stock" | "preorder" | "rfq_required";
export type OrderStatus =
  | "draft"
  | "pending_payment"
  | "payment_review"
  | "paid"
  | "processing"
  | "fulfilled"
  | "cancelled"
  | "refunded";

export type CustomerRole = "owner" | "buyer" | "viewer";
export type AdminRole = "admin" | "operations" | "catalog_manager";
