import type { ButtonHTMLAttributes, ReactNode } from "react";
import { buttons } from "./design-system";

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  label?: string;
  fullWidth?: boolean;
};

// Use SecondaryButton for quieter actions that support the primary action.
export function SecondaryButton({
  children,
  label,
  fullWidth = false,
  className = "",
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      className={`${buttons.base} ${buttons.secondary} ${
        fullWidth ? buttons.fullWidth : ""
      } ${className}`.trim()}
      {...props}
    >
      {label ?? children}
    </button>
  );
}
