import React, { useEffect, useState } from 'react';
import API from '../api';
import PostCard from './PostCard';
import FooterMobile from './FooterMobile';
import Heade from './Heade';
import "./FooterStyles.css";

export default function PostList({ category, number }) {

  const [posts, setPosts] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function load() {
      try {
        const res = await API.get(`/posts/category/${category}`, {
          params: number ? { number } : {}
        });

        setPosts(res.data);

      } catch (e) {
        console.error(e);
      }
    }

    load();
  }, [category, number]);

  return (
    <div className="page-content with-footer-padding">
      <Heade currentUser={currentUser} />
       
      {posts.map(p => (
        <PostCard  key={p.id} post={p} />
      ))}

      <FooterMobile />
    </div>
  );
}
