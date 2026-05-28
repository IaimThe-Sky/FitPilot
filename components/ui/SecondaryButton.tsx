import type { ButtonHTMLAttributes, ReactNode } from "react";
import { buttons } from "./design-system";

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

// Use SecondaryButton for quieter actions that support the primary action.
export function SecondaryButton({
  children,
  className = "",
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      className={`${buttons.base} ${buttons.secondary} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
