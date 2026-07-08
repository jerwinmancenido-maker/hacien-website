export function isLocalCmsAccessEnabled() {
  return process.env.CMS_PREVIEW_ENABLED === "true";
}
