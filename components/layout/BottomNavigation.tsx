"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { layout } from "@/components/ui/design-system";

const items = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M4 13h6V4H4v9Zm0 7h6v-5H4v5Zm10 0h6v-9h-6v9Zm0-16v5h6V4h-6Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    href: "/progress",
    label: "Progress",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M5 19h14a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1V5a1 1 0 1 1 2 0v14Zm3-3a1 1 0 0 1-.7-1.7l3-3a1 1 0 0 1 1.4 0l2.3 2.29 3.3-4.29a1 1 0 1 1 1.58 1.22l-4 5.2a1 1 0 0 1-1.5.09L11 13.41l-2.3 2.3A1 1 0 0 1 8 16Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    href: "/coach",
    label: "Coach",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M5 5.5A3.5 3.5 0 0 1 8.5 2h7A3.5 3.5 0 0 1 19 5.5v6a3.5 3.5 0 0 1-3.5 3.5h-4.17l-4.7 3.76A1 1 0 0 1 5 17.98V15a3 3 0 0 1-2-2.83V5.5Zm4 3A1.5 1.5 0 1 0 9 5.5a1.5 1.5 0 0 0 0 3Zm6 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm-5.75 3a1 1 0 0 0-.5 1.87A7.08 7.08 0 0 0 12 14a7.08 7.08 0 0 0 3.25-.63 1 1 0 0 0-.5-1.87 5.57 5.57 0 0 1-2.75.5 5.57 5.57 0 0 1-2.75-.5Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

// Use BottomNavigation for the primary mobile app destinations.
export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className={layout.bottomNav} aria-label="Mobile navigation">
      <div className={layout.bottomNavInner}>
        {items.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`${layout.bottomNavItem} ${
                isActive ? layout.bottomNavItemActive : ""
              }`.trim()}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
