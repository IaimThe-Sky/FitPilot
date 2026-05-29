"use client";

import { useState, type FormEvent } from "react";
import { AppCard } from "@/components/ui/AppCard";
import { fields } from "@/components/ui/design-system";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export type WeightEntry = {
  id: number;
  weight: number;
  date: string;
};

type WeightTrackingCardProps = {
  entries: WeightEntry[];
  startingWeight?: number;
  onAddWeight: (entry: Omit<WeightEntry, "id">) => void;
};

function formatWeight(weight?: number) {
  return weight ? `${weight}` : "--";
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function formatChange(change?: number) {
  if (change === undefined) {
    return "--";
  }

  return `${change > 0 ? "+" : ""}${change}`;
}

// Use WeightTrackingCard for simple local-only weight check-ins.
export function WeightTrackingCard({
  entries,
  startingWeight,
  onAddWeight,
}: WeightTrackingCardProps) {
  const [weight, setWeight] = useState("");
  const latestEntry = entries.at(-1);
  const start = entries[0]?.weight ?? startingWeight;
  const current = latestEntry?.weight ?? startingWeight;
  const goal = start ? Math.max(start - 5, 0) : undefined;
  const change = start && current ? current - start : undefined;
  const parsedWeight = Number(weight);
  const canSaveWeight = parsedWeight > 0;

  function saveWeight(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    if (!canSaveWeight) {
      return;
    }

    onAddWeight({
      weight: parsedWeight,
      date: new Date().toISOString(),
    });

    setWeight("");
  }

  return (
    <AppCard
      title="Weight tracking"
      subtitle="Record a quick check-in."
      className="max-w-3xl"
    >
      <form className="grid gap-3 sm:grid-cols-[1fr_auto]" onSubmit={saveWeight}>
        <label>
          <span className="sr-only">Current weight</span>
          <input
            className={fields.input}
            inputMode="decimal"
            placeholder="Current weight"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          />
        </label>

        <PrimaryButton
          label="Save weight"
          type="submit"
          fullWidth
          className="sm:w-auto"
          disabled={!canSaveWeight}
        />
      </form>

      <section className="mt-8 grid gap-3 sm:grid-cols-4">
        <div className="rounded-card border border-border bg-white px-5 py-4">
          <p className="text-sm font-medium text-muted">Starting Weight</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">
            {formatWeight(start)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-white px-5 py-4">
          <p className="text-sm font-medium text-muted">Current Weight</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">
            {formatWeight(current)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-white px-5 py-4">
          <p className="text-sm font-medium text-muted">Goal Weight</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">
            {formatWeight(goal)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-white px-5 py-4">
          <p className="text-sm font-medium text-muted">Weight Change</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">
            {formatChange(change)}
          </p>
        </div>
      </section>

      <div className="mt-8 border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-foreground">
          Weight History
        </h3>
        {entries.length > 0 ? (
          <div className="mt-4 space-y-3">
            {entries
              .slice()
              .reverse()
              .map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-card border border-border bg-white px-5 py-4 transition duration-200 ease-out hover:border-accent-soft"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-foreground">
                      {formatDate(entry.date)}
                    </p>
                    <p className="shrink-0 text-sm font-semibold text-accent">
                      {entry.weight}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="mt-3 text-base leading-7 text-muted">
            No weight entries yet.
          </p>
        )}
      </div>
    </AppCard>
  );
}
