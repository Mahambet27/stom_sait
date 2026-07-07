import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: never;
  };

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> & {
    href: string;
  };

export function GlowButton(props: ButtonProps | LinkProps) {
  const { children, variant = "primary", className = "" } = props;
  const base =
    "group inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] px-5 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyanGlow/60 disabled:cursor-not-allowed disabled:opacity-50";
  const variants = {
    primary:
      "bg-white text-ink shadow-glow hover:-translate-y-0.5 hover:bg-cyanGlow",
    secondary:
      "border border-white/15 bg-white/8 text-white hover:-translate-y-0.5 hover:border-cyanGlow/60 hover:bg-cyanGlow/10",
    ghost: "text-white/80 hover:bg-white/10 hover:text-white"
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (typeof props.href === "string") {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
