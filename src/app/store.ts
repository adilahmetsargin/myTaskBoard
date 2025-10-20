import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";
import { loadState, saveState } from "../utils/storage";

const persisted = loadState();

const preloadedState =
  persisted && persisted.tasks ? { tasks: persisted.tasks } : undefined;

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    tasks: store.getState().tasks,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;







