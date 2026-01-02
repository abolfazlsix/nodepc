    import FooterMobile from "./FooterMobile"
import Heade from "./Heade"
import "./Login.css"
import API from '../api';

export const Help=({user})=>{
  const currentUser = JSON.parse(localStorage.getItem("user"));

return(
    <div className="page-content with-footer-padding">
        {/* <Heade/> */}
              <div className="app-header">
    
<div className="d1">
         {/* <div onClick={()=>nav("/register")} className="holdmeno">ورود/ثبت نام</div> */}
</div>
<div className="d2">
        <div className="header-title">همایند</div>

</div>  <div className="d3">
       <img className="imglogo" src="https://s6.uupload.ir/files/photo_5879888826585517005_y_aa4q.jpg" alt="" />
       
      </div>
      </div>
        <div className="h">
           <h1>توضیح برنامه</h1>
           <p>برنامه همایند برای حل مشکلات شهروندان با همدلی خود ساخته شده است همچنین همایند میتواند در روز های بحرانی مانند سیل و زلزله و مخصوصا جنگ کمک کننده کشور و مردم باشد</p>
        </div>
        <div className="baksh">
            <div className="h">
             <h1>مشکلات مردمی</h1>
             <p>مشکلات مردمی مشکلات عادی و روز مرگی مردم است که مردم خود میتوانند بنویسند که کجا چه مشکلی دارد چه مشکل جاده ای و شهری باشد و چه مشکل مشیعتی خانوار ها</p>
            </div>
          <div className="h">
            <h1>اهدای ابزار</h1>
            <p>اهدای ابزار برای شرایط ضروری هست که اگر ابزاری داشتید که نیاز نداشتید ولی میتواند مشکلی حل کند میتوانید آن را به اشتراک بگذارید</p>
          </div>
          <div className="h">
            <h1>افراد داوطلب</h1>
            <p>افراد داوطلب برای شرایط ضروری هست که اگر میتوانید مشکلی را حل کنید یا کسی را میشناسید که میتواند این مشکل را حل کند میتوانید در آنجا به اشتراک بگذارید</p>
          </div>
          <div className="h">
            <h1>کجاها در جنگ دوازده روزه آسیب دیده؟</h1>
            <p>این بخش برای اضافه کردن مکان های آسیب دیده در جنگ دوازده روزه است</p>
          </div>
          <div className="h">
            <h1>پست عادی</h1>
            <p>پست عادی میتوانید پست های دلخواه از خود یا موضوع های دیگر بگذارید</p>
          </div>
          <div className="h">
            <h1>اکسپلور</h1>
            <p>در اکسپلور تمام پست ها به نمایش میاید</p>
          </div>
             <div className="h">
                <h1>پست</h1>
                <p>در بخش پستگذاری میتوانید پست خودرا بگذارید و که در کدام بخش میخواهید آپلود شود را انتخاب کنید</p>
             </div>
             <div className="h">
                <h1>پروفایل</h1>
                <p>در پروفایل میتوانید پست های خود را مدیریت کنید و مدال خود را ببینید</p>
             </div>
             <div className="h">
                <h1>مدال ها</h1>
                <p>مدال ها جمع تعامل هایی که از کاربران را گرفتید را جمع میکند و به شما مدال میدهد
                    پایین 50 مدال سرباز 
                    بالای 50 الی 100 مدال فرمانده
                    وبالای 100 مدال سردار
                </p>
             </div>
        </div>
        <FooterMobile/>
    </div>
)
}
 <div className="page-content with-footer-padding"></div>