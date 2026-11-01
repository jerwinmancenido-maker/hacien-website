import { spawn, type ChildProcess } from "node:child_process";
import { closeSync, openSync, unlinkSync, writeSync } from "node:fs";
import { createServer } from "node:net";
import path from "node:path";

import { chromium } from "playwright";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { parseDocument } from "@/app/actions/parse-document";
import { exceedsQuoteAttachmentLimit, maxAttachmentSize } from "@/components/QuoteCart";

const tenMb = 10 * 1024 * 1024;
const tooLargeMessage = "Document is too large. Maximum supported playground size is 10 MB.";

function documentFile(size: number) {
  return new File([new Uint8Array(size)], "spec.txt", { type: "text/plain" });
}

function writeSizedFile(filePath: string, size: number) {
  const fd = openSync(filePath, "w");
  writeSync(fd, Buffer.from("x"), 0, 1, size - 1);
  closeSync(fd);
}

function freePort() {
  return new Promise<number>((resolve, reject) => {
    const server = createServer();
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        server.close();
        reject(new Error("No free port"));
        return;
      }
      const { port } = address;
      server.close(() => resolve(port));
    });
  });
}

describe("10 MB upload limit", () => {
  it("accepts a help document of exactly 10 MB when the action is called directly", async () => {
    const formData = new FormData();
    formData.set("document", documentFile(tenMb));

    const result = await parseDocument(formData);

    expect(result.success).toBe(true);
  });

  it("rejects a help document just over 10 MB when the action is called directly", async () => {
    const formData = new FormData();
    formData.set("document", documentFile(tenMb + 1));

    const result = await parseDocument(formData);

    expect(result).toEqual({
      success: false,
      message: tooLargeMessage,
    });
  });

  it("accepts a quote attachment of exactly 10 MB and rejects one byte over", () => {
    expect(maxAttachmentSize).toBe(tenMb);
    expect(exceedsQuoteAttachmentLimit(tenMb)).toBe(false);
    expect(exceedsQuoteAttachmentLimit(tenMb + 1)).toBe(true);
  });
});

describe("help document server action body", () => {
  let child: ChildProcess | undefined;
  let baseUrl = "";
  let serverLog = "";
  const exactPath = path.join("/tmp", "hacien-upload-exact.txt");
  const overPath = path.join("/tmp", "hacien-upload-over.txt");

  beforeAll(async () => {
    writeSizedFile(exactPath, tenMb);
    writeSizedFile(overPath, tenMb + 1);
    const port = await freePort();
    // localhost, not 127.0.0.1: Next dev blocks the other host, so the form never hydrates.
    baseUrl = `http://localhost:${port}`;
    child = spawn(process.execPath, [path.join(process.cwd(), "node_modules/next/dist/bin/next"), "dev", "--port", String(port)], {
      cwd: process.cwd(),
      env: process.env,
      detached: true,
      stdio: ["ignore", "pipe", "pipe"],
    });
    child.stdout?.on("data", (chunk: Buffer) => {
      serverLog += chunk.toString();
    });
    child.stderr?.on("data", (chunk: Buffer) => {
      serverLog += chunk.toString();
    });

    const started = Date.now();
    while (Date.now() - started < 90_000) {
      if (child.exitCode != null) {
        throw new Error(`next dev exited ${child.exitCode}\n${serverLog.slice(-4000)}`);
      }
      try {
        const response = await fetch(`${baseUrl}/help`);
        if (response.status === 200) return;
      } catch {
        // Server is still booting.
      }
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
    throw new Error(`next dev did not become ready\n${serverLog.slice(-4000)}`);
  }, 120_000);

  afterAll(() => {
    for (const filePath of [exactPath, overPath]) {
      try {
        unlinkSync(filePath);
      } catch {
        // Already removed.
      }
    }
    if (!child?.pid) return;
    try {
      process.kill(-child.pid, "SIGTERM");
    } catch {
      child.kill("SIGTERM");
    }
  });

  async function scan(filePath: string) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    try {
      await page.goto(`${baseUrl}/help`, { waitUntil: "networkidle" });
      await page.waitForFunction(() => {
        const button = document.querySelector("form button");
        return Boolean(button && Object.getOwnPropertyNames(button).some((name) => name.startsWith("__react")));
      });
      await page.locator('input[type="file"]').setInputFiles(filePath);
      await page.getByRole("button", { name: "Run prototype scan" }).click();
      const outcome = page.locator("text=/Prototype result|Maximum supported playground size is 10 MB|Body exceeded/");
      await outcome.first().waitFor({ timeout: 60_000 });
      return await page.locator("body").innerText();
    } finally {
      await browser.close();
    }
  }

  it("accepts a 10 MB file through the server action request", async () => {
    const text = await scan(exactPath);
    expect(text).toContain("Prototype result for");
    expect(text).not.toContain("Body exceeded");
  }, 90_000);

  it("rejects a file just over 10 MB through the server action request", async () => {
    const text = await scan(overPath);
    expect(text).toContain(tooLargeMessage);
    expect(text).not.toContain("Body exceeded");
    expect(text).not.toContain("Prototype result for");
  }, 90_000);
});
