import { randomUUID } from "crypto";
import { createClient } from "./supabase/server";
import { requireUserId } from "./supabase/auth-helpers";

const BUCKET = "closet-photos";

const EXTENSION_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function saveUploadedPhoto(file: File): Promise<string> {
  const supabase = await createClient();
  const userId = await requireUserId(supabase);

  const extension = EXTENSION_BY_MIME[file.type] ?? "jpg";
  const path = `${userId}/${randomUUID()}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, { contentType: file.type, upsert: false });
  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return publicUrl;
}

function pathFromPublicUrl(photoUrl: string): string | null {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const index = photoUrl.indexOf(marker);
  if (index === -1) return null;
  return photoUrl.slice(index + marker.length);
}

export async function deleteUploadedPhoto(
  photoUrl: string | undefined,
): Promise<void> {
  if (!photoUrl) return;
  const path = pathFromPublicUrl(photoUrl);
  if (!path) return;

  const supabase = await createClient();
  await supabase.storage.from(BUCKET).remove([path]);
}
