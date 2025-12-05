import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
export default function Register({ onLogin }){
  const [form,setForm]=useState({username:'',firstName:'',lastName:'',password:''});
  const nav = useNavigate();
  const submit = async (e)=>{
    e.preventDefault();
    try{
      const res = await API.post('auth/register', form);
      onLogin(res.data.token, res.data.user);
      nav('/');
    }catch(err){ alert(err.response?.data?.message || 'error'); }
  };
  return (
    <div className="container">
     <div className='holdsli'>
       به همایند خوش آمدید
      <div className='holdform'>
        <h2>ثبت نام</h2>
      <form onSubmit={submit}>
        <input required placeholder="آیدی یکتا (english)" value={form.username} onChange={e=>setForm({...form,username:e.target.value})} /><br/>
        <input placeholder="نام" value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} /><br/>
        <input placeholder="نام خانوادگی" value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} /><br/>
        <input type="password" required placeholder="رمز" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /><br/>
        <button className="btn">ثبت نام</button>
      </form>
      <div style={{marginTop:12}}>
       <p> حساب داری؟</p>
        <button onClick={()=>nav('/login')} className="icon-btn">ورود</button>
      </div>
      </div>
     </div>
    </div>
  );
}
