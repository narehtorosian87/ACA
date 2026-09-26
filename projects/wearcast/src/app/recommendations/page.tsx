import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { OutfitCard } from "@/components/outfit-card";
import { getAllItems } from "@/lib/closet-store";
import { getDayContext } from "@/lib/day-context-store";
import { generateRecommendations } from "@/lib/recommend/engine";
import { CATEGORY_OPTIONS } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function RecommendationsPage() {
  const [items, context] = await Promise.all([getAllItems(), getDayContext()]);
  const { outfits, missingCategories } = generateRecommendations(items, context);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta">
            Today&apos;s picks
          </p>
          <h1 className="font-display mt-2 text-3xl text-ink sm:text-4xl">
            Two outfits, built for your day
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            <Link href="/today" className="underline hover:text-terracotta">
              Change today&apos;s details
            </Link>
          </p>

          {outfits.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-line bg-white/50 px-8 py-16 text-center">
              <p className="font-display text-2xl text-ink">
                Not quite enough in your closet yet
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
                Add at least one{" "}
                {missingCategories
                  .map(
                    (cat) =>
                      CATEGORY_OPTIONS.find((o) => o.value === cat)?.label.toLowerCase(),
                  )
                  .join(" and ")}{" "}
                to your closet so Wearcast has something to build a full outfit
                from.
              </p>
              <Link
                href="/closet/new"
                className="mt-6 inline-block rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream hover:bg-terracotta-soft hover:text-ink"
              >
                Add to closet
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {outfits.map((outfit) => (
                <OutfitCard key={outfit.id} outfit={outfit} />
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
