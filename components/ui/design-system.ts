export const layout = {
  app: "min-h-screen bg-background text-foreground",
  nav: "border-b border-border bg-background/95",
  navInner:
    "mx-auto flex w-full max-w-5xl flex-col gap-3 px-page-x py-4 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:py-0",
  main: "flex min-h-[calc(100vh-5.75rem)] items-center pt-section-y pb-28 sm:min-h-[calc(100vh-4rem)] sm:pt-section-y sm:pb-28 lg:py-10",
  container:
    "mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-section-gap px-page-x",
  bottomNav:
    "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-page-x pb-[env(safe-area-inset-bottom)] shadow-[0_-12px_40px_rgba(31,95,58,0.08)] backdrop-blur lg:hidden",
  bottomNavInner:
    "mx-auto grid h-20 max-w-md grid-cols-3 items-center gap-2",
  bottomNavItem:
    "flex min-h-14 flex-col items-center justify-center gap-1 rounded-card px-3 text-xs font-semibold text-muted transition duration-200 ease-out focus:outline-none focus:ring-4 focus:ring-accent-ring active:scale-[0.98]",
  bottomNavItemActive: "bg-surface-muted text-accent",
} as const;

export const sectionSpacing = {
  base: "w-full",
  centered: "flex w-full justify-center",
  grid: "grid w-full gap-4 sm:grid-cols-3",
} as const;

export const typography = {
  eyebrow: "text-xs font-medium uppercase tracking-[0.22em] text-accent sm:text-sm",
  heading:
    "text-4xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl",
  body: "text-base leading-7 text-muted sm:text-lg sm:leading-8 md:text-xl",
} as const;

export const buttons = {
  base: "inline-flex min-h-14 items-center justify-center rounded-control px-7 py-4 text-base font-semibold transition duration-200 ease-out focus:outline-none focus:ring-4 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 sm:px-8",
  primary:
    "bg-accent text-white shadow-control hover:bg-accent-hover focus:ring-accent-ring disabled:hover:bg-accent",
  secondary:
    "border border-border bg-white text-foreground hover:bg-surface-muted focus:ring-accent-ring",
  chip: "rounded-control border border-border bg-white px-4 py-2 text-sm font-semibold text-foreground transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-surface-muted focus:outline-none focus:ring-4 focus:ring-accent-ring active:translate-y-0 active:scale-[0.99]",
  fullWidth: "w-full",
} as const;

export const cards = {
  base: "w-full rounded-card border border-border bg-surface shadow-card transition duration-200 ease-out",
  hero: "px-6 py-12 text-center sm:px-12 sm:py-16 lg:py-14",
  default: "px-5 py-6 text-left sm:px-8 sm:py-8 lg:py-7",
  clickable:
    "cursor-pointer transition duration-200 focus:outline-none focus:ring-4 focus:ring-accent-ring md:hover:-translate-y-0.5 md:hover:border-accent-soft",
} as const;

export const fields = {
  input:
    "min-h-14 w-full rounded-control border border-border bg-white px-5 text-base text-foreground outline-none transition duration-200 ease-out placeholder:text-muted/70 focus:border-accent-soft focus:ring-4 focus:ring-accent-ring sm:px-6 sm:text-lg",
  select:
    "min-h-14 w-full rounded-control border border-border bg-white px-5 text-base font-semibold text-foreground outline-none transition duration-200 ease-out focus:border-accent-soft focus:ring-4 focus:ring-accent-ring sm:px-6",
  option:
    "min-h-14 w-full rounded-control border border-border bg-white px-5 text-left text-base font-semibold text-foreground transition duration-200 hover:bg-surface-muted focus:outline-none focus:ring-4 focus:ring-accent-ring active:scale-[0.99] sm:px-6",
  optionSelected: "border-accent bg-surface-muted text-accent",
} as const;
