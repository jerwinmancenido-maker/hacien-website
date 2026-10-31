import { assertDatabaseConfigured, prisma } from "../lib/db";

async function main() {
  assertDatabaseConfigured();

  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Hostinger MySQL connection OK.");
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    process.exitCode = 0;
  })
  .catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    process.exitCode = 1;
  });
