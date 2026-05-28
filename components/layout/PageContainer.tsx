import type { HTMLAttributes, ReactNode } from "react";
import { layout } from "@/components/ui/design-system";

type PageContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

// Use PageContainer to keep page content centered with consistent width and padding.
export function PageContainer({
  children,
  className = "",
  ...props
}: PageContainerProps) {
  return (
    <div className={`${layout.container} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
