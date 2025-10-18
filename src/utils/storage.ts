import { RootState } from "../app/store";

const STORAGE_KEY = "focusflow_v1";

export const loadState = (): Partial<RootState> | undefined => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to load state", err);
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
