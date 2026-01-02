import { useState } from "react"
import API from "../api"
import { useNavigate } from "react-router-dom"
import "./search.css"
export const Search=()=>{
    const [a,setA]=useState("")
  const navigate = useNavigate();

    return(
        <div>
          <div className="inputhandel">
 <div className="input">
  <img src="https://img.icons8.com/ios/50/228BE6/search--v1.png" alt="" />
   <input
        placeholder="آیدی کاربر را وارد کنید"
   onChange={ab=>setA(ab.target.value)} type="text" />
            <button  onClick={() => navigate(`/profile/${a}`)}>جستجو کاربر</button>

 </div>
          </div>
        </div>
    )
}