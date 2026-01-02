

import React, { useState, useEffect } from 'react';
import API from '../api';
import PostList from './PostList';
import Explore from './Explore';
import FooterMobile from './FooterMobile';
import AddPost from './AddPost';
import { useNavigate } from 'react-router-dom';
import CategorySlider from './CategorySlider';
import Heade from './Heade';
import "./Home.css";
import PostListScroll from './PostListScroll';
import "./FooterStyles.css";
import { Search } from './search';

export default function Home({ user, logout }) {

  const [tab, setTab] = useState('problems');
  const [openAdd, setOpenAdd] = useState(true);
  const [topPosts, setTopPosts] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // --- بارگذاری ۱۰ پست با بیشترین تعامل ---
  useEffect(() => {
    async function loadTopPosts() {
      try {
        const res = await API.get('/posts/top'); // فرض بر این است که بک‌اند یک روت /posts/top برای گرفتن پست‌های برتر دارد
        setTopPosts(res.data.posts.slice(0,10));
      } catch (err) {
        console.log("خطا در دریافت پست‌های برتر", err);
      }
    }
    loadTopPosts();
  }, []);

  return (
   <div className="page-content with-footer-padding">
<>
      <Heade currentUser={currentUser} />

      <div className="container">
        <Search/>
        <CategorySlider/>

        <div className='humact'>
          <div> 
            <div className='kh'><h4>خدمات</h4></div>
            <div className='holdcont'>
              <div onClick={()=>navigate('/problems')} className='div1'>
                <img src='https://img.icons8.com/pulsar-line/48/FFFFFF/hand-dug-well.png'/>
                <h2>مشکلات </h2>
              </div>
              <div onClick={()=>navigate('/volunteer')} className='div2'>
                <img src='https://img.icons8.com/glyph-neue/64/FFFFFF/worker-male.png'/>
                <h2>نیروی داوطلب</h2>
              </div>
              <div onClick={()=>navigate('/donation')} className='div3'>
                <img src='https://img.icons8.com/ink/48/FFFFFF/maintenance.png'/>
                <h2>اهدای ابزار</h2>
              </div>
            </div>
          </div>
        </div>

        <div className='poisterhom'>
          <img src='https://uploadkon.ir/uploads/b90b08_25IMG-20251208-195210-812.jpg' className='war-damage' onClick={()=>navigate('/war-damage')}/>
        </div>

        {/* --- بخش پست‌های برتر --- */}
       <PostListScroll/>

      </div>

      <div style={{height:60}} />
      <FooterMobile onAdd={()=>setOpenAdd(true)} user={user} />
    </>
</div>

  );
}
 