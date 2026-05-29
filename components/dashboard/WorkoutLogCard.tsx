"use client";

import { useState, type FormEvent } from "react";
import { AppCard } from "@/components/ui/AppCard";
import { buttons, fields } from "@/components/ui/design-system";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export type LoggedWorkout = {
  id: number;
  exercise: string;
  sets: number;
  reps: number;
  weight?: number;
  calories: number;
};

type WorkoutLogCardProps = {
  workouts: LoggedWorkout[];
  onAddWorkout: (workout: Omit<LoggedWorkout, "id">) => void;
};

const quickExercises: Array<{
  exercise: string;
  sets: number;
  reps: number;
  weight?: number;
}> = [
  { exercise: "Pushups", sets: 3, reps: 12 },
  { exercise: "Squats", sets: 3, reps: 12 },
  { exercise: "Walking", sets: 1, reps: 20 },
  { exercise: "Running", sets: 1, reps: 15 },
  { exercise: "Bench Press", sets: 3, reps: 8, weight: 40 },
];

function estimateCalories(sets: number, reps: number, weight?: number) {
  const weightBonus = weight ? Math.round(weight / 10) : 0;

  return Math.max(10, Math.round(sets * reps * 2 + weightBonus));
}

// Use WorkoutLogCard for simple local-only workout entry.
export function WorkoutLogCard({
  workouts,
  onAddWorkout,
}: WorkoutLogCardProps) {
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("3");
  const [reps, setReps] = useState("10");
  const [weight, setWeight] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const parsedSets = Number(sets);
  const parsedReps = Number(reps);
  const parsedWeight = weight.trim() ? Number(weight) : undefined;
  const canAddWorkout =
    exercise.trim().length > 0 && parsedSets > 0 && parsedReps > 0;

  function saveWorkout(
    exerciseName: string,
    setCount: number,
    repCount: number,
    workoutWeight?: number,
  ) {
    onAddWorkout({
      exercise: exerciseName,
      sets: setCount,
      reps: repCount,
      weight: workoutWeight,
      calories: estimateCalories(setCount, repCount, workoutWeight),
    });

    setSuccessMessage(`${exerciseName} logged`);
  }

  function addWorkout(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    if (!canAddWorkout) {
      return;
    }

    saveWorkout(exercise.trim(), parsedSets, parsedReps, parsedWeight);

    setExercise("");
    setSets("3");
    setReps("10");
    setWeight("");
  }

  function prefillExercise(workout: (typeof quickExercises)[number]) {
    setExercise(workout.exercise);
    setSets(String(workout.sets));
    setReps(String(workout.reps));
    setWeight(workout.weight ? String(workout.weight) : "");
  }

  return (
    <AppCard
      title="Log a workout"
      subtitle="Keep it simple and quick."
      className="max-w-3xl"
    >
      <div className="mb-7">
        <p className="mb-3 text-sm font-semibold text-muted">
          Quick Exercises
        </p>
        <div className="flex flex-wrap gap-2">
          {quickExercises.map((workout) => (
            <button
              key={workout.exercise}
              type="button"
              className={buttons.chip}
              onClick={() => prefillExercise(workout)}
            >
              {workout.exercise}
            </button>
          ))}
        </div>
      </div>

      <form
        className="grid gap-3 sm:grid-cols-[1fr_5rem_5rem_7rem_auto]"
        onSubmit={addWorkout}
      >
        <label>
          <span className="sr-only">Exercise name</span>
          <input
            className={fields.input}
            placeholder="Exercise"
            value={exercise}
            onChange={(event) => setExercise(event.target.value)}
          />
        </label>

        <label>
          <span className="sr-only">Sets</span>
          <input
            className={fields.input}
            inputMode="numeric"
            placeholder="Sets"
            value={sets}
            onChange={(event) => setSets(event.target.value)}
          />
        </label>

        <label>
          <span className="sr-only">Reps</span>
          <input
            className={fields.input}
            inputMode="numeric"
            placeholder="Reps"
            value={reps}
            onChange={(event) => setReps(event.target.value)}
          />
        </label>

        <label>
          <span className="sr-only">Weight</span>
          <input
            className={fields.input}
            inputMode="decimal"
            placeholder="Weight"
            aria-label="Weight optional"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          />
        </label>

        <PrimaryButton
          label="Add"
          type="submit"
          fullWidth
          className="sm:w-auto"
          disabled={!canAddWorkout}
        />
      </form>

      <div
        className={`mt-4 min-h-6 text-sm font-semibold text-accent transition duration-200 ease-out ${
          successMessage ? "opacity-100" : "opacity-0"
        }`}
        aria-live="polite"
      >
        {successMessage || "Workout logged"}
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-foreground">
          Today&apos;s Workout
        </h3>
        {workouts.length > 0 ? (
          <div className="mt-4 space-y-3">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="rounded-card border border-border bg-white px-5 py-4 transition duration-200 ease-out hover:border-accent-soft"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-foreground">
                      {workout.exercise}
                    </p>
                    <p className="mt-1 text-sm font-medium text-muted">
                      {workout.sets} sets of {workout.reps} reps
                      {workout.weight ? ` at ${workout.weight}` : ""}
                    </p>
                  </div>
                  <p className="shrink-0 text-right text-sm font-semibold text-accent">
                    {workout.calories} cal
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-base leading-7 text-muted">
            No workouts added yet.
          </p>
        )}
      </div>
    </AppCard>
  );
}
