"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function getTrendSummary(entries: WeightEntry[]) {
  if (entries.length < 2) {
    return "Add another weight entry to see your trend.";
  }

  const first = entries[0].weight;
  const latest = entries.at(-1)?.weight ?? first;
  const change = latest - first;

  if (change < 0) {
    return "Weight is trending down.";
  }

  if (change > 0) {
    return "Weight is trending up.";
  }

  return "Weight is stable.";
}

// Use WeightTrendChart for the first simple visual weight trend.
export function WeightTrendChart() {
  const { onboardingValues } = useOnboarding();
  const [weights] = useLocalStorageState(storageKeys.weights, emptyWeights);
  const profileWeight = readNumber(onboardingValues.weight);
  const chartEntries =
    weights.length > 0
      ? weights
      : profileWeight
        ? [
            {
              id: 0,
              weight: profileWeight,
              date: new Date().toISOString(),
            },
          ]
        : [];
  const chartData = chartEntries.map((entry) => ({
    date: formatDate(entry.date),
    weight: entry.weight,
  }));

  return (
    <AppCard
      title="Weight trend"
      subtitle={getTrendSummary(chartEntries)}
      className="max-w-3xl"
    >
      {chartData.length > 0 ? (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ left: -20, right: 12 }}>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#5b6d62", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#5b6d62", fontSize: 12 }}
                width={48}
              />
              <Tooltip
                contentStyle={{
                  border: "1px solid #dceee3",
                  borderRadius: "16px",
                  boxShadow: "0 12px 30px rgba(31, 95, 58, 0.08)",
                }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#1f7a45"
                strokeWidth={3}
                dot={{ fill: "#1f7a45", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-lg leading-8 text-muted">
          Record your first weight to see a simple trend here.
        </p>
      )}
    </AppCard>
  );
}
