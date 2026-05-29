"use client";

import { useCallback, useSyncExternalStore } from "react";
import { readStorageValue, writeStorageValue } from "@/lib/storage";

const storageEventName = "fitpilot-storage";
const snapshotCache = new Map<string, { raw: string | null; value: unknown }>();

function subscribeToStorage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(storageEventName, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(storageEventName, onStoreChange);
  };
}

function readCachedValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);
  const cached = snapshotCache.get(key);

  if (cached?.raw === raw) {
    return cached.value as T;
  }

  const value = readStorageValue(key, fallback);
  snapshotCache.set(key, { raw, value });

  return value;
}

// Use this hook when localStorage data should hydrate without mismatch warnings.
export function useLocalStorageState<T>(key: string, fallback: T) {
  const value = useSyncExternalStore(
    subscribeToStorage,
    () => readCachedValue(key, fallback),
    () => fallback,
  );

  const setValue = useCallback(
    (nextValue: T | ((currentValue: T) => T)) => {
      const currentValue = readCachedValue(key, fallback);
      const resolvedValue =
        typeof nextValue === "function"
          ? (nextValue as (currentValue: T) => T)(currentValue)
          : nextValue;

      writeStorageValue(key, resolvedValue);
      snapshotCache.delete(key);
      window.dispatchEvent(new Event(storageEventName));
    },
    [fallback, key],
  );

  return [value, setValue] as const;
}
