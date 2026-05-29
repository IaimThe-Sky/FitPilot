import type { ReactNode } from "react";
import Link from "next/link";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { layout } from "@/components/ui/design-system";

type AppLayoutProps = {
  children: ReactNode;
};

const navItems = [
  { href: "/onboarding", label: "Onboarding" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/progress", label: "Progress" },
  { href: "/coach", label: "Coach" },
];

// Use AppLayout as the outer shell for pages that need the FitPilot header.
export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={layout.app}>
      <header className={layout.nav}>
        <nav className={layout.navInner} aria-label="Main navigation">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            FitPilot
          </Link>

          <div className="hidden w-full items-center gap-2 overflow-x-auto text-sm font-medium text-muted lg:flex lg:w-auto lg:gap-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-control px-2 py-2 whitespace-nowrap transition hover:text-foreground focus:outline-none focus:ring-4 focus:ring-accent-ring"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className={layout.main}>{children}</main>
      <BottomNavigation />
    </div>
  );
}
