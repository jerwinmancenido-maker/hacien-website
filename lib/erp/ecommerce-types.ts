export type ErpCatalogProduct = {
  id: string;
  publicationId: string;
  slug: string;
  sku: string;
  name: string;
  description: string | null;
  category: string | null;
  isAvailable: boolean;
  purchaseMode: "rfq" | "checkout" | "hybrid";
  checkoutEnabled: boolean;
  manualPaymentEnabled: boolean;
  sandboxPaymentEnabled: boolean;
  currency: "PHP";
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
  paymentMode: "manual" | "sandbox";
  turnstileToken?: string;
  antiSpamVerification?: Record<string, unknown>;
  items: Array<{
    productId: string;
    publicationId: string;
    sku?: string;
    name: string;
    quantity: number;
  }>;
  sourceUrl?: string;
};

export type EcommerceSubmissionResult = {
  success: boolean;
  referenceNumber?: string;
  status?: string;
  message: string;
};
