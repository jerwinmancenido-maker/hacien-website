import { permanentRedirect } from "next/navigation";

// One workspace door: /portal permanently sends visitors to
// /customer-workspace, which carries the Customer Workspace page.
// This route carries no metadata export of its own (R5-FIX-5): the
// workspace's one canonical title/description record lives on
// /customer-workspace, and /portal previously re-declared the workspace
// title with a second, drifted description while its redirect answered
// with a temporary (307) status under a "permanently" comment.
export default function PortalPage() {
  permanentRedirect("/customer-workspace");
}
