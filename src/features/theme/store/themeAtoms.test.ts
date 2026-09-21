import { readMountedAtom } from "@/test/readMountedAtom";
import { describe, expect, it } from "vitest";
import { normalizeUserThemeMode, resolveThemeMode, THEME_STORAGE_KEY, userThemeModeAtom } from "./themeAtoms";

describe("theme atoms", () => {
  it("resolveThemeMode segue il sistema solo in auto", () => {
    expect(resolveThemeMode("auto", true)).toBe("dark");
    expect(resolveThemeMode("auto", false)).toBe("light");
    expect(resolveThemeMode("light", true)).toBe("light");
    expect(resolveThemeMode("dark", false)).toBe("dark");
  });

  it("normalizza sia il formato stringa sia quello legacy", () => {
    expect(normalizeUserThemeMode("dark")).toBe("dark");
    expect(normalizeUserThemeMode({ userchoice: "light", mode: "light" })).toBe("light");
    expect(normalizeUserThemeMode("neon")).toBeNull();
    expect(normalizeUserThemeMode(null)).toBeNull();
  });

  it("legge il valore legacy dal localStorage", () => {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ userchoice: "dark", mode: "dark" }));
    expect(readMountedAtom(userThemeModeAtom)).toBe("dark");
  });

  it("usa auto come fallback per valori non validi", () => {
    localStorage.setItem(THEME_STORAGE_KEY, '"purple"');
    expect(readMountedAtom(userThemeModeAtom)).toBe("auto");
  });
});
