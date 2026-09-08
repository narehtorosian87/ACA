import type { HTMLAttributes, ReactNode } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Alternates the section background between cream and deeper cream. */
  tone?: "default" | "alt";
}

export function Section({ children, tone = "default", className = "", ...rest }: SectionProps) {
  const toneClasses = tone === "alt" ? "bg-sand-200" : "bg-sand-100";
  return (
    <section className={`py-16 sm:py-20 lg:py-24 ${toneClasses} ${className}`} {...rest}>
      {children}
    </section>
  );
}
