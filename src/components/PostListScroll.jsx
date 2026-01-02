import React, { useEffect, useState } from "react";
import API from "../api";
import PostCard from "./PostCard";
import FooterMobile from "./FooterMobile";
import Heade from "./Heade";
import AddPost from "./AddPost";
import "./PostListScroll.css"
import "./FooterStyles.css";

export default function PostListScroll({ user, logout }) {
  const [postsByCategory, setPostsByCategory] = useState({});
  const [openAdd, setOpenAdd] = useState(false);

  const categories = [
    { key: "problems", label: "مشکلات شهروندی" },
    { key: "normal", label: "پست عادی" },
    { key: "volunteer", label: "نیروی داوطلب" },
    { key: "donation", label: " فروشگاه همدلی" },
  ];

  useEffect(() => {
    async function loadPosts() {
      const newPosts = {};
      for (let cat of categories) {
        try {
          const res = await API.get(`/posts/category/${cat.key}`);
          // فقط 5 پست آخر را نگه می‌داریم
          newPosts[cat.key] = res.data.slice(0, 5);
        } catch (e) {
          console.error(e);
          newPosts[cat.key] = [];
        }
      }
      setPostsByCategory(newPosts);
    }
    loadPosts();
  }, []);

  return (
    <>
   

      <div className="container">
        {categories.map((cat) => (
          <div className="card" key={cat.key} style={{ marginBottom: 24 }}>
            <h3 style={{ marginBottom: 8 }}>{cat.label}</h3>

            <div style={{ display: "flex", overflowX: "auto", gap: 12, paddingBottom: 8 }}>
              {(postsByCategory[cat.key] || []).map((p) => (
                <div key={p.id} style={{ minWidth: 250 }}>
                  <PostCard post={p} currentUser={user} />
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 8 }}>
              {/* <button
                className="btn"
                onClick={() => window.location.href = "/explore"}
              >
                دیدن بیشتر
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {openAdd && <AddPost onClose={() => setOpenAdd(false)} />}
      <div style={{ height: 60 }} />
      <FooterMobile onAdd={() => setOpenAdd(true)} user={user} />
    </>
  );
}
