import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import PostDetail from './components/PostDetail';
import Profile from './components/Profile';
import Explore from './components/Explore';
import { setToken } from './api';
import PostList from './components/PostList';
import AddPost from './components/AddPost';
import FooterMobile from './components/FooterMobile';
import Heade from './components/Heade';
import NoAccount from './components/NoAccount';
import { Help } from './components/Help';

function App(){
  const [token, setTok] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')||'null'));
  useEffect(()=> setToken(token), [token]);
  const login = (t, u) => { localStorage.setItem('token', t); localStorage.setItem('user', JSON.stringify(u)); setTok(t); setUser(u); }
  const logout = ()=> { localStorage.removeItem('token'); localStorage.removeItem('user'); setTok(null); setUser(null); setToken(null); }
  return (
    <BrowserRouter>

      <div className="app">
      {/* <Headers/> */}
        <Routes>
          <Route path="/" element={ token ? <Home user={user} logout={logout}/> : <Navigate to="/login" /> } />
          <Route path="/login" element={<Login onLogin={login}/> } />
          <Route path="/register" element={<Register onLogin={login}/> } />
          <Route path="/post/:id" element={<PostDetail user={user}/> } />
          <Route path="/profile/:username" element={<Profile currentUser={user} />} />
          <Route path="/explore" element={<Explore user={user} />} />
          <Route path="/problems" element={<PostList category="problems" />} />
          <Route path="/donation" element={<PostList category="donation" />} />
          <Route path="/volunteer" element={<PostList category="volunteer" />} />
          <Route path="/war-damage" element={<PostList category="war_damage" />} />
          <Route path="/add-post" element={<AddPost onClose={()=>navigate(-1)} />} />
            <Route path='no-account' element={<NoAccount/>}/>
            <Route path='/help' element={<Help/>}/>
          
        </Routes>
     {/* <FooterMobilet/> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
