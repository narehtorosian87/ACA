import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

export type ButtonVariant = "primary" | "outline";

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    to?: undefined;
    href?: undefined;
  };

type ButtonAsRouterLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> & {
    to: string;
    href?: undefined;
  };

type ButtonAsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
    to?: undefined;
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsRouterLink | ButtonAsAnchor;

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 font-body text-sm font-medium " +
  "transition-transform duration-150 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-primary-600";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "border border-transparent bg-primary-700 text-sand-50 hover:bg-secondary-700",
  outline: "border border-primary-700 bg-transparent text-primary-700 hover:bg-primary-700 hover:text-sand-50",
};

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className = "" } = props;
  const classes = [baseClasses, variantClasses[variant], className].filter(Boolean).join(" ");

  if ("to" in props && props.to) {
    const { to, ...rest } = props as ButtonAsRouterLink;
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsAnchor;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
