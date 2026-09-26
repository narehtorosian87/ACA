import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SettingsForm } from "@/components/settings-form";
import { getSettings } from "@/lib/settings-store";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-2xl px-6 py-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta">
            Settings
          </p>
          <h1 className="font-display mt-2 text-3xl text-ink sm:text-4xl">
            Preferences
          </h1>
          <div className="mt-10">
            <SettingsForm initialSettings={settings} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
