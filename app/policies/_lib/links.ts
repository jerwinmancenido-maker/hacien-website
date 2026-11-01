export const policyFooterLinks = [
  { href: "/policies", label: "Policies" },
  { href: "/terms-of-sale", label: "Terms of Sale" },
  { href: "/warranty", label: "Warranty" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/legal", label: "Legal" },
] as const;

export const siteFooterPolicyLinks = [
  ...policyFooterLinks,
  { href: "/compliance", label: "Government Compliance" },
  { href: "/policies/history", label: "Policy history" },
] as const;
