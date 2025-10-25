import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskItem from "./TaskItem";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { AppDispatch, RootState } from "../app/store";
import { setAll } from "../features/tasks/tasksSlice";
import { useAuth } from "../contexts/AuthContext";
import { Task } from "../types/Task";
import { db } from "../firebase/init";

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { items, filter, categoryFilter, searchQuery } = useSelector((s: RootState) => s.tasks);


  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasks: Task[] = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Task[];
      dispatch(setAll(tasks));
    });
    return () => unsubscribe();
  }, [user, dispatch]);


  const filteredTasks = items
    .filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    })
    .filter((t) => (categoryFilter === "all" ? true : t.category === categoryFilter))
    .filter((t) => t.text.toLowerCase().includes(searchQuery.toLowerCase()));

  if (!filteredTasks.length) {
    return <p className="empty-text">No tasks found 🎉</p>;
  }

  return (
    <div className="task-list">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
