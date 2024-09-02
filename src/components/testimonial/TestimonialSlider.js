"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import TestimonialCard from "./TestimonialCard";
import styles from "../../styles/TestimonialSlider.module.css";
import "swiper/css";

async function getTestimonials() {
  // Aquí deberías implementar la lógica para obtener los testimonios desde tu API de Strapi
  // Por ahora, usaremos datos de ejemplo
  return [
    {
      id: 1,
      profileImage: "/placeholder.svg?height=100&width=100",
      quote: "Este podcast cambió mi vida profesional.",
      name: "Ana García",
      episode: "Episodio 1",
    },
    {
      id: 2,
      profileImage: "/placeholder.svg?height=100&width=100",
      quote: "Increíble contenido, lo recomiendo a todos mis colegas.",
      name: "Carlos Rodríguez",
      episode: "Episodio 2",
    },
    {
      id: 3,
      profileImage: "/placeholder.svg?height=100&width=100",
      quote: "Una fuente inagotable de inspiración y conocimiento.",
      name: "Laura Martínez",
      episode: "Episodio 3",
    },
    {
      id: 4,
      profileImage: "/placeholder.svg?height=100&width=100",
      quote: "Este podcast cambió mi vida profesional.",
      name: "Ana García",
      episode: "Episodio 4",
    },
    {
      id: 5,
      profileImage: "/placeholder.svg?height=100&width=100",
      quote: "Increíble contenido, lo recomiendo a todos mis colegas.",
      name: "Carlos Rodríguez",
      episode: "Episodio 5",
    },
    {
      id: 6,
      profileImage: "/placeholder.svg?height=100&width=100",
      quote: "Una fuente inagotable de inspiración y conocimiento.",
      name: "Laura Martínez",
      episode: "Episodio 6",
    },
  ];
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
