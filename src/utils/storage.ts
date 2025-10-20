import { RootState } from "../app/store";

const STORAGE_KEY = "focusflow_v1";

export const loadState = (): any => {
  try {
    
    if (typeof window === "undefined" || !window.localStorage) {
      return undefined;
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && parsed.tasks) {
      return { tasks: parsed.tasks }; 
    }
    return undefined;
  } catch (err) {
    console.error("Failed to load state from localStorage:", err);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
    return undefined;
  }
};

export const saveState = (state: Partial<RootState>) => {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save state", err);
  }
};
