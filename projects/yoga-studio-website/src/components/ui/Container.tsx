import type { HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Shared horizontal max-width + padding wrapper used by every section. */
export function Container({ children, className = "", ...rest }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-content px-7 ${className}`} {...rest}>
      {children}
    </div>
  );
}
