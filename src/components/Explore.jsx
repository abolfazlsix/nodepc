import React, { useEffect, useState } from 'react';
import API from '../api';
import PostCard from './PostCard';
import FooterMobile from './FooterMobile';
import Heade from './Heade';
import "./FooterStyles.css";

export default function Explore(){
  const [posts,setPosts]=useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(()=> {
    API.get('/posts/explore').then(res=>setPosts(res.data)).catch(()=>{});
  }, []);
  return (
   <div className="page-content with-footer-padding">
   <div className="container">
            <Heade currentUser={currentUser} />
      
      <h3>اکسپلور</h3>
      {posts.map(p=> <PostCard key={p.id} post={p} />)}
      <FooterMobile/>
    </div>
</div>

  );
}
