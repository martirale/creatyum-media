import React from "react";
import Image from "next/image";

export default function TestimonialCard({ testimonial }) {
  const imageUrl = testimonial.profileImage
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${testimonial.profileImage}`
    : null;

  return (
    <div className="bg-black rounded-2xl px-8 py-12 mx-0 my-4 text-yellow text-center md:rounded-3xl dark:bg-yellow dark:text-black flex flex-col h-full inverse-select">
      <div className="w-24 h-24 mx-auto mb-8 relative flex-shrink-0">
        <Image
          src={imageUrl}
          alt={testimonial.name}
          fill
          className="rounded-full object-cover border border-yellow dark:border-black"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <p className="text-lg mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
        <div className="mt-auto">
          <h4 className="uppercase font-extrabold text-lg">
            {testimonial.name}
            <br />
            {testimonial.episode}
          </h4>
        </div>
      </div>
    </div>
  );
}
