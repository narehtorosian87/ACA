import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Schedule", to: "/schedule" },
  { label: "Pricing", to: "/pricing" },
  { label: "Styles of Yoga", to: "/styles-of-yoga" },
  { label: "Private Sessions", to: "/private-sessions" },
];

function navLinkClass(isActive: boolean, extra = "") {
  return `text-sm font-medium transition-colors ${
    isActive ? "text-primary-700" : "text-sand-800 hover:text-primary-700"
  } ${extra}`;
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-sand-300 bg-sand-100/90 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-7 py-4">
        <Link to="/" className="font-heading text-xl text-sand-900">
          Ekam <span className="text-primary-700">Yoga Studio</span>
        </Link>

        <nav aria-label="Primary">
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === "/"} className={({ isActive }) => navLinkClass(isActive)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-md p-2 lg:hidden"
        >
          <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      <div
        data-testid="mobile-nav"
        className={isOpen ? "border-t border-sand-300 lg:hidden" : "hidden lg:hidden"}
      >
        {isOpen ? (
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-1 px-7 py-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    onClick={close}
                    className={({ isActive }) => navLinkClass(isActive, "block py-2")}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
