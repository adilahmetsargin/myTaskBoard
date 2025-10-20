import { RootState } from "../app/store";

const STORAGE_KEY = "focusflow_v1";

export const loadState = (): any => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    // Validate that the loaded state has the expected structure
    if (parsed && typeof parsed === 'object' && parsed.tasks) {
      return parsed;
    }
    return undefined;
  } catch (err) {
    console.error("Failed to load state from localStorage:", err);
    // Clear corrupted data
    localStorage.removeItem(STORAGE_KEY);
    return undefined;
  }
};

export const saveState = (state: Partial<RootState>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save state", err);
  }
};
