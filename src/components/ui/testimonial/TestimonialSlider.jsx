"use client";

import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { getTestimonials } from "../../../lib/api";
import TestimonialCard from "./TestimonialCard";
import styles from "./TestimonialSlider.module.css";
import "swiper/css";

export default function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    getTestimonials().then(setTestimonials);
  }, []);

  return (
    <div
      className={styles.swiperContainer}
      onMouseEnter={() => swiperRef.current.swiper.autoplay.stop()}
      onMouseLeave={() => swiperRef.current.swiper.autoplay.start()}
    >
      <Swiper
        ref={swiperRef}
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={7000}
        loop={true}
        loopedSlides={testimonials.length}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className={styles.swiper}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className={styles.swiperSlide}>
            <TestimonialCard testimonial={testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
