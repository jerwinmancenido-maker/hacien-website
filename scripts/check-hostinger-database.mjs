import { PrismaClient } from "@prisma/client";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required to check the Hostinger MySQL database.");
  process.exit(1);
}

const prisma = new PrismaClient({
  log: ["error", "warn"],
});

try {
  await prisma.$queryRaw`SELECT 1`;
  console.log("Hostinger MySQL connection OK.");
} finally {
  await prisma.$disconnect();
}
