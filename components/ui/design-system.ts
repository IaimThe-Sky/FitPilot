export const layout = {
  page: "min-h-screen bg-background px-page-x py-section-y text-foreground",
  container: "mx-auto flex w-full max-w-2xl items-center justify-center",
} as const;

export const typography = {
  eyebrow: "text-sm font-medium uppercase tracking-[0.24em] text-accent",
  heading: "text-5xl font-semibold tracking-tight text-foreground sm:text-7xl",
  body: "text-lg leading-8 text-muted sm:text-xl",
} as const;

export const buttons = {
  base: "inline-flex min-h-14 items-center justify-center rounded-control px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-4",
  primary:
    "bg-accent text-white shadow-control hover:bg-accent-hover focus:ring-accent-ring",
  secondary:
    "border border-border bg-white text-foreground hover:bg-surface-muted focus:ring-accent-ring",
} as const;

export const cards = {
  base: "w-full rounded-card border border-border bg-surface px-8 py-16 text-center shadow-card sm:px-12 sm:py-20",
} as const;
