import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosetItemForm } from "@/components/closet-item-form";
import { getItem } from "@/lib/closet-store";

export default async function EditClosetItemPage({
  params,
}: PageProps<"/closet/[id]/edit">) {
  const { id } = await params;
  const item = await getItem(id);
  if (!item) notFound();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-2xl px-6 py-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta">
            Edit item
          </p>
          <h1 className="font-display mt-2 text-3xl text-ink sm:text-4xl">
            {item.name}
          </h1>
          <div className="mt-10">
            <ClosetItemForm item={item} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
