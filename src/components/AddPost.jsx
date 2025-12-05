import React, { useState } from 'react';
import API from '../api';
import FooterMobile from './FooterMobile';
import "./FooterStyles.css";
import "./dpost.css"
import Heade from './Heade';
export default function AddPost({ onClose }){
  const [form,setForm]=useState({title:'',description:'',category:'problems',contact:''});
  const [image,setImage]=useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const submit = async (e)=>{
    e.preventDefault();
    try{
      const data = new FormData();
      data.append('title', form.title);
      data.append('description', form.description);
      data.append('category', form.category);
      if(form.contact) data.append('contact', form.contact);
      if(image) data.append('image', image);
      await API.post('/posts', data, { headers: { 'Content-Type': 'multipart/form-data' }});
      onClose();
      window.location.reload();
    }catch(err){ alert(err.response?.data?.message || 'پست با موققیت گذاشته شد'); }
  };

  return (
    <div className="container">
            <Heade currentUser={currentUser} />
      
<div>
       <div className='hold'>
       <h3>اضافه کردن پست</h3>
     </div>
<div className='adpost'>
        <form onSubmit={submit}>
        <input required placeholder="تایتل" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/><br/>
        <textarea placeholder="توضیحات" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}></textarea><br/>
        <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
          <option value="problems">مشکلات</option>
          <option value="war_damage">کجاها در جنگ دوازده روزه آسیب</option>
          <option value="normal">پست عادی</option>
          <option value="volunteer">داوطلب مدد</option>
          <option value="donation">اهدایی ابزار</option>
        </select><br/>
        {/* {(form.category === 'volunteer' || form.category === 'donation') && (
          // <input placeholder="شماره تماس" value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})} />
        )} */}
        <input type="file" accept="image/*" onChange={e=>setImage(e.target.files[0])} />
        <button className="btn">ارسال</button>
        <button type="button" onClick={onClose} className="icon-btn">انصراف</button>
      </form>
</div>
      
</div><FooterMobile/>
    </div>
  );
}



