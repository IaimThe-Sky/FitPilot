"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { storageKeys } from "@/lib/storage";
import { useLocalStorageState } from "@/lib/useLocalStorageState";

export type OnboardingValues = {
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  goal: string;
  diet: string;
};

type OnboardingContextValue = {
  onboardingValues: OnboardingValues;
  saveOnboardingValues: (values: OnboardingValues) => void;
};

export const initialOnboardingValues: OnboardingValues = {
  name: "",
  age: "",
  gender: "",
  height: "",
  weight: "",
  goal: "",
  diet: "",
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

// Use OnboardingProvider for temporary client-only onboarding state.
export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboardingValues, saveOnboardingValues] = useLocalStorageState(
    storageKeys.onboarding,
    initialOnboardingValues,
  );

  const value = useMemo(
    () => ({
      onboardingValues,
      saveOnboardingValues,
    }),
    [onboardingValues, saveOnboardingValues],
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error("useOnboarding must be used inside OnboardingProvider");
  }

  return context;
}
