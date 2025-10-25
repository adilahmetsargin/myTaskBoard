/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/init";
import { useAuth } from "../contexts/AuthContext";

export interface TaskModel {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  category?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: number | null;
}

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "users", user.uid, "tasks"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const arr: TaskModel[] = [];
        snap.forEach((doc) => {
          const data = doc.data() as any;
          arr.push({
            id: doc.id,
            text: data.text,
            completed: !!data.completed,
            createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : data.createdAt || Date.now(),
            category: data.category,
            priority: data.priority,
            dueDate: data.dueDate?.toMillis ? data.dueDate.toMillis() : data.dueDate || null,
          });
        });
        setTasks(arr);
        setLoading(false);
      },
      (err) => {
        console.error("tasks snapshot error", err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [user]);

  const addTask = useCallback(
    async (payload: Partial<TaskModel> & { text: string }) => {
      if (!user) throw new Error("Not authenticated");
      const col = collection(db, "users", user.uid, "tasks");
      await addDoc(col, {
        text: payload.text,
        completed: false,
        createdAt: Timestamp.now(),
        category: payload.category || null,
        priority: payload.priority || "medium",
        dueDate: payload.dueDate ? Timestamp.fromMillis(payload.dueDate) : null,
      });
    },
    [user]
  );

  const toggleTask = useCallback(
    async (id: string, completed: boolean) => {
      if (!user) throw new Error("Not authenticated");
      const ref = doc(db, "users", user.uid, "tasks", id);
      await updateDoc(ref, { completed: !completed });
    },
    [user]
  );

  const deleteTask = useCallback(
    async (id: string) => {
      if (!user) throw new Error("Not authenticated");
      const ref = doc(db, "users", user.uid, "tasks", id);
      await deleteDoc(ref);
    },
    [user]
  );

  const updateTask = useCallback(
    async (id: string, updates: Partial<TaskModel>) => {
      if (!user) throw new Error("Not authenticated");
      const ref = doc(db, "users", user.uid, "tasks", id);
      const payload: any = { ...updates };
      if (updates.dueDate) payload.dueDate = Timestamp.fromMillis(updates.dueDate);
      await updateDoc(ref, payload);
    },
    [user]
  );

  return {
    tasks,
    loading,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
  };
};
