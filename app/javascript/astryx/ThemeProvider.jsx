import React, { createContext, useContext, useMemo, useState } from "react";
import { Theme } from "@astryxdesign/core/theme";
import {
  DEFAULT_THEME_ID,
  THEME_OPTIONS,
  THEMES,
  getStoredThemeId,
  isValidThemeId,
  storeThemeId,
  themeModeFor,
} from "./themes";

const ThemePreferenceContext = createContext(null);

export function useThemePreference() {
  const context = useContext(ThemePreferenceContext);
  if (!context) {
    throw new Error("useThemePreference must be used within ThemeProvider");
  }
  return context;
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeIdState] = useState(() => getStoredThemeId());
  const theme = THEMES[themeId] || THEMES[DEFAULT_THEME_ID];
  const mode = themeModeFor(themeId);

  const setThemeId = (nextThemeId) => {
    if (!isValidThemeId(nextThemeId)) {
      return;
    }

    setThemeIdState(nextThemeId);
    storeThemeId(nextThemeId);
  };

  const value = useMemo(
    () => ({
      themeId,
      setThemeId,
      themeOptions: THEME_OPTIONS,
    }),
    [themeId]
  );

  return (
    <ThemePreferenceContext value={value}>
      <Theme theme={theme} mode={mode}>
        {children}
      </Theme>
    </ThemePreferenceContext>
  );
}
