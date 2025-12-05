import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Header.css";

export default function Heade({ currentUser }) {
  const nav = useNavigate();
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    async function load() {
      if (!currentUser?.username) return;

      try {
        const res = await API.get(`/users/${currentUser.username}`);
        setProfileUser(res.data.user);
      } catch (err) {
        console.log("Error loading user for header");
      }
    }

    load();
  }, [currentUser]);

  // هدر ساده وقتی هنوز لود نشده
  if (!profileUser) {
    return (
      <div className="app-header">
        <div className="header-title">همایند</div>
      </div>
    );
  }

  return (
    <div className="app-header">

      {/* راست: عکس + نام کاربر */}
      <div
        className="header-right"
        onClick={() => nav(`/profile/${profileUser.username}`)}
      >
        <img
          src={`https://nodeproblem-3.onrender.com${profileUser.avatar || "/default-avatar.png"}`}
          className="header-avatar"
        />
        <span className="header-username">
          {profileUser.firstName} {profileUser.lastName}
        </span>
      </div>

      {/* وسط: عنوان */}
      <div className="header-title">همایند</div>

      {/* چپ: دکمه بازگشت */}
      <div className="logout-btn">
        <img src="https://img.icons8.com/parakeet-line/48/22C3E6/circled-left.png"
          onClick={() => nav(-1)}  // 🔥 بازگشت به صفحه قبل
        />
         
      </div>

    </div>
  );
}
