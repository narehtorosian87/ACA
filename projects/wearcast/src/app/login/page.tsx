import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LoginForm } from "@/components/login-form";

export default async function LoginPage({
  searchParams,
}: PageProps<"/login">) {
  const params = await searchParams;
  const nextParam = params.next;
  const next = (Array.isArray(nextParam) ? nextParam[0] : nextParam) ?? "/today";

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-md px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta">
            Sign in
          </p>
          <h1 className="font-display mt-2 text-3xl text-ink">
            Welcome to Wearcast
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Your own closet, your own recommendations.
          </p>
          <div className="mt-8">
            <LoginForm next={next} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
