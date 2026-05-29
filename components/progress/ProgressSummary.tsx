"use client";

import { useOnboarding } from "@/components/onboarding/OnboardingProvider";
import type { WeightEntry } from "@/components/dashboard/WeightTrackingCard";
import { AppCard } from "@/components/ui/AppCard";
import { storageKeys } from "@/lib/storage";
import { useLocalStorageState } from "@/lib/useLocalStorageState";

const emptyWeights: WeightEntry[] = [];

function readNumber(value: string) {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function formatWeight(weight?: number) {
  return weight ? `${weight}` : "--";
}

function formatLostOrGained(change?: number) {
  if (change === undefined) {
    return "--";
  }

  if (change === 0) {
    return "0";
  }

  return change > 0 ? `${change} gained` : `${Math.abs(change)} lost`;
}

function clampPercent(value: number) {
  return Math.min(Math.max(Math.round(value), 0), 100);
}

function getMessage(percent: number) {
  if (percent >= 50) {
    return "Great progress.";
  }

  if (percent > 0) {
    return "Small steps add up.";
  }

  return "Consistency beats perfection.";
}

// Use ProgressSummary to explain weight progress without charts.
export function ProgressSummary() {
  const { onboardingValues } = useOnboarding();
  const [weights] = useLocalStorageState(storageKeys.weights, emptyWeights);
  const profileWeight = readNumber(onboardingValues.weight) || undefined;
  const startingWeight = weights[0]?.weight ?? profileWeight;
  const currentWeight = weights.at(-1)?.weight ?? profileWeight;
  const goalWeight = startingWeight ? Math.max(startingWeight - 5, 0) : undefined;
  const weightChange =
    startingWeight && currentWeight ? currentWeight - startingWeight : undefined;
  const remainingToGoal =
    currentWeight && goalWeight ? Math.max(currentWeight - goalWeight, 0) : undefined;
  const totalNeeded =
    startingWeight && goalWeight ? Math.abs(startingWeight - goalWeight) : 0;
  const completed =
    startingWeight && currentWeight && totalNeeded > 0
      ? clampPercent(((startingWeight - currentWeight) / totalNeeded) * 100)
      : 0;

  const metrics = [
    { label: "Starting Weight", value: formatWeight(startingWeight) },
    { label: "Current Weight", value: formatWeight(currentWeight) },
    { label: "Goal Weight", value: formatWeight(goalWeight) },
    {
      label: "Weight Lost/Gained",
      value: formatLostOrGained(weightChange),
    },
    { label: "Remaining", value: formatWeight(remainingToGoal) },
  ];

  return (
    <AppCard
      title="Progress summary"
      subtitle="Understand your weight progress instantly."
      className="max-w-3xl"
    >
      <section className="grid gap-3 sm:grid-cols-5">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-card border border-border bg-white px-5 py-4"
          >
            <p className="text-sm font-medium text-muted">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {metric.value}
            </p>
          </div>
        ))}
      </section>

      <div className="mt-8 border-t border-border pt-6">
        <p className="text-lg font-semibold text-foreground">
          You are {completed}% of the way to your goal.
        </p>
        <div
          className="mt-4 h-3 rounded-control bg-accent-soft"
          role="progressbar"
          aria-label="Weight goal completion"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={completed}
        >
          <div
            className="h-full rounded-control bg-accent transition-all duration-500 ease-out"
            style={{ width: `${completed}%` }}
          />
        </div>
        <p className="mt-4 text-lg leading-8 text-muted">
          {getMessage(completed)}
        </p>
      </div>
    </AppCard>
  );
}
