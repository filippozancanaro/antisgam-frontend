import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useUserThemeMode, type UserThemeMode } from "@/features/theme";
import { useClearScanHistory, useScanHistory } from "@/features/scan/hooks/useScanHistory";

/** Form delle impostazioni: le modifiche vengono applicate solo al salvataggio. */
export const useSettingsForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
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
    enqueueSnackbar("Cronologia delle scansioni cancellata", { variant: "info" });
  }, [clearHistory, enqueueSnackbar]);

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
