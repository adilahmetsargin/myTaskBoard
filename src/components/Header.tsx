import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Header: React.FC = () => {
  const total = useSelector((s: RootState) => s.tasks.items.length);
  const remaining = useSelector(
    (s: RootState) => s.tasks.items.filter((t) => !t.completed).length
  );

  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="app-title">focusFlow</h1>
        <div className="meta">
          <span>{remaining} remaining</span>
          <span className="dot">•</span>
          <span>{total} tasks</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
