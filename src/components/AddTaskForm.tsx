import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../features/tasks/tasksSlice";

import { FiPlus, FiCalendar, FiTag, FiFlag } from "react-icons/fi";
import { AppDispatch, RootState } from "../app/store";

const AddTaskForm: React.FC = () => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector((state: RootState) => state.tasks);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim()) return;
    
    dispatch(addTask({ 
      text, 
      category: category || undefined,
      priority,
      dueDate: dueDate ? new Date(dueDate).getTime() : undefined
    }));
    
    setText("");
    setCategory("");
    setPriority('medium');
    setDueDate("");
    setShowAdvanced(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    
    // Priority shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case '1':
          e.preventDefault();
          setPriority('low');
          break;
        case '2':
          e.preventDefault();
          setPriority('medium');
          break;
        case '3':
          e.preventDefault();
          setPriority('high');
          break;
      }
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="add-form-main">
        <input
          className="add-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task... (Enter to add, Ctrl+1/2/3 for priority)"
          aria-label="Add task"
        />
        <button className="add-btn" type="submit" aria-label="Add">
          <FiPlus size={18} />
        </button>
        <button 
          type="button" 
          className={`advanced-btn ${showAdvanced ? 'active' : ''}`}
          onClick={() => setShowAdvanced(!showAdvanced)}
          aria-label="Advanced options"
        >
          <FiTag size={16} />
        </button>
      </div>
      
      {/* Quick Priority Selection */}
      <div className="quick-priority">
        <span className="priority-label">Priority:</span>
        <div className="priority-buttons">
          <button
            type="button"
            className={`priority-btn ${priority === 'low' ? 'active low' : ''}`}
            onClick={() => setPriority('low')}
            title="Low Priority"
          >
            <FiFlag size={12} />
            Low
          </button>
          <button
            type="button"
            className={`priority-btn ${priority === 'medium' ? 'active medium' : ''}`}
            onClick={() => setPriority('medium')}
            title="Medium Priority"
          >
            <FiFlag size={12} />
            Medium
          </button>
          <button
            type="button"
            className={`priority-btn ${priority === 'high' ? 'active high' : ''}`}
            onClick={() => setPriority('high')}
            title="High Priority"
          >
            <FiFlag size={12} />
            High
          </button>
        </div>
      </div>
      
      {showAdvanced && (
        <div className="advanced-options">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">
                <FiTag size={14} />
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
              >
                <option value="">Select category</option>
                {categories?.map((cat: string) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="priority">
                <FiFlag size={14} />
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="form-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="dueDate">
                <FiCalendar size={14} />
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default AddTaskForm;
