import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "center" | "left";
}

export function SectionHeading({ eyebrow, title, description, align = "center" }: SectionHeadingProps) {
  const alignClasses = align === "center" ? "mx-auto max-w-xl text-center" : "max-w-none text-left";
  return (
    <div className={`mb-12 ${alignClasses}`}>
      <span className="mb-3 inline-block font-body text-xs font-medium uppercase tracking-widest text-primary-700">
        {eyebrow}
      </span>
      <h2 className="text-3xl sm:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-sand-700">{description}</p> : null}
    </div>
  );
}
