import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";
import { join } from "path";
import { promises as fs } from "fs";

const prisma = new PrismaClient();

async function clearTmpDirectory() {
  const tmpDir = join(__dirname, "../tmp");
  const files = await fs.readdir(tmpDir);
  const pngFiles = files.filter(file => file.endsWith(".png"));

  for (const file of pngFiles) {
    await fs.unlink(join(tmpDir, file));
  }
}

async function main() {
  // tmpディレクトリのpngファイルをすべて削除
  await clearTmpDirectory();

  const user = await prisma.user.create({
    data: {
      name: "Alice",
    },
  });

  const store = await prisma.store.create({
    data: {
      title: "My Store",
      userId: user.id,
    },
  });

  let fileName = randomBytes(16).toString("hex") + "." + "png";
  const srcPath = join(__dirname, "../testdata/mock.png");
  const destPath = join(__dirname, "../tmp", fileName);
  await fs.copyFile(srcPath, destPath);

  const image = await prisma.image.create({
    data: {
      filePath: destPath,
      fileExtension: "png",
      storeId: store.id,
    },
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
