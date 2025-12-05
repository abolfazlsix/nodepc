import React, { useEffect, useState } from 'react';
import API from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';
import FooterMobile from './FooterMobile';
import "./FooterStyles.css";
import "./prof.css"
import Heade from './Heade';
import PostCard from './PostCard';

export default function Profile({ currentUser }) {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const u = username || currentUser?.username;
      const res = await API.get(`/users/${u}`);
      setProfileUser(res.data.user);
    }
    load();
  }, [username, currentUser]);

  if (!profileUser) return <div className="container">در حال بارگذاری...</div>;

  const medal = (n) => {
    if (n > 100) return (
      <div className='ma'>
        <img className='m' src="https://s6.uupload.ir/files/screenshot_2025-12-05_015746_copy_b0a3.jpg" alt="" />
        <p>مدال:سردار</p>
      </div>
    );
    if (n > 50) return (
      <div className='ma'>
        <img className='m' src="https://s6.uupload.ir/files/screenshot_2025-12-05_015449_copy_37jj.jpg" alt="" />
        <p>مدال:فرمانده</p>
      </div>
    );
    return (
      <div className='ma'>
        <img className='m' src="https://s6.uupload.ir/files/screenshot_2025-12-05_015300_copy_xidp.jpg" alt="" />
        <p>مدال:سرباز</p>
      </div>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleUpdate = (updatedUser) => {
    setProfileUser(updatedUser); // بروزرسانی داده‌ها بعد از ادیت
  };

  return (
    <div className="page-content with-footer-padding">
      <div className="container">
        <Heade currentUser={currentUser} />

        <div className='div'>
          <img
            src={`https://nodeproblem-3.onrender.com${profileUser.avatar || '/default-avatar.png'}`}
            className="avatar"
            style={{ width: 96, height: 96 }}
          />
          <div>
            <h3>{profileUser.firstName} {profileUser.lastName}</h3>
            <div>@{profileUser.username}</div>
          </div>
        </div>

        <div>{medal(profileUser.interactionsCount || 0)}</div>

        {currentUser && currentUser.username === profileUser.username && (
          <div className='holdbut' style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setOpenEdit(true)} className="btn">ادیت پروفایل</button>
            <button onClick={handleLogout} className="btn btn-secondary">خروج از حساب</button>
          </div>
        )}

        {openEdit && 
          <EditProfile 
            user={profileUser} 
            onClose={() => setOpenEdit(false)} 
            onUpdate={handleUpdate} 
          />
        }

        <hr />
        <h4>پست‌ها</h4>

        {profileUser.posts?.map(p => (
          <div key={p.id} style={{ marginBottom: 12 }}>
            <PostCard post={p} />
            {currentUser?.username === profileUser.username && (
              <button
                className="btn btn-danger"
                style={{ background: '#228BE6', marginTop: 4 }}
                onClick={async () => {
                  if (!window.confirm("حذف پست؟")) return;
                  try {
                    await API.delete(`/posts/${p.id}`);
                    const res = await API.get(`/users/${profileUser.username}`);
                    setProfileUser(res.data.user);
                  } catch (err) {
                    alert("خطا در حذف پست");
                  }
                }}
              >
                حذف
              </button>
            )}
          </div>
        ))}

        <FooterMobile />
      </div>
    </div>
  );
}
