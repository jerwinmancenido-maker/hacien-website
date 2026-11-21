/**
 * Variant A (approved homepage mock v5) shell + home styling.
 *
 * REQ-WEB-RESTYLE-001 implements the home page and the shared Header/Footer
 * with dedicated styling in the mock's exact token values. It deliberately
 * does NOT reuse the `.va-scope` utility-remapping layer in globals.css:
 * that layer's body/muted values (#C6CBD8 / #9199A8) differ from the mock's
 * (#C3C8D2 / #9AA1B1), other routes depend on it, and it cannot reach the
 * shell (Header/Footer render outside any .va-scope wrapper).
 *
 * Tokens (mock v5): canvas #0B0C10, surface 1 #15171D, surface 2 #1E2129,
 * surface 3 #2A2E38, band #060F23, primary #2563EB, hover/pressed #1F54C8,
 * sky #6692F1, heading #F4F6FA, body #C3C8D2, muted #9AA1B1, frost #F5F5F5.
 */

/** Mock content column: max 1180px, 24px side gutters. */
export const VA_WRAP = "mx-auto w-full max-w-[1180px] px-6";

/** Focus ring: 2px of the surface behind the control + 3px sky. */
export const VA_FOCUS_ON_CANVAS =
  "focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#0B0C10,0_0_0_5px_#6692F1]";
export const VA_FOCUS_ON_BAND =
  "focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#060F23,0_0_0_5px_#6692F1]";
export const VA_FOCUS_ON_SURFACE1 =
  "focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#15171D,0_0_0_5px_#6692F1]";

const VA_BTN_BASE =
  "inline-flex items-center justify-center rounded-full font-semibold whitespace-nowrap transition-transform active:scale-[0.97]";

export const VA_BTN_PRIMARY_52 = `${VA_BTN_BASE} h-[52px] px-[30px] text-[15.5px] bg-[#2563EB] text-white hover:bg-[#1F54C8] ${VA_FOCUS_ON_CANVAS}`;
export const VA_BTN_SECONDARY_52 = `${VA_BTN_BASE} h-[52px] px-[30px] text-[15.5px] bg-[#1E2129] text-[#F4F6FA] hover:bg-[#2A2E38] ${VA_FOCUS_ON_CANVAS}`;
export const VA_BTN_PRIMARY_44 = `${VA_BTN_BASE} h-11 px-6 text-[14.5px] bg-[#2563EB] text-white hover:bg-[#1F54C8] ${VA_FOCUS_ON_CANVAS}`;

/** Headings: letter-spacing 0, heading colour. */
export const VA_H1 =
  "text-[31px] font-extrabold leading-[1.12] tracking-normal text-[#F4F6FA] min-[561px]:text-[42px]";
export const VA_H2 =
  "text-[25px] font-extrabold leading-[1.18] tracking-normal text-[#F4F6FA] min-[561px]:text-[30px]";
export const VA_H3 = "text-[17px] font-bold leading-[1.3] text-[#F4F6FA]";
export const VA_LEAD = "text-[16.5px] leading-[1.6] text-[#C3C8D2]";
export const VA_CARD_TEXT = "text-[14.5px] leading-[1.6] text-[#C3C8D2]";

/** Section rhythm: 64px top (44px on phone), 8px bottom. Inner uses VA_WRAP. */
export const VA_SECTION = "pt-11 pb-2 min-[561px]:pt-16";
export const VA_PANEL = "rounded-[24px] bg-[#15171D] p-[22px] min-[561px]:p-7";
export const VA_CARD = "rounded-[20px] bg-[#15171D] p-6";
