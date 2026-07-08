import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { CmsDraftRecord } from "@/lib/cms/drafts";
import { validateCmsDraft } from "@/lib/cms/drafts";

export function resolveCmsDraftDirectory(
  startDirectory = process.cwd(),
  initDirectory = process.env.INIT_CWD,
) {
  const standaloneRoot =
    path.basename(startDirectory) === "standalone" &&
    path.basename(path.dirname(startDirectory)) === ".next"
      ? path.resolve(startDirectory, "..", "..")
      : startDirectory;
  const baseDirectory = process.env.CMS_DRAFTS_DIR || initDirectory || standaloneRoot;

  return path.join(path.resolve(baseDirectory), "cms-drafts");
}

const cmsDraftDirectory = resolveCmsDraftDirectory();

function sanitizeDraftId(id: string) {
  return id.replace(/[^a-zA-Z0-9._-]/g, "-");
}

function draftPath(id: string) {
  return path.join(cmsDraftDirectory, `${sanitizeDraftId(id)}.json`);
}

export async function listCmsDrafts(): Promise<CmsDraftRecord[]> {
  try {
    const entries = await readdir(cmsDraftDirectory, { withFileTypes: true });
    const draftFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".json"));
    const drafts = await Promise.all(
      draftFiles.map(async (entry) => {
        const raw = await readFile(path.join(cmsDraftDirectory, entry.name), "utf8");
        return JSON.parse(raw) as CmsDraftRecord;
      }),
    );

    return drafts
      .filter((draft) => validateCmsDraft(draft).ok)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

export async function saveCmsDraft(draft: CmsDraftRecord) {
  const validation = validateCmsDraft(draft);

  if (!validation.ok) {
    return validation;
  }

  await mkdir(cmsDraftDirectory, { recursive: true });
  await writeFile(draftPath(draft.id), `${JSON.stringify(draft, null, 2)}\n`, "utf8");

  return validation;
}
