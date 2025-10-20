import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, clearCompleted, setCategoryFilter, setSearchQuery } from "../features/tasks/tasksSlice";

import { FiSearch, FiX } from "react-icons/fi";
import { AppDispatch, RootState } from "../app/store";


const FilterBar: React.FC = () => {
  const { filter, categoryFilter, searchQuery, categories } = useSelector((s: RootState) => s.tasks);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="filter-bar">
      <div className="filter-section">
        <div className="search-container">
          <FiSearch size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="search-input"
          />
          {searchQuery && (
            <button
              onClick={() => dispatch(setSearchQuery(""))}
              className="clear-search"
              aria-label="Clear search"
            >
              <FiX size={14} />
            </button>
          )}
        </div>
        
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
        
        <div className="category-filters">
          <button
            className={`category-btn ${categoryFilter === "all" ? "active" : ""}`}
            onClick={() => dispatch(setCategoryFilter("all"))}
          >
            All Categories
          </button>
          {categories?.map((category: string) => (
            <button
              key={category}
              className={`category-btn ${categoryFilter === category ? "active" : ""}`}
              onClick={() => dispatch(setCategoryFilter(category))}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <button className="clear-btn" onClick={() => dispatch(clearCompleted())}>
        Clear completed
      </button>
    </div>
  );
};

export default FilterBar;
