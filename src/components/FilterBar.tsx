import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, clearCompleted } from "../features/tasks/tasksSlice";
import { RootState, AppDispatch } from "../app/store";

const FilterBar: React.FC = () => {
  const filter = useSelector((s: RootState) => s.tasks.filter);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="filter-bar">
      <div className="filters">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => dispatch(setFilter("all"))}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === "active" ? "active" : ""}`}
          onClick={() => dispatch(setFilter("active"))}
        >
          Active
        </button>
        <button
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => dispatch(setFilter("completed"))}
        >
          Completed
        </button>
      </div>
      <button className="clear-btn" onClick={() => dispatch(clearCompleted())}>
        Clear completed
      </button>
    </div>
  );
};

export default FilterBar;
