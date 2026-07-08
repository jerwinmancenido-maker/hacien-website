import { getPublishedCmsContent } from "@/lib/cms/content";
import { getCmsInventory } from "@/lib/cms/inventory";
import { getCmsMediaRecords } from "@/lib/cms/media";
import { getCmsSeoRecords } from "@/lib/cms/seo";

export function getCmsPreviewData() {
  const inventory = getCmsInventory();
  const content = getPublishedCmsContent();
  const media = getCmsMediaRecords();
  const seo = getCmsSeoRecords();
  const blockedOrErpOwned = inventory.filter((item) => item.ownerType === "blocked" || item.ownerType === "erp");
  const editableNow = inventory.filter((item) => item.editableNow);

  return {
    summary: {
      inventoryRecords: inventory.length,
      publishedContent: content.length,
      mediaRecords: media.length,
      seoRecords: seo.length,
      editableNow: editableNow.length,
      blockedOrErpOwned: blockedOrErpOwned.length,
    },
    inventory,
    content,
    media,
    seo,
    blockedOrErpOwned,
  };
}
