import { NextResponse } from "next/server";
import {
  createCmsDraft,
  type CmsDraftFields,
  type CmsDraftStatus,
  type EditableCmsDraftKey,
  getCmsDraftEditorOptions,
  isEditableCmsDraftKey,
} from "@/lib/cms/drafts";
import { listCmsDrafts, saveCmsDraft } from "@/lib/cms/draft-storage";
import { isLocalCmsAccessEnabled } from "@/lib/cms/local-access";

export const dynamic = "force-dynamic";

function forbidden() {
  return NextResponse.json({ ok: false, error: "Local CMS drafts are disabled." }, { status: 404 });
}

export async function GET() {
  if (!isLocalCmsAccessEnabled()) {
    return forbidden();
  }

  return NextResponse.json({
    ok: true,
    options: getCmsDraftEditorOptions(),
    drafts: await listCmsDrafts(),
  });
}

export async function POST(request: Request) {
  if (!isLocalCmsAccessEnabled()) {
    return forbidden();
  }

  const body = (await request.json()) as {
    contentKey?: string;
    fields?: CmsDraftFields;
    status?: CmsDraftStatus;
  };

  if (!body.contentKey || !isEditableCmsDraftKey(body.contentKey)) {
    return NextResponse.json({ ok: false, errors: ["Unsupported CMS draft key."] }, { status: 400 });
  }

  let draft;
  try {
    draft = createCmsDraft({
      id: `${body.contentKey}-${Date.now()}`,
      contentKey: body.contentKey as EditableCmsDraftKey,
      fields: body.fields ?? {},
      status: body.status ?? "draft",
    });
  } catch (error) {
    return NextResponse.json({ ok: false, errors: [(error as Error).message] }, { status: 400 });
  }

  const validation = await saveCmsDraft(draft);

  if (!validation.ok) {
    return NextResponse.json({ ok: false, errors: validation.errors, blockedClaims: validation.blockedClaims }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    draft,
    drafts: await listCmsDrafts(),
  });
}
