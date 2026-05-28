import type { ReactNode } from "react";
import { typography } from "./design-system";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
};

// Use SectionTitle for clear page or section headings with optional body copy.
export function SectionTitle({ eyebrow, title, children }: SectionTitleProps) {
  return (
    <div className="text-center">
      {eyebrow ? <p className={`mb-6 ${typography.eyebrow}`}>{eyebrow}</p> : null}
      <h1 className={typography.heading}>{title}</h1>
      {children ? (
        <p className={`mx-auto mt-6 max-w-md ${typography.body}`}>{children}</p>
      ) : null}
    </div>
  );
}
