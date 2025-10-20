import React, { useState, memo } from "react";
import { Task } from "../../types/Task";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTask, editTask, updateTask } from "./tasksSlice";
import { AppDispatch } from "../../app/store";
import { FiTrash2, FiEdit, FiCheck, FiTag, FiFlag, FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.text);
  const [editPriority, setEditPriority] = useState(task.priority || 'medium');

  const saveEdit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    dispatch(editTask({ id: task.id, text: trimmed }));
    if (editPriority !== task.priority) {
      dispatch(updateTask({ id: task.id, updates: { priority: editPriority } }));
    }
    setEditing(false);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const isOverdue = (dueDate: number) => {
    return dueDate < Date.now() && !task.completed;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#27ae60';
      default: return '#95a5a6';
    }
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -6, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -6 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className={`task-item ${task.completed ? "completed" : ""}`}
    >
      <label className="task-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch(toggleTask(task.id))}
          aria-label={`Mark task "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`}
        />
        {editing ? (
          <div className="edit-container">
            <input
              className="edit-input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEdit();
                if (e.key === "Escape") {
                  setEditing(false);
                  setValue(task.text);
                  setEditPriority(task.priority || 'medium');
                }
              }}
              onBlur={saveEdit}
              autoFocus
            />
            <div className="edit-priority">
              <span className="edit-priority-label">Priority:</span>
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="edit-priority-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="task-content">
            <span className="task-text">{task.text}</span>
            <div className="task-meta">
              {task.category && (
                <span className="task-category">
                  <FiTag size={12} />
                  {task.category}
                </span>
              )}
              {task.priority && (
                <span 
                  className="task-priority"
                  style={{ color: getPriorityColor(task.priority) }}
                >
                  <FiFlag size={12} />
                  {task.priority}
                </span>
              )}
              {task.dueDate && (
                <span className={`task-due ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
                  <FiCalendar size={12} />
                  {formatDate(task.dueDate)}
                </span>
              )}
            </div>
          </div>
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

export default memo(TaskItem);
