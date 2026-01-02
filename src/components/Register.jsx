import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import "./Header.css"
export default function Register() {
 const [form,setForm]=useState(
 { username:"",
  password:"",
  lastName:"",
  firstName:""
 }
 )
 const [error,setError]=useState("")
 const navigate= useNavigate();

const submit=(e)=>{
    e.preventDefault();
  
   API.post("/auth/register",{username:form.username,password:form.password,lastName:form.lastName,firstName:form.firstName}).then((res)=>{
  navigate("/");
 })
 .catch((err)=>{
  console.log(err);
  setError("ثبت نام با مشکل مواجه شد");
 })
}

  return (
    <div className="container">
      <div className="holdsli">
       
 <div className="d33"> <p>به همایند خوش آمدید</p>
       <img className="imglogo" src="https://s6.uupload.ir/files/photo_5879888826585517005_y_aa4q.jpg" alt="" />
       
      </div>
        <div className="holdform">
          <h2>ثبت نام</h2>

          <form onSubmit={submit}>
            <input
              required
              placeholder="آیدی یکتا (english)"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            /><br/>
          
            <input
              placeholder="نام"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
            <br/>

            <input
              placeholder="نام خانوادگی"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
            
            <br/>

            <input
              type="password"
              required
              placeholder="رمز"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <br/>
         {error&&   <p style={{color:"red"}}>{error}</p>}
            <button type='submit' className="btn">ثبت نام</button>
          </form>
          <p>حساب داری؟</p>
          <div style={{ marginTop: 12 }}>

            <button onClick={() => navigate("/login")} className="icon-btn">ورود</button>

          </div>
        </div>
      </div>
    </div>
  );
}