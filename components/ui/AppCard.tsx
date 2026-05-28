import type { HTMLAttributes, ReactNode } from "react";
import { cards } from "./design-system";

type AppCardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

// Use AppCard to group a small amount of related content on a calm surface.
export function AppCard({ children, className = "", ...props }: AppCardProps) {
  return (
    <section className={`${cards.base} ${className}`.trim()} {...props}>
      {children}
    </section>
  );
}
