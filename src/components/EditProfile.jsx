import React, { useState } from 'react';
import API from '../api';

export default function EditProfile({ user, onClose, onUpdate }) {
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [avatar, setAvatar] = useState(null);

  const submit = async () => {
    try {

      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);

      if (avatar) {
        formData.append("avatar", avatar); // فیلد صحیح برای بک‌اند تو
      }

      const res = await API.put(`/users/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (onUpdate) onUpdate(res.data.user);
      onClose();

    } catch (err) {
      console.log("ERROR:", err.response?.data || err);
      alert("خطا در بروزرسانی پروفایل");
    }
  };

  return (
    <div className="modal">
      <h3>ویرایش پروفایل</h3>

      <input
      
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        placeholder="نام"
      />

      <input
        
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        placeholder="نام خانوادگی"
      />

      <input
        type="file"
        accept="image/*"
        onChange={e => setAvatar(e.target.files[0])}
      />

      <button onClick={submit} className="btn">ذخیره</button>
      <button onClick={onClose} className="btn btn-secondary">بستن</button>
    </div>
  );
}
