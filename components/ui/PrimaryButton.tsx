import type { ButtonHTMLAttributes, ReactNode } from "react";
import { buttons } from "./design-system";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

// Use PrimaryButton for the main action on a page or section.
export function PrimaryButton({
  children,
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={`${buttons.base} ${buttons.primary} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
