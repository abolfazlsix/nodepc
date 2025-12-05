import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./FooterStyles.css";

export default function FooterMobile({ user }) {
  const nav = useNavigate();
  const location = useLocation();

  const activePath = location.pathname;

  const isProfileActive = activePath.startsWith("/profile");

  const iconBox = (active, icon, activeIcon, onClick) => {
    return (
      <div
        className="footer-item"
        style={{
          background: active ? "#228BE6" : "transparent",
          borderRadius: "50%",
          padding: 8,
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <img src={active ? activeIcon : icon} className="footer-icon" alt="" />
      </div>
    );
  };

  return (
    <div className="footer-nav">
      {iconBox(
        activePath === "/",
        "https://img.icons8.com/parakeet-line/48/000000/exterior.png",
        "https://img.icons8.com/fluency-systems-filled/48/ffffff/exterior.png",
        () => nav("/")
      )}

      {iconBox(
        activePath === "/explore",
        "https://img.icons8.com/parakeet-line/48/000000/search-more.png",
        "https://img.icons8.com/fluency-systems-filled/48/ffffff/search-more.png",
        () => nav("/explore")
      )}

      {iconBox(
        isProfileActive,
        "https://img.icons8.com/parakeet-line/48/000000/user-male-circle.png",
        "https://img.icons8.com/fluency-systems-filled/48/ffffff/user-male-circle.png",
        () => user && nav(`/profile/${user.username}`)
      )}

      {iconBox(
        activePath === "/add-post",
        "https://img.icons8.com/sf-regular/48/000000/add.png",
        "https://img.icons8.com/sf-regular-filled/48/ffffff/add.png",
        () => nav("/add-post")
      )}
    </div>
  );
}
