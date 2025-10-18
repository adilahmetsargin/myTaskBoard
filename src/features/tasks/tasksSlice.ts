import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../../types/Task";


interface TasksState {
  items: Task[];
  filter: "all" | "active" | "completed";
}

const initialState: TasksState = {
  items: [],
  filter: "all",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ text: string }>) => {
      const newTask: Task = {
        id: Date.now().toString(),
        text: action.payload.text.trim(),
        completed: false,
        createdAt: Date.now(),
      };
      if (newTask.text) state.items.unshift(newTask);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const t = state.items.find((it) => it.id === action.payload);
      if (t) t.completed = !t.completed;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((it) => it.id !== action.payload);
    },
    editTask: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const t = state.items.find((it) => it.id === action.payload.id);
      if (t) t.text = action.payload.text;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((it) => !it.completed);
    },
    setFilter: (state, action: PayloadAction<TasksState["filter"]>) => {
      state.filter = action.payload;
    },
    setAll: (state, action: PayloadAction<Task[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addTask,
  toggleTask,
  deleteTask,
  editTask,
  clearCompleted,
  setFilter,
  setAll,
} = tasksSlice.actions;
export default tasksSlice.reducer;
