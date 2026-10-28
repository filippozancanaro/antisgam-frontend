import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserThemeMode, type UserThemeMode } from "@/features/theme";
import { useClearScanHistory, useScanHistory } from "@/features/scan/hooks/useScanHistory";
import { useToast } from "@/shared/ui";

/** Form delle impostazioni: le modifiche vengono applicate solo al salvataggio. */
export const useSettingsForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [savedTheme, setSavedTheme] = useUserThemeMode();
  const [theme, setTheme] = useState<UserThemeMode>(savedTheme);

  const history = useScanHistory();
  const clearHistory = useClearScanHistory();

  const save = useCallback(() => {
    setSavedTheme(theme);
    navigate("/");
  }, [theme, setSavedTheme, navigate]);

  const discard = useCallback(() => {
    setTheme(savedTheme);
    navigate("/");
  }, [savedTheme, navigate]);

  const clearScanHistory = useCallback(() => {
    clearHistory();
    toast("Cronologia delle scansioni cancellata", "info");
  }, [clearHistory, toast]);

  return {
    theme,
    setTheme,
    isDirty: theme !== savedTheme,
    save,
    discard,
    historyCount: history.length,
    clearScanHistory,
  };
};
