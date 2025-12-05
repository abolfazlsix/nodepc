import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
export default function Login({ onLogin }){
  const [form,setForm]=useState({username:'',password:''});
  const nav = useNavigate();
  const submit = async (e)=>{
    e.preventDefault();
    try{
      const res = await API.post('/auth/login', form);
      onLogin(res.data.token, res.data.user);
      nav('/');
    }catch(err){ alert(err.response?.data?.message || 'error'); }
  };
  return (
    <div className="container">
<div className='holdsli'>
  به همایند خوش آمدید
  <div className='holdform'>
          <h2>ورود</h2>
      <form onSubmit={submit}>
        <input required placeholder="آیدی" value={form.username} onChange={e=>setForm({...form,username:e.target.value})} /><br/>
        <input type="password" required placeholder="رمز" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /><br/>
        <button className="btn">ورود</button>
      </form>
      <p>آیا حساب ندارید؟</p>
      <div style={{marginTop:12}}>
        <button onClick={()=>nav('/register')} className="icon-btn">ثبت نام</button>
      </div>
  </div>
</div>
    </div>
  );
}
