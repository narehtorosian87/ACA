import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TodayForm } from "@/components/today-form";
import { getDayContext } from "@/lib/day-context-store";
import { getSettings } from "@/lib/settings-store";

export const dynamic = "force-dynamic";

export default async function TodayPage() {
  const [context, settings] = await Promise.all([getDayContext(), getSettings()]);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta">
            Today
          </p>
          <h1 className="font-display mt-2 text-3xl text-ink sm:text-4xl">
            What&apos;s your day look like?
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            A few details and Wearcast will put together two full outfits from
            your closet.
          </p>
          <div className="mt-10">
            <TodayForm initialCity={settings.city} initialContext={context} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
