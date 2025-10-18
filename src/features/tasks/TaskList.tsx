import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import TaskItem from "./TaskItem";
import { AnimatePresence } from "framer-motion";

const TaskList: React.FC = () => {
  const { items, filter } = useSelector((s: RootState) => s.tasks);

  const filtered = items.filter((t) =>
    filter === "all" ? true : filter === "active" ? !t.completed : t.completed
  );

  if (filtered.length === 0) {
    return <p className="empty">No tasks here — add your first task!</p>;
  }

  return (
    <ul className="task-list">
      <AnimatePresence>
        {filtered.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default TaskList;
