export const layout = {
  app: "min-h-screen bg-background text-foreground",
  nav: "border-b border-border bg-background/95",
  navInner:
    "mx-auto flex w-full max-w-5xl flex-col gap-3 px-page-x py-4 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:py-0",
  main: "flex min-h-[calc(100vh-5.75rem)] items-center py-section-y sm:min-h-[calc(100vh-4rem)] lg:py-10",
  container:
    "mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-section-gap px-page-x",
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
  base: "inline-flex min-h-14 items-center justify-center rounded-control px-7 py-4 text-base font-semibold transition duration-200 focus:outline-none focus:ring-4 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 sm:px-8",
  primary:
    "bg-accent text-white shadow-control hover:bg-accent-hover focus:ring-accent-ring disabled:hover:bg-accent",
  secondary:
    "border border-border bg-white text-foreground hover:bg-surface-muted focus:ring-accent-ring",
  fullWidth: "w-full",
} as const;

export const cards = {
  base: "w-full rounded-card border border-border bg-surface shadow-card",
  hero: "px-6 py-12 text-center sm:px-12 sm:py-16 lg:py-14",
  default: "px-5 py-6 text-left sm:px-8 sm:py-8 lg:py-7",
  clickable:
    "cursor-pointer transition duration-200 focus:outline-none focus:ring-4 focus:ring-accent-ring md:hover:-translate-y-0.5 md:hover:border-accent-soft",
} as const;

export const fields = {
  input:
    "min-h-14 w-full rounded-control border border-border bg-white px-5 text-base text-foreground outline-none transition duration-200 placeholder:text-muted/70 focus:border-accent-soft focus:ring-4 focus:ring-accent-ring sm:px-6 sm:text-lg",
  option:
    "min-h-14 w-full rounded-control border border-border bg-white px-5 text-left text-base font-semibold text-foreground transition duration-200 hover:bg-surface-muted focus:outline-none focus:ring-4 focus:ring-accent-ring active:scale-[0.99] sm:px-6",
  optionSelected: "border-accent bg-surface-muted text-accent",
} as const;
