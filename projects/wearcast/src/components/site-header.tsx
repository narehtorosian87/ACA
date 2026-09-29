import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const navLinks = [
  { href: "/today", label: "Today" },
  { href: "/closet", label: "Closet" },
  { href: "/settings", label: "Settings" },
];

export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-line/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-display text-xl tracking-tight text-ink">
          Wearcast
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-ink-soft">
          {user &&
            navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-terracotta"
              >
                {link.label}
              </Link>
            ))}
          {user ? (
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="transition-colors hover:text-terracotta"
              >
                Sign out
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-ink px-4 py-2 text-cream transition-colors hover:bg-terracotta"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
