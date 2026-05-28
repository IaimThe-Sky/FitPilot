import type { ButtonHTMLAttributes } from "react";
import { buttons } from "./design-system";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  loading?: boolean;
  fullWidth?: boolean;
};

// Use PrimaryButton for the main action on a page or section.
export function PrimaryButton({
  label,
  loading = false,
  fullWidth = false,
  disabled = false,
  className = "",
  ...props
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={`${buttons.base} ${buttons.primary} ${
        fullWidth ? buttons.fullWidth : ""
      } ${className}`.trim()}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading ? "Loading..." : label}
    </button>
  );
}
