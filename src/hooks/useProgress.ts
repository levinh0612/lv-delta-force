import { useCallback, useMemo } from "react";
import { DAYS, TOTAL_STEPS, stepKey } from "../data/days";
import { useLocalStorage } from "./useLocalStorage";

export type Progress = { done: Record<string, boolean>; day: number };

// Same key as the original single-file page so existing progress carries over.
export const PROGRESS_KEY = "df-wp-7days";
const EMPTY: Progress = { done: {}, day: 0 };

export function useProgress() {
  const [state, setState, reset] = useLocalStorage<Progress>(PROGRESS_KEY, EMPTY);
  const safe: Progress = state && typeof state === "object" && state.done ? state : EMPTY;

  const toggle = useCallback(
    (key: string, on: boolean) => setState((s) => ({ ...s, done: { ...s.done, [key]: on } })),
    [setState],
  );
  const setDay = useCallback(
    (day: number) => setState((s) => ({ ...s, day: Math.min(Math.max(day, 0), DAYS.length - 1) })),
    [setState],
  );

  const stats = useMemo(() => {
    const perDay = DAYS.map((d, i) => {
      const done = d.steps.filter((s) => safe.done[stepKey(i, s.id)]).length;
      return { done, total: d.steps.length, complete: done === d.steps.length };
    });
    const doneCount = perDay.reduce((n, d) => n + d.done, 0);
    const firstOpen = perDay.findIndex((d) => !d.complete);
    return {
      perDay,
      doneCount,
      total: TOTAL_STEPS,
      pct: Math.round((doneCount / TOTAL_STEPS) * 100),
      nextDay: firstOpen === -1 ? DAYS.length - 1 : firstOpen,
      finished: firstOpen === -1,
    };
  }, [safe.done]);

  return { state: safe, setState, toggle, setDay, reset, stats };
}
