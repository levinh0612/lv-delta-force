import { useCallback, useMemo } from "react";
import { computeStats, type Raid } from "../lib/raids";
import { useLocalStorage } from "./useLocalStorage";

export const RAIDS_KEY = "df-wp-raids";

export function useRaidLog() {
  const [raw, setRaids] = useLocalStorage<Raid[]>(RAIDS_KEY, []);
  const raids = useMemo(() => (Array.isArray(raw) ? raw : []), [raw]);

  const add = useCallback(
    (r: Omit<Raid, "id" | "at">) =>
      setRaids((list) => [{ ...r, id: crypto.randomUUID?.() ?? String(Date.now()), at: Date.now() }, ...(Array.isArray(list) ? list : [])]),
    [setRaids],
  );
  const remove = useCallback((id: string) => setRaids((list) => list.filter((r) => r.id !== id)), [setRaids]);
  const clear = useCallback(() => setRaids([]), [setRaids]);

  const stats = useMemo(() => computeStats(raids), [raids]);
  return { raids, add, remove, clear, stats };
}
