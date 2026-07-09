import { neutralTheme } from "@astryxdesign/theme-neutral/built";
import { butterTheme } from "@astryxdesign/theme-butter/built";
import { chocolateTheme } from "@astryxdesign/theme-chocolate/built";
import { gothicTheme } from "@astryxdesign/theme-gothic/built";
import { matchaTheme } from "@astryxdesign/theme-matcha/built";
import { stoneTheme } from "@astryxdesign/theme-stone/built";
import { y2kTheme } from "@astryxdesign/theme-y2k/built";

export const THEME_STORAGE_KEY = "cool-project-theme";
export const DEFAULT_THEME_ID = "neutral";

export const THEME_OPTIONS = [
  { value: "neutral", label: "Neutral", description: "Muted and minimal" },
  { value: "butter", label: "Butter", description: "Golden surfaces with blue accents" },
  { value: "chocolate", label: "Chocolate", description: "Warm browns and cozy beige" },
  { value: "gothic", label: "Gothic", description: "Dark atmospheric blue-gray" },
  { value: "matcha", label: "Matcha", description: "Earthy greens" },
  { value: "stone", label: "Stone", description: "Warm stone and slate tones" },
  { value: "y2k", label: "Y2K", description: "Playful periwinkle and holographic accents" },
];

export const THEMES = {
  neutral: neutralTheme,
  butter: butterTheme,
  chocolate: chocolateTheme,
  gothic: gothicTheme,
  matcha: matchaTheme,
  stone: stoneTheme,
  y2k: y2kTheme,
};

export const THEME_IDS = Object.keys(THEMES);

export function isValidThemeId(id) {
  return Boolean(id && THEMES[id]);
}

export function getStoredThemeId() {
  if (typeof window === "undefined") {
    return DEFAULT_THEME_ID;
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isValidThemeId(stored) ? stored : DEFAULT_THEME_ID;
}

export function storeThemeId(id) {
  window.localStorage.setItem(THEME_STORAGE_KEY, id);
}

export function themeModeFor(themeId) {
  return themeId === "gothic" ? "dark" : "system";
}
