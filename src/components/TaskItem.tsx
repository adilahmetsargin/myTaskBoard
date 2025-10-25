import React from "react";
import { useDispatch } from "react-redux";

import { FiTrash2, FiCheckCircle, FiCircle, FiEdit2, FiFlag } from "react-icons/fi";


import { Task } from "../types/Task";
import { AppDispatch } from "../app/store";
import { deleteTask, toggleTask,updateTask } from "../features/tasks/tasksSlice";

interface TaskItemProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleToggle = () => dispatch(toggleTask(task.id));
  const handleDelete = () => dispatch(deleteTask(task.id));

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateTask({ id: task.id, updates: { priority: e.target.value as Task["priority"] } }));
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <button onClick={handleToggle} className="toggle-btn" aria-label="Toggle task">
        {task.completed ? <FiCheckCircle color="#FF6955" /> : <FiCircle />}
      </button>

      <div className="task-content">
        <div className="task-text">
          <span>{task.text}</span>
        </div>
        <div className="task-meta">
          {task.category && <span className="task-category">{task.category}</span>}
          {task.dueDate && (
            <span className="task-date">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
          <div className="task-priority">
            <FiFlag size={12} />
            <select value={task.priority} onChange={handlePriorityChange} className={`priority-${task.priority}`}>
              <option value="low">Low</option>
              <option value="medium">Med</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button onClick={() => onEdit?.(task)} className="edit-btn" aria-label="Edit">
          <FiEdit2 />
        </button>
        <button onClick={handleDelete} className="delete-btn" aria-label="Delete">
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
