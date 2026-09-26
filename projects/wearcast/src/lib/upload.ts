import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const EXTENSION_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function saveUploadedPhoto(file: File): Promise<string> {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const extension = EXTENSION_BY_MIME[file.type] ?? "jpg";
  const fileName = `${randomUUID()}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOAD_DIR, fileName), buffer);
  return `/uploads/${fileName}`;
}

export async function deleteUploadedPhoto(photoUrl: string | undefined): Promise<void> {
  if (!photoUrl || !photoUrl.startsWith("/uploads/")) return;
  const filePath = path.join(process.cwd(), "public", photoUrl);
  await fs.rm(filePath, { force: true });
}
