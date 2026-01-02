import React from "react";
import { useNavigate } from "react-router-dom";
import "./NoAccount.css";

export default function NoAccount() {
  const nav = useNavigate();

  return (
    <div className="noacc-container">
      <h2>حساب کاربری پیدا نشد</h2>
      <p>برای دیدن پروفایل ابتدا باید وارد حساب خود شوید.</p>

      <button className="noacc-btn" onClick={() => nav("/login")}>
        ورود / ثبت‌نام
      </button>

      <button className="noacc-back" onClick={() => nav("/")}>
        بازگشت به خانه
      </button>
    </div>
  );
}
