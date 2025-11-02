import React, { useState } from "react";
import "./userDataAccessFirewall.css";
import { getAccessPass } from "../utils";

export default function UserDataAccessFirewall({
  sethasUserDataAccess,
}: Readonly<{
  sethasUserDataAccess: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasAccess = await getAccessPass();

    if (password.trim() === hasAccess.dataAccessPass) {
    //   console.log("Password match ✅");
      sethasUserDataAccess(true);
      setErrorMessage("");
    } else {
    //   console.log("Password incorrect ❌");
      sethasUserDataAccess(false);
      setErrorMessage("❌ Incorrect password. Please try again.");
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setErrorMessage("");
      }, 3000);
      setPassword("");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="lock-icon">🔐</div>
          <h1 className="auth-title">Access Control</h1>
          <p className="auth-subtitle">Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className={isShaking ? "shake" : ""}>
          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="password-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errorMessage && (
              <div className="error-message-box">
                <p>{errorMessage}</p>
              </div>
            )}
          </div>

          <button type="submit" className="submit-button">
            <span className="button-text">Unlock</span>
            <span className="button-icon">🔓</span>
          </button>
        </form>

        <div className="auth-footer">
          <p className="footer-text">🔒 Secured Access</p>
        </div>
      </div>
    </div>
  );
}
