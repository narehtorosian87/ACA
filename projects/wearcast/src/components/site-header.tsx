import Link from "next/link";

const navLinks = [
  { href: "/today", label: "Today" },
  { href: "/closet", label: "Closet" },
  { href: "/settings", label: "Settings" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-display text-xl tracking-tight text-ink">
          Wearcast
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-ink-soft">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-terracotta"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
