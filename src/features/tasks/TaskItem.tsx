import React, { useState } from "react";
import { Task } from "../../types/Task";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTask, editTask } from "./tasksSlice";
import { AppDispatch } from "../../app/store";
import { FiTrash2, FiEdit, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.text);

  const saveEdit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    dispatch(editTask({ id: task.id, text: trimmed }));
    setEditing(false);
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className={`task-item ${task.completed ? "completed" : ""}`}
    >
      <label className="task-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch(toggleTask(task.id))}
        />
        {editing ? (
          <input
            className="edit-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit();
              if (e.key === "Escape") {
                setEditing(false);
                setValue(task.text);
              }
            }}
            autoFocus
          />
        ) : (
          <span className="task-text">{task.text}</span>
        )}
      </label>

      <div className="task-actions">
        {editing ? (
          <button
            className="icon-btn"
            title="Save"
            onClick={() => saveEdit()}
            aria-label="Save"
          >
            <FiCheck />
          </button>
        ) : (
          <button
            className="icon-btn"
            title="Edit"
            onClick={() => setEditing(true)}
            aria-label="Edit"
          >
            <FiEdit />
          </button>
        )}
        <button
          className="icon-btn danger"
          title="Delete"
          onClick={() => dispatch(deleteTask(task.id))}
          aria-label="Delete"
        >
          <FiTrash2 />
        </button>
      </div>
    </motion.li>
  );
};

export default TaskItem;
