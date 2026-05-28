"use client";

import type { HTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { cards } from "./design-system";

type AppCardProps = HTMLAttributes<HTMLElement> & {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  footer?: ReactNode;
  clickable?: boolean;
  variant?: "default" | "hero";
};

// Use AppCard to group a small amount of related content on a calm surface.
export function AppCard({
  title,
  subtitle,
  children,
  footer,
  clickable = false,
  variant = "default",
  className = "",
  tabIndex,
  ...props
}: AppCardProps) {
  const isInteractive = clickable && Boolean(props.onClick);

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    props.onKeyDown?.(event);

    if (!isInteractive || event.defaultPrevented) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.currentTarget.click();
    }
  }

  return (
    <section
      className={`${cards.base} ${cards[variant]} ${
        isInteractive ? cards.clickable : ""
      } ${className}`.trim()}
      {...props}
      role={isInteractive ? "button" : props.role}
      tabIndex={isInteractive ? tabIndex ?? 0 : tabIndex}
      onKeyDown={handleKeyDown}
    >
      {title || subtitle ? (
        <header className="mb-5 sm:mb-6">
          {title ? (
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-base leading-7 text-muted">{subtitle}</p>
          ) : null}
        </header>
      ) : null}
      {children}
      {footer ? (
        <footer className="mt-6 border-t border-border pt-5">{footer}</footer>
      ) : null}
    </section>
  );
}
