"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import TestimonialCard from "./TestimonialCard";
import styles from "../../styles/TestimonialSlider.module.css";
import "swiper/css";

async function getTestimonials() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/testimonials?populate=*`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch testimonials");
    }
    const data = await response.json();
    return data.data.map((item) => ({
      id: item.id,
      quote: item.attributes.quote,
      name: item.attributes.name,
      episode: item.attributes.episode,
      // profileImage: item.attributes.image.data.attributes.url,
    }));
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

export default function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    getTestimonials().then(setTestimonials);
  }, []);

  return (
    <div className={styles.swiperContainer}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
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
