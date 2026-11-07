import { redirect } from "next/navigation";
import { getCmsMetadata } from "@/lib/cms/seo";

export const metadata = getCmsMetadata("help");

// One help door: /help permanently sends visitors to /support, which carries
// the chat, the support paths, and the route to the FAQ answers.
export default function HelpPage() {
  redirect("/support");
}
