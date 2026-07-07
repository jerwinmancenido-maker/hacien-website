export const CLINICAL_OUT_BEZIER = [0.25, 1, 0.5, 1] as const;
export const PREMIUM_IN_OUT_BEZIER = [0.76, 0, 0.24, 1] as const;
export const OVERLAP_FRAMES = 18;

export const motionTiming = {
  clinicalOut: `cubic-bezier(${CLINICAL_OUT_BEZIER.join(", ")})`,
  premiumInOut: `cubic-bezier(${PREMIUM_IN_OUT_BEZIER.join(", ")})`,
} as const;
