import { NextResponse } from "next/server";
import { createItem, getAllItems, replaceAllItems } from "@/lib/closet-store";
import { deleteUploadedPhoto, saveUploadedPhoto } from "@/lib/upload";
import type { ClosetItemInput } from "@/lib/types";

export async function GET() {
  const items = await getAllItems();
  return NextResponse.json({ items });
}

export async function DELETE() {
  const items = await getAllItems();
  await Promise.all(items.map((item) => deleteUploadedPhoto(item.photoUrl)));
  await replaceAllItems([]);
  return NextResponse.json({ ok: true });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const raw = formData.get("data");
  if (typeof raw !== "string") {
    return NextResponse.json(
      { error: "Missing item data" },
      { status: 400 },
    );
  }

  let input: ClosetItemInput;
  try {
    input = JSON.parse(raw) as ClosetItemInput;
  } catch {
    return NextResponse.json({ error: "Invalid item data" }, { status: 400 });
  }

  if (!input.name || !input.category) {
    return NextResponse.json(
      { error: "Name and category are required" },
      { status: 400 },
    );
  }

  const photo = formData.get("photo");
  if (photo instanceof File && photo.size > 0) {
    if (!photo.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Photo must be an image file" },
        { status: 400 },
      );
    }
    input.photoUrl = await saveUploadedPhoto(photo);
  }

  const item = await createItem(input);
  return NextResponse.json({ item }, { status: 201 });
}
