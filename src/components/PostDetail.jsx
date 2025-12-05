import React, { useEffect, useState } from 'react';
import API from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import Heade from './Heade';
import FooterMobile from './FooterMobile';
import "./FooterStyles.css";

export default function PostDetail({ user }) {
  const { id } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState(null);
  const [text, setText] = useState('');
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then(res => setData(res.data.post))
      .catch(() => {});
  }, [id]);

  const comment = async () => {
    if (!text.trim()) return;
    try {
      await API.post(`/posts/${id}/comment`, { text });
      const res = await API.get(`/posts/${id}`);
      setData(res.data.post);
      setText('');
    } catch (e) {
      alert('Login required');
    }
  };

  if (!data) return <div className="container">در حال بارگذاری...</div>;

  const avatarUrl = (user) =>
    user?.avatar ? `https://nodeproblem-3.onrender.com${user.avatar}` : '/default-avatar.png';

  return (
    <div className="page-content with-footer-padding">
      <div className="container">
        
        <Heade currentUser={currentUser} />

        <h2>{data.title}</h2>

        {/* اطلاعات صاحب پست */}
        <div
          className="profile-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 8,
            cursor: 'pointer'
          }}
          onClick={() => nav(`/profile/${data.User?.username}`)}
        >
          <img
            src={avatarUrl(data.User)}
            className="avatar"
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
          <div>
            <div style={{ fontWeight: 700 }}>
              {data.User?.firstName} {data.User?.lastName}
            </div>
            <div style={{ fontSize: 12, color: '#777' }}>
              @{data.User?.username}
            </div>
          </div>
        </div>

        <p>{data.description}</p>

        {data.image && (
          <img
            src={`https://nodeproblem-3.onrender.com${data.image}`}
            className="post-image"
            alt="post"
            style={{
              width: '100%',
              minHeight: 300,
              objectFit: 'cover',
              borderRadius: 8,
              marginTop: 4
            }}
          />
        )}

        <hr />

        <h3>کامنت‌ها</h3>

        {/* لیست کامنت‌ها */}
        {data.Comments?.map((c) => (
          <div
            key={c.id}
            className="card"
            style={{
              marginBottom: 8,
              padding: 10,
              cursor: "pointer",
              borderRadius: 8,
              border: "1px solid #eee"
            }}
            onClick={() => nav(`/profile/${c.User?.username}`)}
          >
            <div
              className="profile-row"
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <img
                src={avatarUrl(c.User)}
                className="avatar"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
              <div>
                <div style={{ fontWeight: 700 }}>
                  {c.User?.firstName} {c.User?.lastName}
                </div>
                <div style={{ fontSize: 12, color: '#777' }}>
                  @{c.User?.username}
                </div>
              </div>
            </div>

            <p style={{ marginTop: 4 }}>{c.text}</p>
          </div>
        ))}

        {/* ارسال کامنت */}
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="کامنت..."
            style={{
              width: '90%',
              padding: 6,
              borderRadius: 4,
              border: '1px solid #ccc',
              resize: 'none'
            }}
          />
          <button
            onClick={comment}
            className="btn"
            style={{
              marginTop: 4,
              background: "#0784c9",
              color: "white",
              padding: "8px 12px",
              borderRadius: 6,
              border: 0
            }}
          >
            ارسال کامنت
          </button>
        </div>

        <FooterMobile user={currentUser} />
      </div>
    </div>
  );
}
