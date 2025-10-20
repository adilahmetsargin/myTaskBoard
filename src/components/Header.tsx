import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ExportImport from "./ExportImport";

const Header: React.FC = () => {
  const total = useSelector((s: RootState) => s.tasks.items.length);
  const remaining = useSelector(
    (s: RootState) => s.tasks.items.filter((t: any) => !t.completed).length
  );
  const completed = total - remaining;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="app-title">focusFlow</h1>
        <div className="meta">
          <span>{remaining} remaining</span>
          <span className="dot">•</span>
          <span>{total} tasks</span>
        </div>
        <ExportImport />
      </div>
      {total > 0 && (
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="progress-text">{Math.round(progress)}% complete</span>
        </div>
      )}
    </header>
  );
};

export default Header;
