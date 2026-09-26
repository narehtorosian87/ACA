import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosetItemCard } from "@/components/closet-item-card";
import { getAllItems } from "@/lib/closet-store";
import { CATEGORY_OPTIONS } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function ClosetPage() {
  const items = await getAllItems();
  const byCategory = CATEGORY_OPTIONS.map((cat) => ({
    ...cat,
    items: items.filter((item) => item.category === cat.value),
  })).filter((group) => group.items.length > 0);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-terracotta">
                Your closet
              </p>
              <h1 className="font-display mt-2 text-3xl text-ink sm:text-4xl">
                {items.length} item{items.length === 1 ? "" : "s"} tagged
              </h1>
            </div>
            <Link
              href="/closet/new"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-terracotta"
            >
              + Add item
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="mt-12 rounded-3xl border border-dashed border-line bg-white/50 px-8 py-20 text-center">
              <p className="font-display text-2xl text-ink">
                Your closet is empty
              </p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
                Add your first item — category, color, warmth, and when you&apos;d
                wear it — so Wearcast has something to recommend.
              </p>
              <Link
                href="/closet/new"
                className="mt-6 inline-block rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream hover:bg-terracotta-soft hover:text-ink"
              >
                Add your first item
              </Link>
            </div>
          ) : (
            <div className="mt-10 space-y-10">
              {byCategory.map((group) => (
                <div key={group.value}>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                    {group.label} · {group.items.length}
                  </h2>
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {group.items.map((item) => (
                      <ClosetItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
