"use client";

import type { WeightEntry } from "@/components/dashboard/WeightTrackingCard";
import { AppCard } from "@/components/ui/AppCard";
import { storageKeys } from "@/lib/storage";
import { useLocalStorageState } from "@/lib/useLocalStorageState";

const emptyWeights: WeightEntry[] = [];

function getDaysTracked(entries: WeightEntry[]) {
  return new Set(entries.map((entry) => entry.date.slice(0, 10))).size;
}

// Use ConsistencyCard to show simple tracking consistency.
export function ConsistencyCard() {
  const [weights] = useLocalStorageState(storageKeys.weights, emptyWeights);

  return (
    <AppCard
      title="Consistency"
      subtitle="Simple tracking builds momentum."
      className="max-w-3xl"
    >
      <section className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-card border border-border bg-white px-5 py-4">
          <p className="text-sm font-medium text-muted">Total Weight Entries</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">
            {weights.length}
          </p>
        </div>
        <div className="rounded-card border border-border bg-white px-5 py-4">
          <p className="text-sm font-medium text-muted">Days Tracked</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">
            {getDaysTracked(weights)}
          </p>
        </div>
      </section>
    </AppCard>
  );
}
