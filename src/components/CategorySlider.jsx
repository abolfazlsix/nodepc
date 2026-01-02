import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CategorySlider.css";
import "./FooterStyles.css";

export default function CategorySlider() {
  const nav = useNavigate();
  const slides = [
    { image: "https://s6.uupload.ir/files/3_copy_y5w2.jpg", link: "/problems" },
    { image: "https://uploadkon.ir/uploads/f3e508_25IMG-20251208-195021-729.jpg", link: "/donation" },
    { image: "https://s6.uupload.ir/files/1_copy_a2bk.jpg", link: "/volunteer" },
    { image: "https://s6.uupload.ir/files/2_copy_1qmw.jpg", link: "/war-damage" },
  ];

  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [transition, setTransition] = useState(true);
  const touchStartX = useRef(0);
  const isDragging = useRef(false);

  // اسلاید خودکار
  useEffect(() => {
    const timer = setInterval(() => {
      goNext();
    }, 3000);
    return () => clearInterval(timer);
  }, [index]);

  const goNext = () => {
    setTransition(true);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    setTransition(true);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
    setTransition(false);
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const currentX = e.touches[0].clientX;
    setDragX(currentX - touchStartX.current);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    setTransition(true);
    if (dragX < -50) goNext();
    else if (dragX > 50) goPrev();
    setDragX(0);
  };

  return (
    <div className="slider-container" onClick={() => nav(slides[index].link)}
         onTouchStart={handleTouchStart}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}
    >
      <div className="slider-inner" style={{
        transform: `translateX(${-index * 100 + dragX / window.innerWidth * 100}%)`,
        transition: transition ? "transform 0.3s ease-in-out" : "none"
      }}>
        {slides.map((slide, i) => (
          <div className="slider-item" key={i}>
            <img src={slide.image} alt={`slide-${i}`} />
          </div>
        ))}
      </div>

      {/* نقاط پایین اسلایدر */}
      <div className="slider-dots">
        {slides.map((_, i) => (
          <span key={i} className={`dot ${i === index ? 'active' : ''}`}></span>
        ))}
      </div>
    </div>
  );
}
