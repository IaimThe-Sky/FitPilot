"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  initialOnboardingValues,
  type OnboardingValues,
  useOnboarding,
} from "@/components/onboarding/OnboardingProvider";
import { AppCard } from "@/components/ui/AppCard";
import { fields } from "@/components/ui/design-system";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

type OnboardingStep = {
  key: keyof OnboardingValues;
  question: string;
  helper: string;
  placeholder?: string;
  inputMode?: "text" | "numeric";
  options?: string[];
};

const steps: OnboardingStep[] = [
  {
    key: "name",
    question: "What is your name?",
    helper: "This helps FitPilot feel personal.",
    placeholder: "Enter your name",
  },
  {
    key: "age",
    question: "How old are you?",
    helper: "A simple age estimate is enough.",
    placeholder: "Enter your age",
    inputMode: "numeric",
  },
  {
    key: "gender",
    question: "What is your gender?",
    helper: "Choose the option that fits best.",
    options: ["Female", "Male", "Non-binary", "Prefer not to say"],
  },
  {
    key: "height",
    question: "What is your height?",
    helper: "Use the unit you are most comfortable with.",
    placeholder: "Example: 5'10 or 178 cm",
  },
  {
    key: "weight",
    question: "What is your weight?",
    helper: "Use pounds or kilograms.",
    placeholder: "Example: 165 lb or 75 kg",
  },
  {
    key: "goal",
    question: "What is your main goal?",
    helper: "Pick one focus for now.",
    options: ["Lose weight", "Build muscle", "Stay healthy", "Improve fitness"],
  },
  {
    key: "diet",
    question: "What is your diet preference?",
    helper: "This can be changed later.",
    options: ["No preference", "Vegetarian", "Vegan", "High protein"],
  },
];

// Use OnboardingFlow for a calm, one-question-at-a-time setup experience.
export function OnboardingFlow() {
  const router = useRouter();
  const { saveOnboardingValues } = useOnboarding();
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState<OnboardingValues>(
    initialOnboardingValues,
  );

  const step = steps[currentStep];
  const progress = Math.round(((currentStep + 1) / steps.length) * 100);
  const currentValue = values[step.key];
  const canGoBack = currentStep > 0;
  const isLastStep = currentStep === steps.length - 1;
  const canContinue = currentValue.trim().length > 0;

  const progressLabel = useMemo(
    () => `Step ${currentStep + 1} of ${steps.length}`,
    [currentStep],
  );

  function updateValue(value: string) {
    setValues((previousValues) => ({
      ...previousValues,
      [step.key]: value,
    }));
  }

  function goBack() {
    setCurrentStep((stepIndex) => Math.max(stepIndex - 1, 0));
  }

  function goNext() {
    if (!canContinue) {
      return;
    }

    if (isLastStep) {
      saveOnboardingValues(values);
      router.push("/dashboard");
      return;
    }

    setCurrentStep((stepIndex) => Math.min(stepIndex + 1, steps.length - 1));
  }

  return (
    <AppCard className="max-w-2xl">
      <div className="mb-10">
        <div className="mb-3 flex items-center justify-between text-sm font-medium text-muted">
          <span>{progressLabel}</span>
          <span>{progress}%</span>
        </div>
        <div
          className="h-2 rounded-control bg-accent-soft"
          role="progressbar"
          aria-label="Onboarding progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            className="h-full rounded-control bg-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div key={step.key} className="transition-opacity duration-200">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-accent">
          FitPilot setup
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {step.question}
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted">{step.helper}</p>

        <div className="mt-8">
          {step.options ? (
            <div className="grid gap-3">
              {step.options.map((option) => {
                const isSelected = currentValue === option;

                return (
                  <button
                    key={option}
                    type="button"
                    className={`${fields.option} ${
                      isSelected ? fields.optionSelected : ""
                    }`.trim()}
                    aria-pressed={isSelected}
                    onClick={() => updateValue(option)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          ) : (
            <label className="block">
              <span className="sr-only">{step.question}</span>
              <input
                className={fields.input}
                inputMode={step.inputMode}
                placeholder={step.placeholder}
                value={currentValue}
                onChange={(event) => updateValue(event.target.value)}
              />
            </label>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <SecondaryButton
          label="Back"
          fullWidth
          disabled={!canGoBack}
          onClick={goBack}
        />
        <PrimaryButton
          label={isLastStep ? "Finish" : "Next"}
          fullWidth
          disabled={!canContinue}
          onClick={goNext}
        />
      </div>
    </AppCard>
  );
}
