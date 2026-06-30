"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type RequirementBlock = {
  id: string;
  category: string;
  categoryLabel: string;
  quantity: string;
  brandPreference: string;
  otherBrand?: string;
  equivalentAccepted: string;
  deadline?: string;
  deliveryLocation?: string;
  notes?: string;
  fields: Record<string, string>;
};

type QuoteCartContextValue = {
  requirements: RequirementBlock[];
  totalRequirements: number;
  addRequirement: (requirement: Omit<RequirementBlock, "id">) => void;
  removeRequirement: (requirementId: string) => void;
  clearRequirements: () => void;
};

const QuoteCartContext = createContext<QuoteCartContextValue | null>(null);

const storageKey = "hacien_rfq_package_v1";
const legacyStorageKey = "hacien_quote_cart_v1";

export function QuoteCartProvider({ children }: { children: React.ReactNode }) {
  const [requirements, setRequirements] = useState<RequirementBlock[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = window.localStorage.getItem(storageKey);
      return saved ? (JSON.parse(saved) as RequirementBlock[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(requirements));
    window.localStorage.removeItem(legacyStorageKey);
  }, [requirements]);

  const value = useMemo<QuoteCartContextValue>(() => {
    return {
      requirements,
      totalRequirements: requirements.length,
      addRequirement: (requirement) => {
        const id = `REQ-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        setRequirements((current) => [...current, { ...requirement, id }]);
      },
      removeRequirement: (requirementId) => {
        setRequirements((current) => current.filter((requirement) => requirement.id !== requirementId));
      },
      clearRequirements: () => setRequirements([]),
    };
  }, [requirements]);

  return <QuoteCartContext.Provider value={value}>{children}</QuoteCartContext.Provider>;
}

export function useQuoteCart() {
  const context = useContext(QuoteCartContext);
  if (!context) {
    throw new Error("useQuoteCart must be used within QuoteCartProvider.");
  }
  return context;
}
