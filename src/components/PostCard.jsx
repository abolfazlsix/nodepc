import React, { useState, useEffect } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
// import "./Home.css";
import "./PostCard.css"
import "./FooterStyles.css";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false); // وضعیت بصری لایک

  useEffect(()=> {
    if(!post?.id) return;
    API.get(`/posts/${post.id}`)
      .then(res => setLikesCount(res.data.likesCount))
      .catch(()=>{});
  }, [post?.id]);

  const like = async ()=>{
    try{
      await API.post(`/posts/${post.id}/like`);
      const res = await API.get(`/posts/${post.id}`);
      setLikesCount(res.data.likesCount);
      setLiked(!liked); // حالت بصری لایک
    }catch(e){ 
      alert('Login required'); 
    }
  };

  const avatarUrl = post.User?.avatar ? `https://nodeproblem-3.onrender.com${post.User.avatar}` : '/default-avatar.png';
  const postImageUrl = post.image ? `https://nodeproblem-3.onrender.com${post.image}` : null;

  return (
    <div className="card">
      <div    style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div  style={{display:'flex',gap:8,alignItems:'center'}}>
          <img 
           src={avatarUrl} alt="avatar" className="avatar" />
          <div>
            <div style={{fontWeight:700}}>{post.User?.firstName} {post.User?.lastName}</div>
            <div style={{fontSize:12,color:'#777'}}>@{post.User?.username}</div>
          </div>
        </div>

        <div  style={{display:'flex', alignItems:'center', gap:8}}>
          <button 
            className={`like-btn ${liked ? "liked" : ""}`} 
            onClick={like}
          >
            <img 
              src="https://img.icons8.com/parakeet-line/48/22C3E6/hearts.png" 
              alt="like"
              style={{width:20, height:20}}
            />
          </button>
          <span>{likesCount}</span>

          <img  onClick={()=>navigate(`/post/${post.id}`)}  
            src='https://img.icons8.com/parakeet-line/48/22C3E6/speech-bubble.png' 
            
            className="icon-btn"
            style={{width:24, height:24, cursor:'pointer'}}
          />
        </div>
      </div>

     <div onClick={()=>navigate(`/post/${post.id}`)}  >
       <h3>{post.title}</h3>
      <p style={{color:'#444'}}>
        {post.description?.slice(0,140)}
        {post.description?.length > 140 ? '...' : ''}
      </p>

      {postImageUrl && (
        <img 
          src={postImageUrl} 
          className="post-image" 
          alt="post" 
        />
      )}
     </div>
    </div>
  );
}
