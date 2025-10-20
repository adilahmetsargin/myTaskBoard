import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../../types/Task";


interface TasksState {
  items: Task[];
  filter: "all" | "active" | "completed";
  categoryFilter: string;
  searchQuery: string;
  categories: string[];
}

const initialState: TasksState = {
  items: [],
  filter: "all",
  categoryFilter: "all",
  searchQuery: "",
  categories: ["Work", "Personal", "Shopping", "Health", "Learning"],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ text: string; category?: string; priority?: 'low' | 'medium' | 'high'; dueDate?: number }>) => {
      const newTask: Task = {
        id: Date.now().toString(),
        text: action.payload.text.trim(),
        completed: false,
        createdAt: Date.now(),
        category: action.payload.category,
        priority: action.payload.priority || 'medium',
        dueDate: action.payload.dueDate,
      };
      if (newTask.text) {
        state.items.unshift(newTask);
        // Add new category if it doesn't exist
        if (newTask.category && !state.categories.includes(newTask.category)) {
          state.categories.push(newTask.category);
        }
      }
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
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    updateTask: (state, action: PayloadAction<{ id: string; updates: Partial<Task> }>) => {
      const task = state.items.find(t => t.id === action.payload.id);
      if (task) {
        Object.assign(task, action.payload.updates);
      }
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
  setCategoryFilter,
  setSearchQuery,
  addCategory,
  updateTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;

