/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { auth } from "../firebase/init";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {

  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editing, setEditing] = useState(true);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Profile fields
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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

  const handleUpdate = async () => {
    try {
      if (displayName !== user?.displayName) await updateProfile(auth.currentUser!, { displayName });
      if (email !== user?.email) await updateEmail(auth.currentUser!, email);
      if (password) await updatePassword(auth.currentUser!, password);
      setMessage("Profile updated successfully!");
      setEditing(false);
      setPassword("");
       navigate("/")
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  const handleCancel = () => {
    setDisplayName(user?.displayName || "");
    setEmail(user?.email || "");
    setPassword("");
    setEditing(false);
    setMessage("");
    navigate("/")
    
  };

  return (
    <header className="header">
      <div className="header-top">
        <h1 className="app-title">focusFlow</h1>

        {user && (
          <div className="user-info" ref={dropdownRef}>
            <div className="user-profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className="avatar">{getUserAvatar()}</div>
            </div>
            
            <button className="update-btn" onClick={()=>navigate(-1)}>Go Back</button>

            {dropdownOpen && (
              <div className="dropdown">
                <button className="dropdown-item" onClick={logout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Profile Edit Section */}
      {editing && (
        <div className="profile-edit">
          <input
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password (leave blank to keep current)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="profile-buttons">
            <button onClick={handleUpdate} className="update-btn">Update</button>
            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
          </div>
          {message && <p className="profile-message">{message}</p>}
        </div>
      )}
    </header>
  );
};

export default Header;
