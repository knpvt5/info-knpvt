import React, { useEffect, useState } from "react";
import { fetchUserInfo } from "../../utils";
import type { locationData } from "../../types";
import "./allUserData.css";

export function AllUserData() {
  const [userData, setUserData] = useState<locationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await fetchUserInfo();
        console.log("Fetched user info data:", data);
        setUserData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <div className="all-user-data-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-user-data-container">
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (userData.length === 0) {
    return (
      <div className="all-user-data-container">
        <div className="empty-state">
          <span className="empty-icon">📭</span>
          <p>No user data available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="all-user-data-container">
      <h1 className="all-users-title">🌐 All User Data</h1>
      <p className="users-count">Total Users: <strong>{userData.length}</strong></p>

      <div className="users-grid">
        {userData.map((user, index) => (
          <div className="user-card" key={index}>
            <div className="user-card-header">
              <span className="user-number">User #{index + 1}</span>
            </div>

            <div className="user-details">
              <div className="detail-row">
                <span className="detail-label">🌍 IP Address</span>
                <span className="detail-value">{user.ipaddress}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">📡 ISP</span>
                <span className="detail-value">{user.isp}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">📍 Coordinates</span>
                <span className="detail-value">
                  {user.coordinates[0].toFixed(4)}, {user.coordinates[1].toFixed(4)}
                </span>
              </div>

              <div className="detail-row">
                <span className="detail-label">🏴 Country</span>
                <span className="detail-value">{user.country}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">🏛️ Capital</span>
                <span className="detail-value">{user.capital}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">🏙️ State</span>
                <span className="detail-value">{user.state}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">📮 ZIP Code</span>
                <span className="detail-value">{user.zip}</span>
              </div>

              <div className="detail-row full">
                <span className="detail-label">🗺️ Region</span>
                <span className="detail-value">{user.region}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">🕐 Timezone</span>
                <span className="detail-value">{user.timezone}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">📅 Created At</span>
                <span className="detail-value">
                  {user.created_at ? new Date(user.created_at as string).toLocaleString() : "—"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
