import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClosetItemForm } from "@/components/closet-item-form";

export default function NewClosetItemPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-2xl px-6 py-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta">
            Add to closet
          </p>
          <h1 className="font-display mt-2 text-3xl text-ink sm:text-4xl">
            Tag a new item
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            The more accurately you tag it, the better your recommendations.
          </p>
          <div className="mt-10">
            <ClosetItemForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
