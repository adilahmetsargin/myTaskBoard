/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ExportImport from "./ExportImport";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const total = useSelector((s: RootState) => s.tasks.items.length);
  const remaining = useSelector(
    (s: RootState) => s.tasks.items.filter((t: any) => !t.completed).length
  );
  const completed = total - remaining;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const getUserAvatar = () => {
    if (user?.photoURL) return user.photoURL;
    if (user?.displayName) return user.displayName.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "?";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-top">
        <h1 className="app-title">focusFlow</h1>

        {user && (
          <div className="user-info" ref={dropdownRef}>
            <div className="user-profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className="avatar">{getUserAvatar()}</div>
            </div>

            {dropdownOpen && (
              <div className="dropdown">
                <button className="dropdown-item" onClick={() => navigate("/profile")}>
                  Profile
                </button>
                <button className="dropdown-item" onClick={logout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="header-bottom">
        <div className="meta">
          <span>Simple | Realtime | Firebase</span>
          <span className="dot">•</span>
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
