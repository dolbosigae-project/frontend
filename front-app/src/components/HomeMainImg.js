import styles from './../css/homeMainImg.module.css';
import React, { useState, useEffect } from "react";

export default function HomeMainImg() {
  
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    `${process.env.PUBLIC_URL}/img/1.jpg`,
    `${process.env.PUBLIC_URL}/img/2.jpg`,
    `${process.env.PUBLIC_URL}/img/3.jpg`,
    `${process.env.PUBLIC_URL}/img/4.jpg`,
    `${process.env.PUBLIC_URL}/img/5.jpg`,
    `${process.env.PUBLIC_URL}/img/6.jpg`,
    `${process.env.PUBLIC_URL}/img/7.jpg`,
    `${process.env.PUBLIC_URL}/img/8.jpg`,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex(prevIndex => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <div className={styles.whiteBox}></div>
        <div className={styles.imgContainer}>
          {slides.map((slide, index) => (
            <img
              key={index}
              className={`${styles.mySlides} ${index === slideIndex ? styles.active : ''}`}
              src={slide}
              alt={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
