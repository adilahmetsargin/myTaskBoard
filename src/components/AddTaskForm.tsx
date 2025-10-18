import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/tasksSlice";
import { AppDispatch } from "../app/store";
import { FiPlus } from "react-icons/fi";

const AddTaskForm: React.FC = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim()) return;
    dispatch(addTask({ text }));
    setText("");
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        className="add-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        aria-label="Add task"
      />
      <button className="add-btn" type="submit" aria-label="Add">
        <FiPlus size={18} />
      </button>
    </form>
  );
};

export default AddTaskForm;
