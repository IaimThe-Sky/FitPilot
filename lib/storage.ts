export function readStorageValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorageValue<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export const storageKeys = {
  onboarding: "fitpilot:onboarding",
  meals: "fitpilot:meals",
  workouts: "fitpilot:workouts",
  weights: "fitpilot:weights",
} as const;
