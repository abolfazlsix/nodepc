import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import "./Header.css";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState("");
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    API.post("/auth/login", { username: form.username, password: form.password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setError("");
        nav("/"); // هدایت بعد از ورود موفق
      })
      .catch(() => {
        setError("ورود ناموفق");
      });
  };

  return (
    <div className="container">
      <div className='holdsli'>
        <div className="d33">
          <p>به همایند خوش آمدید</p>
          <img className="imglogo" src="https://s6.uupload.ir/files/photo_5879888826585517005_y_aa4q.jpg" alt="logo" />
        </div>
        <div className='holdform'>
          <h2>ورود</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={submit}>
            <input
              required
              placeholder="آیدی"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
            /><br/>
            <input
              type="password"
              required
              placeholder="رمز"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            /><br/>
            <button type="submit" className="btn">ورود</button>
          </form>

          <p>آیا حساب ندارید؟</p>
          <div style={{ marginTop: 12 }}>
            <button onClick={() => nav('/register')} className="icon-btn">ثبت نام</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
