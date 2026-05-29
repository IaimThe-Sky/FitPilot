import { buttons } from "@/components/ui/design-system";

const actions = [
  {
    label: "Log Meal",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M7 3a1 1 0 0 1 1 1v7a3 3 0 0 1-2 2.83V20a1 1 0 1 1-2 0v-6.17A3 3 0 0 1 2 11V4a1 1 0 1 1 2 0v7h1V4a1 1 0 1 1 2 0Zm8 1a1 1 0 0 1 1-1h1a5 5 0 0 1 5 5v4a3 3 0 0 1-3 3h-1v5a1 1 0 1 1-2 0V4Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Log Workout",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M5 9a1 1 0 0 1 1 1v1h12v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1H6v1a1 1 0 1 1-2 0v-1H3a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Zm3-3a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1Zm8 0a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Add Water",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M12 2a1 1 0 0 1 .78.37C14.45 4.43 18 9.15 18 13a6 6 0 0 1-12 0c0-3.85 3.55-8.57 5.22-10.63A1 1 0 0 1 12 2Zm-2.5 11a1 1 0 0 0-2 0A4.5 4.5 0 0 0 12 17.5a1 1 0 1 0 0-2A2.5 2.5 0 0 1 9.5 13Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Update Weight",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
        <path
          d="M7 3h10a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Zm5 4a4 4 0 0 0-4 4 1 1 0 0 0 2 0 2 2 0 1 1 4 0 1 1 0 1 0 2 0 4 4 0 0 0-4-4Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

// Use QuickActions for lightweight dashboard entry points.
export function QuickActions() {
  return (
    <section className="grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          className={`${buttons.chip} flex min-h-20 flex-col items-center justify-center gap-2 px-3 py-4 text-center`}
        >
          <span className="text-accent">{action.icon}</span>
          <span>{action.label}</span>
        </button>
      ))}
    </section>
  );
}
