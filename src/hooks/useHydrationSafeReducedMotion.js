import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback) {
  const mediaQuery = window.matchMedia(QUERY);

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
  }

  mediaQuery.addListener(callback);
  return () => mediaQuery.removeListener(callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Keeps the server and first browser render identical, then follows the
 * user's live reduced-motion preference immediately after hydration.
 */
export default function useHydrationSafeReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
