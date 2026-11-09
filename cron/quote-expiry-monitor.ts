import type { Order } from "../generated/prisma/client";
import { prisma } from "../lib/db";
import { buildQuoteExpiryNoticeHtml } from "../lib/email/quote-expiry-notice";

type NotificationTarget = Pick<Order, "id" | "externalReference" | "createdAt" | "status" | "totalCents" | "currency"> & {
  organization: {
    name: string;
    email: string | null;
    phone: string | null;
  };
};

async function sendEmailNotice(order: NotificationTarget) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const to = order.organization.email;

  if (!apiKey || !fromEmail || !to) {
    console.log("quote-expiry-monitor: email skipped", {
      orderId: order.id,
      reason: !to ? "organization email missing" : "resend env missing",
    });
    return;
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `HACIEN <${fromEmail}>`,
      to,
      subject: "HACIEN draft quotation review window",
      html: buildQuoteExpiryNoticeHtml(order.externalReference || order.id),
    }),
  });
}

async function sendSmsNotice(order: NotificationTarget) {
  const apiKey = process.env.SEMAPHORE_API_KEY;
  const senderName = process.env.SEMAPHORE_SENDER_NAME;
  const phone = order.organization.phone;

  if (!apiKey || !phone) {
    console.log("quote-expiry-monitor: sms skipped", {
      orderId: order.id,
      reason: !phone ? "organization phone missing" : "semaphore env missing",
    });
    return;
  }

  const body = new URLSearchParams({
    apikey: apiKey,
    number: phone,
    message: `HACIEN reminder: draft request ${order.externalReference || order.id} may need follow-up review. No official payment or tax document is created by this reminder.`,
  });
  if (senderName) body.set("sendername", senderName);

  await fetch("https://api.semaphore.co/api/v4/messages", {
    method: "POST",
    body,
  });
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.log("quote-expiry-monitor: DATABASE_URL missing; dry skip.");
    return;
  }

  const now = new Date();
  const windowStart = new Date(now);
  windowStart.setDate(now.getDate() - 13);
  const windowEnd = new Date(now);
  windowEnd.setDate(now.getDate() - 12);

  const orders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: windowStart,
        lt: windowEnd,
      },
      status: {
        in: ["draft", "pending_payment", "payment_review"],
      },
    },
    select: {
      id: true,
      externalReference: true,
      createdAt: true,
      status: true,
      totalCents: true,
      currency: true,
      organization: {
        select: {
          name: true,
          email: true,
          phone: true,
        },
      },
    },
  });

  console.log(`quote-expiry-monitor: ${orders.length} draft order(s) found in day-12 window.`);

  for (const order of orders) {
    await sendEmailNotice(order);
    await sendSmsNotice(order);
  }
}

main()
  .catch((error: unknown) => {
    console.error("quote-expiry-monitor: failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
