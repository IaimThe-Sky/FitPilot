"use client";

import { useState, type FormEvent } from "react";
import { AppCard } from "@/components/ui/AppCard";
import { buttons, fields } from "@/components/ui/design-system";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export type LoggedMeal = {
  id: number;
  name: string;
  quantity: number;
  unit: QuantityUnit;
  calories: number;
  protein: number;
};

type MealLogCardProps = {
  meals: LoggedMeal[];
  onAddMeal: (meal: Omit<LoggedMeal, "id">) => void;
};

const nutritionByFood: Record<string, { calories: number; protein: number }> = {
  rice: { calories: 200, protein: 4 },
  paneer: { calories: 260, protein: 18 },
  roti: { calories: 120, protein: 4 },
  dal: { calories: 180, protein: 10 },
  milk: { calories: 150, protein: 8 },
};

type QuantityUnit = "g" | "bowl" | "cup" | "piece";

const unitOptions: QuantityUnit[] = ["g", "bowl", "cup", "piece"];

const unitMultipliers: Record<QuantityUnit, number> = {
  g: 0.01,
  bowl: 1,
  cup: 1,
  piece: 1,
};

const quickAddMeals: Array<{
  name: string;
  quantity: number;
  unit: QuantityUnit;
}> = [
  { name: "Roti", quantity: 1, unit: "piece" },
  { name: "Rice", quantity: 1, unit: "cup" },
  { name: "Dal", quantity: 1, unit: "bowl" },
  { name: "Paneer", quantity: 100, unit: "g" },
  { name: "Milk", quantity: 1, unit: "cup" },
];

function getNutrition(
  foodName: string,
  quantity: number,
  unit: QuantityUnit,
) {
  const food = nutritionByFood[foodName.trim().toLowerCase()] ?? {
    calories: 150,
    protein: 6,
  };
  const multiplier = quantity * unitMultipliers[unit];

  return {
    calories: Math.round(food.calories * multiplier),
    protein: Math.round(food.protein * multiplier),
  };
}

// Use MealLogCard for a simple local-only meal entry experience.
export function MealLogCard({ meals, onAddMeal }: MealLogCardProps) {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState<QuantityUnit>("bowl");
  const [successMessage, setSuccessMessage] = useState("");

  const parsedQuantity = Number(quantity);
  const canAddMeal = foodName.trim().length > 0 && parsedQuantity > 0;

  function saveMeal(name: string, amount: number, amountUnit: QuantityUnit) {
    const nutrition = getNutrition(name, amount, amountUnit);

    onAddMeal({
      name,
      quantity: amount,
      unit: amountUnit,
      calories: nutrition.calories,
      protein: nutrition.protein,
    });

    setSuccessMessage(`${name} added`);
  }

  function addMeal(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    if (!canAddMeal) {
      return;
    }

    saveMeal(foodName.trim(), parsedQuantity, unit);

    setFoodName("");
    setQuantity("1");
    setUnit("bowl");
  }

  function quickAddMeal(meal: (typeof quickAddMeals)[number]) {
    saveMeal(meal.name, meal.quantity, meal.unit);
  }

  return (
    <AppCard
      title="Log a meal"
      subtitle="Add one simple item at a time."
      className="max-w-3xl"
    >
      <div className="mb-7">
        <p className="mb-3 text-sm font-semibold text-muted">Quick Add</p>
        <div className="flex flex-wrap gap-2">
          {quickAddMeals.map((meal) => (
            <button
              key={meal.name}
              type="button"
              className={buttons.chip}
              onClick={() => quickAddMeal(meal)}
            >
              {meal.name}
            </button>
          ))}
        </div>
      </div>

      <form
        className="grid gap-3 sm:grid-cols-[1fr_7rem_8rem_auto]"
        onSubmit={addMeal}
      >
        <label>
          <span className="sr-only">Food name</span>
          <input
            className={fields.input}
            placeholder="Rice, Paneer, Roti, or Dal"
            value={foodName}
            onChange={(event) => setFoodName(event.target.value)}
          />
        </label>

        <label>
          <span className="sr-only">Quantity</span>
          <input
            className={fields.input}
            inputMode="decimal"
            placeholder="Qty"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </label>

        <label>
          <span className="sr-only">Quantity unit</span>
          <select
            className={fields.select}
            value={unit}
            onChange={(event) => setUnit(event.target.value as QuantityUnit)}
          >
            {unitOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <PrimaryButton
          label="Add meal"
          type="submit"
          fullWidth
          className="sm:w-auto"
          disabled={!canAddMeal}
        />
      </form>

      <div
        className={`mt-4 min-h-6 text-sm font-semibold text-accent transition duration-200 ease-out ${
          successMessage ? "opacity-100" : "opacity-0"
        }`}
        aria-live="polite"
      >
        {successMessage || "Meal added"}
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-foreground">
          Today&apos;s Meals
        </h3>
        {meals.length > 0 ? (
          <div className="mt-4 space-y-3">
            {meals.map((meal) => (
              <div
                key={meal.id}
                className="rounded-card border border-border bg-white px-5 py-4 transition duration-200 ease-out hover:border-accent-soft"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-foreground">
                      {meal.name}
                    </p>
                    <p className="mt-1 text-sm font-medium text-muted">
                      {meal.quantity} {meal.unit}
                    </p>
                  </div>
                  <p className="shrink-0 text-right text-sm font-semibold text-accent">
                    {meal.calories} cal
                    <br />
                    {meal.protein}g protein
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-base leading-7 text-muted">
            No meals added yet.
          </p>
        )}
      </div>
    </AppCard>
  );
}
