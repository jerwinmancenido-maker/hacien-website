import { assertDatabaseConfigured, prisma } from "../lib/db";

assertDatabaseConfigured();

try {
  await prisma.$queryRaw`SELECT 1`;
  console.log("Hostinger MySQL connection OK.");
} finally {
  await prisma.$disconnect();
}
