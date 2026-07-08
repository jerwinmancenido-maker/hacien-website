import { applyCmsDraftToRepo } from "../lib/cms/apply-draft";
import type { CmsDraftRecord } from "../lib/cms/drafts";
import { listCmsDrafts } from "../lib/cms/draft-storage";

type CliOptions = {
  apply: boolean;
  contentKey?: string;
  draftId?: string;
};

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = { apply: false };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--apply") {
      options.apply = true;
      continue;
    }
    if (arg === "--id") {
      options.draftId = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg === "--content-key") {
      options.contentKey = argv[index + 1];
      index += 1;
      continue;
    }
    if (!options.draftId && !arg.startsWith("--")) {
      options.draftId = arg;
    }
  }

  return options;
}

function selectDraft(drafts: CmsDraftRecord[], options: CliOptions) {
  if (options.draftId) {
    return drafts.find((draft) => draft.id === options.draftId);
  }
  if (options.contentKey) {
    return drafts.find((draft) => draft.contentKey === options.contentKey);
  }

  return undefined;
}

function printUsage() {
  console.log(`Usage:
  npm run cms:apply-draft -- --id <draft-id>
  npm run cms:apply-draft -- --content-key seo.metadata
  npm run cms:apply-draft -- --id <draft-id> --apply

Defaults to dry-run. The script only writes repo CMS files when --apply is provided.`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const drafts = await listCmsDrafts();
  const draft = selectDraft(drafts, options);

  if (!draft) {
    printUsage();
    console.error("\nNo matching local CMS draft found.");
    process.exitCode = 1;
    return;
  }

  const result = await applyCmsDraftToRepo(draft, process.cwd(), options.apply ? "apply" : "dry-run");
  const { plan } = result;

  console.log(JSON.stringify(
    {
      mode: plan.mode,
      draftId: plan.draftId,
      contentKey: plan.contentKey,
      supported: plan.applySupported,
      summary: plan.summary,
      filePath: plan.filePath,
      recordKey: plan.recordKey,
      changed: result.changed,
      nextRecord: plan.nextRecord,
      errors: plan.errors,
    },
    null,
    2,
  ));

  if (!plan.applySupported) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
