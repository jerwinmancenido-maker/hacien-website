import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const schema = readFileSync(join(process.cwd(), "prisma/schema.prisma"), "utf8");

function modelBlock(modelName: string) {
  const match = schema.match(new RegExp(`model ${modelName} \\{([\\s\\S]*?)\\n\\}`));
  if (!match) throw new Error(`Model not found: ${modelName}`);
  return match[1];
}

function fieldLine(modelName: string, fieldName: string) {
  const line = modelBlock(modelName)
    .split("\n")
    .map((value) => value.trim())
    .find((value) => value.startsWith(`${fieldName} `));

  if (!line) throw new Error(`Field not found: ${modelName}.${fieldName}`);
  return line;
}

describe("Hostinger MySQL schema", () => {
  it("uses MySQL text columns for long customer-facing content", () => {
    expect(fieldLine("Product", "longDescription")).toContain("@db.Text");
    expect(fieldLine("Product", "procurementNotes")).toContain("@db.Text");
    expect(fieldLine("Product", "specs")).toContain("@db.Text");
    expect(fieldLine("SupportTicket", "description")).toContain("@db.Text");
    expect(fieldLine("AuditEvent", "details")).toContain("Json?");
  });
});
