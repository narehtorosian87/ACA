import { NextResponse } from "next/server";
import { deleteItem, getItem, updateItem } from "@/lib/closet-store";
import { deleteUploadedPhoto, saveUploadedPhoto } from "@/lib/upload";
import type { ClosetItemInput } from "@/lib/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const item = await getItem(id);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ item });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const existing = await getItem(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const formData = await request.formData();
  const raw = formData.get("data");
  if (typeof raw !== "string") {
    return NextResponse.json({ error: "Missing item data" }, { status: 400 });
  }

  let patch: Partial<ClosetItemInput>;
  try {
    patch = JSON.parse(raw) as Partial<ClosetItemInput>;
  } catch {
    return NextResponse.json({ error: "Invalid item data" }, { status: 400 });
  }

  const photo = formData.get("photo");
  if (photo instanceof File && photo.size > 0) {
    if (!photo.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Photo must be an image file" },
        { status: 400 },
      );
    }
    await deleteUploadedPhoto(existing.photoUrl);
    patch.photoUrl = await saveUploadedPhoto(photo);
  } else if (formData.get("removePhoto") === "true") {
    await deleteUploadedPhoto(existing.photoUrl);
    patch.photoUrl = undefined;
  }

  const item = await updateItem(id, patch);
  return NextResponse.json({ item });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const existing = await getItem(id);
  if (existing) {
    await deleteUploadedPhoto(existing.photoUrl);
  }
  const ok = await deleteItem(id);
  if (!ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
