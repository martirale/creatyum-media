import Image from "next/image";

export default function TestimonialCard({ testimonial }) {
  const imageUrl = testimonial.profileImage
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${testimonial.profileImage}`
    : testimonial.profileImage;

  return (
    <div className="bg-black rounded-2xl px-8 py-12 mx-0 my-4 text-yellow text-center md:rounded-3xl dark:bg-yellow dark:text-black">
      <div className="w-24 h-24 mx-auto mb-4 relative">
        <Image
          src={imageUrl}
          alt={testimonial.name}
          fill
          className="rounded-full object-cover border border-yellow dark:border-black"
        />
      </div>
      <p className="text-lg mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="flex flex-col items-center">
        <h4 className="uppercase font-extrabold">
          {testimonial.name} - {testimonial.episode}
        </h4>
      </div>
    </div>
  );
}
