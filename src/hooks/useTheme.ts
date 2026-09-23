import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export type Theme = "system" | "light" | "dark";
const ORDER: Theme[] = ["system", "light", "dark"];

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>("df-theme", "system");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", theme);
  }, [theme]);

  const cycle = () => setTheme(ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]);
  return { theme, cycle };
}
