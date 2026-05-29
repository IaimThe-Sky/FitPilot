"use client";

import { useMemo } from "react";
import {
  MealLogCard,
  type LoggedMeal,
} from "@/components/dashboard/MealLogCard";
import {
  WorkoutLogCard,
  type LoggedWorkout,
} from "@/components/dashboard/WorkoutLogCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { AppCard } from "@/components/ui/AppCard";
import { sectionSpacing } from "@/components/ui/design-system";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useOnboarding } from "@/components/onboarding/OnboardingProvider";
import { storageKeys } from "@/lib/storage";
import { useLocalStorageState } from "@/lib/useLocalStorageState";

function readNumber(value: string) {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function getGoals(weight: string) {
  const parsedWeight = readNumber(weight);
  const protein = parsedWeight > 0 ? parsedWeight * 2 : 140;

  return {
    calories: 2200,
    protein,
    steps: 10000,
  };
}

type DailyProgressItem = {
  label: string;
  current: number;
  goal: number;
  display: string;
};

const emptyMeals: LoggedMeal[] = [];
const emptyWorkouts: LoggedWorkout[] = [];

function DailyProgressRow({ item }: { item: DailyProgressItem }) {
  const percent = Math.min(Math.round((item.current / item.goal) * 100), 100);
  const isClose = percent >= 75;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-lg font-semibold text-foreground">{item.label}</p>
          <p className="mt-1 text-sm font-medium text-muted">{item.display}</p>
        </div>
        <p className="shrink-0 text-sm font-semibold text-accent">{percent}%</p>
      </div>
      <div
        className="h-3 rounded-control bg-accent-soft"
        role="progressbar"
        aria-label={`${item.label} progress`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div
          className={`h-full rounded-control transition-all duration-500 ease-out ${
            isClose ? "bg-accent" : "bg-[#72b985]"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

// Use DashboardOverview for the personalized dashboard summary.
export function DashboardOverview() {
  const { onboardingValues } = useOnboarding();
  const [meals, setMeals] = useLocalStorageState(
    storageKeys.meals,
    emptyMeals,
  );
  const [workouts, setWorkouts] = useLocalStorageState(
    storageKeys.workouts,
    emptyWorkouts,
  );
  const name = onboardingValues.name.trim() || "there";
  const goals = getGoals(onboardingValues.weight);

  const mealTotals = useMemo(
    () =>
      meals.reduce(
        (totals, meal) => ({
          calories: totals.calories + meal.calories,
          protein: totals.protein + meal.protein,
        }),
        { calories: 0, protein: 0 },
      ),
    [meals],
  );

  const stats = [
    {
      title: "Calories",
      subtitle: "Daily goal",
      value: goals.calories.toLocaleString(),
      footer: "Mock goal for now",
    },
    {
      title: "Protein",
      subtitle: "Daily goal",
      value: `${goals.protein}g`,
      footer: onboardingValues.weight
        ? `Based on ${onboardingValues.weight}`
        : "Add weight in onboarding",
    },
    {
      title: "Steps",
      subtitle: "Daily goal",
      value: goals.steps.toLocaleString(),
      footer: "Simple starter goal",
    },
  ];

  const dailyProgress = [
    {
      label: "Calories",
      current: 1450 + mealTotals.calories,
      goal: goals.calories,
      display: `${(1450 + mealTotals.calories).toLocaleString()} / ${goals.calories.toLocaleString()}`,
    },
    {
      label: "Protein",
      current: 82 + mealTotals.protein,
      goal: goals.protein,
      display: `${82 + mealTotals.protein}g / ${goals.protein}g`,
    },
    {
      label: "Water",
      current: 2,
      goal: 3,
      display: "2L / 3L",
    },
    {
      label: "Steps",
      current: 7200,
      goal: goals.steps,
      display: `7,200 / ${goals.steps.toLocaleString()}`,
    },
  ];

  function addMeal(meal: Omit<LoggedMeal, "id">) {
    setMeals((currentMeals) => [
      ...currentMeals,
      {
        ...meal,
        id: Date.now(),
      },
    ]);
  }

  function addWorkout(workout: Omit<LoggedWorkout, "id">) {
    setWorkouts((currentWorkouts) => [
      ...currentWorkouts,
      {
        ...workout,
        id: Date.now(),
      },
    ]);
  }

  return (
    <>
      <AppCard variant="hero" className="max-w-3xl">
        <SectionTitle eyebrow="Dashboard" title={`Welcome back, ${name}`}>
          Your daily goals are ready from your onboarding answers.
        </SectionTitle>
      </AppCard>

      <QuickActions />

      <section className={sectionSpacing.grid}>
        {stats.map((stat) => (
          <AppCard
            key={stat.title}
            title={stat.title}
            subtitle={stat.subtitle}
            footer={
              <p className="text-sm font-medium text-muted">{stat.footer}</p>
            }
          >
            <p className="text-4xl font-semibold tracking-tight text-foreground">
              {stat.value}
            </p>
          </AppCard>
        ))}
      </section>

      <AppCard
        title="Daily progress"
        subtitle="A gentle look at today."
        className="max-w-3xl"
      >
        <div className="space-y-6">
          {dailyProgress.map((item) => (
            <DailyProgressRow key={item.label} item={item} />
          ))}
        </div>
      </AppCard>

      <MealLogCard meals={meals} onAddMeal={addMeal} />

      <WorkoutLogCard workouts={workouts} onAddWorkout={addWorkout} />

      <AppCard
        title="Today's AI Insight"
        subtitle="Simple guidance for now."
        className="max-w-3xl"
      >
        <p className="text-lg leading-8 text-muted">
          You are close to your protein goal today.
        </p>
      </AppCard>
    </>
  );
}
