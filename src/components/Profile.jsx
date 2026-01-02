import React, { useEffect, useState } from "react";
import API from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function Profile({ currentUser,post }) {
  const [profileUser,setProfileUser]=useState(null);
  const [loading,setLoading]=useState(true);
  const {username} = useParams();
   const navigate=useNavigate();
   const [posts,setPosts]=useState(null);
  useEffect(()=>{
    function loadprofile(){
      let usertag;
      if(username){
        usertag= username;
      }else{
        usertag= currentUser?.username;
      } if(!usertag){
        setLoading(false);
      }

      API.get(`/users/${usertag}`).then((res)=>{
       setProfileUser(res.data.user);
       console.log(res.data.user)
      }).catch((err)=>{
       setProfileUser(null)
      }).finally(()=>{
          setLoading(false)
      })
    }
loadprofile();

  },[username,currentUser])

  // حالت لودینگ
  if (loading) {
    return <p style={{ textAlign: "center" }}>در حال بارگذاری...</p>;
  }

  // اگر کاربر پیدا نشد
  if (!profileUser) {
    return <p style={{ textAlign: "center" }}>کاربری یافت نشد</p>;
  }

  // تشخیص اینکه پروفایل مال خود کاربر است یا نه
  const isMe =
    currentUser && currentUser.username === profileUser.username;

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", textAlign: "center" }}>
      
      <img
        src={`https://nodeproblem-3.onrender.com${profileUser.avatar || "/default-avatar.png"}`}
        alt="avatar"
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
       
      <h3>
        {profileUser.firstName} {profileUser.lastName}
      </h3>

      <p>@{profileUser.username}</p>

      {isMe ? (
        <p style={{ color: "green" }}>این پروفایل شماست</p>
      ) : (
        <p style={{ color: "gray" }}>پروفایل کاربر دیگر</p>
      )}

      {isMe && (
        <button
          style={{ marginTop: 16 }}
          onClick={() => navigate("/")}
        >
          بازگشت
        </button>
      )}
      {profileUser.posts.map((m)=>{
       return(
         <div>
          <div><h6>{m.title}</h6></div>
          <div ><img style={{width:100,height:100}} src={`https://nodeproblem-3.onrender.com${m.image}`}/></div>
          <div>{m.description}</div>
          <button>like</button>

        </div>
       )
      })}
        <div>

          </div>
    </div>
  );
}
