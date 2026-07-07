import { HTMLAttributes } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

export function GlassCard({
  className = "",
  interactive = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={`glass rounded-[8px] ${
        interactive
          ? "transition duration-300 hover:-translate-y-1 hover:border-cyanGlow/45 hover:shadow-glow"
          : ""
      } ${className}`}
      {...props}
    />
  );
}
